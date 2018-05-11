# Working with design tokens

Design tokens are one of the most atomic building blocks of an interface
and therefore its crucial that designers, design ops and developers have
a common understanding and language when speaking about them.

## Best practices

1.  Design tokens must be atomic
2.  Therefore Not every sass variable is a design token.

## Creating design tokens

Each `sass` or `scss` file in the projects `design-tokens` folder gets a
entry in the styleguide navigation.

Have a look at the [color design tokens of this demo](~/design-tokens/colors)
for example.

## Documentation

Design token files can be documented inline using docBlock comments.

A special `render` tag is used to specify how the value of the variable
should be used. The Design Token is than parsen by the [Design Token Component](https://github.com/sumcumo/nuxt-styleguide/blob/master/packages/nuxt-styleguide-renderer-default/designTokens.vue)
and directed to the selected render type.

```
/**
 * This is generic documentation for the whole file
 * @render global-custom-renderer
 */

/**
 * Token specific doc
 * @render default
 */
$myVar: fuchsia;
```
