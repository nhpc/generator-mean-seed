/**
Lint files
*/

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			options:{
				// force: true
				//globalstrict: true
				//sub:true,
				node: true
			},
			// all: ['Gruntfile.js', 'core-default/**/*.js', 'ng-route/**/*.js']
			all: ['Gruntfile.js',
				'core-default/index.js', 'core-default-node/index.js', 'core-default-angular/index.js',
				'ng-route/index.js',
				'commands/index.js',
				'log-next-steps/index.js'
			]
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('default', ['jshint']);
};