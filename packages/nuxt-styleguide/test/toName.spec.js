import toName from '../src/toName'

describe('toName', () => {
  it('returns a fancy string from a dashed string', async () => {
    expect(toName('fancy-component')).toBe('Fancy Component')
  })
  it('returns a fancy string from a kebabCase string', async () => {
    expect(toName('fancyComponent')).toBe('Fancy Component')
  })
  it('does not change an already fancy string', async () => {
    expect(toName('Fancy Component')).toBe('Fancy Component')
  })
  it('capitalizes a lowercase word', async () => {
    expect(toName('fancy')).toBe('Fancy')
  })
})
