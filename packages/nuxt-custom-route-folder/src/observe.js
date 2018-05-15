import { Observable } from 'rxjs'
import chokidar from 'chokidar'

const cache = {}

export default function observe(glob, watch) {
  if (!cache[glob]) {
    cache[glob] = Observable.create((observer) => {
      let done = false
      const watcher = chokidar.watch(glob)
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
          setTimeout(() => {
            done = true
            watcher.close()
            observer.complete()
          }, 100)
        }
      })

      return () => {
        if (!done) {
          watcher.close()
        }
      }
    })
  }

  return cache[glob]
}
