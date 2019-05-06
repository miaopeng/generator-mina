import { checkUpdate } from './utils/wx';

global.regeneratorRuntime = require('./libs/regenerator-runtime/runtime-module');

App({

  get store() {
    if (!this._store) {
      this._store = require('./redux/store').store;
    }
    return this._store;
  },

  onLaunch() {
    checkUpdate();
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
