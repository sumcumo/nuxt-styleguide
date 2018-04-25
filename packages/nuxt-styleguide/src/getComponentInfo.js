import chalk from 'chalk'
import applyMarkdownToDocs from './applyMarkdownToDocs'
import vueDocGenCached from './vueDocGenCached'

function applyMarkdown(data) {
  return {
    ...applyMarkdownToDocs(data),
    ...['events', 'props', 'slots'].reduce((memo1, type) => {
      // eslint-disable-next-line no-param-reassign
      memo1[type] = Object.keys(data[type] || {}).reduce((memo, key) => {
        // eslint-disable-next-line no-param-reassign
        memo[key] = applyMarkdownToDocs(data[type][key])

        return memo
      }, {})

      return memo1
    }, {}),
    methods: (data.methods || []).reduce((memo, methodDesc) => {
      const withMd = applyMarkdownToDocs(methodDesc)

      delete withMd.modifiers
      delete withMd.name

      // eslint-disable-next-line no-param-reassign
      memo[methodDesc.name] = withMd

      return memo
    }, {}),
  }
}

export default async function getComponentInfo(file, relPath, log) {
  try {
    return applyMarkdown(await vueDocGenCached(file))
  } catch (e) {
    if (log) {
      if (e.message.indexOf('SyntaxError: unknown: Unexpected token') === 0) {
        // eslint-disable-next-line no-console
        console.warn(
          `${chalk.dim('  nuxt:styleguide')} ${chalk.yellow(
            'WARNING'
          )}(${chalk.dim(
            relPath
          )}):\n    Could not generate docs. Ensure <script> tag is present.`
        )
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          `${chalk.dim('  nuxt:styleguide')} ${chalk.yellow(
            'WARNING'
          )}(${chalk.dim(relPath)}):\n    ${e.message}`
        )
      }
    }

    return {}
  }
}
