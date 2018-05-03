function normalize(states) {
  if (!states) {
    return []
  }

  if (!Array.isArray(states)) {
    return [states]
  }

  return states
}

module.exports = function statesLoader(source, map) {
  try {
    this.callback(
      null,
      `
      const states = ${source};
      module.exports = function(Component) {
        if (!Component.options.__styleguide) {
          Component.options.__styleguide = {};
        }
        Component.options.__styleguide.states = states
      }`,
      map
    )
  } catch (e) {
    this.callback(e)
  }
}
