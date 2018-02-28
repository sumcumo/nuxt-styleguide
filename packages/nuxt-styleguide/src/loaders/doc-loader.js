const marked = require('marked');

module.exports = function(source, map) {
  try {
    this.callback(
      null,
      `
      module.exports = function(Component) {
        if (!Component.options.__styleguide) {
          Component.options.__styleguide = {};
        }
        Component.options.__styleguide.docs = ${JSON.stringify(marked(source))}
      }`,
      map
    );
  } catch (e) {
    this.callback(e);
  }
};
