# Module Generators (non-Core specific)

### ng-route
Scaffolds a new Angular page:

- creates a new folder in `src/modules/pages` (optionally in one or more sub-directories) with:
	- new-page.html
	- new-page.less (or new-page.scss)
	- NewPageCtrl.js
	- NewPageCtrl.spec.js
- updates `buildfilesModules.json` accordingly to include your new page
- updates `app.js` accordingly to include a new route to your page at URL `new-page`


### ng-directive
Scaffolds a new Angular directive:

- creates a new folder in `src/modules/directives` (optionally in one or more sub-directories) with:
	- new-directive.less (or new-directive.scss)
	- new-directive.js
	- new-directive.spec.js
- updates `buildfilesModules.json` accordingly to include your new directive
- [since it assumes the 'app' module namespace, there's no need to update `app.js`]