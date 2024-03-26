import React from "react";
import { BaseSprite } from "../BaseSprite";
import type { ISpriteMeta, IDefaultGraphicProps } from "../../type";

type IProps = IDefaultGraphicProps;

// 矩形精灵
export const Rect = (props: IProps) => {
  return <rect x="0" y="0" stroke="#999" stroke-width="2" {...props}></rect>;
};

// 精灵的名字，这个应该是全局唯一的
const SpriteType = "RectSprite";

// 矩形精灵组件
export class RectSprite extends BaseSprite<IProps> {
  render() {
    const { sprite } = this.props;
    const { props, attrs } = sprite;
    const { width, height } = attrs.size;
    return (
      <>
        <Rect {...props} x={0} y={0} width={width} height={height} />
      </>
    );
  }
}

// 描述精灵的元数据
export const RectSpriteMeta: ISpriteMeta<IProps> = {
  // 类型，精灵的名字，全局唯一
  type: SpriteType,
  // 精灵组件
  spriteComponent: RectSprite
};

export default RectSpriteMeta;
