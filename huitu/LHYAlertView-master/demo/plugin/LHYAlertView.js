

class LHYAlertView {
    constructor(options) {
        // 定义属性
        this.sureBtn    = null;
        this.cancelBtn  = null;
        this.textInput  = null;
        this.close      = this.close;
        // 设置默认属性
        this.configs = {
            "type": "default",
            "title": "温馨提示",
            "message": "",
            "autoClose": 0,
            "placeholder": "",
            "cancelTitle": "取消",
            "sureTitle": "确定",
            "cancelCallBack": "",
            "sureCallBack": ""
        };
        // 扩展默认属性
        options && this.extend(this.configs, options);
        // 初始化方法
        this.loadingElements();
        // 事件添加
        this.sureBtn   && this.addEvent(this.sureBtn,   "click", this.btnClick.bind(this));
        this.cancelBtn && this.addEvent(this.cancelBtn, "click", this.btnClick.bind(this));
        document.body.style.cssText = "overflow: hidden;";
        // 判断是否自动关闭
        this.configs.autoClose && setTimeout(this.close, this.configs.autoClose);
    }


    extend(oldObj, newObj) {
        for(let key in newObj) {
            oldObj[key] = newObj[key];
        }
        return oldObj;
    };
    loadingElements() {
        let config = this.configs,
            alertHtmls = "";
        switch (config.type) {
            case "default": {
                alertHtmls =
                    "<LHY-alert>"     +
                    "<alert-wrap>"    +
                    "<alert-title>"   + config.title   + "</alert-title>"   +
                    "<alert-content>" + config.message + "</alert-content>" +
                    "</alert-wrap>"   +
                    "</LHY-alert>";
            } break;
            case "alert"  : {
                alertHtmls =
                    "<LHY-alert>"     +
                    "<alert-wrap>"    +
                    "<alert-title>"   + config.title   + "</alert-title>" +
                    "<alert-content>" + config.message + "</alert-content>" +
                    "<alert-btnbox>"  +
                    "<alert-btn id='lhy-alert-sure-btn' class='alert-sure-btn'>" + config.sureTitle + "</alert-btn>" +
                    "</alert-btnbox>" +
                    "</alert-wrap>"   +
                    "</LHY-alert>";
            }break;
            case "confirm": {
                alertHtmls =
                    "<LHY-alert>"     +
                    "<alert-wrap>"    +
                    "<alert-title>"   + config.title      + "</alert-title>"   +
                    "<alert-content>" + config.message    + "</alert-content>" +
                    "<alert-btnbox>"  +
                    "<alert-btn id='lhy-alert-canc-btn'>" + config.cancelTitle + "</alert-btn>" +
                    "<alert-btn id='lhy-alert-sure-btn'>" + config.sureTitle   + "</alert-btn>" +
                    "</alert-btnbox>" +
                    "</alert-wrap>"   +
                    "</LHY-alert>";
            } break;
            case "prompt" : {
                alertHtmls =
                    "<LHY-alert>"      +
                    "<alert-wrap>"     +
                    "<alert-title>"    + config.title     + "</alert-title>"   +
                    "<alert-content>"  +
                    "<input type='text' id='lhy-alert-text-ipt' class='lhy-alert-text-ipt' placeholder='" + config.placeholder + "'>" +
                    "</alert-content>" +
                    "<alert-btnbox>"   +
                    "<alert-btn id='lhy-alert-canc-btn'>" + config.cancelTitle + "</alert-btn>"      +
                    "<alert-btn id='lhy-alert-sure-btn'>" + config.sureTitle   + "</alert-btn>"      +
                    "</alert-btnbox>"  +
                    "</alert-wrap>"    +
                    "</LHY-alert>";
            }break;
        }
        document.body.insertAdjacentHTML("beforeend", alertHtmls);
        this.sureBtn   = document.getElementById("lhy-alert-sure-btn");
        this.cancelBtn = document.getElementById("lhy-alert-canc-btn");
        this.textInput = document.getElementById("lhy-alert-text-ipt");
    };
    addEvent(el, type, callBack) {
        if (el.attachEvent) {
            el.attachEvent('on' + type, callBack);
        } else {
            el.addEventListener(type, callBack, false);
        }
    };
    btnClick(e) {
        e = e || event;
        let _this    = this,
            _tarId   = e.target.id,
            _configs = this.configs;
        switch(_tarId) {
            // 点击取消按钮
            case "lhy-alert-canc-btn":{
                _configs.cancelCallBack && _configs.cancelCallBack();
            } break;
            // 点击确认按钮
            case "lhy-alert-sure-btn": {
                let text = _configs.type == "prompt" ? _this.textInput.value : "" ;
                _configs.sureCallBack && _configs.sureCallBack(text);
            }break;
        }
        this.close();
    };
    close() {
        let alert = document.getElementsByTagName("lhy-alert")[0];
        document.body.removeChild(alert);
        document.body.style.cssText = "overflow: auto;";
    };
}
