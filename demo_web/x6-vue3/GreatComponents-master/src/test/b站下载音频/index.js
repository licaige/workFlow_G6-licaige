// 仅用于学习！！！严禁商用！！！
// 在在f12 -》网络中搜索upos-sz-mirror，双击接口，将下载的m4s文件改名，如果没有upos-sz-mirror接口，则采用下面方式

// 1. 在f12 -》网络中搜索m4s文件，将接口地址复制
// 如：https://cn-tj-cu-01-10.bilivideo.com/upgcxcode/20/70/1344907020/1344907020-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1709114167&gen=playurlv2&os=bcache&oi=0&trid=00001a8a692a1b5f48519d8f13534d3b9509u&mid=14359177&platform=pc&upsig=ce4d5551e5cc32afe133b9eb5333abf9&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&cdnid=87210&bvc=vod&nettype=0&orderid=0,3&buvid=77B2F048-00CC-F72F-CBD6-ABA18037996934058infoc&build=0&f=u_0_0&agrr=1&bw=6512&logo=80000000

// 2. 使用fetch获取blob
const url = 'https://cn-tj-cu-01-10.bilivideo.com/upgcxcode/20/70/1344907020/1344907020-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1709114167&gen=playurlv2&os=bcache&oi=0&trid=00001a8a692a1b5f48519d8f13534d3b9509u&mid=14359177&platform=pc&upsig=ce4d5551e5cc32afe133b9eb5333abf9&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&cdnid=87210&bvc=vod&nettype=0&orderid=0,3&buvid=77B2F048-00CC-F72F-CBD6-ABA18037996934058infoc&build=0&f=u_0_0&agrr=1&bw=6512&logo=80000000'
fetch(url).then(res => res.blob()).then(res => window.b = res)
URL.createObjectURL(window.b)
// 3. 获取新url，如：'blob:https://www.bilibili.com/c7e11d79-0c25-4ee4-9cc8-0408f8959f61'

// 4. 在新地址中下载资源