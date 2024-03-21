import { ExtractPropTypes, reactive } from "vue";
import { watermarkProps } from "../props";

// 1
// 问题
// - 问题: 有些库使用 computed 来保持 ( 当子组件的props来自 父组件的响应式对象时 ) 响应式
// - 场景: 如果这里接受的父组件的 props，是父组件中的 响应式数据时，考虑使用 computed 来保持响应式
// - 说明: 这种情况其实不用考虑，因为父组件即使是props对应的响应式对象，父组件也不会去修改content，fontsize，gap
export const useCreateWatermark = (
  args: Readonly<ExtractPropTypes<typeof watermarkProps>>
) => {
  const { content, fontsize, fontcolor, gap, imgSrc, imgWidth, imgHeight } =
    args;

  const state = reactive({
    watermark: {
      base64: "",
      height: 0,
      width: 0,
    },
  });

  const canvas = document.createElement("canvas");
  if (!canvas.getContext) throw new Error("你的浏览器不支持Canvas!");
  const ctx = canvas.getContext("2d")!;

  const drawImage = () => {
    canvas.width = Number(imgWidth) + Number(gap);
    canvas.height = Number(imgHeight) + Number(gap);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((Math.PI / 180) * -45); // 弧度 = ( 2 * Math.PI / 360) * -45

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";
    img.src = imgSrc;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, Number(imgWidth), Number(imgHeight));
      state.watermark = {
        base64: canvas.toDataURL("image/png"),
        width: canvas.width,
        height: canvas.height,
      };
    };
  };

  const drawText = () => {
    const { width } = ctx.measureText(content);
    const canvasSize = Math.max(100, width) + Number(gap);
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((Math.PI / 180) * -45); // 弧度 = ( 2 * Math.PI / 360) * -45

    const font = `${fontsize} serif, Arial, sans-serif`;
    ctx.font = font;
    ctx.fillStyle = fontcolor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(content, 0, 0);

    state.watermark = {
      base64: canvas.toDataURL("image/png"),
      width: canvas.width,
      height: canvas.height,
    };
  };

  imgSrc ? drawImage() : drawText();

  return state;
};
