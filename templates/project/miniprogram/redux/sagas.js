const { effects } = require('../libs/redux-saga/redux-saga.umd');
const { fetch_cart, update_cart_count } = require('./cart');

const { takeEvery } = effects;
const { regeneratorRuntime } = global;

exports.root = function* root() {
  yield takeEvery('fetch_cart', fetch_cart);
  yield takeEvery('update_cart_count', update_cart_count);
};
