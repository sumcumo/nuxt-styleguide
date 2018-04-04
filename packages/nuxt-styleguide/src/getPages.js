import chokidar from 'chokidar'
import * as path from 'path'
import Deferred from './Deferred'

export default function getPages(options, pagesDir, update) {
  const d = new Deferred()

  const files = []
  const ready = false
  const watcher = chokidar.watch(path.join(pagesDir, '**'))

  watcher
    .on('add', (file) => {
      if (path.extname(file) !== '.vue') {
        return
      }

      files.push(file)

      if (ready) {
        update(files)
      }
    })
    .on('unlink', (file) => {
      if (path.extname(file) !== '.vue') {
        return
      }

      files.splice(files.indexOf(file), 1)

      update(files)
    })
    .on('error', (error) => {
      d.reject(error)
    })
    .on('ready', () => {
      if (!options.dev) {
        watcher.close()
      }
      update(files)
      d.resolve(pagesDir)
    })

  return d.promise
}
