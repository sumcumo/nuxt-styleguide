import { cache } from '../packages/nuxt-custom-route-folder/src/observe'

let expectedWatches = {}

export default {
  watch(glob, ...args) {
    if (!expectedWatches[glob]) {
      throw new Error(`unexpected call to unmocked chokidar watch on ${glob}`)
    }

    return expectedWatches[glob](glob, ...args)
  },
}

export function expectWatch(glob, cb) {
  if (expectedWatches[glob]) {
    throw new Error(`${glob} is already mocked`)
  }

  expectedWatches[glob] = cb
}

export function reset() {
  expectedWatches = {}
  Object.keys(cache).forEach((key) => {
    delete cache[key]
  })
}
