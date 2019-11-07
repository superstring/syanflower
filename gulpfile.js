/** K.Arthur 4/10/2019 */

const { src, dest, series } = require('gulp');
const rollup = require('rollup');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const _delete = require('delete');

const rollupConfig = require('./rollup.config');
const buildConfig = require('./package').buildConfig;

async function bundle() {
  const bundle = await rollup.rollup({
    input: rollupConfig.input,
    plugins: rollupConfig.plugins
  });

  return bundle.write(rollupConfig.output);
}

function build() {
  return src(buildConfig.middle)
    .pipe(babel())
    .pipe(rename({ extname: '.js' }))
    .pipe(dest(buildConfig.output))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(buildConfig.output));
}

const clean = {
  all(cb) {
    _delete([buildConfig.output], cb);
  },
  temp(cb) {
    _delete([buildConfig.middle], cb);
  }
};

// exports
exports.default = series(clean.all, bundle, build, clean.temp);
