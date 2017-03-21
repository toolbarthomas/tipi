var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var path = require('path');
var del = require('del');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var SRC = './src';
var DEST = './dist';
var ASSETS = './src/assets';
var PACKAGES = './modules'

function copy()
{
    var src = gulp.src(
    [
        'src/**/*',
        '!src/*.twig',
        '!src/*.html',
        '!src/*.scss',
        '!src/**/assets/sass/**/*',
        '!src/**/assets/img/layout/**/*',
        '!src/**/assets/js/modules/**/*',
        '!src/**/layouts/**/*',
        '!src/**/templates/**/*',
    ], { nodir: true })
    .pipe(plugins.changed(DEST))
    .pipe(gulp.dest(DEST));

    var packages = gulp.src(
    [
        './src/**/*',
        '!**/*.html',
        '!**/*.twig',
        '!**/*.sass',
        '!**/sprite/**/*',
        '!**/svg-sprite/**/*',
        '!**/sass/**/*',
        '!**/js/**/*',
        '!**/layouts/**/*',
        '!**/templates/**/*',
    ], { nodir: true })
    .pipe(gulp.dest(DEST));

    var bower_components = gulp.src(
    [
        './bower_components/**',
        '!./bower_components/*tipi*/**',
        '!./bower_components/*bourbon*/**',
    ], { nodir: true })
    .pipe(gulp.dest(DEST + '/assets/js/lib/'));

    return merge(src, packages, bower_components);
}

function clean()
{
    return del([DEST]);
}

function sass()
{
    var sass = gulp.src(ASSETS + '/sass/tipi.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sassGlob({
        ignorePaths: [
            '**/__*.scss'
        ]
    }))
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST + '/assets/css'));

    return sass.pipe(plugins.connect.reload());
}

function spritesmith()
{
    var spritesmith = gulp.src(ASSETS + '/img/layout/sprite/**.png')
    .pipe(plugins.plumber())
    .pipe(plugins.spritesmith({
        padding: 4,
        imgName: 'sprite.png',
        imgPath: '/assets/img/layout/',
        cssName: 'tipi.sprite.css',
        cssTemplate: ASSETS + '/img/layout/sprite/config.handlebars',
        cssHandlebarsHelpers : {
            divideRetina : function(value) {
                return parseInt(value) / 2;
            }
        }
    }));

    var img = spritesmith.img
    .pipe(buffer())
    .pipe(gulp.dest(DEST + '/assets/img/layout/'));

    var css = spritesmith.css
    .pipe(plugins.cssnano())
    .pipe(gulp.dest(DEST + '/assets/css/'));

    return merge(img, css).pipe(plugins.connect.reload())
}

function svgstore()
{
    var svgstore = gulp.src(ASSETS + '/img/layout/svg-sprite/**.svg')
    .pipe(plugins.plumber())
    .pipe(plugins.rename({prefix: 'glyph-'}))
    .pipe(plugins.svgmin(function (file) {
        var prefix = path.basename(file.relative, path.extname(file.relative));

        return {
            plugins: [
                {
                   cleanupIDs: {
                       prefix: prefix + '-',
                       minify: true
                   },
               },
               {
                   removeAttrs: {
                       attrs: [
                           '(fill|stroke|class|style)',
                           'svg:(width|height)'
                       ]
                   }
               }
           ]
        }
    }))
    .pipe(plugins.svgstore({
        inlineSvg: true
    }))
    .pipe(gulp.dest(DEST + '/assets/img/layout/'))

    return svgstore.pipe(plugins.connect.reload());;
}

function concat()
{

    var src = gulp.src('src/assets/js/modules/**.js')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('modules.js'))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST + '/assets/js/'));

    var packages = gulp.src(PACKAGES + '/**/tipi.*.js')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('tipi.js'))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST + '/assets/js/lib/tipi'));

    return merge(src, packages).pipe(plugins.connect.reload());
}

function twig()
{
    var src = gulp.src(
    [
        SRC + '/**/*.twig',
        '!' + SRC + '/**/layouts/**/*.twig',
        '!' + SRC + '/**/partials/*.twig',
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.twig({base : './src'}))
    .pipe(plugins.faker())
    .pipe(gulp.dest(DEST));

    var packages = gulp.src(
    [
        PACKAGES + '/*tipi*/*.twig'
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.twig({base : './src'}))
    .pipe(plugins.faker())
    .pipe(gulp.dest(DEST + '/packages'));

    return merge(src, packages).pipe(plugins.connect.reload());
}

function connect()
{
    plugins.connect.server({
        root: DEST,
        livereload: true
    });
}

gulp.task('clean', function() {
   return clean();
});

gulp.task('copy', function() {
   return copy();
});

gulp.task('styles', function() {
   return sass();
});

gulp.task('spritesmith', function () {
   return spritesmith();
});

gulp.task('svgstore', function () {
   return svgstore();
});

gulp.task('javascripts', function() {
   return concat();
});

gulp.task('pages', function() {
   return twig();
});

gulp.task('connect', function() {
   return connect();
});


gulp.task('watch', function() {
    plugins.watch([
            ASSETS + '/**/*',
        ], function() {
            gulp.start('copy');
        }
    );

    plugins.watch([
            ASSETS + '/**/*.scss',
            PACKAGES + '/**/*.scss',
        ], function() {
            gulp.start('styles');
        }
    );

    plugins.watch([
            ASSETS + '/assets/img/layout/svg-sprite/**/*.svg',
        ], function() {
            gulp.start('svgstore');
        }
    );

    plugins.watch([
            ASSETS + '/assets/img/layout/sprite/**/*.png',
        ], function() {
            gulp.start('spritesmith');
        }
    );

    plugins.watch([
            ASSETS + '/**/*.twig',
            PACKAGES + '/*tipi*/*.twig'
        ], function() {
            gulp.start('pages');
        }
    );

    plugins.watch([
            ASSETS + '/**/*.js',
            PACKAGES + '/**/tipi.*.js'
        ], function() {
            gulp.start('javascripts');
        }
    );
});

gulp.task('default', function(callback) {
    runSequence(
        'clean',
        'copy',
        [
            'styles',
            'spritesmith',
            'svgstore',
            'javascripts',
            'pages'
        ],
        callback
    );
});

gulp.task('serve', function(callback) {
    runSequence(
        'clean',
        'copy',
        [
            'styles',
            'spritesmith',
            'svgstore',
            'javascripts',
            'pages'
        ],
        'connect',
        'watch',
        callback
    );
});