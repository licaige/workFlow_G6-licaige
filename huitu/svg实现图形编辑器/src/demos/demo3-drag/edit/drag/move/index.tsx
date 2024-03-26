import React from "react";
import {
  ISprite,
  ICoordinate,
  ISizeCoordinate,
  IStageApis
} from "../../../type";
import { findParentByClass, isInputting } from "../../../helper";

interface IProps {
  info: ISizeCoordinate;
  angle?: number;
  stage: IStageApis;
  activeSpriteList: ISprite[];
  mousePointInStage: (e: MouseEvent) => ICoordinate;
  getInitAttrMapData: () => any;
}

interface IState {
  moving: boolean;
}

export class Move extends React.Component<IProps, IState> {
  initData: any = {};

  state: IState = {
    moving: false
  };

  componentDidMount() {
    this.addEventListener("pointerdown", this.move_mouseDown, false);
    this.addEventListener("pointerup", this.move_mouseUp, false);
  }

  componentWillUnmount() {
    this.removeEventListener("pointermove", this.move_mouseMove, false);
    this.removeEventListener("pointerup", this.move_mouseUp, false);
  }

  addEventListener = (...args: any) => {
    document.addEventListener(...args);
  };
  removeEventListener = (...args: any) => {
    document.removeEventListener(...args);
  };

  move_mouseDown = (e: any) => {
    this.initData = this.props.getInitAttrMapData();
    const spriteDom = findParentByClass(e.target, "sprite-container");
    if (!spriteDom || isInputting()) {
      return;
    }
    this.addEventListener("pointermove", this.move_mouseMove, false);
    this.addEventListener("pointerup", this.move_mouseUp, false);
  };

  move_mouseUp = () => {
    const { moving } = this.state;
    if (moving) {
      this.setState({ moving: false });
    }
    // e.stopPropagation();
    this.removeEventListener("pointermove", this.move_mouseMove, false);
    this.removeEventListener("pointerup", this.move_mouseUp, false);
  };

  move_mouseMove = (e: any) => {
    // e.stopPropagation();
    const { mousePointInStage } = this.props;
    const { initMousePos, initPosMap } = this.initData;
    const mousePoint = mousePointInStage(e);
    const { x, y } = initMousePos;
    if (
      isInputting() ||
      (Math.abs(mousePoint.x - x) < 3 && Math.abs(mousePoint.y - y) < 3)
    ) {
      return;
    }
    const { activeSpriteList, stage } = this.props;
    const move = this.handleMoveAdsorbent(mousePoint);
    const newActiveSpriteList = [...activeSpriteList];
    newActiveSpriteList.forEach((sprite: ISprite, i: number) => {
      const x = move.x + initPosMap[sprite.id]?.x;
      const y = move.y + initPosMap[sprite.id]?.y;
      newActiveSpriteList[i] = {
        ...sprite,
        attrs: {
          ...sprite.attrs,
          coordinate: { x, y }
        }
      };
    });
    stage.apis.updateSpriteList(newActiveSpriteList);
    stage.apis.updateActiveSpriteList(newActiveSpriteList);
    this.setState({ moving: true });
  };

  handleMoveAdsorbent = (mousePoint: ICoordinate) => {
    const { initMousePos } = this.props.getInitAttrMapData();
    const move = {
      x: mousePoint.x - initMousePos.x,
      y: mousePoint.y - initMousePos.y
    };
    return move;
  };

  render() {
    return null;
  }
}
