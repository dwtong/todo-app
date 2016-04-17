var gulp = require('gulp');
var server = require('gulp-develop-server');
var livereload = require('gulp-livereload');

var options = {
  path: './server.js'
};

var files = [
  './server.js',
  './public/*.*',
  './public/css/*.*',
  './public/js/*.*'
];

gulp.task('server:start', function () {
  server.listen(options, livereload.listen);
});

gulp.task('default', ['server:start'], function () {
  
  function restart (file) {
    server.changed(function (error) {
      if(!error) livereload.changed(file.path);
    });
  }

  gulp.watch(files).on('change', restart);

});
