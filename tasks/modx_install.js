module.exports = function () {
    $.gulp.task('modx_config', function (done) {
        $.gulp.src('src/modx/config.xml')
            .pipe($.gp.replace('s_database_name',       settings.db_name))
            .pipe($.gp.replace('s_database_user',       settings.user_name))
            .pipe($.gp.replace('s_database_password',   settings.project_pass))
            .pipe($.gp.replace('s_sitename',            settings.site_name))
            .pipe($.gulp.dest('../setup/'));
        done();
    });
    $.gulp.task('modx_create', function (done) {
        $.gulp.src('src/chunks/main/_meta.html')
            .pipe($.gp.plumber())                                                                                                                       // Errors
            .pipe($.gp.replace('<html lang="#">','<html lang="'+ settings.site_lang +'">'))                                                             // Add html lang
            .pipe($.gp.replace('href="/favicon/','href="/assets/template/favicon/'))                                                                    // Replace faviconLinks
            .pipe($.gp.replace('href="css/main.css"', 'href="/assets/template/css/main.min.css"'))                                                      // Replace styleLinks
            .pipe($.gp.replace(/<title>(.*)<\/title>/g,                         '<title>{($_modx->resource.longtitle?:$_modx->resource.pagetitle) | htmlent} | {\'site_name\' | option}</title>'))  // Replace info
            .pipe($.gp.replace(/<meta name="description" content="">/g,         '<meta name="description" content="{$_modx->resource.description}">'))                                              // Replace info
            .pipe($.gp.replace(/<meta name="keywords" content="">/g,            '<meta name="keywords" content="{\'seoPro.keywords\' | placeholder}">'))                                            // Replace info
            .pipe($.gp.replace(/<meta charset="utf-8">/g,                       '<base href="{$_modx->config[\'site_url\']}">\n    <meta charset="utf-8">'))                                        // Replace info
            .pipe($.gp.stripComments({                                                                                                                  // Remove comments
                ignore: /<!-- {(.*)} -->/g,
                trim: true
            }))
            .pipe($.gp.replace(/<!-- {(.*)} -->/g, '{$1}'))                                                                                             // Fix for Tpl comments
            .pipe($.gp.rename(function(path) {                                                                                                          // Rename (remove '_')
                path.basename = path.basename.replace('_', '');
            }))
            .pipe($.gp.rename({extname: '.tpl'}))                                                                                                       // Rename
            .pipe($.gulp.dest('modx/chunks/main/'))                                                                                                     // Output
            .pipe($.gulp.dest('../core/elements/chunks/main/'));                                                                                        // Output
        $.gulp.src('src/chunks/main/_scripts.html')
            .pipe($.gp.plumber())                                                                                                                       // Errors
            .pipe($.gp.htmlReplace({                                                                                                                    // Add links
                'add_css': {
                    src: addcss,
                    tpl: '<link rel="stylesheet" href="%s">'
                },
                'add_js': {
                    src: addjs,
                    tpl: '<script src="%s"></script>'
                }
            }))
            .pipe($.gp.replace('href="css/styles.css"', 'href="css/styles.min.css"'))                                                                   // Replace styleLinks
            .pipe($.gp.replace('src="js/common.js"', 'src="js/common.min.js"'))                                                                         // Replace scriptLinks
            .pipe($.gp.replace('"css/', '"/assets/template/css/'))                                                                                      // Replace pathLinks
            .pipe($.gp.replace('"js/', '"/assets/template/js/'))                                                                                        // Replace pathLinks
            .pipe($.gp.stripComments({                                                                                                                  // Remove comments
                ignore: /<!-- {(.*)} -->/g,
                trim: true
            }))
            .pipe($.gp.replace(/<!-- {(.*)} -->/g, '{$1}'))                                                                                             // Fix for Tpl comments
            .pipe($.gp.rename(function(path) {                                                                                                          // Rename (remove '_')
                path.basename = path.basename.replace('_', '');
            }))
            .pipe($.gp.rename({extname: '.tpl'}))                                                                                                       // Rename
            .pipe($.gulp.dest('modx/chunks/main/'))                                                                                                     // Output
            .pipe($.gulp.dest('../core/elements/chunks/main/'));                                                                                        // Output
        $.gulp.src([path.src.chunks,'!src/chunks/main/_scripts.html', '!src/chunks/main/_meta.html'])
            .pipe($.gp.plumber())                                                                                                                       // Errors
            .pipe($.gp.replace(/\/\/= .*\/chunks\/(.*)\/_(.*).html/g,           '<!-- {include \'file:chunks/'+ '$1/' + '$2' + '.tpl\'} -->'))          // Replace importLinks (fix for remove comments)
            .pipe($.gp.stripComments({                                                                                                                  // Remove comments
                ignore: /<!-- {(.*)} -->/g,
                trim: true
            }))
            .pipe($.gp.replace(/<!-- {(.*)} -->/g, '{$1}'))                                                                                             // Fix for Tpl comments
            .pipe($.gp.replace('css/',     '/assets/template/css/'))                                                                                  // Replace pathLinks
            .pipe($.gp.replace('js/',      '/assets/template/js/'))                                                                                   // Replace pathLinks
            .pipe($.gp.replace('images/',  '/assets/template/images/'))                                                                               // Replace imageLinks
            .pipe($.gp.rename(function(path) {                                                                                                          // Rename (remove '_')
                path.basename = path.basename.replace('_', '');
            }))
            .pipe($.gp.rename({extname: '.tpl'}))                                                                                                       // Rename
            .pipe($.gulp.dest(path.modx_build.chunks))                                                                                                  // Output
            .pipe($.gulp.dest('../core/elements/chunks/'));                                                                                             // Output
        $.gulp.src(path.src.html)
            .pipe($.gp.plumber())                                                                                                                       // Errors
            .pipe($.gp.replace(/\/\/= .*\/chunks\/(.*)\/_(.*).html/g,           '<!-- {include \'file:chunks/'+ '$1/' + '$2' + '.tpl\'} -->'))          // Replace importLinks (fix for remove comments)
            .pipe($.gp.stripComments({                                                                                                                  // Remove comments
                ignore: /<!-- {(.*)} -->/g,
                trim: true
            }))
            .pipe($.gp.replace(/<!-- {(.*)} -->/g, '{$1}'))                                                                                             // Fix for Tpl comments
            .pipe($.gp.replace('css/',     '/assets/template/css/'))                                                                                  // Replace pathLinks
            .pipe($.gp.replace('js/',      '/assets/template/js/'))                                                                                   // Replace pathLinks
            .pipe($.gp.replace('images/',  '/assets/template/images/'))                                                                              // Replace imageLinks
            .pipe($.gp.rename({extname: '.tpl'}))                                                                                                       // Rename
            .pipe($.gulp.dest(path.modx_build.html))                                                                                                    // Output
            .pipe($.gulp.dest('../core/elements/pages/'));                                                                                              // Output
        done();
    });
    $.gulp.task('modx_transfer', function (done) {
        /* modx */
        $.gulp.src('src/modx/*.zip')
            .pipe($.gulp.dest('../'));
        /* quick install */
        $.gulp.src('src/modx/updsite/**/*.*')
            .pipe($.gulp.dest('../updsite/'));
        /* robots */
        $.gulp.src('src/modx/robots.txt')
            .pipe($.gulp.dest('../'));
        /* snippets */
        $.gulp.src(path.src.snippets)
            .pipe($.gulp.dest(path.modx_build.snippets))
            .pipe($.gulp.dest('../core/elements/snippets/'));
        /* plugins */
        $.gulp.src(path.src.plugins)
            .pipe($.gulp.dest(path.modx_build.plugins))
            .pipe($.gulp.dest('../core/elements/plugins/'));
        done();
    });
};