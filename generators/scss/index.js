'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  async prompting() {
    this.log(chalk.green('Add SASS support'));
  }

  writing() {
    this.fs.copy(this.templatePath(), this.destinationPath());

    const pkgJson = {
      scripts: {
        buildwxss: 'gulp buildwxss',
      },
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  install() {
    this.yarnInstall(['gulp', 'gulp-sass', 'gulp-rename', 'gulp-replace'], {
      dev: true,
    });
  }

  end() {
    this.log(
      chalk.bgGreen(
        'success. now you can start gulp task with `yarn buildwxss` '
      )
    );
    this.log('bye');
  }
};
