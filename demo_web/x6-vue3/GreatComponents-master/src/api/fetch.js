// 基本post接口封装
export const post = (url, params) => {
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

// 大数据分片加载
export const fragmentation = async (url, params) => {
  const resp = await fetch(url, {
    method: 'post',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const reader = resp.body.getReader()
  const decoder = new TextDecoder()
  for (;;) {
    const {value, done} = await reader.read()
    if (done) {
      break
    }
    const text = decoder.decode(value)
    console.log(text)
  }
}