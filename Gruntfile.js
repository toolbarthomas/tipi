module.exports = function(grunt) {

	require('jit-grunt')(grunt, {
		sprite: 'grunt-spritesmith',
		cachebreaker: 'grunt-cache-breaker',
		replace: 'grunt-text-replace',
		cmq: 'grunt-combine-media-queries',
		bower: 'grunt-bower-task'
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sourcePath: 'src',
		precompiledPath: '.tmp',
		distributionPath: 'dist',
		buildPath: 'build',

		modulePath: 'git_submodules',

		bower: {
			install : {
				options: {
					targetDir: './bower_components/',
					layout: 'byComponent',
					install: true,
					verbose: false,
					cleanTargetDir: false,
					cleanBowerDir: false,
					bowerOptions: {
						forceLatest: false,
						production: true,
					}
				}
			}
		},

		sass_globbing: {
			development: {
				files: {
					'<%= sourcePath %>/assets/sass/_tipi.import.core.scss': [
						'<%= sourcePath %>/assets/sass/tipi.core/variables/**.scss',
						'<%= sourcePath %>/assets/sass/tipi.core/mixins/**.scss',
						'!**/__*.scss'
					],
					'<%= sourcePath %>/assets/sass/_tipi.import.custom-components.scss': [
						'<%= sourcePath %>/assets/sass/tipi.custom-components/**/*.scss',
						'!**/__*.scss'
					],
					'<%= sourcePath %>/assets/sass/_tipi.import.packages.scss': [
						'<%= modulePath %>/**/*tipi.base.*.scss',
						'<%= modulePath %>/**/*tipi.tool.*.scss',
						'<%= modulePath %>/**/*tipi.component.*.scss',
						'!**/__*.scss'
					],
				},
				options: {
					signature: false
				}
			}
		},

		compass: {
			options: {
				cssDir: '../<%= precompiledPath %>/assets/css',
				sassDir: 'assets/sass',
				imagesDir: 'assets/img',
				relativeAssets: true,
				quiet: true
			},

			development: {
				options: {
					basePath: '<%= sourcePath %>/',
					environment: 'development',
					outputStyle: 'expanded',
					noLineComments: false,
					sourcemap: true
				}
			}
		},

		sprite:{
			development: {
				src: '<%= sourcePath %>/assets/img/layout/sprite/*.png',
				cssTemplate: '<%= sourcePath %>/assets/img/layout/sprite/config.handlebars',
				dest: '<%= precompiledPath %>/assets/img/layout/sprite.png',
				destCss: '<%= precompiledPath %>/assets/css/tipi.sprite.css',
				cssHandlebarsHelpers : {
					divideRetina : function(value) {
						return parseInt(value) / 2;
					}
				}
			}
		},

		svgstore: {
			options: {
				cleanup: true,
				cleanupdefs: true,
				prefix : 'glyph-',
				inheritviewbox: true
			},
			development: {
				files: {
					'<%= precompiledPath %>/assets/img/layout/svg-sprite.svg': [
						'<%= sourcePath %>/assets/img/layout/svg-sprite/**/*.svg'
					]
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
				dest: '<%= precompiledPath %>/assets/js/lib/tipi/tipi.js',
			}
		},

		zetzer: {
			options: {
				partials: "<%= sourcePath %>/inc/partials/",
				templates: "<%= sourcePath %>/inc/templates/",
				flatten: false
			},
			development: {
				files: [{
					expand: true,
					cwd: '<%= sourcePath %>/',
					src: [
						'**/*.html',
						'!**/inc/**'
					],
					dest: '<%= precompiledPath %>/',
					ext: '.html'
				}]
			},
			modules: {
				files: [{
					expand: true,
					cwd: '<%= modulePath %>/',
					src: [
						'tipi.*/*.html',
						'!**/inc/**'
					],
					dest: '<%= precompiledPath %>/modules/',
					ext: '.html',
				}]
			}
		},

		clean: {
			gruntFolders: {
				src: [
					'<%= precompiledPath %>',
					'<%= distributionPath %>',
					'<%= buildPath %>'
				]
			}
		},

		copy: {
			bower_to_distribution: {
				expand: true,
				cwd: 'bower_components/',
				src: [
					'jquery/**',
					'svg-sprite-injector/**'
				],
				dest: '<%= distributionPath %>/assets/js/lib/'
			},
			precompiled_to_distribution: {
				expand: true,
				cwd: '<%= precompiledPath %>/',
				src: [
					'assets/**',
					'**/*.html'
				],
				dest: '<%= distributionPath %>/'
			},
			source_to_distribution: {
				expand: true,
				cwd: '<%= sourcePath %>/',
				src: [
					'assets/js/**',
					'assets/img/**',
					'!assets/img/layout/sprite/**',
					'!assets/img/layout/svg-sprite/**',
				],
				dest: '<%= distributionPath %>/'
			},
			distribution_to_build: {
				expand: true,
				cwd: '<%= distributionPath %>/',
				dest: '<%= buildPath %>/',
				src: [
					'**'
				],
			}
		},

		cssmin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= precompiledPath %>/assets/css',
					src: ['*.css', '!*.min.css'],
					dest: '<%= buildPath %>/assets/css',
					ext: '.min.css'
				}]
			}
		},

		cmq: {
			build: {
				files: {
					'<%= buildPath %>/assets/css/': ['<%= buildPath %>/assets/css/*.css']
				}
			}
		},

		imagemin: {
			build: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [
						{removeViewBox: false},
						{removeUselessStrokeAndFill: false},
						{removeEmptyAttrs: true}
					],
				},
				files: [{
					expand: true,
					cwd: '<%= sourcePath %>/assets/img/',
					src: [
						'**/*.{png,jpg,jpeg,gif,svg}',
					],
					dest: '<%= buildPath %>/assets/img/'
				}]
			}
		},

		uglify: {
			options: {
				compress : {
					drop_console : true
				},
				sourceMap : false
			},
			bower_components: {
				files: {
					'<%= distributionPath %>/assets/js/lib/svg-sprite-injector/svg-sprite-injector.min.js': '<%= distributionPath %>/assets/js/lib/svg-sprite-injector/svg-sprite-injector.js'
				}
			},
			production: {
				files: {
					'<%= buildPath %>/assets/js/lib/tipi/tipi.min.js': '<%= distributionPath %>/assets/js/lib/tipi/tipi.js',
					'<%= buildPath %>/assets/js/main.min.js': '<%= distributionPath %>/assets/js/main.js'
				}
			}
		},

		replace: {
			build: {
				src: ['<%= buildPath %>/**/*.html'],
				overwrite: true,
				replacements: [
					{
						from: 'tipi.css',
						to: 'tipi.min.css'
					},
					{
						from: 'tipi.sprite.css',
						to: 'tipi.sprite.min.css'
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
			distribution: {
				options: {
					match : [
						'cached'
					]
				},
				files: {
					src: [
						'<%= distributionPath %>/**/*.html',
					]
				}
			},

			build: {
				options: {
					match: [
						'cached',
						'css/*/tipi.min.css',
						'js/*/tipi.min.js'
					]
				},
				files: {
					src: [
						'<%= buildPath %>/**/*.html'
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
					'<%= sourcePath %>/assets/**/*',

					'!<%= sourcePath %>/assets/**/_tipi.import.*',
					'!**/node_modules/**'
				],
				tasks: [
					'newer:copy:source_to_distribution',
				],
				options : {
					event: ['added', 'deleted']
				}
			},
			scss: {
				files: [
					'<%= sourcePath %>/assets/sass/**/*.scss',
					'<%= modulePath %>/**/*.scss',

					'!<%= sourcePath %>/assets/**/_tipi.import.*',
					'!**/node_modules/**',
				],
				tasks: [
					'sass_globbing:development',
					'compass:development',
					'copy:precompiled_to_distribution',
					'newer:copy:source_to_distribution',
				],
				options: {
					interrupt: true,
					spawn : true
				}
			},
			sprite: {
				files: [
					'<%= sourcePath %>/**/*.png'
				],
				tasks: [
					'sprite:development',
					'copy:precompiled_to_distribution',
				]
			},
			svgsprite: {
				files: [
					'<%= sourcePath %>/**/*.svg'
				],
				tasks: [
					'svgstore:development',
					'copy:precompiled_to_distribution',
					'cachebreaker:distribution'
				]
			},
			js: {
				files: [
					'<%= modulePath %>/**/tipi.*.js',
					'<%= sourcePath %>/assets/js/*.js'
				],
				tasks: [
					'concat:modules',
					'newer:copy:precompiled_to_distribution',
					'newer:copy:source_to_distribution'
				]
			},
			html: {
				files: [
					'<%= sourcePath %>/**/*.html',
					'<%= modulePath %>/**/*.html'
				],
				tasks: [
					'zetzer:development',
					'zetzer:modules',
					'newer:copy:precompiled_to_distribution'
				]
			},
			reload: {
				files: [
					'<%= distributionPath %>/**/*.css'
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
			distribution: {
				options: {
					port: 8000,
					base: '<%= distributionPath %>',
					livereload: true,
					open: {
						target: 'http://localhost:8000'
					}
				}
			}
		},




		concurrent: {
			distribution: [
				[
					'clean:gruntFolders',
					'bower:install',
					'copy:bower_to_distribution',
					'uglify:bower_components'
				],
				[
					'sass_globbing:development',
					'compass:development',
					'sprite:development',
					'svgstore:development',
					'concat:modules',
					'zetzer:development',
					'zetzer:modules',
					'copy:precompiled_to_distribution',
					'copy:source_to_distribution'
				]
			],
			build: [
				[
					'newer:image:production',
				],
				[
					'uglify:production',
					'cmq:build',
					'cssmin:build'
				],
				[
					'replace:build',
					'cachebreaker:build'
				]

			]
		}
	});

	grunt.registerTask(
		'default', [
			'concurrent:distribution'
		]
	);


	grunt.registerTask(
		'serve', [
			'concurrent:distribution',
			'connect:distribution',
			'watch'
		]
	);

	grunt.registerTask(
		'build', [
			'concurrent:distribution',
			'copy:distribution_to_build',
			'concurrent:build'
		]
	);
};