let cacheData = {};
//app
exports.cache = {
  get(key) {
    return cacheData[key];
  },
  set(key, value) {
    cacheData[key] = value;
  }
}