/*
 * slush-miniprogram
 * https://github.com/miaopeng/slush-miniprogram
 *
 * Copyright (c) 2019-present, Miao Peng
 * Licensed under the MIT license.
 */

'use strict';

const gulp = require('gulp');
const install = require('gulp-install');
const conflict = require('gulp-conflict');
const rename = require('gulp-rename')
const template = require('gulp-template');
const filter = require('gulp-filter');
const inquirer = require('inquirer');
const ora = require('ora');
const userName = require('git-user-name');
const workingDirName = process.cwd().split('/').pop().split('\\').pop();

gulp.task('default', function (done) {
  const prompts = [
    { type: 'input', name: 'projectName', message: '您的项目名称是？', default: workingDirName},
    { type: 'input', name: 'projectDescription', message: '您的项目描述是？' },
    { type: 'input', name: 'authorName', message: '作者？', default: userName || ''},
    { type: 'confirm', name: 'needMock', message: '是否需要 mock server ？' },
    { type: 'confirm', name: 'moveon', message: '开始创建项目吗?' }
  ];

  inquirer.prompt(prompts).then(answers => {
    const spinner = ora('Generating files...').start();

    if (!answers.moveon) {
      spinner.succeed();
      return done();
    }

    const tplPath = __dirname + '/templates';
    const fileGlob = [tplPath + '/**'];

    console.log('answers', answers);

    if (!answers.needMock) {
      fileGlob.push('!' + __dirname + '/templates/mock{,/**}')
    }

    const fileFilter = filter(fileGlob);
    const tplFilter = filter(['**/package.json'], { restore: true });

    console.log('start...');
    
    gulp.src(fileGlob)
      .pipe(tplFilter)
      .pipe(template(answers))
      .pipe(tplFilter.restore)
      .pipe(rename(function (file) {
        if (file.basename[0] === '_' && file.extname !== '.scss') {
          file.basename = '.' + file.basename.slice(1);
        }
      }))
      // .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install({
        commands: {
          'package.json': 'yarn'
        }
      }))
      .on('finish', function () {
        done();
        console.log('finish');
        spinner.succeed();
      })
      .resume();
  });
});