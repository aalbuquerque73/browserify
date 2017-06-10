import gulp from 'gulp';
import path from 'path';
import through from 'through2';
import gutil from 'gulp-util';

import browserify from 'browserify';

import module from './package.json';

function transform() {
    const entries = [],
        debug = false,
        basedir= 'gears',
        paths = [ 'gears', 'node_modules', path.join(process.cwd(), 'gears') ];
    
    const stream = through.obj(
        function (file, encoding, cb) {
            const feature = JSON.parse(file.contents.toString(encoding));
            
            entries.push(feature.name);
            cb();
        },
        function (cb) {
            const bundler = browserify({entries, debug, basedir, paths}).transform("babelify", {presets: ["es2015"]});
            
            const bundle = bundler.bundle();
            cb(null, new gutil.File({
                cwd: '',
                base: '',
                path: `${module.name}-v${module.version}.js`,
                contents: bundle
            }));
            bundle.on('error', cb);
        }
    );
    
    return stream;
}

gulp.task('build', function () {
    return gulp.src('gears/**/feature.json')
        .pipe(transform())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', [ 'build' ]);
