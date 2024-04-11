'use strict';
/**
 * 判断浏览器是否支持transition end事件
 * @Author   yu
 * @DateTime 2017-09-14
 * @return   {[type]}   [description]
 */
function supportTransition() {
    var el = document.createElement('transitiontest');

    var transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return { type: transEndEventNames[name] };
        }
    }
    return false; // explicit for ie8 (  ._.)
}
window.supportTransition = supportTransition();
/**
 * 原生js实现轮播
 * @Author   yu
 * @DateTime 2017-09-14
 * @param    {[options]}   传入设置参数，
 *           {是否自动轮播isCycle，起始位置startIndex，是否显示箭头,过渡时间duration,轮播方向direction}
 */
function Carousel(options) {
    this.options = options || {};
    this.isCycle = this.options.isCycle != undefined ? this.options.isCycle : true;
    this.startIndex = this.options.startIndex || 0;
    this.duration = this.options.duration || 600;
    this.interval = this.options.interval || 3000;
    this.direction = this.options.direction || ''; //若为竖直方向轮播，传入vertical
    this.activeIndex = this.startIndex;
    this.sliding = false;
    this.container = this.options.el || document.getElementsByClassName('carousel-inner')[0];
    this.itemNode = this.container.getElementsByClassName('item');
    this.itemLen = this.itemNode.length;
    this.timer = null;
    this.isTouch = this.options.direction != 'vertical' && this.options.isTouch ? this.options.isTouch : false;
    this.init && this.init(); //初始化
}
Carousel.prototype.render = function() {
    this.container.className = this.container.className + ' ' + this.direction;
    //给起始位置设置active
    this.itemNode[this.startIndex].className = "item active";
    if (this.container.getElementsByClassName("btn-num").length > 0) {
        this.container.getElementsByClassName("btn-num")[this.startIndex].className = "btn-num current";
    }
    for (var i = 0, len = this.container.getElementsByClassName("item").length; i < len; i++) {
        var item = this.container.getElementsByClassName("item")[i];
        var duration = this.duration / 1000 + 's';
        item.style.transitionDuration = duration;
        item.style.webkitTransitionDuration = duration;
        item.style.mozTransitionDuration = duration;
        item.style.oTransitionDuration = duration;
    }
};
/**
 * 获取下一个被激活的元素索引
 * @Author   yu
 * @DateTime 2017-09-15
 * @param    {[type]}   type [取值next/prev,next代表点击右箭头，向左滑动，索引值增加]
 * @return   {[type]}        [description]
 */
Carousel.prototype.getWillActiveIndex = function(type) {
    var preIndex;
    var nextIndex;
    if (this.activeIndex == 0) {
        preIndex = this.itemLen - 1;
        nextIndex = this.activeIndex + 1;
    } else if (this.activeIndex == this.itemLen - 1) {
        preIndex = this.activeIndex - 1;
        nextIndex = 0;
    } else {
        preIndex = this.activeIndex - 1;
        nextIndex = this.activeIndex + 1;
    }
    return type == 'next' ? nextIndex : preIndex;
};
/**
 * 滑动
 * @Author   yu
 * @DateTime 2017-09-15
 * @param    {[type]}   type   [next/prev]
 * @param    {[type]}   number [下一个被激活的索引，非必传]
 * @return   {[type]}          [description]
 */
Carousel.prototype.slide = function(type, number, move_dis) {

    //防止点击频率过快,正在过渡时无法滑动
    if (this.sliding == true) return;
    var direction = type == 'next' ? "left" : "right";
    var activeNode = this.itemNode[this.activeIndex];
    var willActiveIndex = number ? (number - 1) : this.getWillActiveIndex(type);
    if (this.activeIndex == willActiveIndex) return;
    var willActiveNode = this.itemNode[willActiveIndex];
    this.sliding = true;
    var _self = this;
    this.timer = clearInterval(_self.timer);
    var btn_num = _self.container.getElementsByClassName("btn-num");
    if (btn_num.length > 0) {
        for (var i = 0, len = btn_num.length; i < len; i++) {
            btn_num[i].className = "btn-num";
            if (i == willActiveIndex) {
                btn_num[i].className = "btn-num current";
            }
        }
    }
    willActiveNode.className = "item " + type;
    willActiveNode.offsetWidth; // force reflow,让next block
    willActiveNode.className = "item " + type + " " + direction; //next left/prev right
    activeNode.className = "item active " + direction;

    function reInit() {
        willActiveNode.className = "item active";
        activeNode.className = "item";
        _self.activeIndex = willActiveIndex;
        _self.sliding = false;
        _self.isCycle && _self.cycle();
    }

    function addEvent(element, event, callback) {
        if (window.addEventListener) {
            return element.addEventListener(event, callback, false);
        } else {
            return element.attachEvent(event, callback);
        }
    }
    if (window.supportTransition) {
        //若支持transition end事件
        var transitionFlag = true;

        addEvent(activeNode, window.supportTransition.type, function(e) {
            if (e.target == this && transitionFlag) {
                //对于transitionend事件多次执行，一般情况下是因为监听元素有多个属性同时变化
                transitionFlag = false;
                reInit();
            }
        });

    } else {
        setTimeout(function() {
            reInit();
        }, _self.duration);
    }

};
//向左滑
Carousel.prototype.next = function() {
    this.slide('next');
}
//向右滑
Carousel.prototype.prev = function() {
    this.slide('prev');
}
//指定索引，点击原点
Carousel.prototype.to = function(number) {
    var type = this.activeIndex > (number - 1) ? "prev" : "next";
    this.slide(type, number);
}
//自动循环
Carousel.prototype.cycle = function() {

    var _self = this;
    _self.timer && clearInterval(_self.timer);
    _self.timer = setInterval(function() {
        _self.slide('next');
    }, _self.interval);
}
//箭头绑定事件
Carousel.prototype.arrowInit = function() {
    var _self = this;
    var arrow_left = _self.container.getElementsByClassName('btn-prev')[0];
    var arrow_right = _self.container.getElementsByClassName('btn-next')[0];
    if (arrow_left) {
        arrow_left.onclick = function() {
            _self.slide('prev');
        }
    }
    if (arrow_right) {
        arrow_right.onclick = function() {
            _self.slide('next');
        }
    }
}
//原点绑定事件
Carousel.prototype.cicleInit = function() {
    var circles = this.container.getElementsByClassName('btn-num');
    if (circles.length < 1) return;
    var _self = this;
    for (var i = 0, len = circles.length; i < len; i++) {
        circles[i].onclick = function() {
            _self.to(parseInt(this.getAttribute('data-slide-to')) + 1);
        }
    }
}
//移动端滑动事件
Carousel.prototype.touchSlide = function() {
    var startPos = { x: 0 };
    var movePos = { x: 0 };
    var _self = this;
    this.container.addEventListener('touchstart', function(e) {
        var touch = e.targetTouches[0];
        startPos = { x: parseInt(touch.pageX), y: parseInt(touch.pageY) };
    });
    this.container.addEventListener('touchmove', function(e) {
        var touch = e.targetTouches[0];
        //防止滚屏
        movePos = { x: parseInt(touch.pageX) - startPos.x, y: parseInt(touch.pageY) - startPos.y };
        var isScrolling = Math.abs(movePos.x) < Math.abs(movePos.y) ? 1 : 0;
        if (isScrolling === 0) {
            e.preventDefault();
        }
    });
    this.container.addEventListener('touchend', function(e) {
        if (Math.abs(movePos.x) < 40) {
            return;
        }
        if (movePos.x > 0) {
            _self.slide('prev');
        } else {
            _self.slide('next');
        }
    });
}
//初始化
Carousel.prototype.init = function() {
    this.render();
    this.arrowInit();
    this.cicleInit();
    this.isCycle && this.cycle();
    this.isTouch && this.touchSlide();
}