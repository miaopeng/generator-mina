export const SERVERS = {
  PROD: 'https://zt.fulldao.cn/zjk-api-prod',
  PROD_AUTH: 'https://zt.fulldao.cn/zjk-oauth-prod',
  DEV: 'https://zt.fulldao.cn/zjk-api',
  DEV_AUTH: 'https://zt.fulldao.cn/zjk-oauth',
  MOCK: 'http://localhost:3000',
  TEST: 'http://192.168.12.68:10002',
  TEST_AUTH: 'http://192.168.12.68:10001'
};

export const API_URL = SERVERS.PROD;
export const API_URL_AUTH = SERVERS.PROD_AUTH;
export const CLOUD_ASSET_HOST =
  'https://7072-pro-a2add4-1258707365.tcb.qcloud.la';
export const CLOUD_PIC_PATH = '/themes/default/pic';
export const CLOUD_ASSET_SUFFIX =
  '?sign=bd3cef10fc29d2f3cc4b8c03633b6c3d&t=1551151041';

export const VOUCHER_ORDER_TYPES = {
  PICKUP: 0, // 自提
  DELIVERY: 1 // 快递到付
};

export const VOUCHER_ORDER_STATUS = {
  PICKUP_PENDING: 1, // 提取中
  PICKUP_SUCCESS: 2, // 提取完成
  DELIVERY_PENDING: 3, // 配送中
  DELIVERY_SUCCESS: 4 // 配送完成
};

export const BUY_PURPOSE = {
  SAVE_TO_STORE: 1, // 存入珍久库
  DELIVERY: 2 // 自饮
};

export const TOKEN_LOG_TYPES = {
  GRANTED: 0, // 收到平台发放
  REWARDED: 1, // 收到分销奖励
  DISCOUNTED: 2 // 用于购买商品时抵扣现金
};

export const ADDRESS_PAGE_TYPES = {
  DEFAULT: 0, // 收货地址管理
  SELECTION: 1 // 用于选择地址
};

export const ZJK_ADDRESS = {
  name: '北京市 昌平区 TBD云集中心-1号楼',
  latitude: 40.22077,
  longitude: 116.23128,
  scale: 18
};

export const STORE_ONLY_PRODUCTS = [1];
export const STORE_ONLY_DELIVERY_PROVINCE = '北京市';
export const isStoreOnlyProduct = productId =>
  STORE_ONLY_PRODUCTS.indexOf(productId) !== -1;

export const CODE_USER_EXIST = 4002;

export const ORDER_STATUS = {
  PENDING: {
    CODE: 0,
    TEXT: '待付款'
  },
  CANCELED: {
    CODE: 1,
    TEXT: '已取消'
  },
  DELETED: {
    CODE: 2,
    TEXT: '已删除'
  },
  PAID: {
    CODE: 3,
    TEXT: '已付款'
  },
  ERROR: {
    CODE: 6,
    TEXT: '订单异常'
  },
  PREPARING: {
    CODE: 100,
    TEXT: '备货中'
  },
  STORED: {
    CODE: 101,
    TEXT: '已入库'
  },
  UNSHIPPED: {
    CODE: 200,
    TEXT: '待发货'
  },
  SHIPPED: {
    CODE: 201,
    TEXT: '已发货'
  }
};
