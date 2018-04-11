import * as path from 'path'
import * as fs from 'fs'
import options from '@sum.cumo/nuxt-styleguide-config'
import kebabCase from 'lodash.kebabcase'
import { parse } from 'vue-docgen-api'
import urlJoin from 'url-join'
import extendVueLoaders from './extendVueLoaders'
import buildProxyComponents from './buildProxyComponents'
import buildProxyDesignTokens from './buildProxyDesignTokens'
import buildProxyIcons from './buildProxyIcons'
import customRoutes from '@sum.cumo/nuxt-custom-route-folder'

const tmpDir = path.resolve(__dirname, '..', '.tmp')
try {
  fs.mkdirSync(tmpDir)
} catch (e) {
  /* noop */
}

function routeNameMapper(category) {
  return (relPath) => {
    const tokens = relPath.split('/')

    const name = kebabCase(tokens[tokens.length - 1])
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ')

    return `NSG:${JSON.stringify({ name, category })}`
  }
}

export default function NuxtStyleguide() {
  const docsDir = path.resolve(options.srcDir, options.docsDir)

  extendVueLoaders(this)

  this.extendBuild((config) => {
    config.module.rules.push({
      test: /\.md?$/,
      loader: '@sum.cumo/vue-markdown-component-loader',
      include: docsDir,
      options: {
        components: this.options.markdownComponents,
        marked: this.options.marked,
        wrapper: require.resolve(path.join(options.renderer, 'doc.vue')),
      },
    })
  })

  const basePath = `${this.nuxt.options.router.base.replace(/\/$/, '')}/`

  this.addPlugin({
    src: path.resolve(__dirname, 'styleguideProvider.js'),
    options: {
      data: JSON.stringify({
        name: options.name,
        version: options.version,
        description: options.description,
        homepage: options.homepage,
        basePath,
        path: `${urlJoin(basePath, options.path).replace(/\/$/, '')}`,
        ...(options.styleguideData || {}),
      }),
    },
  })

  const rendererPagesDir = path.join(
    path.dirname(require.resolve(path.join(options.renderer, 'component.vue'))),
    'pages'
  )

  return Promise.all([
    customRoutes({
      nuxt: this.nuxt,
      glob: `${docsDir}/**/*.+(md|vue)`,
      priority: 1,
      mapRoutePath(p) {
        return p.replace(/^\/docs/, '')
      },
      mapRouteName: routeNameMapper('Docs'),
    }),
    customRoutes({
      nuxt: this.nuxt,
      glob: `${rendererPagesDir}/**/*.vue`,
      srcDir: rendererPagesDir,
    }),
    customRoutes({
      nuxt: this.nuxt,
      glob: `${path.join(options.srcDir, 'components')}/**/*.vue`,
      transform: buildProxyComponents,
      mapRouteName(_, component) {
        return routeNameMapper('Components')(parse(component).displayName)
      },
      filter(component) {
        try {
          parse(component)
          return true
        } catch (err) {
          return false
        }
      },
    }),
    customRoutes({
      nuxt: this.nuxt,
      glob: `${path.resolve(
        options.srcDir,
        options.designTokenName
      )}/**/*.+(scss|sass)`,
      transform: buildProxyDesignTokens,
      mapRouteName: routeNameMapper('Design Tokens'),
    }),
    customRoutes({
      nuxt: this.nuxt,
      glob: `${path.resolve(options.srcDir, options.iconFolder)}/**/*.svg`,
      transform: buildProxyIcons,
      mapRouteName: routeNameMapper('Icons'),
    }),
  ])
}
