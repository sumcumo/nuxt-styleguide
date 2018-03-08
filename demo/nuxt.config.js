// console.log(require.resolve('nuxt-styleguide'));

const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  srcDir: __dirname,
  modules: [
    [
      '@sum.cumo/nuxt-styleguide',
      {
        name: '@sum.cumo/nuxt-styleguide-demo-library',
        private: false,
        extends: [path.resolve(__dirname, 'subStyleguide')],
      },
    ],
  ],
};
