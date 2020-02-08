const { effects: sagaEffects } = require('../libs/redux-saga/redux-saga.umd');
const { getCartCount, updateCartCount } = require('../services/cart');
const { noop } = require('../utils/util');

const { regeneratorRuntime } = global;
const { put } = sagaEffects;

export default {
  namespace: 'cart',

  initialState: {
    count: 0
  },

  effects: {
    *fetch({ callback = noop }) {
      const res = yield getCartCount();
      if (res) {
        const { count } = res.data;
        yield put({ type: 'cart/set_count', count });
        callback(count);
      }
    },

    *update_count({ payload }) {
      const res = yield updateCartCount(payload);
      if (res && res.data) {
        const { count } = res.data;
        yield put({ type: 'cart/set_count', count });
      }
    }
  },

  reducers: {
    set_count: (state, { count }) => ({ ...state, count })
  }
};
