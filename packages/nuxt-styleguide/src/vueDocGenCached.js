import * as fs from 'fs'
import { parseSource } from 'vue-docgen-api'

const parseCache = {}

export async function vueDocGenCached(content, file) {
  if (!parseCache[content]) {
    parseCache[content] = parseSource(content, file)
  }

  return parseCache[content]
}

export default async function loadDocGenCached(file) {
  const content = await new Promise((resolve, reject) => {
    fs.readFile(file, (err, c) => {
      if (err) {
        reject(err)
      } else {
        resolve(c.toString())
      }
    })
  })

  return vueDocGenCached(content, file)
}
