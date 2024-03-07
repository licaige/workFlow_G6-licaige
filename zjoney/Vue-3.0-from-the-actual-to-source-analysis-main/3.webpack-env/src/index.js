import { reactive, effect, computed, ref } from './reactivity'

// proxy 进行代理了  (拦截)
const state = reactive({ name: 'zf', age: 11, arr: [1, 2, 3] });

// 调用push方法时  会先像数组中插入值 length  随后更新length

let myAge = computed(()=>{ // lazy为true的effect
    console.log('ok')
    return state.age * 2;
});

effect(()=>{
    console.log(myAge.value); // 没有触发value的依赖收集
})

state.age = 200;
// watchEffect  vue2.0 有watcher  vue3.0 effect  renderEffect



// state.name = 'jw';

// state.name = 'jw';// 应该导致重新的执行effect

// watchEffect 基于effect （批量更新的策略）
// vue3 兼容vue2 

// 写了一个effect effect 会执行  => activeEffect = effect;
// 对数据进行取值操作  get();  取name属性  name = [activeEffect];

// 稍后用户修改了name属性 set(); 通过name 找到当前的affect