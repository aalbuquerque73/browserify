import gulp from 'gulp';
import path from 'path';
import through from 'through2';
import gutil from 'gulp-util';

import browserify from 'browserify';

function transform() {
    const stream = through.obj((file, encoding, cb) => {
        const feature = JSON.parse(file.contents.toString(encoding));
        
        const bundler = browserify({
            entries: [ feature.name ],
            //debug: true,
            basedir: 'gears',
            paths: [ 'gears', 'node_modules', path.join(process.cwd(), 'gears') ]
        }).transform("babelify", {presets: ["es2015"]});
        
        const data = [];
        const bundle = bundler.bundle().on('error', function(err) { console.error(err); this.emit('end'); });
        bundle.on('data', data.push.bind(data));
        bundle.on('end', function() {
            cb(null, new gutil.File({
                cwd: '',
                base: '',
                path: `${feature.name}-v${feature.version}.js`,
                contents: Buffer.concat(data)
            }));
        });
    });
    return stream;
}

function log() {
    const stream = through.obj((file, encoding, cb) => {
        console.log('>', file.path);
        console.log('>', file.contents.toString(encoding));
        console.log('>', encoding);
        cb(null, file);
    });
    return stream;
}

gulp.task('build', function () {
    return gulp.src('gears/**/feature.json')
        .pipe(transform())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', [ 'build' ]);
