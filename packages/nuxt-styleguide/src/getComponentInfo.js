import { parse } from 'vue-docgen-api';
import applyMarkdownToDocs from './applyMarkdownToDocs';
import chalk from 'chalk';

function applyMarkdown(data) {
  return {
    ...applyMarkdownToDocs(data),
    ...['events', 'props', 'slots'].reduce((memo1, type) => {
      memo1[type] = Object.keys(data[type] || {}).reduce((memo, key) => {
        memo[key] = applyMarkdownToDocs(data[type][key]);

        return memo;
      }, {});

      return memo1;
    }, {}),
    methods: (data.methods || []).reduce((memo, methodDesc) => {
      const withMd = applyMarkdownToDocs(methodDesc);

      delete withMd.modifiers;
      delete withMd.name;

      memo[methodDesc.name] = withMd;

      return memo;
    }, {}),
  };
}

export default function getComponentInfo(file, relPath, log) {
  try {
    return applyMarkdown(parse(file));
  } catch (e) {
    if (log) {
      if (e.message.indexOf('SyntaxError: unknown: Unexpected token') === 0) {
        console.warn(
          `${chalk.dim('  nuxt:styleguide')} ${chalk.yellow(
            'WARNING'
          )}(${chalk.dim(
            relPath
          )}):\n    Could not generate docs. Ensure <script> tag is present.`
        );
      } else {
        console.warn(
          `${chalk.dim('  nuxt:styleguide')} ${chalk.yellow(
            'WARNING'
          )}(${chalk.dim(relPath)}):\n    ${e.message}`
        );
      }
    }

    return {};
  }
}
