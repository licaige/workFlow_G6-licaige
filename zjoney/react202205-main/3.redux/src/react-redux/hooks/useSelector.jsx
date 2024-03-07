import React, { useReducer, useLayoutEffect, useState, useRef } from 'react';
import ReactReduxContext from '../ReactReduxContext';
function useSelector(selector) {
    const { store } = React.useContext(ReactReduxContext);
    //React18新添加的自定义Hooks   二个参数 1 外部仓库订阅的方法 2 获取快照的方法 获取最新的状态
    return useSyncExternalStore(
        store.subscribe,
        () => selector(store.getState())
    );
}

function useSyncExternalStore(subscribe, getSnapShot) {
    let [state, setState] = useState(getSnapShot());
    //因为订阅只要一次就可以了，写在外面每次重新组件都要订阅
    useLayoutEffect(() => {
        subscribe(() => {
            setState(getSnapShot())
        });
    }, []);
    return state;
}

export default useSelector;