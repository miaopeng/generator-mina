import { combineReducers } from '../libs/redux/redux';
import cart from './cart';

const reducersOf = model => (state = model.initialState, action) => {
  console.log('cart reducer', action, state);
  const { namespace, reducers } = model;
  try {
    const { type } = action;
    const typeMap = type.split('/');
    console.log('typeMap', typeMap);
    if (typeMap[0] === namespace && reducers[typeMap[1]]) {
      return reducers[typeMap[1]](state, action);
    }
  } catch (error) {
    return state;
  }
  return state;
};

export default combineReducers({
  [cart.namespace]: reducersOf(cart)
});
