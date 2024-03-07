/**
 * 中断调用链 质上 Promise 是无法被终止的
 *  第一种办法：new Promise(() => {});
 */
Promise.resolve()
  .then(() => {
    console.log("then 1");
    return new Promise(() => {});
  })
  .then(() => {
    console.log("then 2");
  })
  .then(() => {
    console.log("then 3");
  })
  .catch((err) => {
    console.log(err);
  });