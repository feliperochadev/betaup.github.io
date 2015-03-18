/*
OLDER VERSION

var gulp = require('gulp'),
	rev = require('gulp-rev'),
	revReplace = require('gulp-rev-replace'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
	pngquant = require('imagemin-pngquant');

	gulp.task('default', function() {
    var assets = useref.assets();
    return gulp.src('./src/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(rev())
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(''));
});
*/

var gulp = require('gulp'),
rev = require('gulp-rev'),
revReplace = require('gulp-rev-replace'),
useref = require('gulp-useref'),
filter = require('gulp-filter'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
csso = require('gulp-csso');

gulp.task("default", function() {
	var jsFilter = filter("**/*.js");
	var cssFilter = filter("**/*.css");

	var userefAssets = useref.assets();

	return gulp.src("./src/index.html")
    .pipe(userefAssets)      // Concatenate with gulp-useref
    .pipe(jsFilter)
    .pipe(uglify())             // Minify any javascript sources
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(csso())               // Minify any CSS sources
    .pipe(cssFilter.restore())
    .pipe(rev())                // Rename the concatenated files
    .pipe(userefAssets.restore())
    .pipe(useref())
    .pipe(revReplace())         // Substitute in new filenames
    .pipe(gulp.dest(''));
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

gulp.run('optimazing-img');