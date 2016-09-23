module.exports = function(grunt) {

	require('jit-grunt')(grunt, {
		sprite: 'grunt-spritesmith',
		cachebreaker: 'grunt-cache-breaker',
		replace: 'grunt-text-replace',
		cmq: 'grunt-combine-media-queries'
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sourcePath: 'src',
		precompiledPath: '.tmp',
		distributionPath: 'dist',
		buildPath: 'build',

		modulePath: 'git_submodules',

		sass_globbing: {
			development: {
				files: {
					'<%= sourcePath %>/assets/sass/_tipi.import.components.scss': [
						'<%= modulePath %>/**/*.base.*.scss',
						'<%= modulePath %>/**/*.tool.*.scss',
						'<%= modulePath %>/**/*.component.*.scss'
					]
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
				quiet: true,
				require : [
					'sass-globbing',
				]
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
			development: {
				files: {
					'<%= precompiledPath %>/assets/img/layout/svg-sprite.svg': [
						'<%= sourcePath %>/assets/img/layout/svg-sprite/**/*.svg'
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
			development: {
				src: [
					'<%= precompiledPath %>',
					'<%= distributionPath %>',
					'<%= buildPath %>'
				]
			}
		},

		copy: {
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

		image: {
			production: {
				options: {
					pngquant: true,
					optipng: false,
					zopflipng: true,
					jpegRecompress: true,
					jpegoptim: true,
					mozjpeg: true,
					gifsicle: true,
					svgo: false
				},
				files: [{
					expand: true,
					cwd: '<%= sourcePath %>/assets/img/',
					src: ['**/*.{png,jpg,jpeg,gif}'],
					dest: '<%= buildPath %>/assets/img/'
				}]
			}
		},

		uglify: {
			production: {
				options: {
					compress : {
						drop_console : true
					},
					sourceMap : false
				},
				files: {
					'<%= buildPath %>/assets/js/main.min.js': '<%= distributionPath %>/assets/js/main.js',
					'<%= buildPath %>/assets/js/lib/tipi/tipi.min.js': '<%= distributionPath %>/assets/js/lib/tipi/tipi.js'
				}
			}
		},

		replace: {
			build: {
				src: ['<%= precompiledPath%>/**/*.html'],
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
					'sprite:development',
					'compass:development',
					'svgstore:development',
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
				]
			},
			js: {
				files: [
					'<%= modulePath %>/**/tipi.*.js',
					'<%= sourcePath %>/assets/js/*.js'
				],
				tasks: [
					'concat:modules',
					'newer:copy:precompiled_to_distribution'
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
			development: {
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
			development: [
				'sass_globbing:development',
				'sprite:development',
				'compass:development',
				'svgstore:development',
				'concat:modules',
				'zetzer:development',
				'zetzer:modules'
			],
			build: [
				'cmq:build',
				'newer:image:production',
				'uglify:production'
			]
		}
	});

	grunt.registerTask(
		'default', [
			'clean:development',
			'concurrent:development',
			'copy:precompiled_to_distribution',
			'newer:copy:source_to_distribution'
		]
	);


	grunt.registerTask(
		'serve', [
			'clean:development',
			'concurrent:development',
			'copy:precompiled_to_distribution',
			'copy:source_to_distribution',
			'connect:development',
			'watch'
		]
	);

	grunt.registerTask(
		'build', [
			'clean:development',
			'concurrent:development',
			'copy:precompiled_to_distribution',
			'newer:copy:source_to_distribution',
			'copy:distribution_to_build',
			'concurrent:build',
			'cssmin:build',
			'replace:build',
			'cachebreaker:build'
		]
	);
};