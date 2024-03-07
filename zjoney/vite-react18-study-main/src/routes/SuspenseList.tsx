import React, { Suspense, SuspenseList } from 'react';

function fetchUser(id: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ success: true, data: { id, name: '姓名' + id } });
        }, 1000*id);
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
let user1Resource = createResource(fetchUser(1));
let user2Resource = createResource(fetchUser(2));
let user3Resource = createResource(fetchUser(3));
let userResourceMap:any = {
    1:user1Resource,
    2:user2Resource,
    3:user3Resource
}
/**
 * 它会依赖一个异步加载的数据
 */
interface UserProps{
    id:number
}
function User(props:UserProps) {
    let result: any = userResourceMap[props.id].read();
    if (result.success) {
        let user = result.data;
        return <div>{user.id} {user.name}</div>
    } else {
        return null;
    }
}
/**
 * 其实就是三个promise
 * Promise.all(); 同时开始加载,都回来了再渲染
 */
export default class extends React.Component {
    render() {
        return (
            <SuspenseList revealOrder="backwards" tail="collapsed">
                <Suspense fallback={<div>3加载中....</div>}>
                    <User id={3} />
                </Suspense>
                <Suspense fallback={<div>2加载中....</div>}>
                    <User id={2} />
                </Suspense>
                <Suspense fallback={<div>1加载中....</div>}>
                    <User id={1} />
                </Suspense>
            </SuspenseList>

        )
    }
}