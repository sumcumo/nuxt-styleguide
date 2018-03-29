# nuxt-styleguide sub packages

This project is designed in a way that sub parts of the system
can be re-used out of context or replaced by custom implementation.

### <repo-link file="packages/nuxt-styleguide"><code>@sum.cumo/nuxt-styleguide</code></repo-link>

The main package that is already documented here

### <repo-link file="packages/nuxt-markdown-component-loader"><code>@sum.cumo/nuxt-markdown-component-loader</code></repo-link>

If you like the way markdown files in the docs folder are loaded, you can
use this nuxt module to enable it for all markdown files in the project.

### <repo-link file="packages/nuxt-styleguide-config"><code>@sum.cumo/nuxt-styleguide-config</code></repo-link>

Manages defaults and configuration of nuxt styleguide. Could be useful when
you have a custom module that also wants to read the config.

### <repo-link file="packages/nuxt-styleguide-files"><code>@sum.cumo/nuxt-styleguide-files</code></repo-link>

Internal module of nuxt-styleguide that is used to read and monitor files in
a project folder.

### <repo-link file="packages/nuxt-styleguide-renderer-default"><code>@sum.cumo/nuxt-styleguide-renderer-default</code></repo-link>

The default renderer used by nuxt-styleguide.

### <repo-link file="packages/vue-markdown-component-loader"><code>@sum.cumo/vue-markdown-component-loader</code></repo-link>

Webpack loader that converts markdown to vue components
