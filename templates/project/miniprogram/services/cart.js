import request from '../utils/request';

// 购物车商品数
export function getCartCount() {
  return request('/api/cart');
}

export function updateCartCount(count) {
  return request('/api/cart', {
    method: 'POST',
    data: {
      count
    }
  });
}
