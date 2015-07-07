var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    sourcemap = require('gulp-sourcemaps');

  gulp.task('sass', function() {
    return sass('./public/styles/scss', {
            sourcemap: true
        })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('public/styles/css/'));
});

  gulp.task('default', ['sass'], function() {

    gulp.watch("public/styles/scss/**/*.scss", ['sass']);
});
