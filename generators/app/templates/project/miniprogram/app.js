import { checkUpdate } from './utils/wx';

global.regeneratorRuntime = require('./libs/regenerator-runtime/runtime-module');

App({
  onLaunch() {
    checkUpdate();
  },

  toast(...args) {
    const { title = '', icon = 'none', duration = 2000 } = args[0];
    wx.showToast({
      title: typeof args[0] === 'string' ? args[0] : title,
      icon,
      duration: args[1] ? args[1] : duration
    });
  },

});
