module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        var spritesmith = GULP.src(process.env.SRC + '/assets/img/layout/sprite/**.png')
            .pipe(PLUGINS.plumber())
            .pipe(PLUGINS.spritesmith({
                padding: 4,
                imgName: 'sprite.png',
                imgPath: '/assets/img/layout/',
                cssName: 'tipi.sprite.css',
                cssTemplate: process.env.SRC + '/assets/img/layout/sprite/config.handlebars',
                cssHandlebarsHelpers: {
                    outputSprite: function (image) {
                        return '/assets/img/layout/sprite.png';
                    },
                    divideRetina: function (value) {
                        return parseInt(value) / 2;
                    }
                }
            }));

        var img = spritesmith.img
            .pipe(NODE_MODULES.buffer())
            .pipe(GULP.dest(process.env.DEST + '/assets/img/layout/'));

        var css = spritesmith.css
            .pipe(PLUGINS.cssnano())
            .pipe(GULP.dest(process.env.DEST + '/assets/css/'));

        return NODE_MODULES.merge(img, css).pipe(PLUGINS.connect.reload())
    }
}