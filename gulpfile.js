 
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var reload = browserSync.reload;

// Compile /src/ Pug files to /dist/ HTML files

gulp.task('templates', function buildHTML(){
   gulp.src('src/*.pug')
   .pipe(pug())
   .pipe(gulp.dest('dist'));
  });

// Separate watcher for .pug files

gulp.task('pug-watch', ['templates'], function() {
    return reload();
});

// Live inject Sass into browser

gulp.task('sass', function() {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({ stream: true }));
});

// Watch my JS too, please.

gulp.task('reload', function() {
    return reload();
});

/**
 * Serve and watch the scss/pug files for changes
 */
gulp.task('default', ['sass', 'templates'], function() {
    browserSync({ open: false, server: './dist' });

    gulp.watch('./src/scss/*.scss', ['sass']);
    gulp.watch('./src/*.pug', ['pug-watch']);
    gulp.watch('./dist/js/*.js', ['reload'])
});