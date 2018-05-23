# Changelog @sum.cumo/nuxt-styleguide-config

## Version 4.1.0

### 🆕  New Features

→ **add option to configure the order of categories**


## Version 4.0.0

### 🚀  BREAKING CHANGES

→ **use new options API of nuxt@2**
> BREAKING CHANGE:
> incompatible with nuxt@1


## Version 3.0.0

### 🚀  BREAKING CHANGES

→ **use / root route for styleguide**
> BREAKING CHANGE:
> Standalone usage is the default mode of the styleguide
> This means: all other routes of the project are discarded and the styleguide
> renders directly on the entry route of the route
> 
> If you previously used the default value "/styleguide", you should
> now manually set it in the configuration

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

→ **add default value for layout option**

→ **introduce config for iconRoute and iconFolder**

→ **add default value for iconName**

→ **add default value for docsDir**

→ **introduce importFrom option**
> and set default to "package"
> 
> 

→ **add default value for variablesName**

→ **add nuxt default options to config**

→ **add package**

### 🐞 Bug Fixes

→ **ensure empty extend value is treated correctly**


## Version 2.5.0

### 🆕  New Features

→ **add default value for layout option**


## Version 2.4.0

### 🆕  New Features

→ **add default value for layout option**


## Version 2.3.0

### 🆕  New Features

→ **introduce config for iconRoute and iconFolder**


## Version 2.2.0

### 🆕  New Features

→ **add default value for iconName**


## Version 2.1.0

### 🆕  New Features

→ **add default value for iconName**


## Version 2.0.0

### 🚀  BREAKING CHANGES

→ **use / root route for styleguide**
> BREAKING CHANGE:
> Standalone usage is the default mode of the styleguide
> This means: all other routes of the project are discarded and the styleguide
> renders directly on the entry route of the route
> 
> If you previously used the default value "/styleguide", you should
> now manually set it in the configuration

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


## Version 1.0.0

### 🚀  BREAKING CHANGES

→ **use / root route for styleguide**
> BREAKING CHANGE:
> Standalone usage is the default mode of the styleguide
> This means: all other routes of the project are discarded and the styleguide
> renders directly on the entry route of the route
> 
> If you previously used the default value "/styleguide", you should
> now manually set it in the configuration

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


## Version 0.4.0

### 🆕  New Features

→ **add default value for docsDir**


## Version 0.3.0

### 🆕  New Features

→ **introduce importFrom option**
> and set default to "package"
> 
> 


## Version 0.2.0

### 🆕  New Features

→ **add default value for variablesName**


## Version 0.1.1

### 🐞 Bug Fixes

→ **ensure empty extend value is treated correctly**


## Version 0.1.0

### 🆕  New Features

→ **add nuxt default options to config**

→ **add package**


