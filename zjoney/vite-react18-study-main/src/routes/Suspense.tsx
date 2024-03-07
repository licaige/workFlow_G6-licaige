import React, { Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
function fetchUser(id: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //resolve({ success: true, data: { id: 1, name: '姓名' + id } });
            reject({ success: false, error: '数据加载失败' });
        }, 1000);
    });
}
//React.lazy
function createResource(promise: Promise<any>) {
    let status = 'pending';//等待中,未知态
    let result: any;
    return {
        read() {
            if (status === 'success' || status === 'error') {
                return result;
            } else {
                throw promise.then((data: any) => {
                    status = 'success';
                    result = data;
                }, (error: any) => {
                    status = 'error';
                    result = error;
                });
            }
        }
    }
}
let userResource = createResource(fetchUser(1));
/**
 * 它会依赖一个异步加载的数据
 */
function User() {
    let result: any = userResource.read();
    if (result.success) {
        let user = result.data;
        return <div>{user.id} {user.name}</div>
    } else {
        //return <div>{result.error}</div>;
        throw result.error;
    }
}
export default class extends React.Component {
    render() {
        return (
            <ErrorBoundary fallback={<div>出错啦......</div>}>
                <Suspense fallback={<div>加载中....</div>}>
                    <User />
                </Suspense>
            </ErrorBoundary>

        )
    }
}