import gulp from 'gulp';
import path from 'path';
import through from 'through2';
import gutil from 'gulp-util';

import browserify from 'browserify';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'gulp-buffer';

import module from './package.json';

function transform() {
    const entries = [],
        debug = true,
        basedir= 'gears',
        paths = [ 'gears', 'node_modules', path.join(process.cwd(), 'gears') ];

    const stream = through.obj(
        function (file, encoding, cb) {
            const feature = JSON.parse(file.contents.toString(encoding));

            entries.push(feature.name);
            cb();
        },
        function (cb) {
            const bundler = browserify({entries, debug, basedir, paths})
                .require(entries)
                .transform('babelify', {presets: ['es2015']})
                .transform('brfs');

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
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', [ 'build' ]);
