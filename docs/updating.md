# Updating (Core Generators / Seeds)

You CAN (and are encouraged to stay up to date) re-run a core generator AFTER you've already run it the first time to create your app from scratch. You may have some manual merge conflicts to handle dependening on the changes to the core generator and what core seed files you edited but it should be safe and allow you to stay up to date with the seed/core as it goes through version updates.

Remember to update the generator first!
`npm install -g generator-mean-seed`

Re-run `yo mean-seed` and select the same core you used the first time to Git merge in updates! Just type 'a' (for overwrite all) if you get prompted about file conflicts - we'll handle those with Git merge later so it's safe to overwrite everything in the generator branch.


## Updates / Merging Strategy (for Cores)

The great advantage to Yeoman/Yo is automation and customized readme and other files (that normally would have to either be generic or in the .gitignore file to avoid constant merge conflicts). HOWEVER, this makes updates a bit more difficult since just running the generator again will just give the option to overwrite OR ignore updates to the seed (neither of which is good enough). SO, we do the updates (just overwrite all changes) on a SEPARATE branch (naming convention is 'yo-[name of core]') and THEN merge into the main (default is 'master') branch - this will then merge the ALREADY templated/generated updated seed so avoid the merge conflicts and any other conflicts will be merged (manually if it can't do it automatically). This should allow updating the seed be re-running the generator, WITHOUT just blinding overwriting any changes to the project since the last generation.

So the process is (all automated in Yeoman):

1. `git checkout yo-[core-name]` to switch to (and create first if necessary) a "updates only" 'yo-[core-name]' branch
2. run the generator for the core here on this SEPARATE branch (user should just overwrite (all) files to the new core/seed version)
3. `git add -A && git commit -am '[timestamp] yo mean-seed update'` to commit the new updates on the SEPARATE branch
4. `git checkout master` to switch to (and create first if necessary) the main working branch (where we could have conflicts)
	1. *'master' is replaced with `optGitBranch` prompt, if set
5. `git merge yo-[core-name]` to merge in the new updates to the existing working branch - just as with any git merge or any update of a non-Yeoman/generator git repo that has updates.

So basically the first 4 steps create a 'custom repo' for THIS config/prompts set and then use THAT for the merge. So in essence the main generator is a template for updates and you first must generated the updated version of YOUR app (using YOUR config / generated files) to merge again, NOT against the raw templated version of the app.

NOTE: it is VITAL that the process STARTS correctly - the 'yo' branch and the master branch must be branches of each other at the START (i.e. after first generation) and the 'yo' branch should then NEVER be touched except by re-running the `yo mean-seed` command to update the core (using the SAME core of course as originally used to seed the app). Then Git will only compare the CHANGES to the core seed and it should work appropriately. Otherwise (if the 'yo' branch is created AFTER custom changes are made to the generated seed), Git will see the seed as deletions/edits and will REMOVE/edit changes to the master branch!
