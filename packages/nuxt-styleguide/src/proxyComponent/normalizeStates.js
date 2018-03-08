function getDefault(type, name) {
  switch (type) {
    case 'string':
      return `prop: ${name}`;
    case 'number':
      return name.length;
    case 'boolean':
      return name.length % 2 == 0;
    case 'func':
      return () => {
        console.log(`hello from prop: ${name}`);
      };
    case 'object':
      return { [name]: true };
    case 'array':
      return [name];
    case 'symbol':
      return Symbol(`prop: ${name}`);
  }
}

export default function normalizeStates(states, props, slots) {
  if (!states || !states.length) {
    function defaultProps(props) {
      if (!props) {
        return {};
      }

      return Object.keys(props).reduce((memo, propName) => {
        const def = props[propName];

        if (!def.defaultValue && def.type && def.required) {
          memo[propName] = getDefault(def.type.name, propName);
        }

        return memo;
      }, {});
    }

    return [
      {
        title: 'Default',
        props: defaultProps(props),
        slots: Object.keys(slots || {}).reduce((memo, name) => {
          memo[name] = `slot: ${name}`;

          return memo;
        }, {}),
      },
    ];
  }

  return states;
}
