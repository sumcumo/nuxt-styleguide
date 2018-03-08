# Changelog @sum.cumo/nuxt-styleguide

## Version 0.1.5

### 🐞 Bug Fixes

→ **stop handling empty pages**


## Version 0.1.4

### 🐞 Bug Fixes

→ **handle cases where $router is not initialized**

→ **do not break when no pages exist**


## Version 0.1.3

### 🐞 Bug Fixes

→ **do not resolve default prop values manually**
> this fixes an issue where function props with default value break the preview
> 
> 


## Version 0.1.2

### 🔨 Refactorings

→ **use nuxt-styleguide-components helper**

→ **use nuxt-styleguide-config package**


## Version 0.1.1

### 🆕  New Features

→ **apply markdown to all component info descriptions**

→ **use dynamic pages from renderer**

→ **generate docs from component files**
> using vue-docgen-api <3
> 
> 

→ **provide $styleguide global**
> containing meta informations such as project name, version and routes
> 
> 

→ **watch components in dev mode**

### 🐞 Bug Fixes

→ **do not use object-spread opperator**

→ **use prepare script instead of prepublish**
> for npm@5 compat
> 
> 

→ **fix template syntax in proxyComponent**

→ **stop messing with the console**

→ **fix error reporting**

→ **update styleguide when component changes**

→ **fix typo**

### 🔨 Refactorings

→ **use template for proxy component**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@0.2.0: **render component info**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@0.2.0: **adapt renaming of docs to description**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@0.2.0: **add components route**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@0.2.0: **move index page into pages dir**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@0.2.0: **add navigation**

→ perf in @sum.cumo/nuxt-styleguide-renderer-default@0.2.0: **remove superflous v-if**


