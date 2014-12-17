var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    pngquant = require('imagemin-pngquant');

var PATHS = {
    images: {
        src: 'src/images/',
        dest: 'images'
    },
    sass: {
        src: 'src/scss/',
        dest: 'css'
    }
}

gulp.task('default', function() {

});

// Watch our sass and run the appropriate tasks
gulp.task('watch', function () {
    gulp.watch(PATHS.sass.src + '**/*.scss', ['sass']);
    gulp.watch(PATHS.images.src + '**/*', ['images']);
});

gulp.task('sass', function () {
    return gulp.src(PATHS.sass.src + '**/*.scss')
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
        .pipe(gulp.dest(PATHS.sass.dest));
});

gulp.task('images', function () {
    return gulp.src(PATHS.images.src + '**/*')
        .pipe(plugins.changed(PATHS.images.dest))
        .pipe(plugins.size())
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(PATHS.images.dest))
        .pipe(plugins.size());
});