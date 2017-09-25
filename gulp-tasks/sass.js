module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        var sass = GULP.src([
            process.env.SRC + '/assets/sass/tipi.scss'
        ])
        .pipe(PLUGINS.sourcemaps.init())
        .pipe(PLUGINS.sassGlob({
            ignorePaths: [
                '**/__*.scss'
            ]
        }))
        .pipe(PLUGINS.sass().on('error', PLUGINS.sass.logError))
        .pipe(PLUGINS.sourcemaps.write('./'))
        .pipe(GULP.dest(process.env.DEST + '/assets/css'));

        return sass.pipe(PLUGINS.connect.reload());
    }

    return function (callback) {
        // Define the properties for each category
        var sources = [
            {
                input: [
                    process.env.SRC + '/assets/sass/tipi.scss'
                ],
                output: process.env.DEST + '/assets/css',
                ignore_folders: [
                    'git_submodules',
                    'node_modules',
                    'bower_components'
                ]
            }
        ];

        var streams = [];

        sources.forEach(function (source) {

            //Remove the specified MODULES_PATH from the .env file. so only import our Modules once.
            var ignore_paths = source.ignore_folders;
            ignore_paths.push('**/__*.scss');
            
            ignore_paths = ignore_paths.filter(function (item) {
                return item !== process.env.MODULES_PATH
            });

            // Make a globbing path from each ignore path
            for (var index = 0; index < ignore_paths.length; index++) {
                ignore_paths[index] = '**/' + ignore_paths[index] + '/**';
            }

            var stream = GULP.src(source.input)
                .pipe(PLUGINS.sourcemaps.init())
                .pipe(PLUGINS.sassGlob({
                    ignorePaths: ignore_paths
                }))
                .pipe(PLUGINS.sass().on('error', PLUGINS.sass.logError))
                .pipe(PLUGINS.autoprefixer())
                .pipe(PLUGINS.sourcemaps.write('./'))
                .pipe(GULP.dest(source.output))

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}