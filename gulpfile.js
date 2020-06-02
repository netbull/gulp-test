var browserify = require('browserify'),
    gulp = require('gulp');
    watchify = require('watchify'),
    path = require('path'),
    source = require('vinyl-source-stream'),
    fs = require('fs'),
    programAppjs = 'src/app.js';

gulp.task("browserify-program",function(){
    //appname global variable set in previous task
    return browserify([programAppjs])
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task("watchify-program",function(){
    var b = browserify({
        entries: [programAppjs],
        cache: {},
        packageCache: {},
        plugin: [watchify]
    });

    b.on('update', bundle);
    b.on('log', function (msg) {console.log(msg);})
    bundle();

    function bundle() {
        b.bundle().pipe(fs.createWriteStream('./public/js/bundle.js'));
    }
});
