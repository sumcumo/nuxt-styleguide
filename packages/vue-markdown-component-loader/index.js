const markdownIt = require('markdown-it')
const loaderUtils = require('loader-utils')
const cheerio = require('cheerio')
const compiler = require('vue-template-compiler')
const hljs = require('highlight.js')

const COMPONENT_PREFIX = 'vmc-custom-'

function toFn(code) {
  return `function () {
    const _v = this._v.bind(this);
    const _c = this._c.bind(this);
    const _m = this._m.bind(this);
    ${code
      .trim()
      .replace(/^with\(this\)\{/, '')
      .replace(/\}$/, '')};
  }`
}

function stringifyProps(props) {
  return Object.keys(props).reduce((memo, k) => {
    // eslint-disable-next-line no-param-reassign
    memo[k] = props[k].toString()

    return memo
  }, {})
}

function normalizeComponent(rawComp) {
  const comp = {}
  if (typeof rawComp === 'string') {
    comp.path = rawComp
    comp.props = {}
  } else {
    comp.path = rawComp.path
    comp.props = rawComp.props
  }

  return comp
}

function getWrapper(wrapper) {
  if (!wrapper) {
    return {
      element: 'div',
    }
  }

  const comp = normalizeComponent(wrapper)
  const importName = 'WrapperComponent'
  const name = `${COMPONENT_PREFIX}wrapper`

  return {
    element: name,
    component: Object.assign(comp, {
      importName,
      name,
    }),
  }
}

module.exports = function componentLoader(markdown) {
  const options = Object.assign(
    {},
    this.options.vueMarkdownComponentLoader || {},
    loaderUtils.getOptions(this)
  )

  this.cacheable()

  const md = markdownIt(
    options.renderer || {
      html: true,
      highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (_) {
            /* noop */
          }
        }

        return ''
      },
    }
  )

  const html = md.render(markdown)
  const $ = cheerio.load(html)

  const components = Object.keys(options.components || {}).map(
    (componentName, i) => {
      const comp = normalizeComponent(options.components[componentName])
      const proxyName = `${COMPONENT_PREFIX}cmp-${componentName}`

      $(componentName).each((_, el) => {
        const props =
          typeof comp.props === 'function' ? comp.props($(el)) : comp.props
        // eslint-disable-next-line no-param-reassign
        el.name = proxyName
        Object.assign(el.attribs, stringifyProps(props), el.attribs)
      })

      return Object.assign({
        importName: `CustomComp${i}`,
        name: proxyName,
        path: comp.path,
      })
    }
  )

  const wrapper = getWrapper(options.wrapper)

  if (wrapper.component) {
    components.push(wrapper.component)
  }

  const compiled = compiler.compile(
    `<${wrapper.element}>${$('body').html()}</${wrapper.element}>`
  )

  if (compiled.errors.length) {
    throw new Error(
      `Failed to convert markdown to vue component:\n${compiled.errors}`
    )
  }

  const component = `
  ${components
    .map((comp) => `import ${comp.importName} from '${comp.path}';`)
    .join('\n')}

  export default {
    layout: '${options.layout || 'default'}',
    components: {${components
      .map((comp) => `'${comp.name}': ${comp.importName}`)
      .join(',\n')}},
    staticRenderFns: [${compiled.staticRenderFns.map(toFn).join(',')}],
    render: ${toFn(compiled.render)}
  }
  `

  return component
}
