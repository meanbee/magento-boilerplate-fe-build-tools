var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('default', function() {

});

gulp.task('watch', function () {

});

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(plugins.scssLint({
            'config': 'scsslint.yml'
        }))
        .pipe(plugins.sass({
            outputStyle: 'expanded'
        }))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
});