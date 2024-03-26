import {
  angleToRadian,
  distance,
  lineRadian,
  rotate,
  startEndPointToLine,
  verticalLinePoint
} from "../../../geometry";
import { ICoordinate, ISize, ISizeCoordinate } from "../../../type";

export const getIncreaseSize = (
  initMousePos: ICoordinate,
  mousePoint: ICoordinate,
  angle = 0
) => {
  const dis = distance(initMousePos, mousePoint);
  const radian = angleToRadian(angle);
  const includedRadian = lineRadian(initMousePos, mousePoint) - radian;
  const addDis = dis * Math.cos(includedRadian);
  return {
    width: addDis,
    height: dis * Math.sin(includedRadian)
  };
};
const getNewCenterPoint = (
  initMousePos: ICoordinate,
  mousePoint: ICoordinate,
  angle = 0,
  initCoordinate: ICoordinate,
  initSize: ISize
) => {
  const dis = distance(initMousePos, mousePoint);
  const radian = angleToRadian(angle);
  const includedRadian = lineRadian(initMousePos, mousePoint) - radian;
  const addWidth = dis * Math.cos(includedRadian);
  const addHeight = dis * Math.sin(includedRadian);
  return {
    x: initCoordinate.x + (initSize.width + addWidth) / 2,
    y: initCoordinate.y + (initSize.height + addHeight) / 2,
    addWidth,
    addHeight
  };
};

/**
 * 处理来自8个方向上的size变动
 * @param param
 * @returns
 */
export const handlePositionResize = ({
  pos,
  angle,
  mousePoint,
  initPos,
  initSize,
  initMousePos,
  info,
  resizeLock
}: // logPoints,
any) => {
  // eslint-disable-next-line
  let { width, height, x, y } = info; // eslint-disable-line
  let offsetPoint: ICoordinate = { x: 0, y: 0 };
  const initCenter = {
    x: initPos.x + initSize.width / 2,
    y: initPos.y + initSize.height / 2
  };
  // 宽高方向上各自是否发生了反转，如右侧边的锚点是否拖拽到了矩形的左边
  // 把鼠标点转换到未旋转的坐标系下，方便判断是否翻转
  const originMousePoint = rotate(mousePoint, -angle, initCenter);
  // 计算偏移量
  const getOffsetPoint = (width = 0, height = 0, angle = 0) => {
    const newCenter = {
      x: initPos.x + (width + initSize.width) / 2,
      y: initPos.y + (height + initSize.height) / 2
    };
    const p1 = rotate(initPos, angle, initCenter);
    const p2 = rotate(initPos, angle, newCenter);
    const offsetPoint = {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    };
    return offsetPoint;
  };
  // 代码节俭，但可读性较差
  const hasLeft = pos.includes("left");
  const hasRight = pos.includes("right");
  const hasTop = pos.includes("top");
  const hasBottom = pos.includes("bottom");
  const reverseX = hasLeft
    ? originMousePoint.x > initPos.x + initSize.width
    : originMousePoint.x < initPos.x;
  const reverseY = hasTop
    ? originMousePoint.y > initPos.y + initSize.height
    : originMousePoint.y < initPos.y;
  // 按住shift等比缩放
  if (resizeLock) {
    // 当鼠标移动到相反方向，原始点（中点和鼠标按下的锚点）应该变化的相对距离
    const movePos = {
      x: reverseX ? (hasLeft ? 1 : -1) * initSize.width : 0,
      y: reverseY ? (hasTop ? 1 : -1) * initSize.height : 0
    };
    // 计算中心点点的位置
    const originCenter = {
      x: initPos.x + initSize.width / 2 + movePos.x,
      y: initPos.y + initSize.height / 2 + movePos.y
    };
    const centerPoint = rotate(originCenter, angle, initCenter);
    // 下面计算锚点的位置
    const originInitMousePoint = rotate(initMousePos, -angle, initCenter);
    const originPortPoint = {
      x: originInitMousePoint.x + movePos.x * 2,
      y: originInitMousePoint.y + movePos.y * 2
    };
    const portPoint = rotate(originPortPoint, angle, initCenter);
    const line = startEndPointToLine(centerPoint, portPoint);
    // 核心代码：计算过鼠标点到中心点与锚点组成直线的垂线的交点，即是等比缩放的场景下，鼠标应该在的位置
    const expectMousePoint = verticalLinePoint(line, mousePoint);
    // eslint-disable-next-line no-param-reassign
    mousePoint = expectMousePoint;
  }
  const offsetAngle = angle * (hasLeft ? -1 : 1) * (hasTop ? -1 : 1);
  if (hasLeft || hasRight) {
    width = getIncreaseSize(
      initMousePos,
      mousePoint,
      angle + (hasLeft ? 180 : 0)
    ).width;
  }
  if (hasTop || hasBottom) {
    height = getIncreaseSize(
      initMousePos,
      mousePoint,
      angle + (hasTop ? 180 : 0)
    ).height;
  }
  // 在移动右下角锚点的情况下，只影响高宽，但是由于旋转中心变了，左上角也会偏移的，所以要计算这个偏移手动修正回来
  offsetPoint = getOffsetPoint(width, height, offsetAngle);
  x = -offsetPoint.x;
  y = -offsetPoint.y;
  if (hasRight) {
    x = -offsetPoint.x + (reverseX ? initSize.width + width : 0);
  }
  if (hasLeft) {
    x = offsetPoint.x + (reverseX ? initSize.width : -width);
  }
  if (hasBottom) {
    y = -offsetPoint.y + (reverseY ? initSize.height + height : 0);
  }
  if (hasTop) {
    y = offsetPoint.y + (reverseY ? initSize.height : -height);
  }
  // (window as any).updateHelpPoints([
  //   {
  //     x: initPos.x + (initSize.width + width) / 2,
  //     y: initPos.y + (initSize.height + height) / 2,
  //     color: "orange"
  //   }
  // ]);
  // (window as any).updateHelpPoints([
  //   {
  //     x: initPos.x + x + (initSize.width + width) / 2,
  //     y: initPos.y + y + (initSize.height + height) / 2,
  //     color: "red"
  //   }
  // ]);
  return { width, height, x, y } as ISizeCoordinate;
};

const handleResize = (
  resizePos: string,
  initSize: ISize,
  initCoordinate: ICoordinate,
  initMousePos: ICoordinate,
  mousePos: ICoordinate
) => {
  const xReverse = resizePos.includes("left");
  const yReverse = resizePos.includes("top");

  const { width: w0, height: h0 } = initSize;
  const { x: x0, y: y0 } = initCoordinate;
  const dx = mousePos.x - initMousePos.x;
  const dy = mousePos.y - initMousePos.y;
  const x = xReverse ? x0 + dx : x0;
  const y = yReverse ? y0 + dy : y0;
  const width = xReverse ? w0 - dx : w0 + dx;
  const height = yReverse ? h0 - dy : h0 + dy;
  (window as any).updateHelpPoints([
    {
      x: initCoordinate.x + (initSize.width + width) / 2,
      y: initCoordinate.y + (initSize.height + height) / 2,
      color: "orange"
    }
  ]);
  return { x, y, width, height } as ISizeCoordinate;
};

export const computeResizeRect = (
  resizePos: string,
  initSize: ISize,
  initCoordinate: ICoordinate,
  initMousePos: ICoordinate,
  mousePos: ICoordinate,
  angle = 0
) => {
  const centerPoint = {
    x: initCoordinate.x + initSize.width / 2,
    y: initCoordinate.y + initSize.height / 2
  };
  const newCenterPoint = getNewCenterPoint(
    initMousePos,
    mousePos,
    angle,
    initCoordinate,
    initSize
  );
  const newCenter = {
    x: initCoordinate.x + (newCenterPoint.addWidth + initSize.width) / 2,
    y: initCoordinate.y + (newCenterPoint.addHeight + initSize.height) / 2
  };
  const getOffsetPoint = () => {
    const newCenter = {
      x: initCoordinate.x + (newCenterPoint.addWidth + initSize.width) / 2,
      y: initCoordinate.y + (newCenterPoint.addHeight + initSize.height) / 2
    };
    const p1 = rotate(initCoordinate, angle, centerPoint);
    const p2 = rotate(initCoordinate, angle, newCenter);
    const offsetPoint = {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    };
    return offsetPoint;
  };
  const offsetPoint = getOffsetPoint();
  // 计算旋转点
  const getRotatePoint = (point: ICoordinate) => {
    return rotate(point, angle, centerPoint);
  };
  const newCoordinate = getRotatePoint(initCoordinate);
  const originMousePos = getRotatePoint(mousePos);
  // (window as any).updateHelpPoints([
  //   // { ...initMousePos, color: "red" },
  //   // { ...mousePos, color: "green" },
  //   // { ...initCoordinate, color: "blue" },
  //   // { ...newCoordinate, color: "orange" },
  //   // { ...originMousePos, color: "#999" },
  //   // { ...centerPoint, color: "#f005" },
  //   { ...newCenter, color: "#0f05" }
  // ]);
  return {
    x: -offsetPoint.x,
    y: -offsetPoint.y,
    width: newCenterPoint.addWidth,
    height: newCenterPoint.addHeight
  };
  // const rect = handleResize(
  //   resizePos,
  //   initSize,
  //   initCoordinate,
  //   originInitMousePos,
  //   originMousePos
  // );
  // return rect;
};
