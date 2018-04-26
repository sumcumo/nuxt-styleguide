# Configuration

You can pass options to the module like this:

```js
// nuxt.config.js
module.exports = {
  // other nuxt options
  modules: [
    // other modules
    [
      '@sum.cumo/nuxt-styleguide',
      {
        // options here
      },
    ],
  ],
}
```

## `path: '<customEntry>'`

default: `'/'`

The entry route of the styleguide.

The default value `'/'` overwrites all other nuxt routes and therefore
is considered as the "standalone" mode.

If this is changed to something like `/styleguide`, then the
default pages of the embedding nuxt application will still work
and the styleguide entry is a sub-route of the nuxt application.

## `importFrom: 'package|local'`

default: `'package'`

This option only changes how the documentation is rendered. It does not actually
change how things are technically imported.

* local:
  This is useful when the styleguide is used in embedded mode.
  import paths in component and design token documentations
  are displayed relative to the project root so that they can be copy-pasted
  in other vue files of the project.

* package:
  When the component library is consumed as an npm package, the import paths
  should include the package name. This will use the [`name` option](#name-styleguidename).

## `docsDir: <dirName>`

default value: `'docs'`

The directory that includes [documentation files](~/docs/writing-documentation).

## `renderer: '<rendererModule>'`

default value: `'@sum.cumo/nuxt-styleguide-renderer-default'`

The renderer for the styleguide.

Check out the <repo-link file="packages/nuxt-styleguide-renderer-default">documentation and implementation of the
default renderer</repo-link> to learn how to write a custom renderer.

## `styleguideData: {<data>}`

default value: `{}`

Additional data to pass to the styleguide renderer.

## `name: '<styleguideName>'`

default value: "name" from package.json

The name might be used by the <repo-link file="packages/nuxt-styleguide-renderer-default">styleguide renderer</repo-link>.

## `description: '<styleguideDescription>'`

default value: "description" from package.json

The description might be used by the <repo-link file="packages/nuxt-styleguide-renderer-default">styleguide renderer</repo-link>.

## `homepage: '<styleguideHomepage>'`

default value: "homepage" from package.json

The homepage might be used by the <repo-link file="packages/nuxt-styleguide-renderer-default">styleguide renderer</repo-link>.

## `designTokenName: '<customName>'`

default: `'design-tokens'`

This changes the folder name where nuxt-styleguide will search
for design tokens. And also the url parameter under which they are rendered.

## `iconRoute: '<customRoute>'`

default: `'icons'`

The route under which icons are being displayed.

## `iconFolder: '<customFolder>'`

default: `'icons'`

The folder in which icons in form of `.svg` files are searched.
