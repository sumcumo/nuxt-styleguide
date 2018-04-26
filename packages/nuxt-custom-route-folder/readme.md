# @sum.cumo/nuxt-custom-route-folder

Module to automatically add nuxt routes for specified files in the nuxt project.

## install

`npm install @sum.cumo/nuxt-custom-route-folder`

## use within another nuxt module

```js
import createCustomRoutes from '@sum.cumo/nuxt-custom-route-folder'

export default function MyModule() {
  return createCustomRoutes({
    nuxt: this.nuxt,
    glob: 'myCustomFolder/**/*.vue',
  })
}
```

Given we have a component `myCustomFolder/foo.vue`, it will be added as a
`myCustomFolder/foo` route to nuxt routes.

## configuration

### `nuxt`

When used as a library in another nuxt module, this needs to be the current
instance of nuxt

### `glob`

A [`minimatch`](https://www.npmjs.com/package/minimatch) pattern specifying
all files that should create a new route.

### `transform(contents, route)`

A transformer function that can be used to manipulate or wrap the contents
of a file found by the `glob`.

Its recommended to prefer custom webpack loaders over this config

```js
import createCustomRoutes from '@sum.cumo/nuxt-custom-route-folder'

export default function MyModule() {
  return createCustomRoutes({
    nuxt: this.nuxt,
    glob: 'markdown/**/*.md',
    transform(content) {
      return someMarkdownToVueMagic(content)
    },
  })
}
```

### `transformExt`

default: `'js'`

Specify the file extension with which the result of the `transform` is being
stored. This is especially relevant to control which webpack loaders are
applied to the transformed file.

### `priority`

default: `0`

When the module is used for different custom folders and multiple routes are
created using the same path, the one with a higher priority will take precedence
over the one with a lower priority.

### `mapRouteName(basePath, component)`

Customize the name that is created for each generated route.

### `mapRoutePath(path)`

Customize the path of each generated route.

This can be useful when using a different path then the folder name or
for prefixing.

### `filter(component)`

Can be used to additionally blacklist components.

Prefer using a more specific `glob` over this.

### `srcDir`

default: `srcDir` from `nuxt.options`

the source directory of the nuxt application, use as a base for the given
`glob`.

### `watch`

default: `dev` from `nuxt.options`

whether or not future file changes should cause a rebuild of the routes.
