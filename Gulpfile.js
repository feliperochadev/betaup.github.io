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