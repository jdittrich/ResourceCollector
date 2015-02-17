var gulp = require('gulp');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var minifyCss = require('gulp-minify-css');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

gulp.task('scripts-dev', function() {
	return gulp.src('src/javascripts/*.js')
    .pipe(replace('%HOSTNAME%', 'localhost:3000'))
    .pipe(gulp.dest('public/javascripts'))
    .pipe(notify({ message: 'Scripts-dev task complete', onLast: true }));
});

gulp.task('scripts-prod', function() {
	return gulp.src('src/javascripts/*.js')
    .pipe(replace('%HOSTNAME%', 'osdrc.herokuapp.com'))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'))
    .pipe(notify({ message: 'Scripts-prod task complete', onLast: true }));
});

gulp.task('styles-dev', function() {
	return gulp.src('src/stylesheets/*.css')
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(notify({ message: 'Styles-dev task complete', onLast: true }));
});

gulp.task('styles-prod', function() {
	return gulp.src('src/stylesheets/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(notify({ message: 'Styles-prod task complete', onLast: true }));
});

gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('src/javascripts/*.js', ['scripts-dev']);

    // Watch .css files
    gulp.watch('src/stylesheets/*.css', ['styles-dev']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['public/**']).on('change', livereload.changed);
});

gulp.task('dev', ['scripts-dev', 'styles-dev', 'watch']);
gulp.task('prod', ['scripts-prod', 'styles-prod']);
gulp.task('default', ['dev']);