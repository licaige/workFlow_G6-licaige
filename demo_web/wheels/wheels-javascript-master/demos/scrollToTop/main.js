(function () {
  let until = {
    setOpacity: function (element, opacity) {
      if (element.style.opacity !== undefined) {
        element.style.opacity = opacity / 100;
      }
    },
    getScrollOffsets: function () {
      let w = window;
      if (w.scrollY !== null) return { x: w.scrollX, y: w.scrollY };
      var d = w.document;
      if (document.compatMode == "CSS1Compat") {
        return {
          x: d.documentElement.scrollLeft,
          y: d.documentElement.scrollTop,
        };
      }
      return { x: d.body.scrollLeft, y: d.body.scrollTop };
    },
    fadeIn: function (element, speed) {
      var opacity = 0;
      until.setOpacity(element, 0);
      var timer;

      function step() {
        until.setOpacity(element, (opacity += speed));
        if (opacity < 100) {
          timer = requestAnimationFrame(step);
        } else {
          cancelAnimationFrame(timer);
        }
      }
      requestAnimationFrame(step);
    },
    fadeOut: function (element, speed) {
      let opacity = 0;
      until.setOpacity(element, 0);
      let timer;
      function step() {
        until.setOpacity(element, (opacity -= speed));
        if (opacity > 0) {
          timer = requestAnimationFrame(step);
        } else {
          cancelAnimationFrame(timer);
        }
      }
      requestAnimationFrame(step);
    },
    addClass: function (element, className) {
      var classNames = element.className.split(/\s+/);
      if (classNames.indexOf(className) == -1) {
        classNames.push(className);
      }
      element.className = classNames.join(" ");
    },
    removeClass: function (element, className) {
      var classNames = element.className.split(/\s+/);
      var index = classNames.indexOf(className);
      if (index !== -1) {
        classNames.splice(index, 1);
      }
      element.className = classNames.join(" ");
    },
    supportTouch: function () {
      return (
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)
      );
    },
    getTime: function () {
      return new Date().getTime();
    },
  };
  function ScrollToTop(element, options) {
    this.element =
      typeof element === "string" ? document.querySelector(element) : element;
    this.options = Object.assign({}, this.constructor.defaultOptions, options);
    this.init();
  }
  ScrollToTop.defaultOptions = {
    showWhen: 100,
    speed: 100,
    fadeSpeed: 10,
  };
  let proto = ScrollToTop.prototype;
  proto.init = function () {
    this.hideElement();
    this.bindScrollEvent();
    this.bindToTopEvent();
  };
  proto.hideElement = function () {
    until.setOpacity(this.element, 0);
    this.status = "hide";
  };
  proto.bindScrollEvent = function () {
    let self = this;
    dom.addEvent(window, "scroll", function () {
      if (until.getScrollOffsets().y > self.options.showWhen) {
        if (self.status === "hide") {
          until.fadeIn(self.element, self.options.fadeSpeed);
          self.status = "show";
        }
      } else {
        if (self.status === "show") {
          until.fadeOut(self.element, self.options.fadeSpeed);
          self.status = "hide";

          until.removeClass(self.element, "backing");
          console.log(self.element, "self.element");
        }
      }
    });
  };
  proto.handleBack = function () {
    let timer,
      self = this;
    until.addClass(self.element, "backing");
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn() {
      let oTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (oTop > 0) {
        document.body.scrollTop = document.documentElement.scrollTop =
          oTop - self.options.speed;
        timer = requestAnimationFrame(fn);
      } else {
        cancelAnimationFrame(timer);
      }
    });
  };
  proto.bindToTopEvent = function () {
    var self = this;

    dom.addEvent(self.element, "click", self.handleBack.bind(self));

    if (until.supportTouch()) {
      dom.addEvent(self.element, "touchstart", function (e) {
        self._startX = e.touches[0].pageX;
        self._startY = e.touches[0].pageY;
        self._startTime = until.getTime();
      });

      dom.addEvent(self.element, "touchmove", function (e) {
        self._moveX = e.touches[0].pageX;
        self._moveY = e.touches[0].pageY;
      });

      dom.addEvent(self.element, "touchend", function (e) {
        var endTime = until.getTime();
        if (
          (self._moveX !== null && Math.abs(self._moveX - self.startX) > 10) ||
          (self._moveY !== null && Math.abs(self._moveY - self.startY) > 10)
        ) {
        } else {
          // 手指移动的距离小于 10 像素并且手指和屏幕的接触时间要小于 500 毫秒
          if (endTime - self._startTime < 500) {
            self.handleBack();
          }
        }
      });
    }
  };
  window.ScrollToTop = ScrollToTop;
})();
