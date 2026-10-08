const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const { exec } = require('child_process');

const paths = {
  scss: {
    src: './scss/**/*.scss',
    dest: './css'
  },
  templates: {
    src: './templates/**/*.html.twig'
  }
};

function styles() {
  return gulp.src(paths.scss.src)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest(paths.scss.dest));
}

function clearCache(cb) {
  console.log('Cambios detectados en Twig. Limpiando caché de Drupal...');
  exec('ddev drush cr', function (err, stdout, stderr) {
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    console.log('Caché limpia. Recarga el navegador.');
    cb(err);
  });
}

function watch() {
  gulp.watch(paths.scss.src, styles);
  gulp.watch(paths.templates.src, clearCache);
}

exports.styles = styles;
exports.clearCache = clearCache;
exports.watch = watch;

exports.default = gulp.series(styles, watch);