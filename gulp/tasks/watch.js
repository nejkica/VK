var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();
// forever = require('gulp-forever-monitor');

gulp.task('watch', function() {

  browserSync.init({
    notify: false,
    server: {
      baseDir: "./app"
    }
  });

  // gulp.start('pozeniStreznik'); //to je streznik na portu 80, medtem ko je browsersync na 3000
                                //80 uporabljam za testirat ajax, 3000 pa za stil in js
  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

  watch('./app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  });



});

gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});

// gulp.task('pozeniStreznik', function() {
//   var foreverMonitorOptions = { 
//     env: process.env,
//     args: process.argv,
//     watch: true, 
//     watchIgnorePatterns:  ['.*', 'node_modules/**', 'public/**', 'temp/**'],
//     watchDirectory: 'gulp/server/'
//   };
  
//   forever('gulp/server/server.js', foreverMonitorOptions)  
//     .on('exit', function() {
//     console.log('server was closed');
//     })
//     .on('watch:restart', function(fileInfo) { 
//     console.log('server was restarted');          
//     });
// });
