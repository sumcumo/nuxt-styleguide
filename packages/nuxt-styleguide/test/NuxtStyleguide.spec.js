import { expectWatch, reset } from 'chokidar'
import { EventEmitter } from 'events'
import * as path from 'path'
import NuxtStyleguide from '../src'

const srcDir = '<virtual>'
describe('NuxtStyleguide', () => {
  let watchMock = null
  let emitter = null
  let defaultPagesEmitter = null
  let defaultPagesWatchMock = null

  beforeEach(() => {
    emitter = new EventEmitter()
    emitter.close = jest.fn()
    watchMock = jest.fn(() => emitter)

    defaultPagesEmitter = new EventEmitter()
    defaultPagesEmitter.close = jest.fn()
    defaultPagesWatchMock = jest.fn(() => defaultPagesEmitter)
  })

  afterEach(() => {
    reset()
  })

  it('waits for relevant file watchers to finish', async () => {
    const context = {
      options: {
        env: {},
      },
      extendBuild() {},
      addPlugin() {},
      nuxt: {
        options: {
          router: {
            base: '/',
          },
          srcDir,
        },
        hook() {},
      },
    }

    expectWatch(`${srcDir}/**`, watchMock)
    expectWatch(
      `${path.resolve(
        __dirname,
        '../../nuxt-styleguide-renderer-default/pages/'
      )}/**`,
      defaultPagesWatchMock
    )

    const promise = NuxtStyleguide.call(context)

    emitter.emit('ready')
    defaultPagesEmitter.emit('ready')

    await promise
  })
})
