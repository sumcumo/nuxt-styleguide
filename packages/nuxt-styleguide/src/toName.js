import kebabCase from 'lodash.kebabcase'

export default function toName(str) {
  return kebabCase(str)
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}
