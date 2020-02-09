const path = require('path');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const buildPath = path.join(__dirname, '../../project');

function buildWxss() {
  const pxRegExp = /(\d*\.?\d+)px(?!.*\/\*\s+pxtorpx off\s+\*\/)/gi;
  const pxReplace = pixel => {
    const p = parseFloat(pixel);
    return p === 0 ? 0 : `${2 * p}rpx`;
  };

  return src([
    './project/**/*.scss',
    '!./project/miniprogram/scss/**/*.scss',
    '!./project/miniprogram/node_modules/**',
    '!./project/miniprogram/miniprogram_npm/**'
  ])
    .pipe(replace(pxRegExp, pxReplace))
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: 'compact',
        includePaths: './project/miniprogram/scss'
      }).on('error', sass.logError)
    )
    .pipe(rename({ extname: '.wxss' }))
    .pipe(dest(buildPath));
}

module.exports = buildWxss;
