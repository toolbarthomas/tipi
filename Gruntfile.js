module.exports = function(grunt) {

	require('jit-grunt')(grunt, {
		cachebreaker : 	'grunt-cache-breaker',
		replace: 		'grunt-text-replace'
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		developmentPath: 'dev',
		productionPath: 'dist',
		modulePath: 'git_submodules',

		sass_globbing: {
			development: {
				files: {
					'<%= developmentPath %>/assets/sass/_tipi.import.components.scss': [
						'<%= modulePath %>/**/*.base.*.scss',
						'<%= modulePath %>/**/*.component.*.scss',
						'<%= modulePath %>/**/*.extend.*.scss',

						'!<%= modulePath %>/**/__*.scss'
					]
				},
				options: {
					signature: false
				}
			}
		},

		compass: {
			options: {
				cssDir: 'assets/css',
				sassDir: 'assets/sass',
				imagesDir: 'assets/img',
				javascriptsDir: 'assets/js',
				fontsDir: 'assets/webfonts',
				relativeAssets: true,
				quiet: true,
				require : [
					'sass-globbing',
				]
			},
			development: {
				options: {
					basePath: '<%= developmentPath %>/',
					environment: 'development',
					outputStyle: 'expanded',
					noLineComments: false,
					sourcemap: true
				}
			}
		},

		svgstore: {
			development: {
				files: {
					'<%= productionPath %>/assets/img/layout/svg-sprite.svg': [
						'<%= developmentPath %>/assets/img/layout/svg-sprite/**/*.svg'
					]
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
			options: {
				separator: ';',
				sourceMap: true
			},
			modules : {
				src: (function () {
					var cwd = "<%= modulePath %>/";
					var files = [
						"**/tipi.*.js",
					];

					files = files.map(function (file) {
						return cwd + file;
					});

					return files;
				}()),
				dest: '<%= productionPath %>/assets/js/lib/tipi/tipi.js',
			}
		},

		zetzer: {
			options: {
				partials: "<%= developmentPath %>/inc/partials/",
				templates: "<%= developmentPath %>/inc/templates/"
			},
			development: {
				files: [{
					expand: true,
					cwd: '<%= developmentPath %>/',
					src: '*.html',
					dest: '<%= productionPath %>/',
					ext: '.html',
					flatten: false
				}]
			},
			modules: {
				files: [{
					expand: true,
					cwd: '<%= modulePath %>/',
					src: 'tipi.*/*.html',
					dest: '<%= productionPath %>/pages/',
					ext: '.html',
					flatten: false
				}]
			}
		},

		clean: {
			development: {
				src: [
					'<%= productionPath %>'
				]
			}
		},

		copy: {
			development: {
				expand: true,
				cwd: '<%= developmentPath %>/',
				src: [
					'assets/**'
				],
				dest: '<%= productionPath %>/'
			}
		},

		combine_mq: {
			production: {
				expand: true,
				cwd: '<%= developmentPath %>/assets/css/',
				src: ['**/*.css', '!**/*.min.css'],
				dest: '<%= developmentPath %>/assets/css/'
			}
		},

		cssmin: {
			production: {
				files: [{
					expand: true,
					cwd: '<%= developmentPath %>/assets/css',
					src: ['*.css', '!*.min.css'],
					dest: '<%= productionPath %>/assets/css',
					ext: '.min.css'
				}]
			}
		},

		image: {
			production: {
				options: {
					jpegRecompress: true,
					jpegoptim: true,
					mozjpeg: true,
					svgo: true
				},
				files: [{
					expand: true,
					cwd: '<%= productionPath %>/assets/img/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: '<%= productionPath %>/assets/img/'
				}]
			}
		},

		replace: {
			production: {
				src: ['<%= productionPath%>/**/*.html'],
				dest: '<%= productionPath%>/',
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
						from: 'tipi.js',
						to: 'tipi.min.js'
					}
				]
			}
		},

		cachebreaker: {
			production: {
				options: {
					match: [
						'cached',
						'css/*/tipi.min.css',
						'js/*/tipi.min.js'
					]
				},
				files: {
					src: [
						'<%= productionPath %>/**/*.html'
					]
				}
			}
		},

		watch: {
			options: {
				spawn: false
			},
			assets: {
				files: [
					'<%= developmentPath %>/assets/**/*',

					'!**/node_modules/**'
				],
				tasks: [
					'newer:copy:development',
					'cachebreaker:production'
				],
				options : {
					event: ['added', 'deleted']
				}
			},
			scss: {
				files: [
					'<%= developmentPath %>/assets/sass/**/*.scss',
					'<%= modulePath %>/**/*.scss',

					'!**/node_modules/**',
				],
				tasks: [
					'sass_globbing:development',
					'compass:development',
					'svgstore:development',
					'newer:copy:development'
				],
				options: {
					interrupt: true,
					spawn : true
				}
			},
			svg: {
				files: [
					'<%= developmentPath %>/**/*.svg'
				],
				tasks: [
					'svgstore:development',
					'newer:copy:development'
				]
			},
			js: {
				files: [
					'<%= modulePath %>/**/tipi.*.js'
				],
				tasks: [
					'concat:modules'
				]
			},
			html: {
				files: [
					'<%= developmentPath %>/**/*.html',
					'<%= modulePath %>/**/*.html'
				],
				tasks: [
					'zetzer:development',
					'zetzer:modules',
					'cachebreaker:production'
				]
			},
			reload: {
				files: [
					'<%= productionPath %>/**/*.css'
				],
				options : {
					livereload : true,
					livereloadOnError: false
				}
			},
			config: {
				files : [
					'Gruntfile.js'
				],
				options : {
					reload : true
				}
			}
		},

		connect: {
			development: {
				options: {
					port: 8000,
					base: '<%= productionPath %>',
					livereload: true,
					open: {
						target: 'http://localhost:8000'
					}
				}
			}
		},

		concurrent: {
			development: [
				'sass_globbing:development',
				'compass:development',
				'svgstore:development',
				'concat:modules',
				'zetzer:development',
				'zetzer:modules',
			],
			production: [
				'combine_mq:production',
				'cssmin:production',
				'newer:image:production'
			]
		}
	});

	grunt.registerTask(
		'default', [
			'clean:development',
			'concurrent:development',
			'copy:development'
		]
	);


	grunt.registerTask(
		'serve', [
			'clean:development',
			'concurrent:development',
			'copy:development',
			'connect:development',
			'watch'
		]
	);


	grunt.registerTask(
		'build', [
			'clean:development',
			'concurrent:development',
			'copy:development',
			'concurrent:production',
			'replace:production',
			'cachebreaker:production'
		]
	);
};