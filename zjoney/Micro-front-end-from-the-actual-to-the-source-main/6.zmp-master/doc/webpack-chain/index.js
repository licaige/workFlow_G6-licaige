const ChainedMap = require('./ChainedMap');
const ChainedSet = require('./ChainedSet');
const Output = require('./Output');
class Config extends ChainedMap{
    constructor() {
        super()
        this.entryPoints = new ChainedMap(this)
        this.output = new Output();//output其实就是一个ChainedMap
    }
    
    //添加一个入口
    entry(name){
        return this.entryPoints.getOrCompute(
            name,
            ()=>new ChainedSet(this)
        );
    }
    //把内部存储的结构变成webpack的配置文件
    toConfig(){
       const entryPoints = this.entryPoints.entries();
       return {
        entry:Object.keys(entryPoints).reduce((acc,key)=>{
            acc[key]=entryPoints[key].values()
            return acc;
        },{}),
        output:this.output.entries()
       }
    }
}
module.exports = Config;