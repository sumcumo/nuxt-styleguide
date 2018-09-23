# Changelog @sum.cumo/nuxt-styleguide

## Version 5.2.1

### 🐞 Bug Fixes

→ **update to latest version of nuxt-styleguide-renderer-default**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.3.0: **highlight active navigation entries**


## Version 5.2.0

### 🆕  New Features

→ **allow nsg prefix for custom blocks**
> vetur syntax highlighting for custom blocks does not like blocks that
> start with "style"
> 
> ref: https://github.com/sumcumo/nuxt-styleguide/issues/8
> 
> 

### 🐞 Bug Fixes

→ **use scss parser directly**
> since postcss.parse does not seem to care for the syntax option
> (previously the default parser has been used)
> 
> fix https://github.com/sumcumo/nuxt-styleguide/issues/10
> 
> 


## Version 5.1.0

### 🆕  New Features

→ **pass kebabName to renderer**
> and use default scoped slot for demo content
> 
> in order to support code-views of a state
> 
> 

### 🐞 Bug Fixes

→ **use latest version of nuxt-styleguide-renderer-default**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.2.0: **display a code preview of a state**


## Version 5.0.1

### 🐞 Bug Fixes

→ **do not render icon route when there are no icons**
> fix https://github.com/sumcumo/nuxt-styleguide/issues/3
> 
> 

→ **use latest version of nuxt-styleguide-renderer-default**

### 🔄  Dependency Updates

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.1.1: **add default renderer for design tokens**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.1.1: **make code tags stand out a bit more**


## Version 5.0.0

### 🚀  BREAKING CHANGES

→ **treat component states as es module**
> in order to suppoert imports, use of other modules and whatever comes to mind
> 
> BREAKING CHANGE:
> styleguide-states blocks in vue files must now `export default` the array of states
> previously:
> ```
> <styleguide-states>
> [{ /* … */ }]
> </styleguide-states>
> ```
> 
> now:
> ```
> <styleguide-states>
> export default [{ /* … */ }]
> </styleguide-states>
> ```

### 🐞 Bug Fixes

→ **use latest version of nuxt-styleguide-renderer-default**

→ **update dependencies**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.1.0: **support wrapper and wrapperStyles in demo states**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.1.0: **update dependencies**


## Version 4.0.3

### 🐞 Bug Fixes

→ **pass ressource path to doc generation**
> so that relative paths can be resolved correctly bu vue-doc-gen
> 
> fix https://github.com/sumcumo/nuxt-styleguide/issues/5
> 
> 


## Version 4.0.2

### 🐞 Bug Fixes

→ **use latest version of nuxt-styleguide-config**


## Version 4.0.1

### 🐞 Bug Fixes

→ **order route entries by category and name**


## Version 4.0.0

### 🚀  BREAKING CHANGES

→ **use latest tec (nuxt@2 and nuxt-custom-route-folder@3)**
> BREAKING CHANGE:
> nuxt@1.x is not supported anymore. Please update to nuxt@2 in order to use this package

### 🐞 Bug Fixes

→ **make compatible to nuxt@2**

### 🏃 Performance Improvements

→ **do not delay initial build in dev mode**
> but do a direct rebuild instead
> 
>  - should be faster because custom folder filters and maps are executed parallel to initial build
>    rebuild then uses cache from initial build
>  - this feels a lot faster because we are not blocking the initial build anymore
> 
> 

### 🔄  Dependency Updates

→ fix in @sum.cumo/nuxt-custom-route-folder@2.1.0: **re-use same watcher for multiple custom folders**

→ fix in @sum.cumo/nuxt-custom-route-folder@2.1.0: **use latest version of rxjs**

→ feat in @sum.cumo/nuxt-custom-route-folder@2.1.0: **add import and meta mappers**

→ fix in @sum.cumo/nuxt-styleguide-config@4.0.0: **use new options API of nuxt@2**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.0.1: **use scss variables instead of css variables**

→ feat in @sum.cumo/vue-markdown-component-loader@0.5.0: **support options by global vueMarkdownComponentLoader**


## Version 3.0.0

### 🚀  BREAKING CHANGES

→ **rename "variables" to "design-tokens"**
> BREAKING CHANGE
> Not all sass variables are atomic and can be treated as design tokens.
> Therefore the folder previosly named "variables" is renamed to "design-tokens"
> and the configuration for the folder name has changed from "variablesName" to
> "designTokenName".
> 
> Migration: you should rename the "variables" folder to "design-tokens"
> You could also set the configuration of "designTokenName" to "variables" (not recommended)
> If you allready had a custom "variablesName" configured, change the config key
> to "designTokenName"
> 
> 

### 🆕  New Features

→ **support data in component states**
> in oder to allow demo events
> 
> also support js object notation
> 
> 

→ **expose importName to renderer**
> so that the renderer can create correct import statements
> 
> 

→ **base64 encode route meta info**
> in order to prevent corruption by other modules that tinker with the route name
> 
> 

→ **re-add path prefix feature**
> was accitentally removed with move to custom-route-folder module
> 
> 

→ **pin depdendency to latest default renderer**

→ **generate documenation for layouts**

→ **pin to latest default renderer version**

→ **expose styleguide layout on env**

→ **apply layout option to rendered pages**

→ **use renderer page folders as category**

→ **introduce config for iconRoute and iconFolder**

→ **add icons index page**

→ **pick up icons and render them in navigation**

→ **pass through styleguideData to styleguide**

→ **use component display name instead of file name**

→ **support router.base option with absolute paths**

→ **also allow vue files for docs**

→ **use nuxt-markdown-component-loader for docs**

→ **create routes for doc entries**

→ **handle importFrom option**

→ **create views for variables files**

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

→ **use latest version of nuxt-custom-route-folder**

→ **update to latest version of nuxt-custom-route-folder**

→ **update to latest version of nuxt-styleguide-renderer-default**

→ **update to latest versions of nuxt-custom-route-folder and nuxt-styleguide-renderer-default**

→ **use latest version of vue-docgen-api**

→ **do not cache empty routes**

→ **use latest patch of nuxt-custom-route-folder**

→ **set default renderer to latest**

→ **bind fix default renderer version**

→ **unlink correct temp component file**

→ **require latest versions of internal dependencies**

→ **do not render markdown of empty description**

→ **do not strip leading slash in basepath**

→ **ensure docs do not conflict with pages**

→ **use extendBuild method instead of hacking webpack config**

→ **allow imports in variable files**

→ **stop assuming existing tags for variables files**

→ **ensure tmpDir exists**

→ **handle case when component has no slot**

→ **stop handling empty pages**

→ **handle cases where $router is not initialized**

→ **do not break when no pages exist**

→ **do not resolve default prop values manually**
> this fixes an issue where function props with default value break the preview
> 
> 

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

### 🏃 Performance Improvements

→ **use latest version of nuxt-custom-route-folder**

→ **cache vue-docgen results**

→ **communicate initiating of nuxt stylegide**

→ **stop creating unused temp dir**

### 🔨 Refactorings

→ **use latest version of nuxt-custom-route-folder**

→ **use nuxt-custom-route-folder to generate additional routes**

→ **make applyMarkdownToDocs reusable by future proxy creators**

→ **internally add .comp suffix to proxy files**
> in order to prevent collisions with other proxy types
> 
> 

→ **use nuxt-styleguide-files**

→ **compat patch for nuxt-styleguide-components**

→ **use nuxt-styleguide-components helper**

→ **use nuxt-styleguide-config package**

→ **use template for proxy component**

### 🔄  Dependency Updates

→ fix in @sum.cumo/nuxt-custom-route-folder@2.0.0: **do not publish tmp folder**

→ feat in @sum.cumo/nuxt-custom-route-folder@2.0.0: **require extendRoutes option**

→ fix in @sum.cumo/nuxt-custom-route-folder@2.0.0: **delay initial buffer for 250**

→ fix in @sum.cumo/nuxt-custom-route-folder@2.0.0: **delay closing of watcher and observable in non-watch mode**

→ fix in @sum.cumo/nuxt-custom-route-folder@2.0.0: **delay final resolve for a tick**

→ perf in @sum.cumo/nuxt-custom-route-folder@2.0.0: **handle initial add batch in parallel**

→ perf in @sum.cumo/nuxt-custom-route-folder@2.0.0: **observe passed globs**

→ perf in @sum.cumo/nuxt-custom-route-folder@2.0.0: **ignore child node_modules folders**

→ fix in @sum.cumo/nuxt-custom-route-folder@2.0.0: **fix destructuring problem**

→ feat in @sum.cumo/nuxt-custom-route-folder@2.0.0: **initiate package**

→ feat in @sum.cumo/nuxt-styleguide-config@3.0.0: **add default value for layout option**

→ feat in @sum.cumo/nuxt-styleguide-config@3.0.0: **introduce config for iconRoute and iconFolder**

→ feat in @sum.cumo/nuxt-styleguide-config@3.0.0: **add default value for iconName**

→ feat in @sum.cumo/nuxt-styleguide-config@3.0.0: **use / root route for styleguide**

→ feat in @sum.cumo/nuxt-styleguide-config@3.0.0: **rename "variables" to "design-tokens"**

→ feat in @sum.cumo/nuxt-styleguide-config@3.0.0: **add default value for docsDir**

→ feat in @sum.cumo/nuxt-styleguide-config@3.0.0: **introduce importFrom option**

→ feat in @sum.cumo/nuxt-styleguide-config@3.0.0: **add default value for variablesName**

→ fix in @sum.cumo/nuxt-styleguide-config@3.0.0: **ensure empty extend value is treated correctly**

→ feat in @sum.cumo/nuxt-styleguide-config@3.0.0: **add nuxt default options to config**

→ feat in @sum.cumo/nuxt-styleguide-config@3.0.0: **add package**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **make sidebar light and create own nav stylesheet**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **remove unused variables**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **support latest api of states**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **dont use backlink**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **make color demo wider**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **sidebar nav is scrollable now**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **use importName to create import statements**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **bump version**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **introduce transform hack to demo fixed elements**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **introduce a better way of displaying tokens**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **use global nuxt styleguide layout**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **render index routes on category headlines**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **do not require tags in tags renderer**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **namespace tags usage**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **forgotten b**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **introduce icon grid and refactor some views**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **add icons index page**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **introduce frame to single icon view**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **add Icon renderer**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **es koennte alles responsive sein**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **vertically align lineheightdemo**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **introduce font demos**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **remove components page**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **rename variabeles renderer to designTokens**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **pass styleguide name to library**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **introduce color renderer**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **introduce sidebar in frame**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **use backlink instead of custom link**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **introduce Backlink**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **introduce frame**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **use absolute paths for back links**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **use slot instead of doc prop to get content for doc view**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **add default doc renderer**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **remove empty style texts**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **add renderer for variables**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **do not break when no docs have been parsed**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **render component info**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **adapt renaming of docs to description**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **add components route**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **move index page into pages dir**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **add navigation**

→ perf in @sum.cumo/nuxt-styleguide-renderer-default@3.0.0: **remove superflous v-if**


## Version 2.17.0

### 🆕  New Features

→ **support data in component states**
> in oder to allow demo events
> 
> also support js object notation
> 
> 

### 🔨 Refactorings

→ **use latest version of nuxt-custom-route-folder**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-custom-route-folder@1.0.0: **require extendRoutes option**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@2.14.0: **support latest api of states**


## Version 2.16.2

### 🐞 Bug Fixes

→ **use latest version of nuxt-custom-route-folder**

### 🔄  Dependency Updates

→ fix in @sum.cumo/nuxt-custom-route-folder@0.3.8: **delay initial buffer for 250**


## Version 2.16.1

### 🔄  Dependency Updates

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@2.13.1: **dont use backlink**


## Version 2.16.0

### 🆕  New Features

→ **expose importName to renderer**
> so that the renderer can create correct import statements
> 
> 

→ **base64 encode route meta info**
> in order to prevent corruption by other modules that tinker with the route name
> 
> 

### 🐞 Bug Fixes

→ **update to latest version of nuxt-custom-route-folder**

→ **update to latest version of nuxt-styleguide-renderer-default**

→ **update to latest versions of nuxt-custom-route-folder and nuxt-styleguide-renderer-default**

→ **use latest version of vue-docgen-api**

### 🏃 Performance Improvements

→ **use latest version of nuxt-custom-route-folder**

→ **cache vue-docgen results**

→ **communicate initiating of nuxt stylegide**


## Version 2.15.1

### 🐞 Bug Fixes

→ **update to latest version of nuxt-custom-route-folder**

### 🔄  Dependency Updates

→ fix in @sum.cumo/nuxt-custom-route-folder@0.3.6: **delay closing of watcher and observable in non-watch mode**


## Version 2.15.0

### 🆕  New Features

→ **expose importName to renderer**
> so that the renderer can create correct import statements
> 
> 

### 🐞 Bug Fixes

→ **update to latest version of nuxt-styleguide-renderer-default**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@2.11.0: **use importName to create import statements**


## Version 2.14.2

### 🐞 Bug Fixes

→ **update to latest versions of nuxt-custom-route-folder and nuxt-styleguide-renderer-default**

### 🔄  Dependency Updates

→ fix in @sum.cumo/nuxt-custom-route-folder@0.3.5: **delay final resolve for a tick**


## Version 2.14.1

### 🐞 Bug Fixes

→ **use latest version of vue-docgen-api**

### 🏃 Performance Improvements

→ **use latest version of nuxt-custom-route-folder**

→ **cache vue-docgen results**

→ **communicate initiating of nuxt stylegide**

### 🔄  Dependency Updates

→ perf in @sum.cumo/nuxt-custom-route-folder@0.3.4: **handle initial add batch in parallel**


## Version 2.14.0

### 🆕  New Features

→ **base64 encode route meta info**
> in order to prevent corruption by other modules that tinker with the route name
> 
> 


## Version 2.13.1

### 🐞 Bug Fixes

→ **do not cache empty routes**


## Version 2.13.0

### 🆕  New Features

→ **re-add path prefix feature**
> was accitentally removed with move to custom-route-folder module
> 
> 


## Version 2.12.1

### 🐞 Bug Fixes

→ **use latest patch of nuxt-custom-route-folder**

### 🔄  Dependency Updates

→ fix in @sum.cumo/nuxt-custom-route-folder@0.3.1: **fix destructuring problem**


## Version 2.12.0

### 🆕  New Features

→ **pin depdendency to latest default renderer**

→ **generate documenation for layouts**


## Version 2.11.0

### 🆕  New Features

→ **pin depdendency to latest default renderer**

→ **generate documenation for layouts**

### 🔄  Dependency Updates

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@2.9.1: **introduce transform hack to demo fixed elements**


## Version 2.10.0

### 🆕  New Features

→ **generate documenation for layouts**


## Version 2.9.0

### 🆕  New Features

→ **pin to latest default renderer version**

→ **expose styleguide layout on env**

→ **apply layout option to rendered pages**

→ **use renderer page folders as category**

### 🏃 Performance Improvements

→ **stop creating unused temp dir**

### 🔨 Refactorings

→ **use nuxt-custom-route-folder to generate additional routes**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-custom-route-folder@0.3.0: **initiate package**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@2.9.0: **introduce a better way of displaying tokens**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@2.9.0: **use global nuxt styleguide layout**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@2.9.0: **render index routes on category headlines**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@2.9.0: **do not require tags in tags renderer**

→ feat in @sum.cumo/vue-markdown-component-loader@0.3.0: **add layout to component**


## Version 2.8.0

### 🆕  New Features

→ **expose styleguide layout on env**


## Version 2.7.0

### 🆕  New Features

→ **apply layout option to rendered pages**

### 🏃 Performance Improvements

→ **stop creating unused temp dir**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-config@2.4.0: **add default value for layout option**

→ feat in @sum.cumo/vue-markdown-component-loader@0.2.0: **add layout to component**


## Version 2.6.0

### 🆕  New Features

→ **use renderer page folders as category**

### 🔨 Refactorings

→ **use nuxt-custom-route-folder to generate additional routes**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-custom-route-folder@0.2.0: **initiate package**


## Version 2.5.1

### 🐞 Bug Fixes

→ **set default renderer to latest**


## Version 2.5.0

### 🆕  New Features

→ **introduce config for iconRoute and iconFolder**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-config@2.3.0: **introduce config for iconRoute and iconFolder**


## Version 2.4.1

### 🐞 Bug Fixes

→ **bind fix default renderer version**


## Version 2.4.0

### 🆕  New Features

→ **add icons index page**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@2.6.0: **add icons index page**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@2.6.0: **introduce frame to single icon view**


## Version 2.3.0

### 🆕  New Features

→ **pick up icons and render them in navigation**

### 🐞 Bug Fixes

→ **unlink correct temp component file**


## Version 2.2.0

### 🆕  New Features

→ **pick up icons and render them in navigation**

### 🐞 Bug Fixes

→ **unlink correct temp component file**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-config@2.1.0: **add default value for iconName**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@2.4.0: **add Icon renderer**


## Version 2.1.0

### 🆕  New Features

→ **pass through styleguideData to styleguide**


## Version 2.0.0

### 🚀  BREAKING CHANGES

→ **rename "variables" to "design-tokens"**
> BREAKING CHANGE
> Not all sass variables are atomic and can be treated as design tokens.
> Therefore the folder previosly named "variables" is renamed to "design-tokens"
> and the configuration for the folder name has changed from "variablesName" to
> "designTokenName".
> 
> Migration: you should rename the "variables" folder to "design-tokens"
> You could also set the configuration of "designTokenName" to "variables" (not recommended)
> If you allready had a custom "variablesName" configured, change the config key
> to "designTokenName"
> 
> 

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-config@2.0.0: **use / root route for styleguide**

→ feat in @sum.cumo/nuxt-styleguide-config@2.0.0: **rename "variables" to "design-tokens"**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@2.0.0: **remove components page**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@2.0.0: **rename variabeles renderer to designTokens**


## Version 1.0.0

### 🚀  BREAKING CHANGES

→ **rename "variables" to "design-tokens"**
> BREAKING CHANGE
> Not all sass variables are atomic and can be treated as design tokens.
> Therefore the folder previosly named "variables" is renamed to "design-tokens"
> and the configuration for the folder name has changed from "variablesName" to
> "designTokenName".
> 
> Migration: you should rename the "variables" folder to "design-tokens"
> You could also set the configuration of "designTokenName" to "variables" (not recommended)
> If you allready had a custom "variablesName" configured, change the config key
> to "designTokenName"
> 
> 

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-config@1.0.0: **use / root route for styleguide**

→ feat in @sum.cumo/nuxt-styleguide-config@1.0.0: **rename "variables" to "design-tokens"**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@1.0.0: **rename variabeles renderer to designTokens**


## Version 0.7.1

### 🐞 Bug Fixes

→ **require latest versions of internal dependencies**


## Version 0.7.0

### 🆕  New Features

→ **use component display name instead of file name**

### 🐞 Bug Fixes

→ **do not render markdown of empty description**


## Version 0.6.1

### 🐞 Bug Fixes

→ **do not strip leading slash in basepath**


## Version 0.6.0

### 🆕  New Features

→ **support router.base option with absolute paths**

→ **also allow vue files for docs**

### 🐞 Bug Fixes

→ **ensure docs do not conflict with pages**


## Version 0.5.0

### 🆕  New Features

→ **use nuxt-markdown-component-loader for docs**

### 🔄  Dependency Updates

→ feat in @sum.cumo/vue-markdown-component-loader@0.1.0: **create package**


## Version 0.4.0

### 🆕  New Features

→ **create routes for doc entries**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@0.3.0: **add default doc renderer**


## Version 0.3.1

### 🐞 Bug Fixes

→ **use extendBuild method instead of hacking webpack config**


## Version 0.3.0

### 🆕  New Features

→ **handle importFrom option**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-config@0.3.0: **introduce importFrom option**


## Version 0.2.2

### 🐞 Bug Fixes

→ **allow imports in variable files**


## Version 0.2.1

### 🐞 Bug Fixes

→ **stop assuming existing tags for variables files**


## Version 0.2.0

### 🆕  New Features

→ **create views for variables files**

### 🐞 Bug Fixes

→ **ensure tmpDir exists**

### 🔨 Refactorings

→ **make applyMarkdownToDocs reusable by future proxy creators**

→ **internally add .comp suffix to proxy files**
> in order to prevent collisions with other proxy types
> 
> 

→ **use nuxt-styleguide-files**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-config@0.2.0: **add default value for variablesName**

→ feat in @sum.cumo/nuxt-styleguide-renderer-default@0.2.0: **add renderer for variables**

→ fix in @sum.cumo/nuxt-styleguide-renderer-default@0.2.0: **do not break when no docs have been parsed**


## Version 0.1.6

### 🐞 Bug Fixes

→ **handle case when component has no slot**

### 🔨 Refactorings

→ **compat patch for nuxt-styleguide-components**

### 🔄  Dependency Updates

→ feat in @sum.cumo/nuxt-styleguide-components@1.0.0: **dont add component to sourceDirs**


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


