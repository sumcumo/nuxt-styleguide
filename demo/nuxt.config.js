// console.log(require.resolve('nuxt-styleguide'));

const path = require('path')
const pkg = require('./package.json')

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  srcDir: __dirname,
  router: {
    base: process.env.ROUTER_BASE || '/',
  },
  modules: [
    [
      '@sum.cumo/nuxt-markdown-component-loader',
      { loader: { exclude: path.resolve(__dirname, 'docs') } },
    ],
    [
      '@sum.cumo/nuxt-styleguide',
      {
        styleguideData: {
          repositoryHomepage:
            'https://github.com/sumcumo/nuxt-styleguide/blob/master',
        },
        name: pkg.name,
      },
    ],
  ],
  markdownComponents: {
    'meta-warning': '~/components/MetaWarning',
    'missing-doc': '~/components/MissingDoc',
    'sg-highlight': '~/components/Highlight',
    'repo-link': '~/components/RepoLink',
    h2: {
      path: '~/components/Headline',
      props($el) {
        return {
          level: 2,
          anchor: $el
            .text()
            .replace(/\W+/g, '-')
            .toLowerCase()
            .replace(/^-/, '')
            .replace(/-$/, ''),
        }
      },
    },
    a: '~/components/A',
  },
}
