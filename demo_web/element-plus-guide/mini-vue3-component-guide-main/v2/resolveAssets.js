import { currentInstance, currentRenderingInstance } from './mini-vue3.js'

const COMPONENTS = 'components'

export function resolveComponent(name) {
    return resolveAsset(COMPONENTS, name) || name
}

function resolveAsset(type, name) {
    // 获取当前组件的实例对象
    const instance = currentRenderingInstance || currentInstance
    if (instance) {
      // 通过组件实例获取组件对象，也就是 type 属性值
      const Component = instance.type
      if (type === COMPONENTS) {
        const selfName = Component.name
        // 如果组件名称是组件本身的名称，则返回组件本身，也就是递归组件
        if(selfName === name) {
           return Component
        }
      }
      const res =
      // 获取局部注册的组件
      resolve(Component[type], name) ||
      // 获取全局注册的组件
      resolve(instance.appContext[type], name)
      return res
    }
}
// 获取组件对象
function resolve(registry, name) {
    return (
      registry &&
      registry[name]
    )
}