# Getting Started

Nuxt styleguide can be run in two modes: "standalone" and "embedded"

In this guide we will setup a new standalone nuxt styleguide.
To embedded the styleguide into an existing [`nuxt`](https://nuxtjs.org)
application. See [embedded styleguide section](#embedded-styleguide).

Please ensure you have [node.js](https://nodejs.org/en/) version 9 or higher
installed on your machine.

## Create a nuxt project

Please follow the [Installation guide of nuxt](https://nuxtjs.org/guide/installation#starting-from-scratch)

## Install nuxt-styleguide

`npm intall @sum.cumo/nuxt-styleguide --save-dev`

## Add as nuxt module

In your projects [`nuxt.config.js`](https://nuxtjs.org/guide/configuration)
add `'@sum.cumo/nuxt-styleguide'` to the `modules` array.

```js
// nuxt.config.js
module.exports = {
  // other options ...
  modules: [
    '@sum.cumo/nuxt-styleguide',
    // other modules ...
  ],
};
```

## Start developing

Depending on your [setup](#create-a-nuxt-project), `npm start`, `npm run dev` or
`$(npm bin)/nuxt` will start a development environment.

Now [`http://localhost:3000`](http://localhost:3000)

You can now add components by following the [guide on how to work with components](~/docs/working-with-components).

## Embedded Styleguide

The entry route of the styleguide is customizable using the `path` config option.

You also might not intent to deploy the styleguide to production, in which case
it's recommended to conditionally only use the module under specific circumstances.

```js
// nuxt.config.js

const modules = [
  // other modules ...
];

/* only use the module in non-production environment */
if (process.env.NODE_ENV !== 'production') {
  modules.push([
    '@sum.cumo/nuxt-styleguide',
    {
      /* change the entry route of nuxt-styleguide */
      path: '/styleguide',
      /* make import paths of components relative to project root */
      importFrom: 'local',
      // other config ...
    },
  ]);
}
module.exports = {
  // other options ...
  modules,
};
```
