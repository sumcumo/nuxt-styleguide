import * as path from 'path'

import options from '@sum.cumo/nuxt-styleguide-config'

import urlJoin from 'url-join'
import chalk from 'chalk'
import kebabCase from 'lodash.kebabcase'
import customRoutes from '@sum.cumo/nuxt-custom-route-folder'
import { LoaderOptionsPlugin } from 'webpack'
import extendVueLoaders from './extendVueLoaders'
import docGenCached from './vueDocGenCached'
import relPathToName from './relPathToName'
import toName from './toName'

function metaMapper(category) {
  const orderIndex = options.categoryOrder.indexOf(category)
  const order = orderIndex === -1 ? 100 : orderIndex

  return (relPath) => {
    return {
      name: relPathToName(relPath),
      category,
      nsg: true,
      order,
    }
  }
}

export default function NuxtStyleguide() {
  // eslint-disable-next-line no-console
  console.log(`  ${chalk.dim('nuxt:styleguide')} initiating`)
  const docsDir = path.resolve(options.srcDir, options.docsDir)

  this.options.env.nsgLayout = options.layout

  extendVueLoaders(this)

  this.extendBuild((config) => {
    config.plugins.push(
      new LoaderOptionsPlugin({
        options: {
          vueMarkdownComponentLoader: {
            layout: options.layout,
            components: this.options.markdownComponents,
            marked: this.options.marked,
            wrapper: require.resolve(path.join(options.renderer, 'doc.vue')),
          },
        },
      })
    )
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
  })

  const done = Promise.all([
    createRoutes({
      glob: `${docsDir}/**/*.+(md|vue)`,
      priority: 1,
      mapRoutePath(p) {
        return urlJoin(options.path, p.replace(/^\/docs/, ''))
      },
      mapImport(p) {
        return `${path.join('@sum.cumo', 'vue-markdown-component-loader')}!${p}`
      },
      mapMeta: metaMapper('Docs'),
    }),
    createRoutes({
      glob: `${rendererPagesDir}/**/*.vue`,
      srcDir: rendererPagesDir,
      mapMeta(p) {
        const tokens = p.split('/').map(kebabCase)

        if (tokens.length === 1) {
          return metaMapper('$$root')(tokens[0])
        }

        return metaMapper(toName(tokens.slice(0, tokens.length - 1).join('-')))(
          tokens[tokens.length - 1]
        )
      },
      mapRoutePath(p) {
        return urlJoin(options.path, p)
      },
    }),
    createRoutes({
      glob: `${path.join(options.srcDir, 'components')}/**/*.vue`,
      async mapMeta(_, component) {
        return metaMapper('Components')(
          (await docGenCached(component)).displayName
        )
      },
      mapImport(p) {
        return `!${path.join(
          '@sum.cumo',
          'nuxt-styleguide',
          'lib',
          'loaders',
          'component-loader.js'
        )}!${p}`
      },
      async filter(component) {
        try {
          await docGenCached(component)
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
      mapImport(p) {
        return `!${path.join(
          '@sum.cumo',
          'nuxt-styleguide',
          'lib',
          'loaders',
          'component-loader.js'
        )}!${p}`
      },
      mapMeta: metaMapper('Layouts'),
      mapRoutePath(p) {
        return urlJoin(options.path, p)
      },
    }),
    createRoutes({
      glob: `${path.resolve(
        options.srcDir,
        options.designTokenName
      )}/**/*.+(scss|sass)`,
      mapImport(p) {
        return `!${path.join(
          '@sum.cumo',
          'nuxt-styleguide',
          'lib',
          'loaders',
          'design-token-loader.js'
        )}!${p}`
      },
      mapMeta: metaMapper('Design Tokens'),
      mapRoutePath(p) {
        return urlJoin(options.path, p)
      },
    }),
    createRoutes({
      glob: `${path.resolve(options.srcDir, options.iconFolder)}/**/*.svg`,
      mapMeta: metaMapper('Icons'),
      mapImport(p) {
        return `!${path.join(
          '@sum.cumo',
          'nuxt-styleguide',
          'lib',
          'loaders',
          'icon-loader.js'
        )}!${p}`
      },
      mapRoutePath(p) {
        return urlJoin(options.path, p)
      },
    }),
  ]).then(() => {
    // eslint-disable-next-line no-console
    console.log(`  ${chalk.dim('nuxt:styleguide')} ${chalk.green('OK')}`)
  })

  if (!this.nuxt.options.dev) {
    return done
  }
}
