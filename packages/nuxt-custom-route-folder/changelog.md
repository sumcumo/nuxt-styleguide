# Changelog @sum.cumo/nuxt-custom-route-folder

## Version 2.1.3

### 🐞 Bug Fixes

→ **apply linter changes**
> which is basically a style type of commit, but I want
> to make sure to release this, so fix it is.
> 
> 


## Version 2.1.2

### 🐞 Bug Fixes

→ **add noop-error-handlers to non-final subscriptions**
> errors are catched in final subscription
> 
> 


## Version 2.1.1

### 🐞 Bug Fixes

→ **ensure fs events called after ready are not buffered forever**

### 🔨 Refactorings

→ **resolve initial promise on complete**


## Version 2.1.0

### 🆕  New Features

→ **add import and meta mappers**
> these can be used to use a different file or attach loaders for the route component import
> and also add meta informations to the route
> 
> BREAKGIN CHANGE:
> transform api has been removed in favour of custom inline loaders
> migration: rewrite transformers to webpack loaders and apply these using mapImport
> 
> 

### 🐞 Bug Fixes

→ **re-use same watcher for multiple custom folders**
> in order to hopefully dont cause an segmentation fault again
> 
> 

→ **use latest version of rxjs**
> and also stop using extendRoutes callback
> (seems not to work as expected in nuxt@2)
> 
> 


## Version 2.0.0

### 🚀  BREAKING CHANGES

→ **require extendRoutes option**
> instead of hooking into nuxt
> 
> and also add withOptions hoc
> 
> BREAKING CHNAGE:
> extendRoutes option must now be passed from parent module
> 
> 

### 🆕  New Features

→ **initiate package**

### 🐞 Bug Fixes

→ **do not publish tmp folder**

→ **delay initial buffer for 250**
> in oder to fight a unindentified race condition
> 
> 

→ **delay closing of watcher and observable in non-watch mode**

→ **delay final resolve for a tick**
> in order to prevent some unknown race-condition from blocking the whole module
> 
> 

→ **fix destructuring problem**

### 🏃 Performance Improvements

→ **handle initial add batch in parallel**

→ **observe passed globs**
> insted of abserving whole src folder and filtering later on
> 
> 

→ **ignore child node_modules folders**


## Version 1.0.0

### 🚀  BREAKING CHANGES

→ **require extendRoutes option**
> instead of hooking into nuxt
> 
> and also add withOptions hoc
> 
> BREAKING CHNAGE:
> extendRoutes option must now be passed from parent module
> 
> 


## Version 0.3.8

### 🐞 Bug Fixes

→ **delay initial buffer for 250**
> in oder to fight a unindentified race condition
> 
> 


## Version 0.3.7

### 🐞 Bug Fixes

→ **delay closing of watcher and observable in non-watch mode**

→ **delay final resolve for a tick**
> in order to prevent some unknown race-condition from blocking the whole module
> 
> 

### 🏃 Performance Improvements

→ **handle initial add batch in parallel**


## Version 0.3.6

### 🐞 Bug Fixes

→ **delay closing of watcher and observable in non-watch mode**


## Version 0.3.5

### 🐞 Bug Fixes

→ **delay final resolve for a tick**
> in order to prevent some unknown race-condition from blocking the whole module
> 
> 


## Version 0.3.4

### 🏃 Performance Improvements

→ **handle initial add batch in parallel**


## Version 0.3.3

### 🏃 Performance Improvements

→ **observe passed globs**
> insted of abserving whole src folder and filtering later on
> 
> 


## Version 0.3.2

### 🏃 Performance Improvements

→ **ignore child node_modules folders**


## Version 0.3.1

### 🐞 Bug Fixes

→ **fix destructuring problem**


## Version 0.3.0

### 🆕  New Features

→ **initiate package**


## Version 0.2.0

### 🆕  New Features

→ **initiate package**


