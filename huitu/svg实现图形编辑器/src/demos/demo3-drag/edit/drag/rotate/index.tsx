import React from "react";
import {
  ISprite,
  ICoordinate,
  ISizeCoordinate,
  IStageApis
} from "../../../type";
import { getActiveSpriteRect } from "../../../helper";
import { lineAngle, radianToAngle } from "../../../geometry";
import RotateIcon from "./rotate-icon";

interface IProps {
  info: ISizeCoordinate;
  angle?: number;
  pressShift?: boolean;
  stage: IStageApis;
  activeSpriteList: ISprite[];
  mousePointInStage: (e: MouseEvent) => ICoordinate;
  getInitAttrMapData: () => any;
}

interface IState {
  rotating: boolean;
  mousePos: ICoordinate;
}

export class Rotate extends React.Component<IProps, IState> {
  initData: any = {};

  state: IState = {
    rotating: false,
    mousePos: { x: 0, y: 0 }
  };

  componentDidMount() {
    this.addEventListener("pointerup", this.rotate_mouseUp, false);
  }

  componentWillUnmount() {
    this.removeEventListener("pointermove", this.rotate_mouseMove, false);
    this.removeEventListener("pointerup", this.rotate_mouseUp, false);
  }

  addEventListener = (...args: any) => {
    document.addEventListener(...args);
  };
  removeEventListener = (...args: any) => {
    document.removeEventListener(...args);
  };

  rotate_mouseDown = () => {
    // e.stopPropagation();
    this.addEventListener("pointermove", this.rotate_mouseMove, false);
  };

  rotate_mouseUp = () => {
    const { rotating } = this.state;
    if (rotating) {
      this.setState({ rotating: false });
    }
    this.removeEventListener("pointermove", this.rotate_mouseMove, false);
    this.removeEventListener("pointermove", this.rotate_mouseUp, false);
  };

  rotate_mouseMove = (e: any) => {
    // e.stopPropagation();
    const { activeSpriteList, stage, mousePointInStage } = this.props;
    const { pressShift } = this.props;
    const unitAngle = 5;
    const mousePos = mousePointInStage(e);
    const info = getActiveSpriteRect(activeSpriteList);
    const center = { x: info.x + info.width / 2, y: info.y + info.height / 2 };
    let angle = lineAngle(center, mousePos);
    // 鼠标点和中心的点组成角度的补偿处理
    angle += radianToAngle(Math.atan((info.height + 15) / info.width));
    angle += angle < 0 ? 360 : 0;
    // 按下shify以5度为倍数变化旋转角度
    angle = pressShift ? Math.floor(angle / unitAngle) * unitAngle : angle;
    const adsorbAngles = [0, 90, 180, 270, 360];
    // 角度吸附处理
    adsorbAngles.forEach((degree: number) => {
      angle = Math.abs(angle - degree) < 1 ? degree : angle;
    });
    angle = angle > 360 ? 360 : angle;
    this.setState({ mousePos, rotating: true });
    activeSpriteList.forEach((sprite: ISprite) => {
      const newAttrs = { ...sprite.attrs };
      newAttrs.angle = angle;
      // eslint-disable-next-line  no-param-reassign
      sprite.attrs = newAttrs;
    });
    stage.apis.updateSpriteList(activeSpriteList);
  };

  render() {
    const { activeSpriteList, info } = this.props;
    const { mousePos, rotating } = this.state;
    const activeSingle = activeSpriteList.length === 1;
    const angle = (activeSingle ? activeSpriteList[0].attrs.angle : 0) || 0;
    return (
      <g>
        {/* {rotating && (
          <text
            x={mousePos.x + 15}
            y={mousePos.y}
            className="operate-point-rotate-angle"
            style={{
              left: `${mousePos.x + 15}px`,
              top: `${mousePos.y}px`,
              display: rotating ? "block" : "none",
              userSelect: "none"
            }}
          >
            {angle.toFixed(0)}°
          </text>
        )} */}
        {/* 旋转 */}
        {activeSingle && (
          <RotateIcon
            x={info.x + info.width}
            y={info.y - 20}
            className="operate-point-rotate-icon"
            onMouseDown={this.rotate_mouseDown}
          />
        )}
      </g>
    );
  }
}
