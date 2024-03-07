const Chainable = require('./Chainable');
class ChainedMap extends Chainable{
    constructor(parent){
        super(parent);
        //key是 字符串，value可能是任意的值Set 字符串
        this.store = new Map();
    }
    extend(methods){//['path','filename']
        methods.forEach((method)=>{
            //this.path = (newPath)=> this.store.path = newPath;
            //this.filename = (newFilename)=>this.store.filename=newFilename
            this[method] = (value)=>this.set(method,value)
        });
    }
    getOrCompute(key,factory){
        if(!this.has(key)){
            this.set(key,factory());
        }
        return this.get(key);
    }
    set(key,value){
        this.store.set(key,value);
        return this;
    }
    has(key){
        return this.store.has(key);
    }
    get(key){
        return this.store.get(key);
    }
    entries(){
      //其实就是把map变成对象返回
       return  [...this.store].reduce((acc,[key,value])=>{
            acc[key]=value;
            return acc;
        },{});
    }
}
module.exports = ChainedMap;