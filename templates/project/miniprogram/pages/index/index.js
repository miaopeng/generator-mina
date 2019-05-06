import { dispatch, connect } from '../../redux/store';

const { regeneratorRuntime } = global;

const page = {
  data: {
    loading: false
  },

  onLoad() {
    dispatch({ type: 'fetch_cart' });
  },

  inc() {
    const { cart } = getApp().store.getState();
    dispatch({ type: 'update_cart_count', payload: ++cart.count });
  },

  dec() {
    const { cart } = getApp().store.getState();
    dispatch({ type: 'update_cart_count', payload: --cart.count });
  }
};

Page(connect(({ cart }) => ({ cart }))(page));
