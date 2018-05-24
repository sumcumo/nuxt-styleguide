import * as fs from 'fs'
import * as path from 'path'
import _template from 'lodash.template'
import kebabcase from 'lodash.kebabcase'
import options from '@sum.cumo/nuxt-styleguide-config'
import getComponentInfo from '../getComponentInfo'

const styleguideSrcDir = path.resolve(__dirname, '..', '..', 'src')

const templatePromise = new Promise((resolve, reject) => {
  fs.readFile(
    path.resolve(styleguideSrcDir, 'templates', 'component.tjs'),
    (err, content) =>
      err ? reject(err) : resolve(_template(content.toString()))
  )
})

async function load(source, resourcePath) {
  const template = await templatePromise

  const componentInfo = await getComponentInfo(source, resourcePath)
  const { displayName } = componentInfo

  const relPath = path.relative(options.srcDir, resourcePath)
  const importPath =
    options.importFrom === 'local'
      ? `~/${relPath}`
      : `${options.name}/${relPath}`

  return template({
    rendererPath: require.resolve(path.join(options.renderer, 'component.vue')),
    normalizeStatesPath: path.resolve(
      styleguideSrcDir,
      'templates',
      'normalizeStates.js'
    ),
    componentInfo: JSON.stringify(componentInfo),
    layout: options.layout,
    name: displayName,
    kebabName: kebabcase(displayName),
    importName: displayName.replace(/ /g, ''),
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
