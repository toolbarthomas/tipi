module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        var src = GULP.src(process.env.SRC + '/assets/js/modules/**.js')
            .pipe(PLUGINS.sourcemaps.init())
            .pipe(PLUGINS.concat('modules.js'))
            .pipe(PLUGINS.sourcemaps.write('./'))
            .pipe(GULP.dest(process.env.DEST + '/assets/js/'));

        var packages = GULP.src(process.env.MODULES_PATH + '/**/tipi.*.js')
            .pipe(PLUGINS.sourcemaps.init())
            .pipe(PLUGINS.concat('tipi.js'))
            .pipe(PLUGINS.sourcemaps.write('./'))
            .pipe(GULP.dest(process.env.DEST + '/assets/js/lib/tipi'));

        return NODE_MODULES.merge(src, packages).pipe(PLUGINS.connect.reload());
    }
}