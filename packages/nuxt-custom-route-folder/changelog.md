# Changelog @sum.cumo/nuxt-custom-route-folder

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


