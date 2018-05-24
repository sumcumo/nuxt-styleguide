import { transform } from 'babel-core'

async function load(source, inputSourceMap) {
  const { code } = await transform(source, {
    presets: [
      [
        'env',
        {
          targets: {
            esmodules: false,
          },
        },
      ],
    ],
    plugins: ['transform-object-rest-spread'],
    inputSourceMap,
  })

  return `
    const states = {};

    (function(exports) {
      ${code}
    })(states)

    module.exports = function(Component) {
      if (!Component.options.__styleguide) {
        Component.options.__styleguide = {};
      }
      Component.options.__styleguide.states = states.default;
    }`
}

module.exports = function statesLoader(source, map) {
  const callback = this.async()

  load(source, map)
    .then((result) => {
      return callback(null, result, map)
    })
    .catch(callback)
}
