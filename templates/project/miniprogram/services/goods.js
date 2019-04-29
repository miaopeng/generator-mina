import qs from 'querystringify';
import request from '../utils/request';

// 购物车商品数
export function getCartCount() {
  return request('/api/cart/goodscount', {
    method: 'POST'
  });
}
