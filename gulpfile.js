/**
 * Created by JohnTarkos on 22/02/2016.
 */
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    browserSync = require('browser-sync');


gulp.task('sass', function(){
    return gulp.src('app/scss/main.scss')
        .pipe(sass())    // ici on utilise gulp-sass
        .pipe(minifycss())
        .pipe(gulp.dest('app/css'))
        .pipe(plumber())
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
});
gulp.task('default', ['watch', 'sass']);


gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })

});
