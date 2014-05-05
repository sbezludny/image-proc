/* global module: false */
/* jshint camelcase: false */

"use strict";

module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		concat: {
			dist: {
				src: [
					"lib/namespace.js",
					"lib/amd.module.js",
					"lib/<%= pkg.name %>.*.js",
					"lib/<%= pkg.name %>.js"
				],
				dest: "dist/<%= pkg.name %>.js"
			}
		},
		uglify: {
			options: {
				sourceMap: true,
				wrap: "improc"
			},
			dist: {
				src: "<%= concat.dist.dest %>",
				dest: "dist/<%= pkg.name %>.min.js"
			}
		},
		jshint: {
			options: {
				node: true,
				browser: true,
				esnext: true,
				bitwise: false,
				camelcase: true,
				curly: true,
				eqeqeq: true,
				immed: true,
				indent: 2,
				latedef: true,
				newcap: true,
				noarg: true,
				quotmark: "double",
				undef: true,
				unused: true,
				strict: true,
				trailing: true,
				smarttabs: true,
				predef: ["improc", "assert"]
			},
			gruntfile: {
				src: "Gruntfile.js"
			},
			lib_test: {
				src: ["lib/**/*.js", "test/spec/*.js"]
			}
		},
		mocha: {
			test: {
				src: ["test/index.html"],
			},
			options: {
        run: true
      }
		},
		watch: {
			gruntfile: {
				files: "<%= jshint.gruntfile.src %>",
				tasks: ["jshint:gruntfile"]
			},
			js: {
				files: ["<%= concat.dist.src %>"],
				tasks: ["jshint", "concat", "uglify"]
			},
			lib_test: {
				files: "<%= jshint.lib_test.src %>",
				tasks: ["jshint:lib_test", "mocha"]
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-mocha");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");

	// Default task.
	grunt.registerTask("default", ["jshint", "mocha", "concat", "uglify"]);

};
