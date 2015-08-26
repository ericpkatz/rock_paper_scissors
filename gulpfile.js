var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var annotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var rimraf = require('gulp-rimraf');

gulp.task('default', function(){
  console.log('hi from gulp');
});

gulp.task('html', function(){
  return gulp.src('public/templates/*.html')
    .pipe(templateCache({
      module: 'my_world',
      root: '/templates'
    }))
    .pipe(gulp.dest('temp'));

});

gulp.task('javascript', ['html'], function(){
  return gulp.src([
    'public/javascripts/app.js', 
    'temp/templates.js', 
    'public/javascripts/**/*.js'
  ])
  .pipe(concat('all.js'))
  .pipe(annotate())
  .pipe(uglify())
  .pipe(gulp.dest('prod/'));
});

gulp.task('assets', ['javascript'], function(){
  gulp.src('temp')
    .pipe(rimraf());
});
