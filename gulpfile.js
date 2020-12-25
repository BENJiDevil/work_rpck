"use strict";

/*
    for use this pack:
    — check settings gulpfile.js
    — front:
        - check css settings _settings.sass
        - check css libs _plugins.sass
        - check js libs _common.js
    — ModX:
        - check settings in config.php (src/modx/updsite)
        - modx_install (create main files)
        - unzip modx archive
        - cd to setup folder and use php index.php --installmode=new
        - cd to updsite folder and use index.php
        - use modx_build to work with tpls
 */

/* global vars */
global.$ = {
    gulp        :require('gulp'),                                                                                           // gulp
    gp          :require('gulp-load-plugins')(),                                                                            // load all plugins
    bs          :require('browser-sync').create(),                                                                          // browser-sync
    empty       :require('empty-dir')                                                                                       // check folder
};

/* project settings */
global.settings = {
    /* libs */
    jquery                  : true,                                                                                         // jquery
    lazyload                : true,                                                                                         // lazyload
    magnificpopup           : true,                                                                                        // magnific popup
    wow                     : false,                                                                                        // WOW
    maskedinput             : true,                                                                                        // maskedinput
    formstyler              : false,                                                                                        // formstyler
    owlcarousel             : true,                                                                                        // owl carousel
    jparallax               : false,                                                                                        // parallax
    rangeslider             : false,                                                                                        // range slider
    slickcarousel           : true,                                                                                        // slick carousel
    beforeafter             : false,                                                                                        // before/after slider
    typedjs                 : false,                                                                                        // typed js

    /* options */
    sendFile                : false,                                                                                        // include php scripts
    yaMap                   : false,                                                                                        // yandex map
    goolgeMap               : false,                                                                                        // google map
    autoprefixerOptions     : {                                                                                             // autoprefixer settings
        grid: true,
        overrideBrowserslist: ['last 15 versions', '> 0.1%', 'Firefox ESR', 'ie 8', 'ie 7']
    },

    /* modx settings */
    site_lang               : 'ru',
    site_name               : 'npck',
    db_name                 : 'npck',                                                                                  // db name
    user_name               : 'npck',                                                                                  // user name
    project_pass            : '123456',                                                                                     // db pass
    modx_version            : 'modx-2.7.3-pl',                                                                              // MODx version

    /* check folders */
    imagesBg                : !$.empty.sync('src/images/bg/'),
    imagesSvg               : !$.empty.sync('src/images/svg/'),
    spritePng               : !$.empty.sync('src/sprites/png/'),
    spriteSvg               : !$.empty.sync('src/sprites/svg/'),
    addJsLibs               : !$.empty.sync('src/js/libs/'),
    addCssLibs              : !$.empty.sync('src/css/libs/')
};

/* paths */
global.path = {
    src:            {                                                                                                                  // Source
        /* html */
        html: 'src/pages/*.html',                                                                                           // HTML
        chunks: 'src/chunks/**/_*.html',                                                                                    // HTML chunks
        /* styles */
        sassCritical: 'src/css/main.sass',                                                                                  // SASS Critical
        sass: 'src/css/styles.sass',                                                                                        // SASS
        /* add libs */
        js: 'src/js/libs/*.js',                                                                                             // add JS
        css: 'src/css/libs/**/*.css',                                                                                       // add CSS
        /* images */
        imgAll: ['src/images/**/*.*', '!src/images/bg/*.*', '!src/images/svg/*.*'],                                               // Images
        imgBg: 'src/images/bg/*.*',                                                                                         // Images (backgrounds)
        imgSvg: 'src/images/svg/*.svg',                                                                                     // Images SVG
        /* fonts */
        fonts: ['src/fonts/**/*.*','!src/fonts/*.bat'],                                                                     // Fonts
        /* sprites */
        spritesPng: 'src/sprites/png/*.png',                                                                                // Sprites
        spritesSvg: 'src/sprites/svg/*.svg',                                                                                // Sprites SVG
        /* php */
        php: 'src/include/*.php',                                                                                           // PHP
        /* favicon */
        favicon: 'src/favicon/*.*',                                                                                         // favicon
        /* docs */
        doc: 'src/docs/*.*',                                                                                                 // Docs
        /* modx */
        modx: 'src/modx/*.*',                                                                                               // ModX
        snippets: ['src/snippets/*.*', '!src/snippets/_*.*'],                                                               // Snippets
        plugins: ['src/plugins/*.*', '!src/plugins/_*.*']                                                                   // Plugins
    },
    front_watch:    {                                                                                                          // Watching
        html: 'src/pages/*.*',                                                                                              // HTML
        chunks: 'src/chunks/**/*.*',                                                                                        // HTML module
        js: 'src/js/**/*.*',                                                                                                // JS
        css: 'src/css/**/*.*',                                                                                              // CSS
        img: 'src/images/**/*.*',                                                                                           // Images
        fonts: 'src/fonts/**/*.*',                                                                                          // Fonts
        sprites: 'src/sprites/**/*.*',                                                                                      // Sprites
        favicon: 'src/favicon/*.*',                                                                                         // favicon
        php: 'src/include/*.*',                                                                                             // php
        docs: 'src/docs/*.*'                                                                                                 // docs
    },
    modx_watch:     {                                                                                                           // Watching
        html: 'modx/pages/*.*',                                                                                             // HTML
        chunks: 'modx/chunks/**/*.*',                                                                                       // HTML chunks
        js: 'src/js/**/*.*',                                                                                                // JS
        css: 'src/css/**/*.*',                                                                                              // CSS
        img: 'src/images/**/*.*',                                                                                           // Images
        fonts: 'src/fonts/**/*.*',                                                                                          // Fonts
        sprites: 'src/sprites/**/*.*',                                                                                      // Sprites
        favicon: 'src/favicon/*.*',                                                                                         // favicon
        php: 'src/include/*.*',                                                                                             // php
        docs: 'src/docs/*.*'                                                                                                 // docs
    },
    front_build:    {                                                                                                                // Build
        html: 'build/',                                                                                                     // Main
        js: 'build/js/',                                                                                                    // JS
        css: 'build/css/',                                                                                                  // CSS
        imgAll: 'build/images/',                                                                                            // Images
        imgBg: 'build/images/bg/',                                                                                          // Images (backgrounds)
        imgSvg: 'build/images/svg/',                                                                                        // Images SVG
        fonts: 'build/fonts/',                                                                                              // Fonts
        sprites: 'build/images/sprites/',                                                                                   // Sprites
        spritesCss: 'build/css/',                                                                                           // Sprites CSS
        php: 'build/include/',                                                                                              // PHP
        favicon: 'build/favicon/',                                                                                          // favicon
        doc: 'build/docs/'                                                                                                   // Docs
    },
    front_release:  {                                                                                                          // Release
        html: 'release/',                                                                                                     // Main
        js: 'release/js/',                                                                                                    // JS
        css: 'release/css/',                                                                                                  // CSS
        imgAll: 'release/images/',                                                                                            // Images
        imgBg: 'release/images/bg/',                                                                                          // Images (backgrounds)
        imgSvg: 'release/images/svg/',                                                                                        // Images SVG
        fonts: 'release/fonts/',                                                                                              // Fonts
        sprites: 'release/images/sprites/',                                                                                   // Sprites
        spritesCss: 'release/css/',                                                                                           // Sprites CSS
        php: 'release/include/',                                                                                              // PHP
        favicon: 'release/favicon/',                                                                                          // favicon
        doc: 'release/docs/'                                                                                                   // Docs
    },
    modx_build:     {                                                                                                           // Build ModX
        html: 'modx/pages/',                                                                                                // Main
        chunks: 'modx/chunks/',                                                                                             // Chunks
        js: 'modx/js/',                                                                                                     // JS
        css: 'modx/css/',                                                                                                   // CSS
        imgAll: 'modx/images/',                                                                                             // Images
        imgBg: 'modx/images/bg/',                                                                                           // Images (backgrounds)
        imgSvg: 'modx/images/svg/',                                                                                         // Images SVG
        fonts: 'modx/fonts/',                                                                                               // Fonts
        sprites: 'modx/images/sprites/',                                                                                    // Sprites
        spritesCss: 'modx/css/',                                                                                            // Sprites CSS
        favicon: 'modx/favicon/',                                                                                           // favicon
        doc: 'modx/docs/',                                                                                                   // Docs
        snippets: 'modx/snippets/',                                                                                         // Snippets
        plugins: 'modx/plugins/'                                                                                            // Plugins
    },

    clean_build: './build',                                                                                                 // build
    clean_release: './release',                                                                                             // release
    clean_modx: './modx',                                                                                                   // modx
};

/* libs */
global.jslibs = [];
if(settings.jquery)             {jslibs.push('src/libs/jquery/dist/jquery.js')}
if(settings.lazyload)           {jslibs.push('src/libs/lazysizes/lazysizes.min.js')}
if(settings.lazyload)           {jslibs.push('src/libs/lazysizes/plugins/bgset/ls.bgset.js')}
if(settings.lazyload)           {jslibs.push('src/libs/lazysizes/plugins/respimg/ls.respimg.js')}
if(settings.jparallax)          {jslibs.push('src/libs/jparallax/js/upd/jquery.parallax.js')}
if(settings.wow)                {jslibs.push('src/libs/wow/dist/wow.js')}
if(settings.maskedinput)        {jslibs.push('src/libs/jquery.maskedinput/dist/jquery.maskedinput.js')}
if(settings.formstyler)         {jslibs.push('src/libs/jquery.form-styler/dist/jquery.formstyler.min.js')}
if(settings.owlcarousel)        {jslibs.push('src/libs/owl.carousel/dist/owl.carousel.js')}
if(settings.slickcarousel)      {jslibs.push('src/libs/slick-carousel/slick/slick.min.js')}
if(settings.magnificpopup)      {jslibs.push('src/libs/magnific-popup/dist/jquery.magnific-popup.js')}
if(settings.typedjs)            {jslibs.push('src/libs/typed.js/lib/typed.js')}
if(settings.rangeslider)        {jslibs.push('src/libs/ion-rangeslider/js/ion.rangeSlider.js')}
if(settings.beforeafter)        {jslibs.push('src/libs/cocoen/dist/js/cocoen.min.js')}

global.addjs = [];
if(settings.yaMap)              {addjs.push('https://api-maps.yandex.ru/2.1/?lang=ru_RU')}
if(settings.goolgeMap)          {addjs.push('//maps.googleapis.com/maps/api/js?key=YourKey&extension=.js')}
if(settings.addJsLibs)          {addjs.push('js/addlibs.min.js')}

global.addcss = [];
if(settings.addCssLibs)         {addcss.push('css/libs.min.css')}
if(settings.spritePng)          {addcss.push('css/sprite.min.css')}

/* add tasks */
require('./tasks/front_build')();                                                                                           // front build
require('./tasks/front_release')();                                                                                         // front release
require('./tasks/modx_install')();                                                                                          // install modx
require('./tasks/modx_build')();                                                                                            // modx build

$.gulp.task('clean_build', function (done) {                                                                                // Remove ./build
    $.gulp.src(path.clean_build, {read: false, allowEmpty: true})
        .pipe($.gp.clean());
    done();
});
$.gulp.task('clean_release', function (done) {                                                                              // Remove ./release
    $.gulp.src(path.clean_release, {read: false, allowEmpty: true})
        .pipe($.gp.clean());
    done();
});
$.gulp.task('clean_modx', function (done) {                                                                                 // Remove ./modx
    $.gulp.src(path.clean_modx, {read: false, allowEmpty: true})
        .pipe($.gp.clean());
    done();
});

$.gulp.task('front_build', $.gulp.series(                                                                                   // front build
    $.gulp.parallel('html_frontb', 'transfer_frontb', 'style_frontb', 'js_frontb', 'images_frontb'),
    $.gulp.parallel('server_frontb', 'watch_frontb')
));
$.gulp.task('front_release', $.gulp.series(                                                                                 // front release
    $.gulp.parallel('html_frontr', 'transfer_frontr', 'style_frontr', 'js_frontr', 'images_frontr')
));

$.gulp.task('modx_install', $.gulp.series('modx_config', 'modx_create', 'modx_transfer'));                                  // modx install
$.gulp.task('modx_build', $.gulp.series(                                                                                    // modx build
    $.gulp.parallel('elements_modx', 'styles_modx', 'js_modx', 'images_modx', 'transfer_modx'),
    $.gulp.parallel('clean_cache'),
    $.gulp.parallel('watch_modx')
));