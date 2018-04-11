const { Observable } = require('rxjs')
const chokidar = require('chokidar')
const path = require('path')

function observe(srcDir, watch) {
  if (!observe.cache[srcDir]) {
    observe.cache[srcDir] = Observable.create((observer) => {
      let done = false
      const watcher = chokidar.watch(path.join(srcDir, '**'))
      ;['add', 'change', 'unlink'].forEach((event) => {
        watcher.on(event, (file) => {
          observer.next({
            event,
            file,
          })
        })
      })

      watcher.on('error', (err) => {
        done = true
        observer.error(err)
        watcher.close()
      })

      watcher.on('ready', () => {
        observer.next({
          event: 'ready',
        })

        if (!watch) {
          observer.complete()
          watcher.close()
        }
      })

      return () => {
        if (!done) {
          watcher.close()
        }
      }
    })
  }

  return observe.cache[srcDir]
}
observe.cache = {}

module.exports = observe
