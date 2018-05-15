import * as fs from 'fs'
import * as path from 'path'
import _template from 'lodash.template'
import options from '@sum.cumo/nuxt-styleguide-config'
import relPathToName from '../relPathToName'

const styleguideSrcDir = path.resolve(__dirname, '..', '..', 'src')

const templatePromise = new Promise((resolve, reject) => {
  fs.readFile(
    path.resolve(styleguideSrcDir, 'templates', 'icon.tjs'),
    (err, content) =>
      err ? reject(err) : resolve(_template(content.toString()))
  )
})

async function load(source, resourcePath) {
  const template = await templatePromise

  const relPath = path.relative(options.srcDir, resourcePath)
  const name = relPathToName(relPath)
  const importPath =
    options.importFrom === 'local'
      ? `~/${relPath}`
      : `${options.name}/${relPath}`

  return template({
    rendererPath: require.resolve(path.join(options.renderer, 'Icon.vue')),
    file: resourcePath,
    layout: options.layout,
    name,
    importName: name.replace(/ /g, ''),
    relPath,
    importPath,
  })
}

module.exports = function componentLoader(source, map) {
  const callback = this.async()

  load(source, this.resourcePath)
    .then((result) => {
      return callback(null, result, map)
    })
    .catch(callback)
}
