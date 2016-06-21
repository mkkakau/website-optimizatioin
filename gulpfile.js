var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var bases = {
  src: 'src/',
  dist: 'dist/'
};

var paths = {
  scripts: 'js/*.js'

}

// Clean Task
// Obliterates dist
gulp.task('clean', function(){
  return gulp.src(bases.dist, {read: false})
    .pipe(clean());
});

// Uglify Task
// Uglifies JS
gulp.task('uglify', function(){
  return gulp.src(bases.src + paths.scripts)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(bases.dist + 'js'));
});

gulp.task('default', ['clean', 'uglify']);
