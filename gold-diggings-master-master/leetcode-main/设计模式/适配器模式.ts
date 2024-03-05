// 两个不同应用提供的接口
var googleMap = {
    show: () => { console.log("渲染谷歌地图") }
}
var baiduMap = {
    display: () => { console.log("渲染百度地图") }
}

// 此时只有一个写好的render函数
function render(map: any) {
    map.show()
}

// 因为我们最好不要修改第三方提供的接口  所以只能编写百度地图适配器
var baiduMapAdapter = {
    show: () => { baiduMap.display() }
}

// 即可使用render函数执行
render(googleMap)
render(baiduMapAdapter)