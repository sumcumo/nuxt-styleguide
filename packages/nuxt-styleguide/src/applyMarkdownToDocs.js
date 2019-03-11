import marked from 'marked'

export function tryInline(desc) {
  if (typeof desc !== 'string') {
    return desc
  }

  if (desc.split('\n').length > 1) {
    return marked(desc)
  }

  return marked.inlineLexer(desc.trim(), [])
}

export function getNormalizedTags(data) {
  if (Array.isArray(data.tags)) {
    return data.tags.reduce((memo, tag) => {
      if (!memo[tag.title]) {
        // eslint-disable-next-line no-param-reassign
        memo[tag.title] = []
      }

      memo[tag.title].push({
        ...tag,
      })
      return memo
    }, {})
  }

  return data.tags || {}
}

export default function applyMarkdownToDocs(data) {
  const tags = getNormalizedTags(data)
  const retVal = {
    ...data,
    description: data.description ? marked(data.description) : null,
    tags: Object.keys(tags).reduce((memo, key) => {
      // eslint-disable-next-line no-param-reassign
      memo[key] = tags[key].map((tag) => ({
        ...tag,
        description: tryInline(tag.description),
      }))
      return memo
    }, {}),
  }

  if (retVal.type && retVal.type.names) {
    retVal.type.name = retVal.type.names.join('|')
    delete retVal.type.names
  }

  if (retVal.type && retVal.type.name) {
    retVal.type.name = retVal.type.name.split('|').join(' | ')
  }

  delete retVal.comment
  return retVal
}
