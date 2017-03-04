var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

// gulp.task('watch', function(callback) {
//   gulp.watch('./sites/all/themes/jf/src/js/**/*.js', ['browserify']);
//   // Watchify will watch and recompile our JS, so no need to gulp.watch it
// });

gulp.task('default', ['watch']);
// gulp.task('default', ['sass', 'images', 'markup', 'watch']);
// gulp.task('default', function () {
//   console.log("default gulp task");
// });


gulp.task('deploy', function() {
  return gulp.src('./web/**/*')
    .pipe(ghPages());
});
