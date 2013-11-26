# Helper Generators

(Sub)Generators are modularized where possible to keep things DRY (Do not Repeat Yourself). The following helper subgenerators are available* to be called by other generators (to call them, just add them in to the the main `app/index.js` in the `moreGenerators` variable in the `askFor` function. The ORDER of the generators is fixed though and will be the order in which they're listed at the top of the file via `this.hookFor(`
* technically ALL subgenerators are available to be called, but these ones are most likely to be used.


### commands
Uses prompts to run commands. Can run one or more of the below. Set the prompt to the number 1 to run (if undefined or 0, it will NOT be run).

- `optNpmInstall` to run `npm install`
- `optBowerInstall` to run `bower install`
- `optSeleniumInstall` to run `./node_modules/protractor/bin/install_selenium_standalone`
- `optGruntQ` to run `grunt q`


### log-next-steps
Uses the this.optLogNextStepMsg variable string to write this string to output (at the END of the operations). Used to tell user what (if any) next steps to take.