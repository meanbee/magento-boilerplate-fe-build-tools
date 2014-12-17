var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    pngquant = require('imagemin-pngquant'),
    browserSync = require('browser-sync');

var PATHS = {
    localhost: '',
    images: {
        src: 'src/images/',
        dest: 'images/'
    },
    sass: {
        src: 'src/scss/',
        dest: 'css/'
    },
    js: {
        src: 'js/',
        dest: 'js/'
    }
}

var onError = function (error) {
    plugins.util.beep();
    console.log(plugins.util.colors.red(error));
    this.emit('end');
};

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch(PATHS.sass.src + '**/*.scss', ['sass']);
    gulp.watch(PATHS.images.src + '**/*', ['images']);
    gulp.watch(PATHS.js.src + '**/*', ['js']);
});

gulp.task('sass', function () {
    return gulp.src(PATHS.sass.src + '**/*.scss')
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
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
        .pipe(gulp.dest(PATHS.sass.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
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

gulp.task('js', function () {
    return gulp.src(PATHS.js.src + '**/*.js')
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jscs());
});

gulp.task('combinemqs', function() {
    return gulp.src(PATHS.sass.dest + '**/*.css')
        .pipe(plugins.combineMq())
        .pipe(gulp.dest(PATHS.sass.dest));
});

gulp.task('browser-sync', function() {
    browserSync({
        proxy: PATHS.localhost
    });
})