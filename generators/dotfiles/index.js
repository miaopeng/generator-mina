const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.log('writing - dotfiles');
    this.fs.copy(this.templatePath('.*'), this.destinationPath());
  }
};
