// console.log(require.resolve('nuxt-styleguide'));

const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  srcDir: __dirname,
  modules: [
    [
      'nuxt-styleguide',
      { extends: [path.resolve(__dirname, 'subStyleguide')] },
    ],
  ],
};