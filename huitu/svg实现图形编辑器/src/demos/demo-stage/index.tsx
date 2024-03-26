import { Stage } from "./stage";
import { Sprite } from "./sprite";
import { RectSprite } from "./sprites/rect";
import { LineSprite } from "./sprites/line";

export const StageDemo = ({ width, height }) => {
  return (
    <Stage width={width} height={height}>
      <Sprite x={200} y={50}>
        <RectSprite width={400} height={240}></RectSprite>
      </Sprite>
      <Sprite x={100} y={350}>
        <LineSprite x1={0} y1={0} x2={300} y2={100}></LineSprite>
      </Sprite>
    </Stage>
  );
};
