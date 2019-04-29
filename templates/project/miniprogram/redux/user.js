import { effects } from '../libs/redux-saga/redux-saga.umd';
import { getUserInfo } from '../services/user';

const { regeneratorRuntime } = global;
const { put } = effects;
const initialState = {};

exports.user = (state = initialState, { type, payload }) => {
  console.log('user reducer', type, state);
  switch (type) {
    case 'user_set':
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};

exports.user_fetch = function* user_fetch() {
  try {
    const res = yield getUserInfo();
    if (res) {
      yield put({ type: 'user_set', payload: res.data.data });
    }
  } catch (error) {
    console.log('error', error.message);
  }
};
