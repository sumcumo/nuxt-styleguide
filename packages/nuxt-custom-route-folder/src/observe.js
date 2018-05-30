import * as path from 'path'
import { Observable } from 'rxjs'
import chokidar from 'chokidar'

export const cache = {}

export default function observe(srcDir, watch) {
  if (!cache[srcDir]) {
    const watcher = chokidar.watch(path.join(srcDir, '**'), {
      ignored: path.join(srcDir, '**', 'node_modules', '**'),
    })

    watcher.setMaxListeners(30)

    cache[srcDir] = Observable.create((observer) => {
      let done = false
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

  return cache[srcDir]
}
