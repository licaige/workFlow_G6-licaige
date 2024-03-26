import React from "react";
import { BaseSprite } from "../BaseSprite";
import type { ISpriteMeta, IDefaultGraphicProps } from "../../type";

interface ILine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
type IProps = ILine & IDefaultGraphicProps;

// 精灵
export const Line = (props: IProps) => {
  return (
    <line
      x1={0}
      y1={0}
      x2={0}
      y2={0}
      stroke="#999"
      stroke-width="2"
      {...props}
    />
  );
};

// 精灵的名字，这个应该是全局唯一的
const SpriteType = "LineSprite";

// 矩形精灵组件
export class LineSprite extends BaseSprite<IProps> {
  render() {
    const { sprite } = this.props;
    const { props, attrs } = sprite;
    return (
      <>
        <Line {...props} strokeWidth={6} stroke="transparent" />
        <Line {...props} />
      </>
    );
  }
}

// 描述精灵的元数据
export const LineSpriteMeta: ISpriteMeta<IProps> = {
  // 类型，精灵的名字，全局唯一
  type: SpriteType,
  // 精灵组件
  spriteComponent: LineSprite
};

export default LineSpriteMeta;
