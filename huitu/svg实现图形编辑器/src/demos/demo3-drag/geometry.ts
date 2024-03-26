// 点
export interface Point {
  x: number;
  y: number;
}

// 线
export interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// 方程
export interface Equation {
  k: number;
  b: number;
  x?: number; // 这个x表示在斜率无限大，也即直线垂直x轴方程为x = n;时 n 的值，正常情况为NaN
}

export interface Triangle {
  A: Point;
  B: Point;
  C: Point;
}

/** ******常用数学几何相关的计算方法**************************************************** */

/**
 * 判断两个浮点数是否相等
 *
 * @param a - 数字a
 * @param b - 数字b
 * @returns 是否相等
 */
export const floatEqual = (a: number, b: number) => Math.abs(a - b) < 1e-5;

/** ******点、线相关**************************************************** */
/**
 * 计算两个点的中点
 *
 * @param p1 - 线端点的坐标
 * @param p2 - 线端点的坐标
 * @returns 中点的坐标
 */
export const midpoint = (p1: Point, p2: Point) =>
  ({
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  } as Point);

/**
 * 计算两个点组成直线的斜率
 *
 * @param p1 - 线起点的坐标
 * @param p2 - 线终点的坐标
 * @returns 斜率数值
 */
export const lineSlope = (p1: Point, p2: Point) =>
  Math.abs(p2.x - p1.x) === 0 ? Infinity : (p2.y - p1.y) / (p2.x - p1.x);

/**
 * 弧度转化为角度
 *
 * @param radian - 弧度值
 * @returns 角度值
 */
export const radianToAngle = (radian: number) => (180 * radian) / Math.PI;

/**
 * 弧度转化为角度
 *
 * @param angle - 弧度值
 * @returns 角度值
 */
export const angleToRadian = (angle: number) => (Math.PI * angle) / 180;

/**
 * 计算两点组成的方程 y = kx + b
 *
 * @param p1 - 线上一点的坐标
 * @param p2 - 线上另一点的坐标
 * @returns 方程的参数 k 和 b
 */
export const lineEquation = (p1: Point, p2: Point) => {
  const k = lineSlope(p1, p2);
  return {
    k,
    b: p1.y - k * p1.x,
    x: k === Infinity ? p1.x : NaN
  } as Equation;
};

/**
 * 计算线相对于x正半轴的弧度
 *
 * @param start - 线上一点的坐标
 * @param end - 线上另一点的坐标
 * @returns 直线倾角
 */
export const lineRadian = (start: Point, end: Point, angle?: number) => {
  const k = lineSlope(start, end);
  if (Math.abs(k) === Infinity) {
    return angleToRadian(end.y - start.y > 0 ? 90 : -90);
  }
  let sita = Math.atan(k);
  if (end.x - start.x < 0) {
    sita += Math.PI;
  }
  if (angle) {
    let degree = radianToAngle(sita);
    // sita -= sita % radian < radian / 2 ? sita % radian : (sita % radian) - radian; // 角度吸附
    degree = Math.round(degree / angle) * angle;
    sita = angleToRadian(degree);
  }
  return sita;
};

/**
 * 计算线相对于x正半轴的角度
 *
 * @param start - 线上一点的坐标
 * @param end - 线上另一点的坐标
 * @returns 直线倾角
 */
export const lineAngle = (start: Point, end: Point, angle?: number) =>
  radianToAngle(lineRadian(start, end, angle));

/**
 * 计算两点之间的距离
 *
 * @param p1 - 线端点的坐标
 * @param p2 - 线端点的坐标
 * @returns 距离
 */
export const distance = (p1: Point, p2: Point) =>
  Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

/**
 * 计算一个点相对另一个点旋转一定角度后的坐标
 *
 * @param point - 目标点坐标
 * @param deg - 角度
 * @param o - 旋转中心点坐标
 * @returns 旋转后的点坐标
 */
export const rotate = (
  point: Point,
  deg: number,
  o: Point = { x: 0, y: 0 }
) => {
  const dis = distance(point, o);
  const k = (point.y - o.y) / (point.x - o.x);
  let sitaA = Math.atan(k);
  if (Math.abs(point.x - o.x) === 0) {
    sitaA = (Math.PI / 2) * (point.y - o.y > 0 ? 1 : -1);
  }
  if (point.x - o.x < 0) {
    sitaA -= Math.PI;
  }
  const sitaO = sitaA + (Math.PI * deg) / 180;
  return {
    x: o.x + dis * Math.cos(sitaO),
    y: o.y + dis * Math.sin(sitaO)
  } as Point;
};

/**
 * 线段转化为起始点
 *
 * @param line - 线段
 * @returns 起始点坐标
 */
export const lineToStartEndPoint = (line: Line) => {
  const start: Point = { x: line.x1, y: line.y1 };
  const end: Point = { x: line.x2, y: line.y2 };
  return { start, end };
};

/**
 * 起始点转化为线段
 *
 * @param start - 起点
 * @param end - 终点
 * @returns 起始点坐标
 */
export const startEndPointToLine = (start: Point, end: Point) =>
  ({
    x1: start.x,
    y1: start.y,
    x2: end.x,
    y2: end.y
  } as Line);

/**
 * 点在线的哪一边
 *
 * @param point - 点
 * @param line - 线
 * @returns 在直线上返回0，在直线下方返回-1，上方返回1
 */
export const pointOnLine = (point: Point, line: Line) => {
  const { start, end } = lineToStartEndPoint(line);
  const { k, b } = lineEquation(start, end);
  if (k === Infinity) {
    const diff = end.x - point.x;
    // eslint-disable-next-line no-nested-ternary
    return floatEqual(end.x, point.x) ? 0 : diff < 0 ? 1 : -1;
  }
  const dy = k * point.x + b;
  const diff = dy - point.y;
  // eslint-disable-next-line no-nested-ternary
  return floatEqual(dy, point.y) ? 0 : diff > 0 ? 1 : -1;
};

/**
 * 点在线的哪一边
 *
 * @param point - 点
 * @param equation - 线方程
 * @returns 在直线上返回0，在直线下方返回-1，上方返回1
 */
export const pointOnLineByEquation = (point: Point, equation: Equation) => {
  const { k, b, x = 0 } = equation;
  if (k === Infinity) {
    const diff = x - point.x;
    // eslint-disable-next-line no-nested-ternary
    return floatEqual(x, point.x) ? 0 : diff < 0 ? 1 : -1;
  }
  const dy = k * point.x + b;
  const diff = dy - point.y;
  // eslint-disable-next-line no-nested-ternary
  return floatEqual(dy, point.y) ? 0 : diff > 0 ? 1 : -1;
};

/**
 * 求过一点垂直于一条直线的方程
 * @param line 直线
 * @param point
 * @returns 垂涎方程
 */
export const verticalLineEquation = (line: Line, point: Point) => {
  const { start, end } = lineToStartEndPoint(line);
  const k1 = lineSlope(start, end);
  const k = -1 / k1;
  const b = point.y - k * point.x;
  const verticalLine: Equation = { k, b };
  if (Math.abs(k) === Infinity) {
    verticalLine.x = point.x;
  }
  return verticalLine;
};

/**
 * 求两直线交点
 *
 * @param l1 - 直线
 * @param l2 - 直线
 * @returns 两直线交点坐标，平行线返回null
 */
export const lineCrossPointByEquation = (l1: Equation, l2: Equation) => {
  const { k: k1, b: b1 } = l1;
  const { k: k2, b: b2 } = l2;
  // 处理垂直于x轴的情况
  if (typeof l1.x === "number" && !Number.isNaN(l1.x)) {
    return { x: l1.x, y: l2.k * l1.x + l2.b };
  }
  if (typeof l2.x === "number" && !Number.isNaN(l2.x)) {
    return { x: l2.x, y: l1.k * l2.x + l1.b };
  }
  if (Math.abs(k2 - k1) < 0.00001) {
    return null;
  }
  const x = (b2 - b1) / (k1 - k2);
  return {
    x,
    y: k1 * x + b1
  } as Point;
};

/**
 * 求过一点垂直于一条直线的垂点
 * @param line 直线
 * @param point 点
 * @returns 垂点坐标
 */
export const verticalLinePoint = (line: Line, point: Point) => {
  const { start, end } = lineToStartEndPoint(line);
  const lineEqua = lineEquation(start, end);
  const verticalLineEqua = verticalLineEquation(line, point);
  const verticalPoint = lineCrossPointByEquation(lineEqua, verticalLineEqua);
  return verticalPoint;
};

/**
 * 垂直平分线方程(y = kx + b)
 *
 * @param start - 起点
 * @param end - 中点
 * @returns 垂直平分线方程参数k b
 */
export const verticalBisectorEquation = (start: Point, end: Point) => {
  const center = midpoint(start, end);
  const k1 = lineSlope(start, end);
  const k = k1 === Infinity ? 0 : -1 / k1;
  const b = center.y - k * center.x;
  return { k, b, x: k1 === Infinity ? start.x : NaN } as Equation;
};

/**
 * 求两直线交点
 *
 * @param l1 - 直线
 * @param l2 - 直线
 * @returns 两直线交点坐标，平行线返回null
 */
export const lineCrossPoint = (l1: Line, l2: Line) => {
  const { k: k1, b: b1 } = lineEquation(
    { x: l1.x1, y: l1.y1 },
    { x: l1.x2, y: l1.y2 }
  );
  const { k: k2, b: b2 } = lineEquation(
    { x: l2.x1, y: l2.y1 },
    { x: l2.x2, y: l2.y2 }
  );
  if (Math.abs(k2 - k1) < 0.00001) {
    return null;
  }
  const x = (b2 - b1) / (k1 - k2);
  return {
    x,
    y: k1 * x + b1
  } as Point;
};

/**
 * 求两线段交点
 *
 * @param l1 - 线段
 * @param l2 - 线段
 * @returns 两线段交点坐标，平行线或线段不相交返回null
 */
export const lineSegmentCrossPoint = (l1: Line, l2: Line) => {
  // 判断是否有一个线段的两个端点都在另一个线段的同一边
  if (
    pointOnLine({ x: l1.x1, y: l1.y1 }, l2) *
      pointOnLine({ x: l1.x2, y: l1.y2 }, l2) ===
      1 ||
    pointOnLine({ x: l2.x1, y: l2.y1 }, l1) *
      pointOnLine({ x: l2.x2, y: l2.y2 }, l1) ===
      1
  ) {
    return null;
  }
  return lineCrossPoint(l1, l2);
};

/**
 * 求距离线段端点一定距离的点坐标
 *
 * @param line - 线段
 * @param dis - 线段
 * @param inside - 点在线段内
 * @returns 两线段交点坐标，平行线或线段不相交返回null
 */
export const disPointOnLine = (line: Line, dis: number, inside = true) => {
  const { start, end } = lineToStartEndPoint(line);
  const lineLength = distance(start, end);
  const rate = dis / lineLength;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const pos = inside ? -1 : 1;
  const targetPoint = {
    x: end.x + dx * rate * pos,
    y: end.y + dy * rate * pos
  };
  return targetPoint;
};

/**
 * 求距离线段上一点一定距离的点坐标
 *
 * @param line - 线段
 * @param dis - 线段
 * @param inside - 点在线段内
 * @returns 两线段交点坐标，平行线或线段不相交返回null
 */
export const disPointOnLineByEquation = (
  equation: Equation,
  point: Point,
  dis: number,
  inside = true
) => {
  const { k } = equation;
  const sita = Math.atan(k);
  const dx = dis * Math.cos(sita);
  const dy = dis * Math.sin(sita);
  const pos = inside ? -1 : 1;
  const targetPoint = {
    x: point.x + dx * pos,
    y: point.y + dy * pos
  };
  return targetPoint;
};

/**
 * 求距离直线一定距离且过垂点的点坐标
 *
 * @param start - 起点
 * @param end - 终点
 * @returns 点
 */
export const disPointFromLine = (
  start: Point,
  end: Point,
  dis: number,
  onTop = true
) => {
  const k1 = lineSlope(start, end);
  const k = k1 === Infinity ? 0 : -1 / k1;
  const sita = Math.atan(k);
  const x = end.x + (onTop ? 1 : -1) * Math.cos(sita) * dis;
  const y = end.y + (onTop ? 1 : -1) * Math.sin(sita) * dis;
  return { x, y } as Point;
};

/** ********角度、三角形相关*********************************************** */
/**
 * 计算三角形内角
 *
 * @param A - 点A
 * @param B - 点B
 * @param C - 点C
 * @returns a、b、c三个角度
 */
export const angleOfTriangle = (A: Point, B: Point, C: Point) => {
  const angle = (radian: number) => (180 * radian) / Math.PI;
  const a = distance(B, C);
  const b = distance(A, C);
  const c = distance(A, B);
  const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c));
  const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c));
  const angleC = Math.acos((a * a + b * b - c * c) / (2 * a * b));
  return {
    a: Number.isNaN(angleA) ? 180 : angle(angleA),
    b: Number.isNaN(angleB) ? 180 : angle(angleB),
    c: Number.isNaN(angleC) ? 180 : angle(angleC)
  };
};

/**
 * 点到直线距离
 *
 * @param point - 点
 * @param line - 线
 * @returns 距离
 */
export const disOfPointToLine = (point: Point, line: Line) => {
  const { start, end } = lineToStartEndPoint(line);
  const { b: angle } = angleOfTriangle(start, end, point);
  const radian = angleToRadian(angle);
  const len = distance(point, end);
  const dis = len * Math.sin(radian);
  return dis;
};

/**
 * 计算在一个角的两条边上距离角点固定距离的两个点。（可用来作为画角度圆弧、贝塞尔曲线画圆角的点）
 *
 * @param A - 角一边的端点
 * @param B - 角对应的点
 * @param C - 角另一边的端点
 * @param d - 距离角点固定距离
 * @returns 两个点的坐标
 */
export const angleEquidistantPoints = (
  A: Point,
  B: Point,
  C: Point,
  d = 15
) => {
  const AB = distance(A, B);
  const CB = distance(B, C);
  return {
    x1: B.x + (d / AB) * (A.x - B.x),
    y1: B.y + (d / AB) * (A.y - B.y),
    x2: B.x + (d / CB) * (C.x - B.x),
    y2: B.y + (d / CB) * (C.y - B.y)
  };
};

/**
 * 计算一个角的角平分线上距离角点固定距离的点。(可用来作为显示角的角度数值的点）
 *
 * @param A - 角一边的端点
 * @param B - 角对应的点
 * @param C - 角另一边的端点
 * @param d - 距离角点固定距离
 * @returns 目标点的坐标
 */
export const angleBisectorPoint = (A: Point, B: Point, C: Point, d = 30) => {
  // 先求角度等距点
  const { x1, y1, x2, y2 } = angleEquidistantPoints(A, B, C);
  const p1 = { x: x1, y: y1 };
  const p2 = { x: x2, y: y2 };
  // 连线中点
  const lineCenter = midpoint(p1, p2);
  const dis = distance(B, lineCenter);
  if (dis === 0) {
    const k = -1 / lineSlope(p1, p2);
    const sita = Math.atan(k);
    return {
      x: B.x + d * Math.cos(sita),
      y: B.y + d * Math.sin(sita)
    };
  }
  const rate = d / dis;
  return {
    x: B.x + rate * (lineCenter.x - B.x),
    y: B.y + rate * (lineCenter.y - B.y)
  } as Point;
};

// 判断弧线是否要翻转
export const isArcReverse = (A: Point, B: Point, C: Point, d = 15) => {
  const { start: startPoint, end: endPoint } = lineToStartEndPoint(
    angleEquidistantPoints(A, B, C, d)
  );
  const p_a = startPoint;
  const p_b = B;
  const p_c = endPoint;
  let sitaA = Math.asin((p_b.y - p_a.y) / d);
  let sitaC = Math.asin((p_b.y - p_c.y) / d);
  if (p_b.x > p_a.x) {
    sitaA = Math.PI - sitaA;
  }
  if (p_b.x > p_c.x) {
    sitaC = Math.PI - sitaC;
  }
  if (sitaA < 0) {
    sitaA += 2 * Math.PI;
  }
  if (sitaC < 0) {
    sitaC += 2 * Math.PI;
  }
  const reverse =
    (sitaA > sitaC && sitaA - sitaC < Math.PI) ||
    (sitaC > sitaA && sitaC - sitaA > Math.PI);
  return reverse;
};

/**
 * 计算一个角的角平分线方程 (y = kx + b)
 *
 * @param A - 角一边的端点
 * @param B - 角对应的点
 * @param C - 角另一边的端点
 * @returns 角平分线方程的参数 k 和 b
 */
export const angleBisectorEquation = (A: Point, B: Point, C: Point) => {
  const ka = lineSlope(A, B);
  const kc = lineSlope(C, B);
  let radianA = Math.atan(ka);
  let radianC = Math.atan(kc);
  if (Math.abs(A.x - B.x) === 0) {
    radianA = (Math.PI / 2) * (A.y - B.y > 0 ? 1 : -1);
  }
  if (A.x - B.x < 0) {
    radianA -= Math.PI;
  }
  if (Math.abs(C.x - B.x) === 0) {
    radianC = (Math.PI / 2) * (C.y - B.y > 0 ? 1 : -1);
  }
  if (C.x - B.x < 0) {
    radianC -= Math.PI;
  }
  const radianCenter = (radianA + radianC) / 2;
  const k = Math.tan(radianCenter);
  const b = B.y - k * B.x;
  return { k, b, x: k === Infinity ? B.x : NaN } as Equation;
};
/** ********其他********************************************************* */

/**
 * 射线法判断点是否在多边形内
 *
 * @param points - 多边形的端点坐标数组
 * @param p - 带测试是否在多边形内的一个点
 * @returns 是否在多边形内
 */
export const pointInPolygon = (points: Point[], p: Point) => {
  let intersectCount = 0;
  for (let i = 0; i < points.length; i += 1) {
    const p1 = points[i];
    const p2 = points[i === points.length - 1 ? 0 : i + 1];
    const k = (p2.y - p1.y) / (p2.x - p1.x);
    const b = p1.y - k * p1.x;
    const x_ok = Math.min(p1.x, p2.x) <= p.x && p.x <= Math.max(p1.x, p2.x);
    const y_ok = k * p.x + b > p.y;
    intersectCount += x_ok && y_ok ? 1 : 0;
  }
  return intersectCount % 2 === 1;
};

/**
 * 把目标矩形区域内的点转换到距离矩形四边一定内边距的范围内（可用于svg绘图strokeWidth被截取、周边留出安全距离等）
 *
 * @param point - 目标点坐标
 * @param padding - 内边距
 * @param width - 宽
 * @param height - 高
 * @returns 在内边距范围内的点
 */
export const handlePadding = (
  point: Point,
  padding: number,
  width: number,
  height: number
) => {
  let { x, y } = point;
  x = Math.max(padding, x);
  x = Math.min(width - padding, x);
  y = Math.max(padding, y);
  y = Math.min(height - padding, y);
  return { x, y } as Point;
};

/**
 * 获取固定长线段起始点坐标和角度弧度
 *
 * @param start - 开始点
 * @param end - 结束点
 * @param dis - 线段距离
 * @returns
 */
export const getLineSegment = (
  start: Point,
  end: Point,
  dis = 20,
  angle?: number
) => {
  const sita = lineRadian(start, end, angle);
  const x2 = start.x + dis * Math.cos(sita);
  const y2 = start.y + dis * Math.sin(sita);
  return {
    start,
    end: { x: x2, y: y2 },
    radian: sita
  };
};

/**
 * 计算多点组成的矩形的位置和大小信息
 *
 * @param points - 点
 * @returns
 */
export const getPointsBoundingRect = (points: Point[]) => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  points.forEach((point: Point) => {
    if (!point) {
      return;
    }
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  });
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
};

/**
 * 计算三点的贝塞尔曲线控制点
 * @param param0
 * @param rate 曲率
 * @returns
 */
export const getControlPoints = ([start, center, end]: Point[], rate = 0.4) => {
  const equ1 = angleBisectorEquation(start, center, end);
  const k = -1 / equ1.k;
  const b = center.y - k * center.x;
  const equ2 = { k, b, x: 0 } as any;
  const dis = distance(center, end) * rate;
  const sita = angleToRadian(angleOfTriangle(start, center, end).b);
  const d = dis * Math.sin(sita / 2);

  const inside = true;
  const control1 = disPointOnLineByEquation(equ2, center, d, inside);
  const control2 = disPointOnLineByEquation(equ2, center, d, !inside);
  if (
    pointOnLineByEquation(start, equ1) !== pointOnLineByEquation(control1, equ1)
  ) {
    return [{ ...control2, color: "red" } as any, control1, [equ2]];
  }
  return [{ ...control1, color: "red" } as any, control2, [equ2]];
};
