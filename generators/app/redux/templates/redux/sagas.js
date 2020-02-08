const { effects: sagaEffects } = require('../libs/redux-saga/redux-saga.umd');
const cart = require('./cart').default;

const { takeEvery } = sagaEffects;
const { regeneratorRuntime } = global;

exports.root = function* root() {
  const { effects, namespace } = cart;

  // eslint-disable-next-line no-restricted-syntax
  for (const key in effects) {
    // eslint-disable-next-line no-prototype-builtins
    if (effects.hasOwnProperty(key)) {
      yield takeEvery(`${namespace}/${key}`, effects[key]);
    }
  }
};
