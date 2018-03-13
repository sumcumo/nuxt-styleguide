import marked from 'marked';

function tryInline(desc) {
  if (typeof desc !== 'string') {
    return desc;
  }

  if (desc.split('\n').length > 1) {
    return marked(desc);
  }

  return marked.inlineLexer(desc.trim(), []);
}

function getNormalizedTags(data) {
  if (Array.isArray(data.tags)) {
    return data.tags.reduce((memo, tag) => {
      if (!memo[tag.title]) {
        memo[tag.title] = [];
      }

      memo[tag.title].push({
        ...tag,
      });

      return memo;
    }, {});
  }

  return data.tags || {};
}

export default function applyMarkdownToDocs(data) {
  const tags = getNormalizedTags(data);

  const retVal = {
    ...data,
    description: marked(data.description),
    tags: Object.keys(tags).reduce((memo, key) => {
      memo[key] = tags[key].map((tag) => {
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
