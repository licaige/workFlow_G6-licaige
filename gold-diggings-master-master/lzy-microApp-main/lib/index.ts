import { MicroAppElement } from './core//microApp_element'
import logger from './core/logger';

// 也就是start方法
export function start({
    showLoggerInfo = true
}) {
    // 初始化logger
    logger.showLoggerInfo = showLoggerInfo
    // 启动,初始化customELE
    customElements.define('micro-app-element', MicroAppElement);
}

export default { start }