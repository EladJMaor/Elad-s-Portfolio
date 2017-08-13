var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var wait = require('gulp-wait');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();


gulp.task('sass', function() {
  return watch('sass/**/*.sass', {
    ignoreInitial: false
  }, () => {
    gulp.src('sass/main.sass')
      .pipe(wait(500)) // Fixes file not found error on vscode
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(concat('bundle.css'))
      .pipe(gulp.dest('./dist/css/'));
  })
});

gulp.task('browser-sync', function() {
    browserSync.init({
        'notify': false,
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("dist/**/*.*").on('change', browserSync.reload);
});

//Watch task
gulp.task('default', ['sass', 'browser-sync']);