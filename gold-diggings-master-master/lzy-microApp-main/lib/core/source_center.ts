// 创建资源池用于集中保存传来的代码, 加速读取
class SourceCenter {
    public scripts: Map<string, string>
    public links: Map<string, string>

    constructor() {
        this.scripts = new Map()
        this.links = new Map()
    }

    saveScript(url: string, code: string) {
        this.scripts.set(url, code)
    }

    saveLink(url: string, code: string) {
        this.links.set(url, code)
    }

}

export default new SourceCenter()