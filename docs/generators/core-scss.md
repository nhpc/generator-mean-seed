# core-scss Generator

Based on core-default generator but with SASS/SCSS instead of LESS.
Uses (Bourbon)[http://bourbon.io/] instead of LESSHat for mixins

NOTE: You must install Ruby and then do `gem install sass` for it to work! See http://sass-lang.com/

- uses same 'core-default-node' backend generator with the cssPreprocessor yeoman variable to conditionally replace LESS with SCSS in the following files:
	- Gruntfile.js
	- .gitignore
	- package.json
	- config.json, config.test.json
	- docs (several files)
- uses a separate 'core-scss-angular' generator for writing the frontend in SCSS instead of LESS. Key changes below:
	- bower.json
		- bourbon instead of lesshat
		- less-flexbox: use flexbox.min.css instead of flexbox.less
		- *.min.css files used instead of *.less files for all other bower components that have less
	- font-awesome SCSS instead of LESS
	- `common/less` folder and all files updated to `common/scss`
	- all `*.less` files changed to `_*.scss`
	- buildfilesModules.json
		- all *.less 3rd party components switched to use *.min.css instead
		- all local/custom *.less files switched to _*.scss files
	


## Generators

### core-default-node
Scaffolds the backend plus some common files shared by frontend:

- Gruntfile.js & package.json
- .gitignore
- config.json & config.test.json
- docs folder


### core-scss-angular
Scaffolds the frontend
