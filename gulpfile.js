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
    sourcemaps = require('gulp-sourcemaps');

const enabled = {
    // Disable source maps when `--production`
    maps: !argv.production,
    // Fail due to JSHint warnings only when `--production`
    failJSHint: argv.production
};

const settings = {
    theme_name: 'rc-opencart',
    input: {
        styles: function () {
            return [
                'catalog/view/theme/' + settings.theme_name + '/dev/styles/main.scss',
                'catalog/view/theme/' + settings.theme_name + '/lib/styles/**/*.scss'
            ]
        },
        scripts: function () {
            return [
                'catalog/view/theme/' + settings.theme_name + '/dev/scripts/main.js'
            ]
        },
        reload: function () {
            return [
                'catalog/view/theme/' + settings.theme_name + '/template/**/*.tpl',
                'catalog/view/theme/' + settings.theme_name + '/libs/**/*'
            ]
        }
    },
    output: {
        styles: function () {
            return 'catalog/view/theme/' + settings.theme_name + '/stylesheet'
        },
        scripts: function () {
            return 'catalog/view/theme/' + settings.theme_name + '/scripts'
        }
    }
};

// ### Styles
// `gulp styles` - Compiles, combines, and optimizes  project CSS.
gulp.task('styles', function () {
    return gulp.src(settings.input.styles())
        .pipe(gulpif(enabled.maps, sourcemaps.init()))
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulpif(enabled.maps, sourcemaps.write()))
        .pipe(gulp.dest(settings.output.styles()))
        .pipe(browserSync.reload({stream: true}))
});

// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
gulp.task('watch', function () {
    browserSync.init({
        proxy: 'http://opencart.me'
    });
    gulp.watch(settings.input.styles(), ['styles']);
    gulp.watch(settings.input.scripts(), ['scripts']);
    gulp.watch(settings.input.reload(), browserSync.reload);
});

// ### JSHint
// `gulp jshint` - Lints configuration JSON and project JS.
gulp.task('jshint', function () {
    return gulp.src(settings.input.scripts())
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
                src: '-debug.js',
                min: '.js'
            }
        }))
        .pipe(gulpif(enabled.maps, sourcemaps.write()))
        .pipe(gulp.dest(settings.output.scripts))
        .pipe(browserSync.reload({stream: true}))
});

// ### Gulp
// `gulp` - Run a complete build. To compile for production run `gulp --production`.
gulp.task('default', ['scripts', 'styles']);

gulp.task('test', function () {
    console.log(settings.input.styles()[0]);
});