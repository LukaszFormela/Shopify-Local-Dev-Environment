const srcDir = './src/';
const distDir = './dist/';
const themeDirs = [
    'assets',
    'config',
    'layout',
    'locales',
    'sections',
    'snippets',
    'templates'
];
var gulp = require('gulp');

/**
 * Copy files over from src to dist directories
 */
themeDirs.forEach(function(directory) {
  gulp.task('copy-' + directory, function() {
    return gulp.src([
      srcDir + directory + '/**'
    ], {base: srcDir})
      .pipe(gulp.dest(distDir));
  });    
});

/**
 * Preprocess SCSS files
 */
var sass = require('gulp-sass');
var sassUnicode = require('gulp-sass-unicode');
var replace = require('gulp-replace');
var strip_css_comments = require('gulp-strip-css-comments');
var strip_json_comments = require('gulp-strip-json-comments');

gulp.task('process-styles', function() {
  return gulp.src([
    srcDir + 'styles/theme.scss'
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(sassUnicode())
    .pipe(strip_css_comments())
    .pipe(strip_json_comments())
    .pipe(replace('../fonts/', ''))
    .pipe(gulp.dest(distDir + 'assets'))
});

/**
 * Concatenates scripts
 */
var concat = require('gulp-concat');

gulp.task('concat-scripts', function() {
  return gulp.src([
    srcDir + 'scripts/**/*.js',
    srcDir + 'scripts/*.js'
  ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(distDir + 'assets/'))
});

/**
 * Sets watcher
 */
gulp.task('watch', function() {
  gulp.watch([srcDir + 'styles'], gulp.series('process-styles'));
  gulp.watch([srcDir + 'scripts'], gulp.series('concat-scripts'));
  for(directory of themeDirs) {
    gulp.watch([srcDir + directory], gulp.series('copy-' + directory));  
  }
});

gulp.task('default', gulp.parallel(
  'copy-assets'
  ,'copy-config'
  ,'copy-layout'
  ,'copy-locales'
  ,'copy-sections'
  ,'copy-snippets'
  ,'copy-templates'
  ,'process-styles'
  ,'concat-scripts'
  ,'watch'
));
