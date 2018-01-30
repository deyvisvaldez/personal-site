const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

gulp.task('pug', () => {
  return gulp.src('./pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./public'))
});

gulp.task('sass', () => {
  return gulp.src('./scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './public'
  });
});

gulp.task('watch', () => {
  gulp.watch('./pug/**/*.pug', ['pug']);
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./public/*.html').on('change', browserSync.reload);
  gulp.watch('./public/css/*.css').on('change', browserSync.reload);
  gulp.watch('./public/js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['pug', 'sass', 'browser-sync', 'watch']);
