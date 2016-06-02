module.exports = function(grunt) {

	require('jit-grunt')(grunt, {
		replace: 'grunt-text-replace'
	});

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			dist: {
				src : [
					'dist/*'
				]
			},
			build: {
				src : [
					'build/'
				]
			}
		},

		copy: {
			dist: {
				expand: true,
				cwd: 'dev/',
				src: [
					'assets/webfonts/**',
					'assets/css/**',
					'assets/js/**',
				],
				dest: 'dist/'
			},
			build: {
				expand: true,
				cwd: 'dist/',
				src: [
					'**.html',
					'assets/js/**',
					'assets/img/**',
					'assets/css/**',
					'assets/webfonts/**'
				],
				dest: 'build/'
			},
			img: {
				expand: true,
				cwd: 'dev/',
				src: [
					'assets/img/**/*.{png,jpg,gif}',
				],
				dest: 'dist/'
			},
			svg: {
				expand: true,
				cwd: 'dev/',
				src: [
					'assets/img/**/*.svg',
				],
				dest: 'dist/'
			},
			bower_components: {
				expand: true,
				cwd: 'bower_components/',
				src: [
					'svg-localstorage/svg-localstorage.js',
				],
				dest: 'dist/assets/js/lib/'

			}
		},

		zetzer: {
			options: {
				partials: "dev/inc/partials/",
				templates: "dev/inc/templates/"
			},
			bower_components: {
				files: [{
					expand: true,
					cwd: 'git_submodules/',
					src: '**/*.html',
					dest: 'dist/pages/',
					ext: '.html',
					flatten: false
				}]
			},
			getting_started: {
				files: [{
					expand: true,
					cwd: 'dev/',
					src: '*.html',
					dest: 'dist/',
					ext: '.html',
					flatten: false
				}]
			}
		},


		//Compile the sass files with Compass
		compass: {
			dist: {
				options: {
					basePath: 'dev/',
					cssDir: 'assets/css',
					sassDir: 'assets/sass',
					imagesDir: 'assets/img',
					javascriptsDir: 'assets/js',
					fontsDir: 'assets/webfonts',
					environment: 'development',
					outputStyle: 'expanded',
					relativeAssets: true,
					noLineComments: false,
					quiet: true,
					sourcemap: true,
					require : [
						'sass-globbing',
					]
				}
			}
		},

		svgstore: {
			dist: {
				files: {
					'dev/assets/img/layout/svg-sprite.svg': ['dev/assets/img/layout/svg/*.svg']
				},
				options: {
					cleanup: true,
					cleanupdefs: true,
					prefix : 'glyph-',
					inheritviewbox: true
				}
			}
		},

		concat: {
			dist: {
				options: {
					separator: ';'
				},
				files: {
					'dist/assets/js/main.js' : [
						'dev/assets/js/main.js'
					],
					'dist/assets/js/tipi/tipi.components.js' : [
						'bower_components/**/tipi.*.js'
					]
				}
			}
		},

		concurrent: {
			compile: [
				'zetzer',
				'compass:dist',
				'svgstore:dist',
				'concat:dist',
			],
			minify: [
				'cssmin:build',
				'svgmin:build',
				'imageoptim:build',
				'uglify:build',
				'replace:assets',
				'cacheBust'

			]
		},

		cssmin: {
			build: {
				files: {
					'build/assets/css/tipi.min.css': ['dist/assets/css/tipi.css']
				}
			}
		},

		svgmin: {
			build: {
				options: {
					plugins: [
						{ removeViewBox: false },
						{ removeEmptyAttrs: false }
					]
				},
				files: [{
					expand: true,
					cwd: 'dev/assets/img/layout/svg/',
					src: ['*.svg'],
					dest: 'svgs/'
				}]
			}
		},

		imageoptim: {
			build: {
				src: ['build/assets/img/layout'],
				options : {
					quitAfter : true
				}
			}
		},

		//Minify Javascript for production
		uglify: {
			dist: {
				options: {
					compress : {
						drop_console : true
					},
					sourceMap : false
				},
				files: {
					'dist/assets/js/lib/**.js': 'dist/assets/js/lib/**.min.js'
				}
			},
			build: {
				options : {
					compress : {
						drop_console : true,
					},
					sourceMap : false,
				},
				files: {
					'build/assets/js/tipi/tipi.components.min.js': 'dist/assets/js/tipi/tipi.components.js',
					'build/assets/js/main.min.js': 'dist/assets/js/main.js',
				}
			}
		},

		replace: {
			assets: {
				src: ['build/**.html'],
				dest: 'build/',
				replacements: [
					{
						from: 'tipi.css',
						to: 'tipi.min.css'
					},
					{
						from: 'main.js',
						to: 'main.min.js'
					},
					{
						from: 'tipi.components.js',
						to: 'tipi.components.min.js'
					}
				]
			},
			svgSprite: {
				src: ['dist/**.html'],
				dest: 'dist/',
				replacements: [
					{
						from: 'svgRev',
						to: '<%= grunt.template.today("yyyymmddHHMMss") %>'
					},
				]
			}
		},

		cacheBust: {
			options: {
				expand: true,
				baseDir: 'build/',
				queryString: true
			},
			css: {
				options: {
					assets: ['assets/css/**'],
				},
				src: ['build/**.html']
			},
			js: {
				options: {
					assets: ['assets/js/**'],
				},
				src: ['build/**.html']
			}
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: 'dist/',
					livereload: true,
					open: {
						target: 'http://localhost:8000'
					}
				}
			}
		},

		watch: {
			html: {
				files: [
					'dev/*.html',
					'dev/inc/**/*.html',
					'dev/docs/**/*.html',
					'git_submodules/**/*.html',

					'!**/dist/**',
					'!**/build/**',
					'!**/node_modules/**',
				],
				tasks: ['zetzer'],

			},
			scss: {
				files: [
					'git_submodules/**/*.scss',
					'dev/assets/sass/**/*.scss',

					'!**/dist/**',
					'!**/build/**',
					'!**/node_modules/**',
				],
				tasks: [
					'compass:dist',
					'copy:dist'
				],
				options: {
					spawn : true,
				}
			},
			js: {
				files: [
					'dev/assets/js/**/*.js',

					'!**/dist/**',
					'!**/build/**',
					'!**/node_modules/**',
				],
				tasks: [
					'concat:dist'
				],
				options: {
					spawn : false,
					interrupt: true
				}
			},
			img: {
				files: [
					'dev/assets/img/**/*.{png,jpg,gif}',

					'!**/dist/**',
					'!**/build/**',
					'!**/node_modules/**',
				],
				tasks: [
					'newer:copy:img'
				],
				options : {
					event: ['added', 'deleted']
				},
			},
			svg: {
				files: [
					'dev/assets/img/**/*.svg',
				],
				tasks: [
					'svgstore:dist',
					'newer:copy:svg',
					'zetzer',
					'replace:svgSprite'
				],
				options : {
					event: ['added', 'deleted']
				}

			},
			reload : {
				files: [
					'dist/assets/css/**/*.css',
					'dist/**/*.html',
				],
				options : {
					livereload : true,
					livereloadOnError: false
				},
			},
			config : {
				files : [
					'Gruntfile.js'
				],
				options : {
					reload : true
				}

			}
		}
	});

	grunt.registerTask(
		'default', [
			'clean:dist',
			'concurrent:compile',
			'replace:svgSprite',
			'copy:img',
			'copy:svg',
			'copy:dist',
		]
	);

	grunt.registerTask(
		'build', [
			'clean:dist',
			'clean:build',
			'concurrent:compile',
			'replace:svgSprite',
			'copy:dist',
			'copy:img',
			'copy:svg',
			'copy:build',
			'concurrent:minify',
		]
	);

	grunt.registerTask(
		'serve', [
			'clean:dist',
			'concurrent:compile',
			'replace:svgSprite',
			'copy:dist',
			'copy:img',
			'copy:svg',
			'copy:bower_components',
			'connect:server',
			'watch',
		]
	);

	grunt.registerTask(
		'cleanup', [
			'clean:dist',
			'clean:build',
		]
	);
};