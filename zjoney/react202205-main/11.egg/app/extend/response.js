//response.isSuccess
module.exports = {
  get isSuccess() {
    return this.status === 200;
  }
}
//res.isSuccess