var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
	pngquant = require('imagemin-pngquant');


gulp.task('default', function() {
  
});

gulp.task('optimazing-img', function () {
    return gulp.src('./src/assets/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./assets/img/'));
});


gulp.task('concat-and-ref-new', function () {
    var assets = useref.assets();
    return gulp.src('./src/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(''));
});

gulp.run('optimazing-img', 'concat-and-ref-new');