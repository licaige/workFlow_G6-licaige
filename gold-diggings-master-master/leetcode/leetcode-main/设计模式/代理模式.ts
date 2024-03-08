
//
class MyImage {
    imgNode: HTMLImageElement

    constructor() {
        this.imgNode = document.createElement('img')
    }
    // 设置src
    setSrc(src: string) {
        this.imgNode.src = src
    }
}

// 代理模式间接访问Img
class ProxyImage {
    setSrc(src: string) {
        let myImg = new MyImage()
        myImg.setSrc('-------占位图片src------')
    }
}