module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        PLUGINS.watch([
            process.env.SRC + '/assets/**/*',
        ], function () {
            GULP.start('copy');
        }
        );

        PLUGINS.watch([
            process.env.SRC + '/assets/**/*.scss',
            process.env.VENDOR_PATH + '/**/*.scss',
        ], function () {
            GULP.start('stylesheets');
        }
        );

        PLUGINS.watch([
            process.env.SRC + '/assets/img/layout/svg-sprite/**/*.svg',
        ], function () {
            GULP.start('svgstore');
        }
        );

        PLUGINS.watch([
            process.env.SRC + '/assets/img/layout/sprite/**/*.png',
        ], function () {
            GULP.start('spritesmith');
        }
        );

        PLUGINS.watch([
            process.env.SRC + '/assets/**/*.js',
            process.env.VENDOR_PATH + '/**/tipi.*.js'
        ], function () {
            GULP.start('javascripts');
        }
        );

        PLUGINS.watch([
            process.env.SRC + '/**/*.twig',
            process.env.VENDOR_PATH + '/*tipi*/*.twig',
        ], function () {
            GULP.start('pages');
        }
        );
    }
}