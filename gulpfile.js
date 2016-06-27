var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var ghPages = require('gulp-gh-pages');
var imagemin = require('gulp-imagemin');
var imageresize = require('gulp-image-resize');
var rename = require('gulp-rename');

var bases = {
  src: 'src/',
  dist: 'dist/'
};

var paths = {
  js: ['js/', 'views/js/'],
  css: ['css/', 'views/css/'],
  html: ['', 'views/'],
  img: ['img/', 'views/images/'],
  thumb: ['views/images/pizzeria.jpg']
}

// Clean Task - Obliterates dist
gulp.task('clean', function(){
  return gulp.src(bases.dist, {read: false})
    .pipe(clean());
});

// Uglify JS Task - Uglifies JS
gulp.task('uglifyJS', ['clean'], function() {
  return paths.js.forEach(function(path, index, array) {
    gulp.src(bases.src + path + '*.js')
    .pipe(uglify())
    .pipe(gulp.dest(bases.dist + path));
  });
});

// Uglify CSS Task - Uglifies CSS
gulp.task('uglifyCSS', ['clean'], function() {
  return paths.css.forEach(function(path, index, array) {
    gulp.src(bases.src + path + '*.css')
    .pipe(csso())
    .pipe(gulp.dest(bases.dist + path));
  });
});

// Uglify HTML Task - Uglifies HTML
gulp.task('uglifyHTML', ['clean'], function() {
  return paths.html.forEach(function(path, index, array) {
    gulp.src(bases.src + path + '*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(bases.dist + path));
  });
});

// Minify Image Task - Minify PNG, JPEG, GIF and SVG images
gulp.task('minifyimg', function() {
  return paths.img.forEach(function(path, index, array) {
    gulp.src(bases.src + path + '*')
    .pipe(imagemin())
    .pipe(gulp.dest('.imagemin/' + path));
  });
});

gulp.task('resize', function() {
  return paths.thumb.forEach(function(path, index, array) {
    gulp.src(bases.src + path)
    .pipe(imageresize({
      width: 100,
      quality: 0.6
    }))
    .pipe(rename({
      suffix: '-100'
    }))
    .pipe(gulp.dest(bases.src + 'views/images/'))
  });
});

gulp.task('images', ['clean'], function() {
  return paths.img.forEach(function(path, index, array) {
    gulp.src('.imagemin/' + path + '*')
    .pipe(gulp.dest(bases.dist + path));
  });
});

// Deploy dist to gh-pages
gulp.task('deploy', function() {
  return gulp.src(bases.dist + '/**/*')
    .pipe(ghPages());
})

gulp.task('uglify', ['uglifyJS', 'uglifyCSS', 'uglifyHTML']);
gulp.task('default', ['clean', 'uglify', 'images']);


