import * as fs from 'fs'
import * as path from 'path'
import _template from 'lodash.template'
import options from '@sum.cumo/nuxt-styleguide-config'
import getComponentInfo from './getComponentInfo'
import getRouteInfo from './getRouteInfo'

const styleguideSrcDir = path.resolve(__dirname, '..', 'src')

const proxyTemplatePromise = new Promise((resolve, reject) => {
  fs.readFile(
    path.resolve(styleguideSrcDir, 'proxyComponent', 'proxyComponent.tjs'),
    (err, content) =>
      err ? reject(err) : resolve(_template(content.toString()))
  )
})

let i = 0

export default async function buildProxyComponent(
  contents,
  { name: routeName, component }
) {
  i += 1

  const relPath = path.relative(options.srcDir, component)
  const { name } = getRouteInfo(routeName)
  const importPath =
    options.importFrom === 'local'
      ? `~/${relPath}`
      : `${options.name}/${relPath}`
  const componentInfo = await getComponentInfo(component, relPath, options.dev)

  return proxyTemplatePromise.then((template) => {
    return {
      contents: template({
        rendererPath: require.resolve(
          path.join(options.renderer, 'component.vue')
        ),
        normalizeStatesPath: path.resolve(
          styleguideSrcDir,
          'proxyComponent',
          'normalizeStates.js'
        ),
        componentInfo: JSON.stringify(componentInfo),
        buildId: i,
        layout: options.layout,
        name,
        relPath,
        importPath,
      }),
    }
  })
}
