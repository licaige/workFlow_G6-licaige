import React from "react";

// 尺寸
export interface ISize {
  width: number;
  height: number;
}
// 坐标
export interface ICoordinate {
  x: number;
  y: number;
}

// 精灵属性
export interface ISpriteAttrs {
  size: ISize;
  coordinate: ICoordinate;
  angle: number;
  style?: React.CSSProperties;
  editing?: boolean;
  creating?: boolean;
}

export interface ISpriteMeta<IProps = any> {
  type: string;
  spriteComponent:
    | React.JSXElementConstructor<any>
    | ((props: any) => React.ReactNode);
  initProps?: IProps;
  initAttrs?: ISpriteAttrs;
}

// 精灵
export interface ISprite<IProps = any> {
  id: string;
  type: string;
  props: IProps;
  attrs: ISpriteAttrs;
}

// 默认图形props
export interface IDefaultGraphicProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  strokeDasharray?: string;
  strokeLinecap?: "butt" | "round" | "square";
  defaultStrokeLinecap?: "butt" | "round" | "square";
}
