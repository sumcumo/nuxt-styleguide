import * as fs from 'fs'
import { parseSource } from 'vue-docgen-api'

const parseCache = {}
export default async function vueDocGenCached(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, content) => {
      if (err) {
        reject(err)
      } else {
        resolve(content.toString())
      }
    })
  }).then((content) => {
    if (!parseCache[content]) {
      parseCache[content] = parseSource(content, file)
    }

    return parseCache[content]
  })
}
