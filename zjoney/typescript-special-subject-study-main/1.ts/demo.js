var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
      throw new TypeError('attempted to set private field on non-instance');
    }
    privateMap.set(receiver, value);
    return value;
  };
var _maria;
var Test = (function () {
  function Test() {
    _maria.set(this, 20);
    __classPrivateFieldSet(this, _maria, 30);
  }
  return Test;
})();
_maria = new WeakMap();
var test = new Test();
