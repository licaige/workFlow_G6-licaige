class LHYPage {
    constructor(options){
        // 1、异常处理
        if(!options.container || !options.curPage || !options.allPage || options.curPage <= 0 || options.allPage <= 0 || options.curPage > options.allPage) {
            // 抛出异常
            throw(false, "LHYPAGE ERROR MSG：参数有误，请检查分页参数设置！");
            return;
        }
        // 2、默认处理
        this.container  = options.container;          //  分页容器
        this.curPage    = parseInt(options.curPage);  //  当前页
        this.allPage    = parseInt(options.allPage);  //  总页码
        this.callBack   = options.callBack || function(){};
        this.firstPage  = null; // 首页
        this.lastPage   = null; // 尾页
        this.prevPage   = null; // 上一页
        this.nextPage   = null; // 下一页
        this.jumpInput  = null; // 页码跳转输入框
        this.jumpBtn    = null; // 页码跳转按钮
        this.jumpBox    = null; // 页面跳转容器
        this.pages      = [];   // 中间5个数字页码集合
        // 3、加载元素
        this.loadingElements();
        // 4、事件处理
        this.handleEvents();
        // 5、默认切换
        this.tab();
    };
    /**
     * 获取元素
     */
    getEl(Sel, isAll) {
        if(isAll) {
            return document.querySelectorAll(Sel);
        }else {
            return document.querySelector(Sel);
        }
    };
    /**
     * 加载分页元素
     */
    loadingElements() {
        // 加载页面元素
        this.container.insertAdjacentHTML("beforeEnd", `
            <lhy-page>
                <a class='first-page' href='#1'>首页</a>
                <a class='prev-page'>上一页</a>
                <div class='page-box' style='display:inline-block'>
                    <a class='page'></a>
                    <a class='page'></a>
                    <a class='page'></a>
                    <a class='page'></a>
                    <a class='page'></a>
                </div>
                <a class='next-page'>下一页</a>
                <a class='last-page' href='#${this.allPage}'>尾页</a>
                <span class='all-page'>共${this.allPage}页</span>
                <div class='jump-box' style='display:inline-block'>
                    <span>跳转至</span>
                    <input type='text' class='jump-input' size='3'>
                    <span>页</span>
                    <button type='button' class='jump-btn'>跳转</button>
                </div>
            </lhy-page>
        `);
        // 赋值数据
        this.firstPage = this.getEl("lhy-page .first-page");
        this.prevPage  = this.getEl("lhy-page .prev-page");
        this.nextPage  = this.getEl("lhy-page .next-page");
        this.lastPage  = this.getEl("lhy-page .last-page");
        this.pages     = this.getEl("lhy-page .page", true);
        this.jumpBox   = this.getEl("lhy-page .jump-box");
        this.jumpInput = this.getEl("lhy-page .jump-input");
        this.jumpBtn   = this.getEl("lhy-page .jump-btn");
    };
    /**
     * 事件处理
     */
    handleEvents() {
        // 获取页码元素
        let aAs = this.getEl("lhy-page a", true);
        for(let i = 0, len = aAs.length; i < len; i++) {
            aAs[i].onclick = (e) => {
                e = e || event;
                let target = e.target;
                this.curPage = parseInt(target.getAttribute("href").slice(1));
                this.tab();
                // 阻止默认处理
                return false;
            }
        }
        // 为跳转按钮添加点击事件
        this.jumpBtn.onclick = (e) => {
            e = e || event;
            let val = this.jumpInput.value;
            if(!val || isNaN(parseInt(val)) || val <= 0 || val > this.allPage) { return; }
            this.curPage = val;
            this.tab();
        }
    };
    /**
     * 页面切换
     */
    tab() {
        let curPage = parseInt(this.curPage),
            allPage = parseInt(this.allPage);
        // 1、【首页】仅在当前页大于等于4，且总页数大于等于6的情况下出现首页
        if(curPage >= 4 && allPage >= 6) {
            this.firstPage.style.display = "inline-block";
        }else {
            this.firstPage.style.display = "none";
        }
        // 2、【上一页】在当前页大于等于2的情况下出现上一页
        if(curPage >= 2) {
            this.prevPage.href = "#" + (curPage - 1);
            this.prevPage.style.display = "inline-block";
        }else {
            this.prevPage.style.display = "none";
        }
        // 3、【中间页码】假设页码显示的数量为五个，则分为两种情况
        let oPages = this.pages;
        if(allPage <= 5) { // a、总页码小于等于5
            for (let i = 1, len = oPages.length; i <= len; i++) {
                // 因为默认中间创建了5个a标签，所以要考虑总页码不到5个的情况
                if(i <= allPage) { // 如果为有效页码，则继续配置
                    // 显示页码元素
                    oPages[i - 1].style.display = "inline-block";
                    // 绑定页码属性值
                    oPages[i - 1].href = '#' + i;
                    // 设置页码显示文本
                    oPages[i - 1].textContent = i;
                    // 判断如果为当前页码，则设置当前页码的class，否则删除
                    if(i == curPage) {
                        oPages[i - 1].classList.add("cur-page");
                    }else {
                        oPages[i - 1].classList.remove("cur-page");
                    }
                }else { // 如果不为有效页码，则隐藏
                    oPages[i - 1].style.display = "none";
                }
            }
        }else { // b、总页码大于5
            for(let i = 1, len = oPages.length; i <= len; i++) {
                // 总页码大于5个，5个页码肯定是全部显示的
                oPages[i - 1].style.display = "inline-block";
                // 当前页为前面两页时
                if (curPage < 3) {  
                    // 绑定页码属性值
                    oPages[i - 1].href = '#' + i;
                    // 设置页码显示文本
                    oPages[i - 1].textContent = i;
                    // 判断如果为当前页码，则设置当前页码的class，否则删除
                    if(i == curPage) {
                        oPages[i - 1].classList.add("cur-page");
                    }else {
                        oPages[i - 1].classList.remove("cur-page");
                    }
                }else if(curPage > allPage - 2){ // 当前页为最后两页时
                    oPages[i - 1].href = '#' + (allPage - 5 + i);
                    oPages[i - 1].textContent = (allPage - 5 + i);
                    if (curPage == (allPage - 5 + i)) {
                        oPages[i - 1].classList.add("cur-page");
                    }else {
                        oPages[i - 1].classList.remove("cur-page");
                    }
                }else {
                    oPages[i - 1].href = '#' + (curPage - 3 + i);
                    oPages[i - 1].textContent = (curPage - 3 + i);
                    if (i == 3) {
                        oPages[i - 1].classList.add("cur-page");
                    }else {
                        oPages[i - 1].classList.remove("cur-page");
                    }
                }
            }
        }
        // 4、【下一页】当前页不等于总页码数且总页码数大于等于2的情况下
        if((allPage - curPage) >= 1)  {
            this.nextPage.style.display = "inline-block";
            this.nextPage.href = '#' + (curPage + 1);
        }else {
            this.nextPage.style.display = "none";
        }
        // 5、【尾页】当总页数比当前页至少大3，且总页码数大于等于6的情况下出现
        if ((allPage - curPage) >= 3 && allPage >= 6) {
            this.lastPage.style.display = "inline-block";
            this.lastPage.href = '#' + allPage;
        }else {
            this.lastPage.style.display = "none";
        }
        // 如果总页码小于等于5，则直接隐藏跳转部分
        if(allPage <= 5) {
            this.jumpBox.style.display = "none";
        }else {
            this.jumpBox.style.display = "inline-block";
        }
        // 回调
        this.callBack(this.curPage);
    };
}


