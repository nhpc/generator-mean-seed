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
			// all: ['Gruntfile.js', 'main/**/*.js', 'ng-route/**/*.js']
			all: ['Gruntfile.js', 'main/index.js', 'ng-route/index.js']
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('default', ['jshint']);
};