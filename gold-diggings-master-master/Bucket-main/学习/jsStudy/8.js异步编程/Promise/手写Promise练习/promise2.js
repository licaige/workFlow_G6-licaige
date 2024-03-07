const pending = 'pending';
const fulFilled = 'fulFilled';
const rejected = 'rejected';
function MyPromise(execute){
    const that = this;
    that.status = pending;
    that.resolveFn = [];
    that.rejectFn = [];
    function resolve(value){
        // setTimeout提出来改成传参的形式
        setTimeout(_ => {
            if(that.status === pending){
                that.status = fulFilled;
                that.value = value;
                that.resolveFn.forEach(f => {
                    f(that.value)
                })
            }
        })
    }
    function reject(reason){
        setTimeout(_ => {
            if(that.status === pending){
                that.status = rejected;
                that.value = reason;
                that.rejectFn.forEach(f => {
                    f(that.value)
                })
            }
        })
    }
    try {
        execute(resolve,reject)
    } catch (error) {
        reject(error)
    }
}
MyPromise.prototype.then = function(onResolve,onReject){
    if(typeof onResolve !== 'function'){
        onResolve = value => value
    }
    if(typeof onReject !== 'function'){
        onReject = reason => {
            throw rejected(new TypeError(reason))
        }
    }
    const that = this;
    let promise;
    if(that.status === fulFilled){
        promise = new MyPromise((resolve,reject) => {
            setTimeout(_ => {
                try {
                    const x = onResolve(that.value);
                    resolvePromise(promise,x,resolve,reject)
                } catch (error) {
                    reject(error)
                }
                
            })
        })
    }else if(that.status === rejected){
        promise = new MyPromise((resolve,reject) => {
            setTimeout(_ => {
                try {
                    const x = onReject(that.value);
                    resolvePromise(promise,x,resolve,reject)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }else{
        that.resolveFn.push(_ => {
            try {
                const x = onResolve(that.value);
                resolvePromise(promise,x,resolve,reject)
            } catch (error) {
                reject(error)
            }
        })
        that.rejectFn.push(_ => {
            try {
                const x = onReject(that.value);
                resolvePromise(promise,x,resolve,reject)
            } catch (error) {
                reject(error)
            }
    }
    return promise
}
function resolvePromise(promise,x,resolve,reject){
    if(promise === x){
        return reject('x不能等于promise')
    }
    if(x instanceof MyPromise){
        if(x.status === fulFilled){
            resolve(that.value)
        }else if(x.status === rejected){
            reject(that.value)
        }else{
            x.then(y => {
                resolvePromise(promise,y,resolve,reject)
            },reject)
        }
    }else if(x !== null && (typeof x === 'object' || typeof x === 'function')){
        let executed;
        try {
            const then = x.then;
            if(typeof then === 'function'){

            }else{
                resolve(x)
            }
        } catch (error) {
            
        }
    }else{
        resolve(x)
    }
}