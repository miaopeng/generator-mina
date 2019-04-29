const { effects } = require('../libs/redux-saga/redux-saga.umd');
const { update_cart_count } = require('./cart');
const { user_fetch } = require('./user');

const { takeEvery } = effects;
const { regeneratorRuntime } = global;

exports.root = function* root() {
  yield takeEvery('update_cart_count', update_cart_count);
  yield takeEvery('user_fetch', user_fetch);
};
