import * as path from 'path'
import * as fs from 'fs'

export const CHUNK_PREFIX = '_crf'

export const tmpDir = path.resolve(__dirname, '..', '.tmp')
try {
  fs.mkdirSync(tmpDir)
} catch (e) {
  /* noop */
}

export function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, contents) => {
      return err ? reject(err) : resolve(contents)
    })
  })
}

export function writeFile(file, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, contents, (err) => {
      return err ? reject(err) : resolve(file)
    })
  })
}
