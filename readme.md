# @sum.cumo/nuxt-styleguide

Increase QUALITY and EFFICIENCY of product design and development workflows

Nuxt styleguide is a [Nuxt](https://github.com/nuxt/nuxt.js) module that provides a isolated styleguide view for your components, design tokens and it's documentation.

It can live **inside your nuxt project** or as **a standalone library** that provides Vue components.

## Getting started 

If you're new to nuxt and want to start from scratch we recommend to [checkout the official nuxt docu](https://github.com/nuxt/nuxt.js#getting-started) to create a new project.

To integrate the nuxt styleguide into project: 

```
npm install @sum.cumo/nuxt-styleguide --save-dev
```

and create a `nuxt.config.js` with the following content:

```
module.exports = {
	modules: [
		[
			'@sum.cumo/nuxt-styleguide',
			{
				path: '/custompath'
			}
		]
	]
};
```

## Options

### path

Set route for styleguide. `Default: '/'`

### designTokenName

Set path for design tokens. `Default: 'design-tokens'`

### docsDir

Set path for documentation. `Default: 'docs'`

### iconFolder

Set path for icons. `Default: 'icons'`

### layout

Set layout for the styleguide. `Default: 'default'`

### renderer

Set renderer of styleguide. `Default: '@sum.cumo/nuxt-styleguide-renderer-default'`

## Contribution

To run this project locally you'll need yarn@^1.5.1. to perform

`yarn install && yarn build && yarn start`

Please feel free to [open up an issue](https://github.com/sumcumo/nuxt-styleguide/issues/new) or provide a pull request. 



## License

Copyright 2018 [sum.cumo GmbH](https://www.sumcumo.com/)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
