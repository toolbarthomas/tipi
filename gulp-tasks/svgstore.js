module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        var svgstore = GULP.src(
            [
                process.env.SRC + '/assets/img/layout/svg-sprite/**.svg'
            ])
            .pipe(PLUGINS.plumber())
            .pipe(PLUGINS.filter(function (file) {
                return file.stat && file.contents.length;
            }))
            .pipe(PLUGINS.rename({ prefix: 'glyph-' }))
            .pipe(PLUGINS.svgmin(function (file) {
                var prefix = NODE_MODULES.path.basename(file.relative, NODE_MODULES.path.extname(file.relative));

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
            .pipe(PLUGINS.svgstore({
                inlineSvg: true
            }))
            .pipe(GULP.src(process.env.DEST + '/assets/img/layout/'))

        return NODE_MODULES.merge(svgstore);
    }
}

