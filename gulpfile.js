require('babel-register')({presets: ['es2015']});


const {spawn} = require('child_process');
const fs = require('fs-extra');
const eslint = require('gulp-eslint');
const glob = require('glob');
const gulp = require('gulp');
const gutil = require('gulp-util');
const gzipSize = require('gzip-size');
const path = require('path');
const {rollup} = require('rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const build = require('./bin/build');
const logBuildErrors = require('./bin/errors');
const server = require('./bin/server');

/**
 * @return {boolean} True if NODE_ENV is set to production or the build is
 *     running on CI.
 */
const isProd = () => {
  return process.env.NODE_ENV == 'production' || process.env.CI;
};

gulp.task('js', () => {
  if (isProd()) {
    return build('ga-task-manager.js').then(({code, map}) => {
      fs.outputFileSync('ga-task-manager.js', code, 'utf-8');
      fs.outputFileSync('ga-task-manager.map', map, 'utf-8');
      const size = (gzipSize.sync(code) / 1000).toFixed(1);
      gutil.log(
          `Built ga-task-manager.js ${gutil.colors.gray(`(${size} Kb gzipped)`)}`);
    }).catch((err) => {
      logBuildErrors(err);
      throw new Error('failed to build ga-task-manager.js');
    });
  } else {
    return rollup({
      entry: './lib/index.js',
      plugins: [
        nodeResolve(),
        babel({
          babelrc: false,
          plugins: ['external-helpers'],
          presets: [['es2015', {modules: false}]],
        }),
      ],
    }).then((bundle) => {
      return bundle.write({
        dest: 'ga-task-manager.js',
        format: 'iife',
        sourceMap: true,
      });
    });
  }
});

gulp.task('lint', () => {
  return gulp.src([
    'gulpfile.babel.js',
    'bin/ga-task-manager',
    'bin/*.js',
    'lib/*.js',
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('serve', ['js'], (done) => {
  server.start(done);
  process.on('exit', server.stop.bind(server));
});

gulp.task('watch', ['serve'], () => {
  gulp.watch('./lib/**/*.js', ['js']);
  gulp.watch([
    './lib/**/*.js',
  ]);
});
