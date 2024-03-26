import React from "react";
import { ICoordinate, ISize, ISprite } from "./type";

// 精灵
export const Sprite = ({
  sprite,
  children
}: {
  sprite: ISprite;
  children?: React.ReactNode;
}) => {
  const { id, attrs } = sprite;
  const { size = {}, coordinate = {}, angle = 0 } = attrs;
  const { width = 0, height = 0 } = size as ISize;
  const { x = 0, y = 0 } = coordinate as ICoordinate;
  const rotateStr = `rotate(${angle || 0}, ${x + width / 2} ${y + height / 2})`;
  const translateStr = `translate(${x},${y})`;
  const transform = `${angle === 0 ? "" : rotateStr} ${translateStr}`;
  return (
    <>
      <g className="sprite-container" data-sprite-id={id} transform={transform}>
        {children}
      </g>
      {/* <g
        style={{
          opacity: 0.5,
          pointerEvents: "none"
        }}
        className="sprite-container"
        data-sprite-id={id}
        transform={translateStr}
      >
        {children}
      </g> */}
    </>
  );
};
