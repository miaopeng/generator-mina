const { effects } = require('../libs/redux-saga/redux-saga.umd');
const { getCartCount, updateCartCount } = require('../services/cart');
const { noop } = require('../utils/util');

const { regeneratorRuntime } = global;
const { put } = effects;
const initialState = {
  count: 0
};

exports.cart = (state = initialState, action) => {
  // console.log('cart reducer', action, state);
  switch (action.type) {
    case 'set_cart_count':
      return {
        ...state,
        count: action.count
      };
    default:
      return state;
  }
};

exports.fetch_cart = function* fetch({ callback = noop }) {
  const res = yield getCartCount();
  if (res) {
    const { count } = res.data;
    yield put({ type: 'set_cart_count', count });
    callback(count);
  }
};

exports.update_cart_count = function* update({ payload }) {
  yield updateCartCount(payload);
};
