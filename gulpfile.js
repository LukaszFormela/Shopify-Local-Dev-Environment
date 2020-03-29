const srcDir = './src/';
const distDir = './dist/';
const themeDirs = [
    'assets',
    'config',
    'layout',
    'locales',
    'section',
    'snippets',
    'templates'
];
var gulp = require('gulp');

/**
 * Copy files over from src to dist directories
 */
for(directory of themeDirs) {
  gulp.task('copy-' + directory, function() {
    return gulp.src([
      srcDir  + directory + '/**'
    ], {base: srcDir + directory})
      .pipe(gulp.dest(distDir + directory));
  });    
}

/**
 * Preprocess SCSS files
 */
var sass = require('gulp-sass');
var strip_css_comments = require('gulp-strip-css-comments');
var strip_json_comments = require('gulp-strip-json-comments');

gulp.task('process-styles', function() {
  return gulp.src([
    srcDir + 'styles/theme.scss'
  ])
    .pipe(sass().on('error', sass.logError))
    .pipe(strip_css_comments())
    .pipe(strip_json_comments())
    .pipe(gulp.dest(distDir + 'assets'))
});

/**
 * Concatenates styles and scripts
 */

/**
 * Sets watcher
 */
gulp.task('watch', function() {
  gulp.watch([srcDir + 'styles'], gulp.series('process-styles'));
  for(directory of themeDirs) {
    gulp.watch([srcDir + directory], gulp.series('copy-' + directory));  
  }
});

gulp.task('default', gulp.parallel(
  'copy-assets'
  ,'copy-config'
  ,'copy-layout'
  ,'copy-locales'
  ,'copy-section'
  ,'copy-snippets'
  ,'copy-templates'
  ,'process-styles'
  ,'watch'
));
