import { createStore, applyMiddleware } from '../libs/redux/redux';
import createSagaMiddleware from '../libs/redux-saga/redux-saga.umd';

import Sagas from './sagas';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(Sagas.root);

console.log('[store] created');

export const { dispatch } = store;

const noop = () => {};

export const connect = mapStateToData =>
  function wrapper(page) {
    const { onLoad: _onLoad = noop, onUnload: _onUnload = noop } = page;

    const onLoad = function onLoad(...args) {
      // 初始化状态
      this.setData(mapStateToData(store.getState()));

      // 监听状态变化
      this.unsubscribe = store.subscribe(() => {
        const newState = store.getState();
        console.log('[store] new state', JSON.stringify(newState));
        this.setData(mapStateToData(newState));
      });

      // 原 onLoad 逻辑
      _onLoad.apply(this, args);
    };

    const onUnload = function onUnload(...args) {
      this.unsubscribe();
      console.log('[store] unsubscribed');
      _onUnload.apply(this, args);
    };

    console.log('[store] connected');
    return {
      ...page,
      onLoad,
      onUnload
    };
  };
