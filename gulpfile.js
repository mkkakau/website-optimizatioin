var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var ghPages = require('gulp-gh-pages');

var bases = {
  src: 'src/',
  dist: 'dist/'
};

var paths = {
  js: ['js/', 'views/js/'],
  css: ['css/', 'views/css/'],
  html: ['', 'views/']
}

// Clean Task - Obliterates dist
gulp.task('clean', function(){
  return gulp.src(bases.dist, {read: false})
    .pipe(clean());
});

// Uglify JS Task - Uglifies JS
gulp.task('uglifyJS', ['clean'], function() {
  paths.js.forEach(function(path, index, array) {
    gulp.src(bases.src + path + '*.js')
    .pipe(uglify())
    .pipe(gulp.dest(bases.dist + path));
  });
});

// Uglify CSS Task - Uglifies CSS
gulp.task('uglifyCSS', ['clean'], function() {
  paths.css.forEach(function(path, index, array) {
    gulp.src(bases.src + path + '*.css')
    .pipe(csso())
    .pipe(gulp.dest(bases.dist + path));
  });
});

// Uglify HTML Task - Uglifies HTML
gulp.task('uglifyHTML', ['clean'], function() {
  paths.html.forEach(function(path, index, array) {
    gulp.src(bases.src + path + '*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(bases.dist + path));
  });
});

gulp.task('deploy', function() {
  return gulp.src(bases.dist + '/**/*')
    .pipe(ghPages());
})

gulp.task('uglify', ['uglifyJS', 'uglifyCSS', 'uglifyHTML']);
gulp.task('default', ['uglify']);


