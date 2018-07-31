// ## Globals
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    bourbon = require('node-bourbon'),
    argv = require('minimist')(process.argv.slice(2)),
    gulpif = require('gulp-if'),
    jshint = require('gulp-jshint'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    // changed = require('gulp-changed'),
    lazypipe = require('lazypipe'),
    rev = require('gulp-rev'),
    wiredep = require('wiredep').stream,
    flatten = require('gulp-flatten');

const enabled = {
    // Enable static asset revisioning when `--production`
    rev: argv.production,
    // Disable source maps when `--production`
    maps: !argv.production,
    // Fail due to JSHint warnings only when `--production`
    failJSHint: argv.production
};

const settings = {
    theme_name: 'rc-opencart',
    local_url: 'http://opencart.me',
    path: {
        source: function () {
            return 'catalog/view/theme/' + settings.theme_name + '/dev/';
        },
        dist: function () {
            return 'catalog/view/theme/' + settings.theme_name + '/dist/';
        },
        lib: function () {
            return 'catalog/view/theme/' + settings.theme_name + '/libs/';
        }
    },
    input: {
        styles: function (isMain) {
            const styles = [
                settings.path.source() + 'styles/main.scss',
                settings.path.source() + 'styles/**/*.scss'
            ];
            if (isMain) return styles[0];
            return styles;
        },
        scripts: function (isMain) {
            let scripts_bower = require('wiredep')().js;
            let scripts_dev = [
                settings.path.source() + 'scripts/main.js',
                settings.path.source() + 'scripts/common.js'
            ];
            if (isMain) return scripts_dev;
            return scripts_bower.concat(scripts_dev);
        },
        reload: function () {
            return [
                settings.path.source() + 'template/**/*.tpl',
            ]
        },
        fonts: function () {

        }
    },
    output: {
        styles: function () {
            return settings.path.dist() + 'stylesheet'
        },
        scripts: function () {
            return settings.path.dist() + 'scripts'
        },
        fonts: function () {
            return settings.path.dist() + 'fonts'
        }
    }
};
const writeToManifest = function (directory) {
    return lazypipe()
        .pipe(gulp.dest, settings.path.dist() + directory)
        .pipe(browserSync.stream, {match: '**/*.{js,css}'})
        .pipe(rev.manifest, './assets.json', {
            base: settings.path.dist(),
            merge: true
        })
        .pipe(gulp.dest, settings.path.dist())();
};

// ### JSHint
// `gulp jshint` - Lints configuration JSON and project JS.
gulp.task('jshint', function () {
    return gulp.src(settings.input.scripts(true))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulpif(enabled.failJSHint, jshint.reporter('fail')));
});

// ### Scripts
// `gulp scripts` - Runs JSHint then compiles, combines, and optimizes Bower JS
// and project JS.
gulp.task('scripts', ['jshint'], function () {
    return gulp.src(settings.input.scripts())
        .pipe(gulpif(enabled.maps, sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.js'
            },
            noSource: true
        }))
        .pipe(gulpif(enabled.rev, rev()))
        .pipe(gulpif(enabled.maps, sourcemaps.write()))
        .pipe(gulp.dest(settings.output.scripts))
        .pipe(browserSync.reload({stream: true}))
        .pipe(writeToManifest('scripts'))
});
// ### Wiredep
// `gulp wiredep` - Automatically inject Less and Sass Bower dependencies. See
// https://github.com/taptapship/wiredep
gulp.task('wiredep', function () {
    return gulp.src(settings.input.styles(true))
        .pipe(wiredep())
        //Todo
        // .pipe(changed(settings.path.source() + 'styles', {
        //     hasChanged: changed.compareSha1Digest
        // }))
        .pipe(gulp.dest(settings.path.source() + 'styles'));
});

// ### Styles
// `gulp styles` - Compiles, combines, and optimizes  project CSS.
gulp.task('styles', ['wiredep'], function () {
    return gulp.src(settings.input.styles(true))
        .pipe(gulpif(enabled.maps, sourcemaps.init()))
        .pipe(concat('main.css'))
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulpif(enabled.rev, rev()))
        .pipe(gulpif(enabled.maps, sourcemaps.write()))
        .pipe(gulp.dest(settings.output.styles()))
        .pipe(browserSync.reload({stream: true}))
        .pipe(writeToManifest('stylesheet'))
});

// ### Fonts
// `gulp fonts` - Grabs all the fonts and outputs them in a flattened directory
// structure. See: https://github.com/armed/gulp-flatten
gulp.task('fonts', function () {
    gulp.src(settings.path.lib()+'font-awesome/fonts/fontawesome-webfont.*')
        .pipe(flatten())
        .pipe(gulp.dest(settings.output.fonts()))
        .pipe(browserSync.stream());
});

// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', require('del').bind(null, [settings.path.dist(), 'assets.json']));

// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
gulp.task('watch', ['default'], function () {
    browserSync.init({
        proxy: settings.local_url
    });
    gulp.watch(settings.input.styles(), ['styles']);
    gulp.watch(settings.input.scripts(), ['scripts']);
    gulp.watch(settings.input.reload(), browserSync.reload);
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', ['clean'],function() {
    gulp.start('scripts');
    gulp.start('styles');
    gulp.start('fonts');
});