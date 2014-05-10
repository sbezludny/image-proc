/* global module: false */
/* jshint camelcase: false */

"use strict";

module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		concat: {
			dist: {
				src: [
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
				wrap: "improcjs"
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
				//unused: true,
				strict: true,
				trailing: true,
				smarttabs: true,
				predef: ["improcjs", "improcjsGlobal"]
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
		copy: {
			dist: {
				expand: true,
				cwd: "../lib/",
				filter: "isFile",
				src: ["lib/**"],
				dest: "dist/"
			},
			demo: {
				expand: true,
				filter: "isFile",
				src: ["lib/**"],
				dest: "demo/js/"
			},
			ghpages: {
				expand: true,
				flatten: true,
				filter: "isFile",
				src: ["dist/**"],
				dest: "../gh-pages/app/js/"
			}
		},
		watch: {
			gruntfile: {
				files: "<%= jshint.gruntfile.src %>",
				tasks: ["jshint:gruntfile"]
			},
			js: {
				files: ["lib/**/*.js"],
				tasks: ["jshint", /*"concat", "uglify"*/, "copy:dist", "copy:demo"]
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
	grunt.registerTask("default", ["jshint", "copy:dist", "mocha", /*"concat", "uglify"*/, "copy:demo"]);


	grunt.registerTask("ghpages", "Copy files to GitHub Pages directory", function() {
		var dest = grunt.config.get("copy.ghpages.dest");

		if (!grunt.file.exists(dest)) {
			grunt.log.writeln("To copy dist files to gh-pages on build, checkout " +
				"the \n\"gh-pages\" branch so that " + dest + "is writable.");
			return true;
		}

		grunt.log.writeln("Copying distribution files to ", dest);

		grunt.task.run("copy:ghpages");

		return true;
	});

};
