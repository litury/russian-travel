/**
 * global plugins
 */

const gulp =  require("gulp");
const browserSync = require("browser-sync");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const cssimport = require("gulp-cssimport");
const uglify = require("gulp-uglify");

/**
 * server
 */

const serve = () => {
    browserSync.init({
        server: "./build"
    });

    watcher();
};

exports.serve = serve;

/**
 * markup
 */

const markup = () => {
    return gulp.src("source/markup/*.html")
        .pipe(gulp.dest("build/"))
        .pipe(browserSync.stream());
}

exports.markup = markup;

/**
 * styles
 */

const styles = () => {
    return gulp.src("source/styles/*.css")
        .pipe(cssimport())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest("build/assets/styles/"))
        .pipe(browserSync.stream());
}

exports.styles = styles;

/**
 * scripts
 */

const scripts = () => {
    return gulp.src("source/scripts/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/assets/scripts/"))
        .pipe(browserSync.stream());
};

exports.scripts = scripts;

/**
 * images
 */

const images = () => {
    return gulp.src("source/images/**/*.*")
        .pipe(gulp.dest("build/assets/images/"))
        .pipe(browserSync.stream());
};

exports.images = images;

/**
 * fonts
 */

const fonts = () => {
    return gulp.src("source/fonts/**/*.*")
        .pipe(gulp.dest("build/assets/fonts/"))
        .pipe(browserSync.stream());
};

exports.fonts = fonts;

/**
 * watcher
 */

const watcher = () => {
    gulp.watch("source/markup/*.html", gulp.series("markup"));
    gulp.watch("source/styles/**/*.css", gulp.series("styles"));
    gulp.watch("source/scripts/**/*.js", gulp.series("scripts"));
    gulp.watch("source/images/**/*.*", gulp.series("images"));
    gulp.watch("source/fonts/**/*.*", gulp.series("fonts"));
}

/**
 * default task
 */

exports.build = gulp.series(
    gulp.parallel(
        markup,
        styles,
        scripts,
        images,
        fonts,
    )
);

exports.default = gulp.series(
    gulp.parallel(
        markup,
        styles,
        scripts,
        images,
        fonts,
        serve,
    ),
    watcher
);