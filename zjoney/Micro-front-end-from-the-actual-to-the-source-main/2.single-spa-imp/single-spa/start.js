import { reroute } from "./navigation/reroute.js";

export let started = false; // 默认没有调用start方法
export function start(){
    started = true; // 用户启动了
    reroute()
}