module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        var twig_options = {
            base: process.env.SRC,
            errorLogToConsole: true
        }

        var src = GULP.src(
            [
                process.env.SRC + '/**/*.twig',
                '!' + process.env.SRC + '/**/layouts/**/*.twig',
                '!' + process.env.SRC + '/**/partials/*.twig',
            ])
            .pipe(PLUGINS.plumber())
            .pipe(PLUGINS.twig(twig_options))
            .pipe(PLUGINS.faker())
            .pipe(GULP.dest(process.env.DEST));

        var packages = GULP.src(
            [
                process.env.MODULES_PATH + '/*tipi*/**/*.twig'
            ])
            .pipe(PLUGINS.plumber())
            .pipe(PLUGINS.data(function (file) {
                var data = 'data.json';

                var path = NODE_MODULES.path.relative(file.cwd, file.path);
                var extension = NODE_MODULES.path.basename(path);

                data = path.replace(extension, 'data.json');

                // Check if data.json exists
                if (!NODE_MODULES.fse.existsSync(data)) {
                    return {};
                }
                return JSON.parse(NODE_MODULES.fse.readFileSync(data));
            }))
            .pipe(PLUGINS.twig(twig_options))
            .pipe(PLUGINS.faker())
            .pipe(GULP.dest(process.env.DEST + '/packages'));

        return NODE_MODULES.merge(src, packages).pipe(PLUGINS.connect.reload());
    }
}