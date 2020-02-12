const { series } = require('gulp');

function clean(cb) {
  console.log('task: clean');
  cb();
}

function build(cb) {
  console.log('task: build');
  cb();
}

module.exports = series(clean, build);