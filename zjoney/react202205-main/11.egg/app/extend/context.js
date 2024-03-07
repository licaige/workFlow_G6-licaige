//ctx.language();
exports.language = function () {
  return this.get('Accept-language');
}