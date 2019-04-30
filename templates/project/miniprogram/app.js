import { checkUpdate } from './utils/wx';
import user from './user';

global.regeneratorRuntime = require('./libs/regenerator-runtime/runtime-module');

App({
  user,

  get store() {
    if (!this._store) {
      this._store = require('./redux/store').store;
    }
    return this._store;
  },

  onLaunch() {
    checkUpdate();
    this.user.init();
    // this.store.subscribe(() => {
    //   const { cart } = this.store.getState();
    //   this.updateCartCount(cart.count);
    // });
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
