import * as fs from 'fs'
import * as path from 'path'
import _template from 'lodash.template'
import options from '@sum.cumo/nuxt-styleguide-config'
import postcss from 'postcss'
import syntax from 'postcss-scss'
import doctrine from 'doctrine'
import applyMarkdownToDocs from './applyMarkdownToDocs'
import getRouteInfo from './getRouteInfo'

const styleguideSrcDir = path.resolve(__dirname, '..', 'src')

const proxyTemplatePromise = new Promise((resolve, reject) => {
  fs.readFile(
    path.resolve(styleguideSrcDir, 'proxyComponent', 'proxyDesignTokens.tjs'),
    (err, content) =>
      err ? reject(err) : resolve(_template(content.toString()))
  )
})

let i = 0

function getGlobalComment(ast) {
  if (ast.nodes.length < 2) {
    return {}
  }

  if (
    ast.nodes[0].type === 'comment' &&
    (ast.nodes[1].raws.before.split('\n').length >= 3 ||
      ast.nodes[1].type === 'comment')
  ) {
    return applyMarkdownToDocs(
      doctrine.parse(`${ast.nodes[0].text}`, { unwrap: true })
    )
  }

  return {}
}

const allowedTypes = ['comment', 'decl']
function validate(ast, file) {
  ast.nodes.forEach((node) => {
    if (node.type === 'atrule' && node.name === 'import') {
      return
    }

    if (allowedTypes.indexOf(node.type) === -1) {
      throw new Error(
        `Unexpected ${node.type} in ./${path.relative(process.cwd(), file)}:${
          node.source.start.line
        }:${node.source.start.column}`
      )
    }
  })
}

function getRenderFromTags(tags) {
  return tags.render && tags.render.length && tags.render[0].description
}

function getRestTags(tags) {
  const rest = { ...tags }
  delete rest.render

  return rest
}

function getDecoratedDeclarations(ast, globalComment) {
  const defaultRenderer =
    getRenderFromTags(globalComment.tags || {}) || 'default'

  return ast.nodes.reduce((memo, node, ii) => {
    if (node.type !== 'decl') {
      return memo
    }

    const nodeData = {
      name: node.prop,
      value: node.value,
      render: defaultRenderer,
      tags: {},
      description: '',
    }

    if (
      ast.nodes[ii - 1] &&
      ast.nodes[ii - 1].type === 'comment' &&
      node.raws.before.split('\n').length === 2
    ) {
      const docs = applyMarkdownToDocs(
        doctrine.parse(`${ast.nodes[ii - 1].text}`, { unwrap: true })
      )

      memo.push({
        ...nodeData,
        render: getRenderFromTags(docs.tags || {}) || nodeData.render,
        tags: getRestTags(docs.tags),
        description: docs.description,
      })
    } else {
      memo.push(nodeData)
    }

    return memo
  }, [])
}

function getInfo(content, file) {
  const ast = postcss.parse(content, { syntax })
  validate(ast, file)

  const globalComment = getGlobalComment(ast)

  return {
    description: globalComment.description || '',
    tags: getRestTags(globalComment.tags),
    declarations: getDecoratedDeclarations(ast, globalComment),
  }
}

export default function buildProxyDesignTokens(
  content,
  { name: routeName, component }
) {
  i += 1

  const relPath = path.relative(options.srcDir, component)
  const { name } = getRouteInfo(routeName)
  const importPath =
    options.importFrom === 'local'
      ? `~/${relPath}`
      : `${options.name}/${relPath}`

  return proxyTemplatePromise.then((template) => {
    return {
      contents: template({
        rendererPath: require.resolve(
          path.join(options.renderer, 'designTokens.vue')
        ),
        designTokens: JSON.stringify(getInfo(content, component)),
        buildId: i,
        layout: options.layout,
        name,
        importName: name.replace(/ /g, ''),
        importPath,
      }),
    }
  })
}
