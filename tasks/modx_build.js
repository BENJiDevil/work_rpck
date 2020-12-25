module.exports = function () {
    /* modx elements */
    $.gulp.task('elements_modx', function (done) {
        /* pages */
        $.gulp.src(path.modx_build.html + '*.*')
            .pipe($.gulp.dest('../core/elements/pages/'));
        /* chunks */
        $.gulp.src(path.modx_build.chunks + '**/*.*')
            .pipe($.gulp.dest('../core/elements/chunks/'));
        /* snippets */
        $.gulp.src(path.modx_build.snippets + '*.*')
            .pipe($.gulp.dest('../core/elements/snippets/'));
        /* plugins */
        $.gulp.src(path.modx_build.plugins + '*.*')
            .pipe($.gulp.dest('../core/elements/plugins/'));
        done();
    });
    /* modx CSS */
    $.gulp.task('styles_modx', function (done) {
        /* critical styles */
        $.gulp.src(path.src.sassCritical)
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.sass())                                                                                              // SASS to CSS
            .pipe($.gp.autoprefixer(settings.autoprefixerOptions))                                                          // Autoprefixer
            .pipe($.gp.stripComments.text({trim: true}))                                                                    // Remove comments
            .pipe($.gulp.dest('../assets/template/css/'))                                                                   // Output
            .pipe($.gp.cleanCss({                                                                                           // Minify CSS
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
            .pipe($.gp.rename({suffix: '.min'}))                                                                            // Rename
            .pipe($.gulp.dest('../assets/template/css/'))                                                                   // Output .min
            .pipe($.bs.reload({stream: true}));                                                                             // Reload
        /* main styles */
        $.gulp.src(path.src.sass)
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.sass())                                                                                              // SASS to CSS
            .pipe($.gp.autoprefixer(settings.autoprefixerOptions))                                                          // Autoprefixer
            .pipe($.gp.stripComments.text({trim: true}))                                                                    // Remove comments
            .pipe($.gulp.dest('../assets/template/css/'))                                                                   // Output
            .pipe($.gp.cleanCss({                                                                                           // Minify CSS
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
            .pipe($.gp.rename({suffix: '.min'}))                                                                            // Rename
            .pipe($.gulp.dest('../assets/template/css/'))                                                                   // Output .min
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
                }))                                                                                 // Minify CSS
                .pipe($.gp.rename({suffix: '.min'}))                                                                        // Rename
                .pipe($.gulp.dest('../assets/template/css/'))                                                               // Output
                .pipe($.bs.reload({stream: true}));                                                                             // Reload
        }
        done();
    });
    /* modx JS */
    $.gulp.task('js_modx', function (done){
        /* main libs */
        $.gulp.src(jslibs)
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.concat('libs.js'))                                                                                   // Concat
            .pipe($.gp.stripComments({trim: true}))                                                                         // Remove comments
            .pipe($.gp.uglify())                                                                                            // Minify JS
            .pipe($.gp.rename({suffix: '.min'}))                                                                            // Rename
            .pipe($.gulp.dest('../assets/template/js/'));                                                                   // Output
        /* add libs */
        if(settings.addJsLibs){
            $.gulp.src(path.src.js)
                .pipe($.gp.plumber())                                                                                       // Errors
                .pipe($.gp.concat('addlibs.js'))                                                                            // Concat
                .pipe($.gp.stripComments({trim: true}))                                                                     // Remove comments
                .pipe($.gp.uglify())                                                                                        // Minify JS
                .pipe($.gp.rename({suffix: '.min'}))                                                                        // Rename
                .pipe($.gulp.dest('../assets/template/js/'));                                                               // Output
        }
        /* common scripts */
        $.gulp.src('src/js/common.js')
            .pipe($.gp.plumber())                                                                                           // Errors
            .pipe($.gp.rigger())                                                                                            // Import
            .pipe($.gp.stripComments({trim: true}))                                                                         // Remove comments
            .pipe($.gulp.dest('../assets/template/js/'))                                                                    // Output
            .pipe($.gp.uglify())                                                                                            // Minify JS
            .pipe($.gp.rename({suffix: '.min'}))                                                                            // Rename
            .pipe($.gulp.dest('../assets/template/js/'));                                                                   // Output .min
        done();
    });
    /* modx images */
    $.gulp.task('images_modx', function (done){

        /* background images */
        if(settings.imagesBg) {
            $.gulp.src(path.src.imgBg)
                .pipe($.gp.imagemin([
                    $.gp.imagemin.mozjpeg({quality: 90, progressive: true}),
                    $.gp.imagemin.optipng({optimizationLevel: 5}),
                ]))
                .pipe($.gulp.dest('../assets/template/images/bg/desk/'));
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
                .pipe($.gulp.dest('../assets/template/images/bg/pad/'));
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
                .pipe($.gulp.dest('../assets/template/images/bg/mobile/'));
        }

        /* images */
        $.gulp.src(path.src.imgAll)
            .pipe($.gp.imagemin ([
                $.gp.imagemin.mozjpeg({quality: 90, progressive: true}),
                $.gp.imagemin.optipng({optimizationLevel: 5}),
            ]))
            .pipe($.gulp.dest('../assets/template/images/'));

        /* svg */
        if(settings.imagesSvg){
            $.gulp.src(path.src.imgSvg)
                .pipe($.gp.imagemin ([
                    $.gp.imagemin.svgo()
                ]))
                .pipe($.gulp.dest('../assets/template/images/svg/'));
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
            spriteData.img.pipe($.gulp.dest('../assets/template/images/sprites/'));
            spriteData.css.pipe($.gp.stripComments.text({trim: true}));
            spriteData.css.pipe($.gp.if(settings.minifyCSS, $.gp.cleanCss({
                level: {
                    1: {
                        all: true,
                        normalizeUrls: false
                    },
                    2: {
                        restructureRules: true
                    }
                }
            })));
            spriteData.css.pipe($.gulp.dest('../assets/template/css/'));
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
                .pipe($.gulp.dest('../assets/template/images/sprites/'));
        }
        done();
    });
    /* modx transfer */
    $.gulp.task('transfer_modx', function (done){
        /* fonts */
        $.gulp.src(path.src.fonts)
            .pipe($.gulp.dest('../assets/template/fonts/'));
        /* favicon */
        $.gulp.src(path.src.favicon)
            .pipe($.gulp.dest('../assets/template/favicon/'));
        /* docs */
        $.gulp.src(path.src.doc)
            .pipe($.gulp.dest('../assets/template/docs/'));
        done();
    });
    /* clean */
    $.gulp.task('clean_cache', function (done){
        /* clean cache */
        $.gulp.src('../core/cache', {read: false, allowEmpty: true})
            .pipe($.gp.clean({force: true}));
        /* clean setup */
        $.gulp.src('../setup/', {read: false, allowEmpty: true})
            .pipe($.gp.clean({force: true}));
        /* clean updsite */
        $.gulp.src('../updsite/', {read: false, allowEmpty: true})
            .pipe($.gp.clean({force: true}));
        done();
    });
    /* watch */
    $.gulp.task('watch_modx', function (){
        $.gulp.watch(path.modx_build.html,      $.gulp.series('elements_modx', 'clean_cache'));                                                    // pages
        $.gulp.watch(path.modx_build.chunks,    $.gulp.series('elements_modx', 'clean_cache'));                                                    // chunks
        $.gulp.watch(path.modx_build.snippets,  $.gulp.series('elements_modx', 'clean_cache'));                                                    // snippets
        $.gulp.watch(path.modx_build.plugins,   $.gulp.series('elements_modx', 'clean_cache'));                                                    // plugins
        $.gulp.watch(path.front_watch.css,      $.gulp.series('styles_modx', 'clean_cache'));                                                      // styles
        $.gulp.watch(path.front_watch.js,       $.gulp.series('js_modx', 'clean_cache'));                                                          // JS
        $.gulp.watch(path.front_watch.img,      $.gulp.series('images_modx', 'clean_cache'));                                                      // Images
        $.gulp.watch(path.front_watch.sprites,  $.gulp.series('images_modx', 'clean_cache'));                                                      // Images
    });
};