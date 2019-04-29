const { combineReducers } = require('../libs/redux/redux');
const { cart } = require('./cart');
const { user } = require('./user');

export default combineReducers({
  cart,
  user
});
