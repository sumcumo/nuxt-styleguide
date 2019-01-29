import relPathToName from '../src/relPathToName'

describe('relPathToName', () => {
  it('returns the capitalized name for a relative path', async () => {
    expect(relPathToName('test/things/now')).toEqual('Now')
  })
})
