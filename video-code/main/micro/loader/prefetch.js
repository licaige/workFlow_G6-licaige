import { getList } from '../const/subApps';
import { parseHtml } from './index';

export const prefetch = async () => {
  // 1. 获取到所有子应用列表 - 不包括当前正在显示的
  const list = getList().filter(item => !window.location.pathname.startsWith(item.activeRule))

  // 2. 预加载剩下的所有子应用
  await Promise.all(list.map(async item => await parseHtml(item.entry, item.name)))
}
