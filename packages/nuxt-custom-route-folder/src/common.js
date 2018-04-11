const path = require('path')
const fs = require('fs')

exports.CHUNK_PREFIX = '_crf'

exports.tmpDir = path.resolve(__dirname, '.tmp')
try {
  fs.mkdirSync(exports.tmpDir)
} catch (e) {
  /* noop */
}

exports.readFile = function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, contents) => {
      return err ? reject(err) : resolve(contents)
    })
  })
}

exports.writeFile = function writeFile(file, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, contents, (err) => {
      return err ? reject(err) : resolve(file)
    })
  })
}
