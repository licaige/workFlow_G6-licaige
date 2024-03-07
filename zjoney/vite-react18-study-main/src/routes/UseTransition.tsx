import React, { Suspense ,useState, useTransition} from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
//useTransition允许组件在切换到下一个界面之前等待内容加载，从而避免不必要的加载状态
function fetchUser(id: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ success: true, data: { id, name: '姓名' + id } });
            //reject({ success: false, error: '数据加载失败' });
        }, 5000);
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
interface Props{
    resource:any
}
function User(props:Props) {
    let result: any = props.resource.read();
    if (result.success) {
        let user = result.data;
        return <div>{user.id} {user.name}</div>
    } else {
        return <div>{result.error}</div>;
        //throw result.error;
    }
}
const initialResource = createResource(fetchUser(1));
export default function(){
    const [resource,setResource] = useState(initialResource);
    const [isPending,startTransition] = useTransition();
    return (
        <div>
            <Suspense fallback={<div>加载中.....</div>}>
                <User resource={resource}/>
            </Suspense>
            {isPending?<div>加载中....</div>:null}
            <button 
               onClick={
                   ()=>{
                    startTransition(()=>{
                        setResource(createResource(fetchUser(2)));
                    })
                   
                   }
               }
            >下一个用户</button>
        </div>
    )

}