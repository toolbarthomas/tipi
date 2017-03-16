var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var path = require('path');
var del = require('del');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var DEST = './dist';

function copy()
{
    return gulp.src([
            'src/**/*',
            '!src/**/*{.html, .scss}',
            '!src/**/assets/sass/**/*',
            '!src/**/assets/img/layout/**/*',
            '!src/**/assets/js/modules/**/*',
            '!src/**/layouts/**/*',
            '!src/**/templates/**/*',
        ], { nodir: true })
        .pipe(plugins.changed(DEST))
        .pipe(gulp.dest(DEST));
}

function clean()
{
    return del([DEST]);
}

function sass()
{
    return gulp
        .src('src/assets/sass/tipi.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sassGlob({
            ignorePaths: [
                '**/__*.scss'
            ]
        }))
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(DEST + '/assets/css'));
}

function spritesmith()
{
    var sprite = gulp.src('src/assets/img/layout/sprite/**.png').pipe(plugins.spritesmith({
        padding: 4,
        imgName: 'sprite.png',
        imgPath: '/assets/img/layout/',
        cssName: 'tipi.sprite.css',
        cssTemplate: 'src/assets/img/layout/sprite/config.handlebars',
        cssHandlebarsHelpers : {
            divideRetina : function(value) {
                return parseInt(value) / 2;
            }
        }
    }));

    var streams = {
        img : sprite.img
                .pipe(buffer())
                .pipe(gulp.dest(DEST + '/assets/img/layout/')),
        css : sprite.css
                .pipe(plugins.cssnano())
                .pipe(gulp.dest(DEST + '/assets/css/'))
    };

    return merge(streams.img, streams.css);
}

function svgstore()
{
    return gulp
        .src('src/assets/img/layout/svg-sprite/**.svg')
        .pipe(plugins.rename({prefix: 'glyph-'}))
        .pipe(plugins.svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    removeViewBox: false,
                    removeAttrs: {
                        attrs : [
                            'style',
                            'class',
                            'fill',
                            'stroke',
                            'fill-rule',
                            'stroke-width'
                        ]
                    },
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(plugins.svgstore({
            inlineSvg: true
        }))
        .pipe(gulp.dest(DEST + '/assets/img/layout/'));
}

function concat()
{
    return gulp.src('src/assets/js/modules/**.js')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('modules.js'))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(DEST + '/assets/js/'))
}

function nunjucks()
{
    return gulp.src([
            'src/**/*.html',
            '!src/layouts/**/*.html',
            '!src/templates/partials/**/*.html'
        ])
        .pipe(plugins.nunjucksRender({
            path: [
                'src/layouts',
                'src/templates'
            ]
        }))
        .pipe(gulp.dest(DEST));
}

function connect()
{
    plugins.connect.server({
        root: DEST,
        livereload: true
    });
}

function minifyStyles()
{
    return;
}

function minifyJavascripts()
{
    return;
}

function minifyImages()
{
    return;
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
   return nunjucks();
});

gulp.task('connect', function() {
   return connect();
});

gulp.task('watch', function() {
    gulp.watch('{./src, ./modules}/**/*.scss', ['styles']);
    gulp.watch('./src/assets/img/layout/svg-sprite/**/*.svg', ['svgstore']);
    gulp.watch('./src/assets/img/layout/sprite/**/*.png', ['spritesmith']);
    gulp.watch('{./src, ./modules}/**/*.js', ['javascripts', 'copy']);
    gulp.watch('{./src, ./modules}/**/*.html', ['pages']);
});

gulp.task('build', function() {
    minifyCss();
    minifyJs();
    minifyImg();
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