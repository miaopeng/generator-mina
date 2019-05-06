import Url from 'url-parse';
import { request as wxRequest } from './wx';
import { API_URL } from './constants';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

const failMessage = '请求失败，请稍后再试';

const checkStatus = response => {
  // debugger;
  let errMsg = '网络错误';
  let errStatusCode = -1;

  console.log('[response] checking status ', response && response.statusCode);

  if (response) {
    const { statusCode } = response;
    if (statusCode >= 200 && statusCode < 300) {
      return response;
    }
    errStatusCode = statusCode;
    if (codeMessage[statusCode]) {
      errMsg = codeMessage[statusCode];
    }
  }

  const error = new Error(errMsg);
  error.name = 'Network Error';
  error.message = errMsg;
  error.response = response;
  error.statusCode = errStatusCode;
  throw error;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {
  const app = getApp();

  let newURL = url;

  if (url.startsWith('/api/')) {
    const parsedURL = new Url(url.replace(/^\/api/, ''), true);
    parsedURL.set('hostname', `${API_URL}`);
    newURL = parsedURL.href;
  }

  const newOptions = {
    ...option
  };

  return wxRequest(newURL, newOptions)
    .then(checkStatus)
    .catch(e => {
      const { name, message, statusCode } = e;

      if (statusCode === 400 && message === 'Bad credentials') {
        return;
      }

      if (statusCode === 401) {
        app.user.refresh(() => {
          wx.reLaunch({ url: `/pages/index/index` });
        });
        return;
      }

      if (statusCode === 403) {
        return;
      }
      if (statusCode <= 504 && statusCode >= 500) {
        return;
      }

      if (statusCode >= 404 && statusCode < 422) {
        console.error(newURL, failMessage);
      }

      // 超时等内部错误
      if (e.errMsg) {
        console.log('[error]', e, newURL, e.errMsg);
        switch (e.errMsg) {
          case 'request:fail timeout':
            app.toast('抱歉，请求超时，请稍后再试', 5000);
            break;
          case 'request:fail ':
            app.toast('网络有问题，请稍后再试', 5000);
            break;
          default:
            app.toast(e.errMsg);
            break;
        }
      }
    });
}
