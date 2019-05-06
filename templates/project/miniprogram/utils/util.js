export const noop = () => {};

export const save = (key, value) => {
  try {
    wx.setStorageSync(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const load = key => {
  try {
    return wx.getStorageSync(key);
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const clear = key => wx.removeStorageSync(key);

// For pages
export function getRect(selector, all) {
  return new Promise(resolve => {
    wx.createSelectorQuery()
      [all ? 'selectAll' : 'select'](selector)
      .boundingClientRect(rect => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect);
        }

        if (!all && rect) {
          resolve(rect);
        }
      })
      .exec();
  });
}

// for watch and computed
export function defineReactive(data, key, val, fn) {
  const subs = data[`$${key}`] || [];
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      if (data.$target) {
        subs.push(data.$target);
        // eslint-disable-next-line no-param-reassign
        data[`$${key}`] = subs;
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      // eslint-disable-next-line no-unused-expressions
      fn && fn(newVal);
      if (subs.length) {
        // 用 setTimeout 因为此时 this.data 还没更新
        setTimeout(() => {
          subs.forEach(sub => sub());
        }, 0);
      }
      // eslint-disable-next-line no-param-reassign
      val = newVal;
    }
  });
}

export function watch(ctx, obj) {
  Object.keys(obj).forEach(key => {
    defineReactive(ctx.data, key, ctx.data[key], value => {
      obj[key].call(ctx, value);
    });
  });
}

export function computed(ctx, obj) {
  const keys = Object.keys(obj);
  const dataKeys = Object.keys(ctx.data);
  dataKeys.forEach(dataKey => {
    defineReactive(ctx.data, dataKey, ctx.data[dataKey]);
  });
  const firstComputedObj = keys.reduce((prev, next) => {
    ctx.data.$target = function setData() {
      ctx.setData({ [next]: obj[next].call(ctx) });
    };
    // eslint-disable-next-line no-param-reassign
    prev[next] = obj[next].call(ctx);
    ctx.data.$target = null;
    return prev;
  }, {});
  ctx.setData(firstComputedObj);
}

let safeAreaCache = null;
export function getSafeArea() {
  return new Promise((resolve, reject) => {
    if (safeAreaCache != null) {
      console.log('SAFE Cache bingo!');
      resolve(safeAreaCache);
    } else {
      wx.getSystemInfo({
        success: ({ model, screenHeight, statusBarHeight }) => {
          const iphoneX = /iphone x/i.test(model);
          const iphoneNew = /iPhone11/i.test(model) && screenHeight === 812;
          safeAreaCache = {
            isIPhoneX: iphoneX || iphoneNew,
            statusBarHeight
          };
          resolve(safeAreaCache);
        },
        fail: reject
      });
    }
  });
}
