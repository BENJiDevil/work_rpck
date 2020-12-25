module.exports = function () {
    /* build HTML */
    $.gulp.task('html_frontb', function (done) {
        $.gulp.src(path.src.html)
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.rigger())                                                                                            // Import HTML
            .pipe($.gp.replace('<html lang="#">','<html lang="'+ settings.site_lang +'">'))                                 // Add html lang
            .pipe($.gp.replace('"/favicon/','"favicon/'))                                                                   // Favicon (fix)
            .pipe($.gp.htmlReplace({                                                                                        // Add links
                'add_css': {
                    src: addcss,
                    tpl: '<link rel="stylesheet" href="%s">'
                },
                'add_js': {
                    src: addjs,
                    tpl: '<script src="%s"></script>'
                }
            }))
            .pipe($.gp.prettyHtml({                                                                                         // Format HTML
                indent_size: 4,
                indent_char: ' ',
                unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
            }))
            .pipe($.gulp.dest(path.front_build.html))                                                                       // Output
            .pipe($.bs.reload({stream: true}));                                                                             // Reload
        done();
    });
    /* build CSS */
    $.gulp.task('style_frontb', function (done) {
        /* critical styles */
        $.gulp.src(path.src.sassCritical)
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.sourcemaps.init())                                                                                   // SourceMap Init
            .pipe($.gp.sass())                                                                   // SASS to CSS
            .pipe($.gp.autoprefixer(settings.autoprefixerOptions))                                                          // Autoprefixer
            .pipe($.gp.sourcemaps.write('.'))                                                                               // SourceMap Write
            .pipe($.gulp.dest(path.front_build.css))                                                                        // Output
            .pipe($.bs.reload({stream: true}));                                                                             // Reload
        /* main styles */
        $.gulp.src(path.src.sass)
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.sourcemaps.init())                                                                                   // SourceMap Init
            .pipe($.gp.sass())                                                                   // SASS to CSS
            .pipe($.gp.autoprefixer(settings.autoprefixerOptions))                                                          // Autoprefixer
            .pipe($.gp.sourcemaps.write('.'))                                                                               // SourceMap Write
            .pipe($.gulp.dest(path.front_build.css))                                                                        // Output
            .pipe($.bs.reload({stream: true}));                                                                             // Reload
        /* add libs styles */
        if(settings.addCssLibs){
            $.gulp.src(path.src.css)
                .pipe($.gp.plumber())                                                                                       // Errors
                .pipe($.gp.concat('libs.css'))                                                                              // Concat
                .pipe($.gp.autoprefixer(settings.autoprefixerOptions))                                                      // Autoprefixer
                .pipe($.gp.cleanCss({                                                                                       // Minify CSS
                    level: {
                        1: {
                            all: true,
                            normalizeUrls: false
                        },
                        2: {
                            restructureRules: true
                        }
                    }
                }))
                .pipe($.gp.rename({suffix: '.min'}))                                                                        // Rename
                .pipe($.gulp.dest(path.front_build.css))                                                                    // Output
                .pipe($.bs.reload({stream: true}));                                                                         // Reload
        }
        done();
    });
    /* build JS */
    $.gulp.task('js_frontb', function (done){
        /* main libs */
        $.gulp.src(jslibs)
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.concat('libs.js'))                                                                                   // Concat
            .pipe($.gp.stripComments({trim: true}))                                                                         // Remove comments
            .pipe($.gp.uglify())                                                                                            // Minify JS
            .pipe($.gp.rename({suffix: '.min'}))                                                                            // Rename
            .pipe($.gulp.dest(path.front_build.js))                                                                        // Output
            .pipe($.bs.reload({stream: true}));                                                                             // Reload
        /* add libs */
        if(settings.addJsLibs){
            $.gulp.src(path.src.js)
                .pipe($.gp.plumber())                                                                                       // Errors
                .pipe($.gp.concat('addlibs.js'))                                                                            // Concat
                .pipe($.gp.stripComments({trim: true}))                                                                     // Remove comments
                .pipe($.gp.uglify())                                                                                        // Minify JS
                .pipe($.gp.rename({suffix: '.min'}))                                                                        // Rename
                .pipe($.gulp.dest(path.front_build.js))                                                                    // Output
                .pipe($.bs.reload({stream: true}));                                                                             // Reload
        }
        /* common scripts */
        $.gulp.src('src/js/common.js')
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.rigger())                                                                                            // Import
            .pipe($.gulp.dest(path.front_build.js))                                                                         // Output
            .pipe($.bs.reload({stream: true}));                                                                             // Reload
        done();
    });
    /* build images */
    $.gulp.task('images_frontb', function (done){
        /* background images */
        if(settings.imagesBg){
            $.gulp.src(path.src.imgBg)
                .pipe($.gulp.dest(path.front_build.imgBg + '/desk'));
        }
        /* images for pad */
        if(settings.imagesBg){
            $.gulp.src(path.src.imgBg)
                .pipe($.gp.plumber())
                .pipe($.gp.responsive({
                    '*_bg.*':{
                        width: 1024,
                        quality: 90
                    }
                }))
                .pipe($.gulp.dest(path.front_build.imgBg + '/pad'));
        }
        /* images for mobile */
        if(settings.imagesBg){
            $.gulp.src(path.src.imgBg)
                .pipe($.gp.plumber())
                .pipe($.gp.responsive({
                    '*_bg.*':{
                        width: 576,
                        quality: 90
                    }
                }))
                .pipe($.gulp.dest(path.front_build.imgBg + '/mobile'));
        }

        /* images */
        $.gulp.src(path.src.imgAll)
            .pipe($.gulp.dest(path.front_build.imgAll));
        /* svg */
        if(settings.imagesSvg){
            $.gulp.src(path.src.imgSvg)
                .pipe($.gulp.dest(path.front_build.imgSvg));
        }

        /* sprites */
        if(settings.spritePng){
            var spriteData =
                $.gulp.src(path.src.spritesPng)
                    .pipe($.gp.plumber())
                    .pipe($.gp.imagemin ([
                        $.gp.imagemin.optipng({optimizationLevel: 5})
                    ]))
                    .pipe($.gp.spritesmith({
                        imgName: 'sprite.png',
                        cssName: 'sprite.min.css',
                        imgPath: '../images/sprites/sprite.png',
                        cssFormat: 'css',
                        algorithm: 'binary-tree',
                        padding: 5,
                        cssVarMap: function(sprite) {
                            sprite.name = 's-' + sprite.name;
                        }
                    }));
            spriteData.img.pipe($.gulp.dest(path.front_build.sprites));
            spriteData.css.pipe($.gp.stripComments.text({trim: true}));
            spriteData.css.pipe($.gp.cleanCss({
                level: {
                    1: {
                        all: true,
                        normalizeUrls: false
                    },
                    2: {
                        restructureRules: true
                    }
                }
            }));
            spriteData.css.pipe($.gulp.dest(path.front_build.spritesCss));
        }
        if(settings.spriteSvg){
            $.gulp.src(path.src.spritesSvg)
                .pipe($.gp.svgSprite({
                    mode: {
                        stack: {
                            sprite: "../sprite.svg"
                        }
                    }
                }))
                .pipe($.gulp.dest(path.front_build.sprites));
        }
        done();
    });
    /* transfer */
    $.gulp.task('transfer_frontb', function (done){
        /* fonts */
        $.gulp.src(path.src.fonts)
            .pipe($.gulp.dest(path.front_build.fonts));
        /* favicon */
        $.gulp.src(path.src.favicon)
            .pipe($.gulp.dest(path.front_build.favicon));
        /* docs */
        $.gulp.src(path.src.doc)
            .pipe($.gulp.dest(path.front_build.doc));
        /* php */
        if(settings.sendFile){
            $.gulp.src(path.src.php)
                .pipe($.gulp.dest(path.front_build.php));
        }
        done();
    });
    /* server */
    $.gulp.task('server_frontb', function (){
        $.bs.init({                                                                                                         // browserSync
            server: {                                                                                                       // Parameters
                baseDir: 'build'                                                                                            // Main directory
            },
            port: 3000,
            notify: false,                                                                                                  // Notify
            open: false,                                                                                                    // Open
            // tunnel: true,                                                                                                // Tunnel (does not work)
            // tunnel: "project1", // page address ==> https://project1.localtunnel.me
        });
    });
    /* reload */
    $.gulp.task('watch_frontb', function (){
        $.gulp.watch(path.front_watch.html, $.gulp.series('html_frontb'));                                                  // HTML Watch
        $.gulp.watch(path.front_watch.chunks, $.gulp.series('html_frontb'));                                                // HTML chunks Watch
        $.gulp.watch(path.front_watch.css, $.gulp.series('style_frontb'));                                                  // CSS / SASS Watch
        $.gulp.watch(path.front_watch.js, $.gulp.series('js_frontb'));                                                      // JS Watch
        $.gulp.watch(path.front_watch.img, $.gulp.series('images_frontb'));                                                 // Images Watch
        $.gulp.watch(path.front_watch.sprites, $.gulp.series('images_frontb'));                                             // Images Watch
    });
};