'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  async prompting() {
    this.log('Add cloud functions');
  }

  writing() {
    this.fs.copy(this.templatePath(), this.destinationPath('./project'));
  }

  end() {
    this.log('bye');
  }
};
