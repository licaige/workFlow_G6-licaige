
const pdom = document.createElement('p')
pdom.innerText = '22222'
document.querySelectorAll('body')[0].append('11111', pdom)

// 动态创建的 ignore 类型script保留原有特性，不会被处理
const dynamicIgnoreScript = document.createElement('script')
dynamicIgnoreScript.setAttribute('ignore', 'true')
dynamicIgnoreScript.textContent = 'window.ignoreInjectData = 1'
document.body.appendChild(dynamicIgnoreScript)
expect(((0, eval)('window')).ignoreInjectData).toBe(1)
