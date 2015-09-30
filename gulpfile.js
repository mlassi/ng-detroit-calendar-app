'use strict';
var gulp = require('gulp')
var notify = require("gulp-notify")
var autoprefixer = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')
var plumber = require('gulp-plumber')
var sass = require('gulp-scss')
var browserSync = require('browser-sync').create()


gulp.task('serve', function() {
    browserSync.init({
        server: "",
        port: 1337
    });

    gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch(['**/*.html', '**.*.js'], [browserSync.reload]);
});

gulp.task('sass', function() {
    return gulp.src('scss/styles.scss')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(minifycss())
        .pipe(gulp.dest(''))
        .on("error", notify.onError({message: "Error: <%= error.message %>", title: "Error running something"}))
        .pipe(browserSync.stream());
});


// Default Task
gulp.task('default', ['serve']);