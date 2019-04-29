import { checkUpdate } from './utils/wx';
import { save } from './utils/util';
import T from './utils/i18n';
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
    this.store.subscribe(() => {
      const { cart } = this.store.getState();
      this.updateCartCount(cart.count);
    });
  },

  onShow(option) {
    T.init();
    const opt = JSON.stringify(option);
    console.log('onShow options', opt);

    const { giftId, pid } = option.query;
    if (giftId) {
      save('giftId', giftId);
    }
    if (pid) {
      save('pid', pid);
    }
  },

  toast(...args) {
    const { title = '', icon = 'none', duration = 2000 } = args[0];
    wx.showToast({
      title: typeof args[0] === 'string' ? args[0] : title,
      icon,
      duration: args[1] ? args[1] : duration
    });
  },

  // 更新购物车 tab icon 上的数字
  updateCartCount(count) {
    const index = 1;
    if (count > 0) {
      wx.showTabBarRedDot({ index });
      wx.setTabBarBadge({
        index,
        text: String(count)
      });
    } else {
      wx.removeTabBarBadge({ index });
      wx.hideTabBarRedDot({ index });
    }
  }
});
