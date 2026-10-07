const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function sassCompile() {
    return gulp.src('./scss/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
}

function observeChanges() {
    gulp.watch('./scss/**/*.scss', sassCompile);
}

exports.default = gulp.series(sassCompile, observeChanges)