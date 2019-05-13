const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

// 云函数入口函数
// eslint-disable-next-line no-unused-vars, consistent-return
exports.main = async (event, _context) => {
  const { collection, type, indexKey, data } = event;

  console.log('event', event);

  try {
    const doc = db.collection(collection).doc(indexKey);
    switch (type) {
      case 'update':
        return await doc.update({ data });
      case 'remove':
        return await doc.remove();
      case 'set':
        return await doc.set({ data });
      case 'get':
        return await doc.get();
      default:
        throw new Error(`Operation Type Error: (${type})`);
    }
  } catch (e) {
    console.error(e);
  }
};
