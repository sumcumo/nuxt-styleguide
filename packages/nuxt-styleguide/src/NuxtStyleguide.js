import * as path from 'path'

import options from '@sum.cumo/nuxt-styleguide-config'
import kebabCase from 'lodash.kebabcase'
import urlJoin from 'url-join'
import chalk from 'chalk'
import customRoutes from '@sum.cumo/nuxt-custom-route-folder'
import extendVueLoaders from './extendVueLoaders'
import buildProxyComponents from './buildProxyComponents'
import buildProxyDesignTokens from './buildProxyDesignTokens'
import buildProxyIcons from './buildProxyIcons'
import vueDocGenCached from './vueDocGenCached'

function toName(str) {
  return kebabCase(str)
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

function encode(str) {
  if (global.btoa) {
    return global.btoa(str)
  }

  return Buffer.from(str).toString('base64')
}

function routeNameMapper(category) {
  return (relPath) => {
    const tokens = relPath.split('/')

    const name = toName(tokens[tokens.length - 1])

    return `NSG:${encode(JSON.stringify({ name, category }))}:`
  }
}

export default function NuxtStyleguide() {
  // eslint-disable-next-line no-console
  console.log(`  ${chalk.dim('nuxt:styleguide')} initiating`)
  const docsDir = path.resolve(options.srcDir, options.docsDir)

  this.options.env.nsgLayout = options.layout

  extendVueLoaders(this)

  this.extendBuild((config) => {
    config.module.rules.push({
      test: /\.md?$/,
      loader: '@sum.cumo/vue-markdown-component-loader',
      include: docsDir,
      options: {
        layout: options.layout,
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
        layout: options.layout,
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

  const createRoutes = customRoutes.withOptions({
    nuxt: this.nuxt,
    extendRoutes: this.extendRoutes.bind(this),
  })

  return Promise.all([
    createRoutes({
      glob: `${docsDir}/**/*.+(md|vue)`,
      priority: 1,
      mapRoutePath(p) {
        return urlJoin(options.path, p.replace(/^\/docs/, ''))
      },
      mapRouteName: routeNameMapper('Docs'),
    }),
    createRoutes({
      glob: `${rendererPagesDir}/**/*.vue`,
      srcDir: rendererPagesDir,
      mapRouteName(p) {
        const tokens = p.split('/').map(kebabCase)

        if (tokens.length === 1) {
          return routeNameMapper('$$root')(tokens[0])
        }

        return routeNameMapper(
          toName(tokens.slice(0, tokens.length - 1).join('-'))
        )(tokens[tokens.length - 1])
      },
      mapRoutePath(p) {
        return urlJoin(options.path, p)
      },
    }),
    createRoutes({
      glob: `${path.join(options.srcDir, 'components')}/**/*.vue`,
      transform: buildProxyComponents,
      async mapRouteName(_, component) {
        return routeNameMapper('Components')(
          (await vueDocGenCached(component)).displayName
        )
      },
      async filter(component) {
        try {
          await vueDocGenCached(component)
          return true
        } catch (err) {
          return false
        }
      },
      mapRoutePath(p) {
        return urlJoin(options.path, p)
      },
    }),
    createRoutes({
      glob: `${path.join(options.srcDir, 'layouts')}/**/*.vue`,
      transform: buildProxyComponents,
      mapRouteName: routeNameMapper('Layouts'),
      mapRoutePath(p) {
        return urlJoin(options.path, p)
      },
    }),
    createRoutes({
      glob: `${path.resolve(
        options.srcDir,
        options.designTokenName
      )}/**/*.+(scss|sass)`,
      transform: buildProxyDesignTokens,
      mapRouteName: routeNameMapper('Design Tokens'),
      mapRoutePath(p) {
        return urlJoin(options.path, p)
      },
    }),
    createRoutes({
      glob: `${path.resolve(options.srcDir, options.iconFolder)}/**/*.svg`,
      transform: buildProxyIcons,
      mapRouteName: routeNameMapper('Icons'),
      mapRoutePath(p) {
        return urlJoin(options.path, p)
      },
    }),
  ]).then(() => {
    // eslint-disable-next-line no-console
    console.log(`  ${chalk.dim('nuxt:styleguide')} ${chalk.green('OK')}`)
  })
}
