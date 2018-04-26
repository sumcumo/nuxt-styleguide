import * as fs from 'fs'
import * as path from 'path'
import _template from 'lodash.template'
import options from '@sum.cumo/nuxt-styleguide-config'
import getRouteInfo from './getRouteInfo'

const styleguideSrcDir = path.resolve(__dirname, '..', 'src')

const proxyTemplatePromise = new Promise((resolve, reject) => {
  fs.readFile(
    path.resolve(styleguideSrcDir, 'proxyComponent', 'proxyIcon.tjs'),
    (err, content) =>
      err ? reject(err) : resolve(_template(content.toString()))
  )
})

let i = 0

export default function buildProxyIcons(
  content,
  { name: routeName, component }
) {
  i += 1

  const relPath = path.relative(options.srcDir, component)
  const { name } = getRouteInfo(routeName)
  const importPath =
    options.importFrom === 'local'
      ? `~/${relPath}`
      : `${options.name}/${relPath}`

  return proxyTemplatePromise.then((template) => {
    return {
      contents: template({
        rendererPath: require.resolve(path.join(options.renderer, 'Icon.vue')),
        buildId: i,
        file: component,
        layout: options.layout,
        name,
        importName: name.replace(/ /g, ''),
        relPath,
        importPath,
      }),
    }
  })
}
