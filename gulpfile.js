// Require Node dotenv to enable environment variables
const ENV = require('dotenv').config();
if (ENV.error) {
    throw 'Cannot load the environment file at: /.env. You can create one by using the included .env.dist file.';
}

// Load Gulp
const GULP = require('gulp');

// Load all Gulp plugins dynamicly
const PLUGINS = require('gulp-load-plugins')();

const NODE_MODULES = {
    buffer: require('vinyl-buffer'),
    merge: require('merge-stream'),
    runSequence: require('run-sequence'),
    path: require('path'),
    del: require('del')
};

// Revision timestamp of the current date in seconds
const REVISION = new Date().getTime();

// Helper function for defining tasks
function getGulpTask(file) {
    return require('./gulp-tasks/' + file)(GULP, PLUGINS, NODE_MODULES, REVISION);
}

// Prepare tasks
GULP.task('clean', getGulpTask('clean'));
GULP.task('copy', getGulpTask('copy'));

// Stylesheets
GULP.task('sass', getGulpTask('sass'));
GULP.task('spritesmith', getGulpTask('spritesmith'));
GULP.task('svgstore', getGulpTask('svgstore'));
GULP.task('stylesheets', function (callback) {
    NODE_MODULES.runSequence(
        'spritesmith',
        [
            'svgstore',
            'sass'
        ],
        callback
    );
});

// Javascripts
GULP.task('concat', getGulpTask('concat'));
GULP.task('javascripts', function (callback) {
    NODE_MODULES.runSequence(
        'concat',
        callback
    );
});
// Pages
GULP.task('twig', getGulpTask('twig'));
GULP.task('pages', function (callback) {
    NODE_MODULES.runSequence(
        'twig',
        callback
    );
});

// Tools
GULP.task('connect', getGulpTask('connect'));
GULP.task('watch', getGulpTask('watch'));
GULP.task('serve', function (callback) {
    NODE_MODULES.runSequence(
        'clean',
        'copy',
        [
            'stylesheets',
            'spritesmith',
            'svgstore',
            'javascripts',
            'pages'
        ],
        [
            'connect',
            'watch',
        ],
        callback
    );
});

GULP.task('default', function(callback) {
    NODE_MODULES.runSequence(
        'clean',
        'copy',
        [
            'stylesheets',
            'spritesmith',
            'svgstore',
            'javascripts',
            'pages'
        ],
        callback
    );
});