module.exports = function () {
    /* release HTML */
    $.gulp.task('html_frontr', function (done) {
        $.gulp.src(path.src.html)
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.rigger())                                                                                            // Import HTML
            .pipe($.gp.replace('<html lang="#">','<html lang="'+ settings.site_lang +'">'))                                 // Add html lang
            .pipe($.gp.replace('"/favicon/','"favicon/'))                                                                   // Favicon (fix)
            .pipe($.gp.replace('main.css', 'main.min.css'))                                                                 // Replace styleLinks
            .pipe($.gp.replace('styles.css', 'styles.min.css'))                                                             // Replace styleLinks
            .pipe($.gp.replace('common.js', 'common.min.js'))                                                               // Replace scriptLinks
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
            .pipe($.gp.stripComments({trim: true}))                                                                         // Remove comments
            .pipe($.gp.prettyHtml({                                                                                         // Format HTML
                indent_size: 4,
                indent_char: ' ',
                unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
            }))                                                                   // Format HTML
            .pipe($.gp.w3cHtmlValidator())
            .pipe($.gulp.dest(path.front_release.html));                                                                    // Output
        done();
    });
    /* release CSS */
    $.gulp.task('style_frontr', function (done) {
        /* critical styles */
        $.gulp.src(path.src.sassCritical)
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.sass())                                                                                              // SASS to CSS
            .pipe($.gp.autoprefixer(settings.autoprefixerOptions))                                                          // Autoprefixer
            .pipe($.gp.stripComments.text({trim: true}))                                                                    // Remove comments
            .pipe($.gulp.dest(path.front_release.css))                                                                      // Output
            .pipe($.gp.cleanCss({                                                                                           // Minify CSS
                level: {
                    1: {
                        all: true,
                        normalizeUrls: false,
                        specialComments: 0
                    },
                    2: {
                        restructureRules: true
                    }
                }
            }))
            .pipe($.gp.rename({suffix: '.min'}))                                                                            // Rename
            .pipe($.gulp.dest(path.front_release.css));                                                                     // Output .min
        /* main styles */
        $.gulp.src(path.src.sass)
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.sass())                                                                                              // SASS to CSS
            .pipe($.gp.autoprefixer(settings.autoprefixerOptions))                                                          // Autoprefixer
            .pipe($.gp.stripComments.text({trim: true}))                                                                    // Remove comments
            .pipe($.gulp.dest(path.front_release.css))                                                                      // Output
            .pipe($.gp.cleanCss({                                                                                           // Minify CSS
                level: {
                    1: {
                        all: true,
                        normalizeUrls: false,
                        specialComments: 0
                    },
                    2: {
                        restructureRules: true
                    }
                }
            }))
            .pipe($.gp.rename({suffix: '.min'}))                                                                            // Rename
            .pipe($.gulp.dest(path.front_release.css));                                                                     // Output .min
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
                .pipe($.gulp.dest(path.front_release.css));                                                                 // Output
        }
        done();
    });
    /* release JS */
    $.gulp.task('js_frontr', function (done){
        /* main libs */
        $.gulp.src(jslibs)
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.concat('libs.js'))                                                                                   // Concat
            .pipe($.gp.stripComments({trim: true}))                                                                         // Remove comments
            .pipe($.gp.uglify())                                                                                            // Minify JS
            .pipe($.gp.rename({suffix: '.min'}))                                                                            // Rename
            .pipe($.gulp.dest(path.front_release.js));                                                                      // Output
        /* add libs */
        if(settings.addJsLibs){
            $.gulp.src(path.src.js)
                .pipe($.gp.plumber())                                                                                       // Errors
                .pipe($.gp.concat('addlibs.js'))                                                                            // Concat
                .pipe($.gp.stripComments({trim: true}))                                                                     // Remove comments
                .pipe($.gp.uglify())                                                                                        // Minify JS
                .pipe($.gp.rename({suffix: '.min'}))                                                                        // Rename
                .pipe($.gulp.dest(path.front_release.js));                                                                  // Output
        }
        /* common scripts */
        $.gulp.src('src/js/common.js')
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.rigger())                                                                                            // Import
            .pipe($.gp.stripComments({trim: true}))                                                                         // Remove comments
            .pipe($.gulp.dest(path.front_release.js))                                                                       // Output
            .pipe($.gp.uglify())                                                                                            // Minify JS
            .pipe($.gp.rename({suffix: '.min'}))                                                                            // Rename
            .pipe($.gulp.dest(path.front_release.js));                                                                      // Output .min
        done();
    });
    /* release images */
    $.gulp.task('images_frontr', function (done){
        /* background images */
        if(settings.imagesBg){
            $.gulp.src(path.src.imgBg)
                .pipe($.gp.imagemin ([
                    $.gp.imagemin.mozjpeg({quality: 90, progressive: true}),
                    $.gp.imagemin.optipng({optimizationLevel: 5}),
                ]))
                .pipe($.gulp.dest(path.front_release.imgBg + '/desk'));
        }
        /* images for pad */
        if(settings.imagesBg) {
            $.gulp.src(path.src.imgBg)
                .pipe($.gp.plumber())
                .pipe($.gp.responsive({
                    '*_bg.*': {
                        width: 1024
                    }
                }))
                .pipe($.gp.imagemin([
                    $.gp.imagemin.mozjpeg({quality: 90, progressive: true}),
                    $.gp.imagemin.optipng({optimizationLevel: 5}),
                ]))
                .pipe($.gulp.dest(path.front_release.imgBg + '/pad'));
        }
        /* images for mobile */
        if(settings.imagesBg) {
            $.gulp.src(path.src.imgBg)
                .pipe($.gp.plumber())
                .pipe($.gp.responsive({
                    '*_bg.*': {
                        width: 576
                    }
                }))
                .pipe($.gp.imagemin([
                    $.gp.imagemin.mozjpeg({quality: 90, progressive: true}),
                    $.gp.imagemin.optipng({optimizationLevel: 5}),
                ]))
                .pipe($.gulp.dest(path.front_release.imgBg + '/mobile'));
        }

        /* images */
        $.gulp.src(path.src.imgAll)
            .pipe($.gp.imagemin ([
                $.gp.imagemin.mozjpeg({quality: 90, progressive: true}),
                $.gp.imagemin.optipng({optimizationLevel: 5}),
            ]))
            .pipe($.gulp.dest(path.front_release.imgAll));

        /* svg */
        if(settings.imagesSvg){
            $.gulp.src(path.src.imgSvg)
                .pipe($.gp.imagemin ([
                    $.gp.imagemin.svgo()
                ]))
                .pipe($.gulp.dest(path.front_release.imgSvg));
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
            spriteData.img.pipe($.gulp.dest(path.front_release.sprites));
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
            spriteData.css.pipe($.gulp.dest(path.front_release.spritesCss));
        }
        if(settings.spriteSvg){
            $.gulp.src(path.src.spritesSvg)
                .pipe($.gp.imagemin ([
                    $.gp.imagemin.svgo()
                ]))
                .pipe($.gp.svgSprite({
                    mode: {
                        stack: {
                            sprite: "../sprite.svg"
                        }
                    }
                }))
                .pipe($.gulp.dest(path.front_release.sprites));
        }
        done();
    });
    /* transfer */
    $.gulp.task('transfer_frontr', function (done){
        /* fonts */
        $.gulp.src(path.src.fonts)
            .pipe($.gulp.dest(path.front_release.fonts));
        /* favicon */
        $.gulp.src(path.src.favicon)
            .pipe($.gulp.dest(path.front_release.favicon));
        /* docs */
        $.gulp.src(path.src.doc)
            .pipe($.gulp.dest(path.front_release.doc));
        /* php */
        if(settings.sendFile){
            $.gulp.src(path.src.php)
                .pipe($.gulp.dest(path.front_release.php));
        }
        done();
    });
};