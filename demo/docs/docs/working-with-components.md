# Working with components

Components are a core building block of every application.
It is tremendously helpful for designers, developers and everything in-between
to have a common understanding of components and speak about them
in an ubiquitous language.

## Specification

1.  A component must be a `.vue` single file component.
2.  A component must be placed in the `~/components` folder.
3.  A component must have a name:
    ```vue
    <!-- … -->
    <script>
    export default {
      name: 'MyButton',
    }
    </script>
    ```

## Best practices

In order to be re-usable:

1.  A component should be as stateless as possible.
    Use props and events to leave state management to the application.
2.  A component should not have static content
    Use slots to leave handling of text resources to the application.
3.  A component should have a template:
    ```vue
    <template>
    <button><slot /></button>
    </template>
    <!-- … -->
    ```
4.  A component should be reusable and therefore used at least twice in a project.

## Documentation

Each component by the above [specification](#Specification) has a documentation
page under the `./components` route of the styleguide.

See the [components](~/components) of this documentation as an example.

A component can be documented using comments in the code as specified
by the [`vue-docgen-api`](https://github.com/vue-styleguidist/vue-docgen-api)
package.

### nsg-doc

Custom introduction text can be set using the `nsg-doc` element
in a component file:

```vue
<!-- … -->
<nsg-doc>
### MyButton is special, it’s the best special button there is.
</nsg-doc>
```

### nsg-states

The styleguide will do its best to render an appropriate demo
for each component. But the demos can be customized using the
`nsg-states` element in a component file.

```vue
<!-- … -->
<nsg-states>
export default [{
  name: 'Ghost Button',
  // https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
  data: {
    scopedSlots: {
      default() {
        return 'Buuuhuh'
      }
    },
    props: {
      transparent: true
    }
  }
}, {
  name: 'Default',
  // shorthand for data.scopedSlots.default
  content: 'Aaaaah!'
  // shorthand for data.props
  props: {
    transparent: false
  }
}]
</nsg-states>
```

### highlighting

If you use [vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
extension for vscode, you can enable highlighting for these blocks by
[following this guide about highlighting in vetur](https://github.com/vuejs/vetur/blob/master/docs/highlighting.md).

You will need to add these custom grammars:

```json
"vetur.grammar.customBlocks": {
  "nsg-doc": "md",
  "nsg-states": "js"
}
```
