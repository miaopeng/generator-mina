const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
// eslint-disable-next-line no-unused-vars, consistent-return
exports.main = async (event, _context) => {
  const collection = db.collection(event.collection);
  const { type, indexKey, fields, limit = 10, skip = 0 } = event;
  let { data = {} } = event;

  try {
    if (fields) {
      data = fields.reduce((pre, cur) => {
        // eslint-disable-next-line no-param-reassign
        pre[cur.name] = _[cur.command](cur.data);
        return pre;
      }, data);
    }

    console.log('data', data);

    switch (type) {
      case 'add':
        return await collection.add({ data });
      case 'update':
        return await collection.doc(indexKey).update({
          data
        });
      case 'remove':
        return await collection.where(data).remove();
      case 'get':
        return await collection
          .where(data)
          .skip(limit * skip)
          .limit(limit)
          .get();
      default:
        throw new Error(`Operation Type Error: (${type})`);
    }
  } catch (e) {
    console.error(e);
  }
};
