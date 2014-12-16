var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('default', function() {

});

gulp.task('watch', function () {
});

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(plugins.sass({
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest('css'));
});