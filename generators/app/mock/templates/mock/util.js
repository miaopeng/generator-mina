const success = { code: 1, data: [], msg: 'ok' };
const error = { code: 0, data: [], msg: '后台报错!' };

exports.success = success;
exports.error = error;
exports.ok = (data, opt) => ({ ...success, ...opt, data });
exports.ko = opt => ({ ...error, ...opt });
