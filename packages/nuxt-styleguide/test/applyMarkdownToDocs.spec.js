import applyMarkdownToDocs, {
  tryInline,
  getNormalizedTags,
} from '../src/applyMarkdownToDocs'

describe('applyMarkdownToDocs', () => {
  it('returns a headline', async () => {
    const generatedMarkdown = applyMarkdownToDocs({ description: '### hello' })
    expect(generatedMarkdown.description).toBe('<h3 id="hello">hello</h3>\n')
  })
  it('returns a paragraph', async () => {
    const generatedMarkdown = applyMarkdownToDocs({ description: 'hello' })
    expect(generatedMarkdown.description).toBe('<p>hello</p>\n')
  })
})
describe('tryInline', () => {
  it('returns value if it is not a string', async () => {
    expect(tryInline(['array'])).toEqual(['array'])
    expect(tryInline({ object: 'yes' })).toEqual({ object: 'yes' })
  })
  it('returns trimmed string line string', async () => {
    expect(tryInline('string')).toEqual('string')
    expect(tryInline(' stringWithSpaces ')).toEqual('stringWithSpaces')
  })
  it('returns multi-line string with markup', async () => {
    const solution = '<p>string\n new line\n third line</p>\n'
    expect(tryInline('string\n new line\n third line')).toEqual(solution)
  })
})
describe('getNormalizedTags', () => {
  it('returns empty object if no tags are present', async () => {
    expect(getNormalizedTags({ description: 'hello' })).toEqual({})
  })
  it('simply returns data.tags if it is a string', async () => {
    expect(getNormalizedTags({ description: 'hello', tags: 'h3' })).toEqual(
      'h3'
    )
  })
  it('returns a normalized array if data.tags is an array', async () => {
    expect(
      getNormalizedTags({
        description: 'hello',
        tags: [{ title: 'h3', text: 'some longer text in here' }],
      })
    ).toEqual({
      h3: [
        {
          text: 'some longer text in here',
          title: 'h3',
        },
      ],
    })
  })
})
