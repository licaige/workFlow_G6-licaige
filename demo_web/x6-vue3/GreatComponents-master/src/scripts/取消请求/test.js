// 1 下次请求会取消上次未完成的接口
// 2 调用abort会停止当前接口
export const cancelFetch = function(url, fn=()=>{}) {
  let controller
  return [async function() {
    controller && controller.abort()
    controller = new AbortController()
    try {
      const data = await fetch(
        url,
        {
          signal: controller.signal
        }
      )
      fn(data)
    } catch{
      console.log('内部abort')
    }
  }, () => {if (controller) {controller.abort(); console.log('外部abort')}}]
}