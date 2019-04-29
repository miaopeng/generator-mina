const { parallel, watch } = require('gulp');

// Tasks
const buildWxss = require('./tasks/build-wxss');

const builder = parallel(buildWxss);

const watcher = function watcher() {
  watch('project/**/*.scss', { ignoreInitial: false }, builder);
};

exports.build = builder;
exports.watch = watcher;
exports.default = watcher;
