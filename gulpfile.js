var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    pngquant = require('imagemin-pngquant');

gulp.task('default', function() {

});

// Watch our sass and run the appropriate tasks
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(plugins.changed('css'))
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

gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(plugins.changed('images'))
        .pipe(plugins.size())
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('images'))
        .pipe(plugins.size());
});