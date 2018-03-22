// console.log(require.resolve('nuxt-styleguide'));

const path = require('path');
const pkg = require('./package.json');

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  srcDir: __dirname,
  modules: [
    [
      '@sum.cumo/nuxt-markdown-component-loader',
      { loader: { exclude: path.resolve(__dirname, 'docs') } },
    ],
    [
      '@sum.cumo/nuxt-styleguide',
      {
        name: pkg.name,
        extends: [path.resolve(__dirname, 'subStyleguide')],
      },
    ],
  ],
};
