const Generator = require('yeoman-generator');
const yosay = require('yosay');
const userName = require('git-user-name');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve('../dotfiles'));
  }

  async prompting() {
    this.log(yosay(`开始搭建一个小程序工程`));

    const prompts = [
      {
        type: 'input',
        name: 'projectname',
        message: '使用什么名称作为此小程序的项目名？',
        default: this.appname
      },
      {
        type: 'input',
        name: 'appid',
        message: '此小程序的 appid 是？',
        default: ''
      },
      {
        type: 'input',
        name: 'projectroot',
        message: '使用什么名称作为小程序工程目录名？',
        default: 'project'
      },
      { type: 'confirm', name: 'moveon', message: '开始创建项目吗?' }
    ];

    this.props = await this.prompt(prompts);
    this.props.author = this.user.git.name();

    this.log('this.props', JSON.stringify(this.props));
  }

  writing() {
    const { projectname, projectroot } = this.props;
    this.fs.copy(
      this.templatePath('project'),
      this.destinationPath(projectroot)
    );

    this.fs.copyTpl(
      this.templatePath(`${projectroot}/project.config.json`),
      this.destinationPath(`${projectroot}/project.config.json`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath(`package.json`),
      this.destinationPath(`package.json`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath(`README.md`),
      this.destinationPath(`README.md`),
      this.props
    );
  }
};
