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

  beforeEach(() => {
    emitter = new EventEmitter()
    emitter.close = jest.fn()
    watchMock = jest.fn(() => emitter)
    builder = {
      generateRoutesAndFiles: jest.fn(),
    }

    extendRoutes = null
    fakeNuxt = {
      hook(name, cb) {
        if (name === 'build:extendRoutes') {
          extendRoutes = cb
        } else if (name === 'build:done') {
          cb(builder)
        }
      },
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

    expect(routes.length).toBe(1)
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

    emitter.emit('add', `${srcDir}/foo.js`)
    emitter.emit('ready')

    await ready
    await wait(1)

    const routes = []
    extendRoutes(routes)

    expect(routes.length).toBe(1)

    emitter.emit('unlink', `${srcDir}/foo.js`)

    await wait(100)
    extendRoutes(routes)

    expect(routes.length).toBe(0)
  })
})
