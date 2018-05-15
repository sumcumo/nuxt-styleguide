import { extname, basename } from 'path'
import toName from './toName'

export default function relPathToName(relPath) {
  const tokens = basename(relPath, extname(relPath)).split('/')

  return toName(tokens[tokens.length - 1])
}
