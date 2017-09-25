module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        var src = GULP.src([
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
        .pipe(PLUGINS.changed(process.env.DEST))
        .pipe(GULP.dest(process.env.DEST));

        var packages = GULP.src([
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
        .pipe(GULP.dest(process.env.DEST));

        var bower_components = GULP.src(
            [
                './bower_components/**',
                '!./bower_components/*tipi*/**',
                '!./bower_components/*bourbon*/**',
            ], { nodir: true })
            .pipe(GULP.dest(process.env.DEST + '/assets/js/lib/'));

        return NODE_MODULES.merge(src, packages, bower_components);
    }
}