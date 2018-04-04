function getDefault(type, name) {
  switch (type) {
    case 'string':
      return `prop: ${name}`
    case 'number':
      return name.length
    case 'boolean':
      return name.length % 2 === 0
    case 'func':
      return () => {
        // eslint-disable-next-line no-console
        console.log(`hello from prop: ${name}`)
      }
    case 'object':
      return { [name]: true }
    case 'array':
      return [name]
    case 'symbol':
      return Symbol(`prop: ${name}`)
    default:
      throw new Error(`Unexpected type ${type}`)
  }
}

function defaultProps(props) {
  if (!props) {
    return {}
  }

  return Object.keys(props).reduce((memo, propName) => {
    const def = props[propName]

    if (!def.defaultValue && def.type && def.required) {
      // eslint-disable-next-line no-param-reassign
      memo[propName] = getDefault(def.type.name, propName)
    }

    return memo
  }, {})
}

export default function normalizeStates(states, props, slots) {
  if (!states || !states.length) {
    return [
      {
        title: 'Default',
        props: defaultProps(props),
        slots: Object.keys(slots || {}).reduce((memo, name) => {
          // eslint-disable-next-line no-param-reassign
          memo[name] = `slot: ${name}`

          return memo
        }, {}),
      },
    ]
  }

  return states
}
