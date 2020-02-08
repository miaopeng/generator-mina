const Generator = require('yeoman-generator');
const userName = require('git-user-name');

module.exports = class extends Generator {
  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'appname',
        message: '您的项目名称是？',
        default: this.appname
      },
      { type: 'input', name: 'appdesc', message: '您的项目描述是？' },
      {
        type: 'input',
        name: 'author',
        message: '作者？',
        default: userName || ''
      },
      { type: 'confirm', name: 'needMock', message: '是否需要 mock server ？' },
      { type: 'confirm', name: 'moveon', message: '开始创建项目吗?' }
    ];

    const answers = await this.prompt(prompts);

    this.log('app name', answers.appname);
    this.log('app desc', answers.appdesc);
    this.log('app desc', answers.author);
    this.log('app desc', answers.needMock);
    this.log('app desc', answers.moveon);
  }
};
