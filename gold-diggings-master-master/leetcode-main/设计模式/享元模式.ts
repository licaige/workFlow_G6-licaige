
// 1. 2000个文件,有三种不同的类型,上传方式也不同 'Flash上传,插件上传,表单上传'
// 使用单独的类剥离内部状态 
class Uploader {
    fileType: string
    constructor(type: string) { }
}

// 使用工厂实例化内部状态(共享)对象
const UploaderFactory = () => {
    var uploaderMap = {}

    return {
        create: function (type: string) {// 如果创建过,直接复用
            if (uploaderMap[type]) return uploaderMap[type]

            return uploaderMap[type] = new Uploader(type)// 没创建过,创建一个新的
        }
    }
}

//通过创建器 管理外部状态 fileName和fileSize
class UploaderManager {
    create(id: string, type: string, fileName: string, fileSize: string) {// 添加一个uploader
        let flyWeightObj = UploaderFactory().create((type)) // 创建享元对象
       
        return { 
            id: id,
            fileName,
            fileSize,
            ...flyWeightObj // 享元对象(复用)
        }
    }
}

