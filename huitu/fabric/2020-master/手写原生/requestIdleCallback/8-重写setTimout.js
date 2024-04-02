// 因为 setTimeout 有延时，所以可以用 postMessage 模拟 

(function() {
  var timeouts = [];
  var messageName = "zero-timeout-message";

  // Like setTimeout, but only takes a function argument.  There's
  // no time argument (always zero) and no arguments (you have to
  // use a closure).
  function setZeroTimeout(fn) {
      timeouts.push(fn);
      window.postMessage(messageName, "*");
  }

  function handleMessage(event) {
      if (event.source == window && event.data == messageName) {
          event.stopPropagation();
          if (timeouts.length > 0) {
              var fn = timeouts.shift();
              fn();
          }
      }
  }

  window.addEventListener("message", handleMessage, true);

  // Add the one thing we want added to the window object.
  window.setZeroTimeout = setZeroTimeout;
})();