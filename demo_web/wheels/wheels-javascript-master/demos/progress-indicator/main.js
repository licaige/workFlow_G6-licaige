(function () {
  const util = {
    getViewPortSizeHeight: function () {
      let w = window;
      if (w.innerWidth !== null) return innerHeight;
    },
    getScrollOffsetsTop: function () {
      let w = window;
      if (w.pageXOffset !== null) return w.pageYOffset;
    },
  };
  function EventEmitter() {
    this.__event = {};
  }
  EventEmitter.prototype.on = function (eventName, listener) {
    if (!eventName || !listener) return;
    if (!dom.isValidListener(listener)) {
      throw new TypeError("listener must be a function");
    }
    let events = this.__event;
    let listeners = (events[eventName] = events[eventName] || []);
    let listenerIsWrapped = typeof listener === "object";
    if (listeners.indexOf(listener) === -1) {
      listeners.push(
        listenerIsWrapped
          ? listener
          : {
              listener: listener,
              once: false,
            }
      );
    }
    return this;
  };
  EventEmitter.prototype.once = function (eventName, listener) {
    return this.on(eventName, {
      listener: listener,
      once: true,
    });
  };
  EventEmitter.prototype.off = function (eventName, listener) {
    let listeners = this.__events[eventName];
    if (!listeners) return;
    let index;
    for (let i = 0, len = listeners.length; i < len; i++) {
      if (listeners[i] && listeners[i].listener === listener) {
        index = i;
        break;
      }
    }
    if (typeof index !== undefined) {
      listeners.splice(index, 1, null);
    }
    return this;
  };
  EventEmitter.prototype.emit = function (eventName, args) {
    let listeners = this.__events[eventName];
    if (!listeners) return;
    for (let i = 0, len = listeners.length; i < len; i++) {
      let listener = listeners[i];
      if (listener) {
        listener.listener.apply(this, args || []);
        if (listener.once) {
          this.off(eventName, listener.listener);
        }
      }
    }
    return this;
  };

  function ProgressIndicator(options) {
    this.options = Object.assign({}, this.constructor.defaultOptions, options);
    console.log(options,'options')
    this.handlers = {};
    this.init();
  }
  ProgressIndicator.defaultOptions = {
    color: "#0A74DA",
  };
  let proto = (ProgressIndicator.prototype = new EventEmitter());
  proto.constructor = ProgressIndicator;
  proto.init = function () {
    this.createIndicator();
    let width = this.calculateWidthPrecent();
    this.setWidth(width);
    this.bindScrollEvent();
  };
  proto.createIndicator = function () {

    let div = document.createElement("div");
    div.id = "progress-indicator";
    div.className = "progress-indicator";
    div.style.position = "fixed";
    div.style.top = 0;
    div.style.left = 0;
    div.style.height = "3px";
    div.style.backgroundColor = this.options.color;
    this.element = div;
    document.body.appendChild(div);
  };
  proto.calculateWidthPrecent = function () {
    this.docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );
    this.viewPortHeight = util.getViewPortSizeHeight();
    this.sHeight = Math.max(this.docHeight - this.viewPortHeight, 0);
    let scrollTop = util.getScrollOffsetsTop();
    return this.sHeight ? scrollTop / this.sHeight : 0;
  };
  proto.setWidth = function (perc) {
    this.element.style.width = perc * 100 + "%";
  };
  proto.bindScrollEvent = function () {
    let self = this;
    let prev;
    dom.addEvent(window,'scroll',function (){
      window.requestAnimationFrame(function () {
        let perc = Math.min(util.getScrollOffsetsTop() / self.sHeight, 1);
        if (perc === prev) return;
        if (prev && perc === 1) {
          self.emit("end");
        }
        prev = perc;
        self.setWidth(perc);
      });
    })

  };
  window.ProgressIndicator=ProgressIndicator
})();
