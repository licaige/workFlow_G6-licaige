



/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
if (canvas.getContext) {
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext('2d');
} else {
  console.log("当前浏览器不支持Canvas，请下载最新的浏览器");
}
