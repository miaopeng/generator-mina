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

const format = (string) => {
  let username = string ? string.toLowerCase() : '';
  return username.replace(/\s/g, '');
}

const defaults = (() => {
  let homeDir = process.env.Home || process.env.HOMEPATH || process.env.USERPROFILE;
  let workingDirName = process.cwd().split('/').pop().split('\\').pop();
  let osUserName = homeDir && homeDir.split('/').pop() || 'root';
  let configFile = homeDir + '/.gitconfig';
  let user = {};

  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user;
  }
  return {
    templateName: workingDirName,
    username: format(user.name) || osUserName,
    authorEmail: user.email || ''
  };
})();

gulp.task('default', function (done) {

  let prompts = [
    { type: 'input', name: 'projectName', message: '您的项目名称是？', default: defaults.templateName },
    { type: 'input', name: 'projectDescription', message: '您的项目描述是？' },
    { type: 'input', name: 'authorName', message: '作者？', default: defaults.username },
    { type: 'confirm', name: 'moveon', message: '开始创建项目吗?' }
  ];

  inquirer.prompt(prompts).then(answers => {
    const spinner = ora('Generating files...').start();

    if (!answers.moveon) {
      spinner.succeed();
      return done();
    }

    const filtered = filter(['**/package.json'], { restore: true });

    gulp.src(__dirname + '/templates/**')
      .pipe(filtered)
      .pipe(template(answers))
      .pipe(filtered.restore)
      .pipe(rename(function (file) {
        if (file.basename[0] === '_' && file.extname !== '.scss') {
          file.basename = '.' + file.basename.slice(1);
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install({
        commands: {
          'package.json': 'yarn'
        }
      }))
      .on('finish', function () {
        done();
        spinner.succeed();
      })
      .resume();
  });
});