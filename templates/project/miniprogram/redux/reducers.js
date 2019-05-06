const { combineReducers } = require('../libs/redux/redux');
const { cart } = require('./cart');

export default combineReducers({
  cart,
});
