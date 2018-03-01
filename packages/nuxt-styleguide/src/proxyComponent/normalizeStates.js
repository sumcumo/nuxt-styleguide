function getDefault(type) {
  switch (type) {
    case String:
      return 'Hello World';
    case Number:
      return 42;
    case Boolean:
      return true;
    case Function:
      return () => {};
    case Object:
      return {};
    case Array:
      return [];
    case Symbol:
      return Symbol('Hello World');
  }
}

export default function normalizeStates(states, props) {
  if (!states || !states.length) {
    function defaultProps(props) {
      if (!props || Array.isArray(props)) {
        return {};
      }

      return Object.keys(props).reduce((memo, propName) => {
        const def = props[propName];

        if (def.default) {
          memo[propName] = def.default;
        } else if (def.type && def.required) {
          memo[propName] = getDefault(def.type);
        }

        return memo;
      }, {});
    }

    return [
      {
        title: 'Default',
        props: defaultProps(props),
        slots: { default: 'Hello World' },
      },
    ];
  }

  return states;
}
