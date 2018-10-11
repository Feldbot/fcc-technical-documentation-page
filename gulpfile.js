// Include gulp
const gulp = require('gulp');

// Include plugins
const sass = require('gulp-ruby-sass');
const browserSync = require('browser-sync').create();
// const rename = require('gulp-rename');
// const uglify = require('gulp-uglify');

// Rename & Uglify - renames and minifies files
// gulp.task('scripts', function() {
//   return gulp.src('')
// });

// Browser Sync - Auto browser refresh on save
// gulp.task('serve', ['sass'], function() {
//   browserSync.init({
//     server: "./src"
//   });
//   gulp.watch(['sass/*.scss'], ['sass']);
//   gulp.watch("src/*.html").on('change', browserSync.reload);
// });

// Sass - compiles, minifies, renames, and saves Sass files as css in new dir
gulp.task('sass', function() {
  return sass('sass/app.scss', {style: 'nested'})  // See Notes 1)
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'));                       // See Notes 2)
});

// Autoprefixer task (needed for Bootstrap)
gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./src/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest'));
});

// Watches files for changes when gulped from CLI
gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['sass']);
});


// Default tasks
gulp.task('default', ['autoprefixer', 'sass', 'watch']);

/***** Notes *****
 Code modified from:
 https://andy-carter.com/blog/a-beginners-guide-to-the-task-runner-gulp
 1) Returns different style formats. Reference:
    https://web-design-weekly.com/2014/06/15/different-sass-output-styles/

    alternate method, use an array to mass multiple locations:
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'sass/*.scss'])
      .pipe(sass())
      .pipe(gulp.dest("css"))
      .pipe(browserSync.stream()); // if using browserSync plugin
    Reference: https://www.youtube.com/watch?v=UAHfAbc8JkY 15:00

 2) .pipe is a nodejs function:
    https://stackoverflow.com/questions/20085513/using-pipe-in-node-js-net
    https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options

*/
