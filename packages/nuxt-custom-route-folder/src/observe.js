import { Observable } from 'rxjs'
import chokidar from 'chokidar'
import * as path from 'path'

const cache = {}

export default function observe(srcDir, watch) {
  if (!cache[srcDir]) {
    cache[srcDir] = Observable.create((observer) => {
      let done = false
      const watcher = chokidar.watch([
        path.join(srcDir, '**'),
        `!${path.join(srcDir, '**', 'node_modules', '**')}`,
      ])
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

  return cache[srcDir]
}
