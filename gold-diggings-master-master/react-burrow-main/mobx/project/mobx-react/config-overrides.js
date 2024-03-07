// 可用customize-cra这个包重写webpack配置项
const { override, addDecoratorsLegacy } = require("customize-cra")

module.exports = override(
    // 配置babel中的修饰器插件
    addDecoratorsLegacy()
)
