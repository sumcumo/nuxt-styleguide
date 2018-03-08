import { parse } from 'vue-docgen-api';
import chalk from 'chalk';
import marked from 'marked';

function tryInline(desc) {
  if (desc.split('\n').length > 1) {
    return marked(desc);
  }

  return marked.inlineLexer(desc, []);
}

function applyMarkdownToTags(data) {
  const retVal = {
    ...data,
    description: tryInline(data.description),
    tags: Object.keys(data.tags || {}).reduce((memo, key) => {
      memo[key] = data.tags[key].map((tag) => {
        return {
          ...tag,
          description: tryInline(tag.description),
        };
      });

      return memo;
    }, {}),
  };

  if (retVal.type && retVal.type.names) {
    retVal.type.name = retVal.type.names.join('|');
    delete retVal.type.names;
  }

  if (retVal.type && retVal.type.name) {
    retVal.type.name = retVal.type.name.split('|').join(' | ');
  }

  delete retVal.comment;

  return retVal;
}

function applyMarkdown(data) {
  return {
    ...applyMarkdownToTags(data),
    ...['events', 'props', 'slots'].reduce((memo1, type) => {
      memo1[type] = Object.keys(data[type] || {}).reduce((memo, key) => {
        memo[key] = applyMarkdownToTags(data[type][key]);

        return memo;
      }, {});

      return memo1;
    }, {}),
    methods: (data.methods || []).reduce((memo, methodDesc) => {
      const withMd = applyMarkdownToTags(methodDesc);

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
