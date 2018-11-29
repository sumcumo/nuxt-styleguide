import { expectWatch, reset } from 'chokidar'
import { EventEmitter } from 'events'
import createCustomRoutesFromFolder from '../src'
import getRoutes from '../src/getRoutes'

function wait(s) {
  return new Promise((resolve) => {
    setTimeout(resolve, s)
  })
}

describe('createCustomRoutesFromFolder', () => {
  let fakeNuxt = null
  const srcDir = '<virtual>'
  let extendRoutes = null
  let emitter = null
  let watchMock = null
  let builder = null
  let buildDoneCb = null

  beforeEach(() => {
    emitter = new EventEmitter()
    emitter.close = jest.fn()
    watchMock = jest.fn(() => emitter)
    builder = {
      generateRoutesAndFiles: jest.fn(),
    }
    extendRoutes = null
    buildDoneCb = null
    fakeNuxt = {
      hook: jest.fn((name, cb) => {
        if (name === 'build:extendRoutes') {
          extendRoutes = cb
        } else if (name === 'build:done') {
          buildDoneCb = cb
        }
      }),
      options: {
        srcDir,
        dev: false,
      },
    }
  })

  afterEach(() => {
    delete getRoutes.cache
    reset()
  })

  it('adds routes to nuxt, based on files in folder', async () => {
    expectWatch(`${srcDir}/**`, watchMock)

    const promise = createCustomRoutesFromFolder({
      nuxt: fakeNuxt,
      glob: `${srcDir}/*.js`,
    })

    emitter.emit('add', `${srcDir}/foo.js`)
    emitter.emit('ready')
    await promise

    const routes = []
    extendRoutes(routes)

    expect(routes).toHaveLength(1)
    expect(routes[0]).toEqual({
      path: '/foo',
      priority: 0,
      component: '<virtual>/foo.js',
      meta: {},
      chunkName: '_crf/foo',
      name: 'foo',
    })
  })

  it('removes routes when file is unlinked', async () => {
    expectWatch(`${srcDir}/**`, watchMock)

    const { ready$ } = createCustomRoutesFromFolder({
      nuxt: {
        ...fakeNuxt,
        options: {
          ...fakeNuxt.options,
          dev: true,
        },
      },
      glob: `${srcDir}/*.js`,
    })

    const ready = new Promise((resolve, reject) => {
      ready$.subscribe({ next: resolve, error: reject })
    })

    buildDoneCb(builder)

    emitter.emit('add', `${srcDir}/foo.js`)
    emitter.emit('ready')

    await ready
    await wait(1)

    const routes = []
    extendRoutes(routes)

    expect(routes).toHaveLength(1)

    emitter.emit('unlink', `${srcDir}/foo.js`)

    await wait(105)
    extendRoutes(routes)

    expect(builder.generateRoutesAndFiles).toHaveBeenCalledTimes(2)
    expect(routes).toHaveLength(0)
  })

  it('caches watcher and route builder', async () => {
    expectWatch(`${srcDir}/**`, watchMock)

    const ready = Promise.all([
      createCustomRoutesFromFolder({
        nuxt: fakeNuxt,
        glob: `${srcDir}/*.js`,
      }),
      createCustomRoutesFromFolder({
        nuxt: fakeNuxt,
        glob: `${srcDir}/*.md`,
      }),
    ])

    emitter.emit('ready')

    await ready

    expect(watchMock).toHaveBeenCalledTimes(1)

    expect(
      fakeNuxt.hook.mock.calls.filter(([name]) => name === 'build:done')
    ).toHaveLength(1)
  })

  it('overwrites routes based on path and priority', async () => {
    expectWatch(`${srcDir}/**`, watchMock)
    const mapRoutePath = jest.fn(() => '/foo')

    const ready = Promise.all([
      createCustomRoutesFromFolder({
        nuxt: fakeNuxt,
        glob: `${srcDir}/bar.js`,
        priority: 1,
        mapRoutePath,
      }),
      createCustomRoutesFromFolder({
        nuxt: fakeNuxt,
        glob: `${srcDir}/foo.js`,
      }),
    ])

    emitter.emit('add', `${srcDir}/foo.js`)
    emitter.emit('add', `${srcDir}/bar.js`)
    emitter.emit('ready')

    await ready

    expect(mapRoutePath).toHaveBeenLastCalledWith('/bar')

    const routes = [
      {
        path: '/foo',
        component: '<virtual>/baz.js',
        chunkName: '_crf/baz',
        name: 'baz',
      },
    ]
    extendRoutes(routes)
    /* ensure idempotence */
    extendRoutes(routes)

    expect(routes).toHaveLength(1)
    expect(routes[0]).toEqual({
      path: '/foo',
      priority: 1,
      component: '<virtual>/bar.js',
      meta: {},
      chunkName: '_crf/bar',
      name: 'bar',
    })
  })

  it('triggers a rebuild when initial watchers are ready in dev mode', async () => {
    expectWatch(`${srcDir}/**`, watchMock)

    const { ready$ } = createCustomRoutesFromFolder({
      nuxt: {
        ...fakeNuxt,
        options: {
          ...fakeNuxt.options,
          dev: true,
        },
      },
      glob: `${srcDir}/*.js`,
    })

    const ready = new Promise((resolve, reject) => {
      ready$.subscribe({ next: resolve, error: reject })
    })

    emitter.emit('add', `${srcDir}/foo.js`)
    emitter.emit('ready')

    await ready

    expect(builder.generateRoutesAndFiles).toHaveBeenCalledTimes(0)

    const routes = []
    extendRoutes(routes)

    await wait(0)

    buildDoneCb(builder)
    expect(builder.generateRoutesAndFiles).toHaveBeenCalledTimes(1)
  })

  it('applies async mappers to routes', async () => {
    expectWatch(`${srcDir}/**`, watchMock)

    const withDelay = (cb) => {
      return (...args) => {
        return new Promise(async (resolve) => {
          await wait(Math.random() * 10)

          resolve(cb(...args))
        })
      }
    }

    const promise = createCustomRoutesFromFolder({
      nuxt: fakeNuxt,
      glob: `${srcDir}/*.js`,
      filter: withDelay((c) => c === '<virtual>/bar.js'),
      mapImport: withDelay((c) => `fooLoader!${c}`),
      mapRouteName: withDelay(() => `epicRoute`),
      mapRoutePath: withDelay(() => `/`),
      mapMeta: withDelay(() => ({ foo: 'bar' })),
    })

    emitter.emit('add', `${srcDir}/foo.js`)
    emitter.emit('add', `${srcDir}/bar.js`)
    emitter.emit('ready')
    await promise

    const routes = []
    extendRoutes(routes)

    expect(routes).toHaveLength(1)
    expect(routes[0]).toEqual({
      path: '/',
      priority: 0,
      component: 'fooLoader!<virtual>/bar.js',
      meta: { foo: 'bar' },
      chunkName: '_crf/bar',
      name: 'epicRoute',
    })
  })

  it('Propagates watcher errors', async () => {
    expectWatch(`${srcDir}/**`, watchMock)

    const errorHandler = jest.fn()
    const someError = new Error('something went wrong')

    createCustomRoutesFromFolder({
      nuxt: fakeNuxt,
      glob: `${srcDir}/*.js`,
    }).catch(errorHandler)

    emitter.emit('error', someError)

    await wait(0)

    expect(errorHandler).toHaveBeenLastCalledWith(someError)
  })

  describe('withOptions', () => {
    it('accepts partial options via higher order function', async () => {
      const createJsRoutes = createCustomRoutesFromFolder
        .withOptions({ nuxt: fakeNuxt })
        .withOptions({ glob: `${srcDir}/*.js` })

      expectWatch(`${srcDir}/**`, watchMock)
      const promise = createJsRoutes()

      emitter.emit('add', `${srcDir}/foo.js`)
      emitter.emit('ready')
      await promise

      const routes = []
      extendRoutes(routes)

      expect(routes).toHaveLength(1)
      expect(routes[0]).toEqual({
        path: '/foo',
        priority: 0,
        component: '<virtual>/foo.js',
        meta: {},
        chunkName: '_crf/foo',
        name: 'foo',
      })
    })
  })
})
