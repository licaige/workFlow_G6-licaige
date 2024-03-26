import React from "react";
import {
  ISprite,
  ISpriteMeta,
  ICoordinate,
  ISizeCoordinate,
  ISize,
  Line,
  IStageApis
} from "../../type";
import {
  findParentByClass,
  getActiveSpriteRect,
  isInputting
} from "../../helper";
import { Resize } from "./resize";
import { Move } from "./move";
import { Rotate } from "./rotate";

interface IProps {
  scale: number;
  activeSpriteList: ISprite[];
  registerSpriteMetaMap: Record<string, ISpriteMeta>;
  stage: IStageApis;
  pressShift: boolean;
}

interface IState {
  mousePos: ICoordinate;
  auxiliaryLineList: Line[];
  ready: boolean;
  helpPoints: (ICoordinate & { color?: string })[];
}

class LegoActiveSpriteContainer extends React.Component<IProps, IState> {
  containerRef: any = React.createRef();

  initMousePos: ICoordinate = { x: 0, y: 0 };

  initSizeMap: Record<string, ISize> = {};

  initPosMap: Record<string, ICoordinate> = {};

  resizePos: string = "";

  activeRect: ISizeCoordinate = { width: 0, height: 0, x: -10, y: 0 };

  initActiveInfo: ISizeCoordinate = { width: 0, height: 0, x: 0, y: 0 };

  readonly state: IState = {
    mousePos: { x: 0, y: 0 },
    auxiliaryLineList: [],
    ready: false,
    helpPoints: []
  };

  componentDidMount() {
    document.addEventListener("pointerdown", this.hanldeMouseDown, false);
    this.setState({ ready: true });
    // 显示帮助点
    (window as any).updateHelpPoint = (
      point: ICoordinate & { color?: string },
      index: number
    ) => {
      const { helpPoints } = this.state;
      const newPoints = [...helpPoints];
      newPoints[index] = point;
      this.setState({ helpPoints: newPoints });
    };
    (window as any).updateHelpPoints = (
      points: (ICoordinate & { color?: string })[]
    ) => {
      console.log("yf123 points", points);

      this.setState({ helpPoints: points });
    };
  }

  componentWillUnmount() {
    document.removeEventListener("pointerdown", this.hanldeMouseDown, false);
  }

  mousePointInStage = (e: any) => {
    const { stage, scale = 1 } = this.props;
    const { pageX, pageY } = e;
    const { coordinate: stagePos } = stage.store();
    const mousePoint = {
      x: pageX - stagePos.x,
      y: pageY - stagePos.y
    };
    mousePoint.x /= scale;
    mousePoint.y /= scale;
    return mousePoint;
  };

  getInitAttrMap = (e: any, _activeSpriteList?: ISprite[]) => {
    const activeSpriteList = _activeSpriteList || this.props.activeSpriteList;
    this.initSizeMap = {};
    this.initPosMap = {};
    this.initMousePos = this.mousePointInStage(e);
    this.initActiveInfo = getActiveSpriteRect(activeSpriteList);
    activeSpriteList.forEach((sprite: ISprite) => {
      this.initSizeMap[sprite.id] = { ...sprite.attrs.size };
      this.initPosMap[sprite.id] = { ...sprite.attrs.coordinate };
    });
  };

  getInitAttrMapData = () => {
    const { initSizeMap, initPosMap, initMousePos, initActiveInfo } = this;
    return { initSizeMap, initPosMap, initMousePos, initActiveInfo };
  };

  handleSelect = (e: any) => {
    const { updateActiveSpriteList } = this.props.stage.apis;
    const { spriteList } = this.props.stage.store();
    const spriteDom = findParentByClass(e.target, "sprite-container");
    if (!spriteDom) {
      this.getInitAttrMap(e);
    }
    if (!spriteDom || isInputting()) {
      return;
    }
    const id = spriteDom?.getAttribute("data-sprite-id");

    const activeSpriteList = spriteList.filter((e: ISprite) => e.id === id);
    updateActiveSpriteList(activeSpriteList);
    this.getInitAttrMap(e, activeSpriteList);
  };

  hanldeMouseDown = (e: any) => {
    this.handleSelect(e);
  };

  render() {
    const { stage, activeSpriteList } = this.props;
    const { ready, auxiliaryLineList } = this.state;
    let info: ISizeCoordinate = { width: 0, height: 0, x: -10, y: 0 };
    const activeSingle = activeSpriteList.length === 1;
    const angle = (activeSingle ? activeSpriteList[0].attrs.angle : 0) || 0;
    if (activeSpriteList.length > 0) {
      info = getActiveSpriteRect(activeSpriteList);
    }
    if (info.width < 0 || info.height < 0) {
      return null;
    }
    this.activeRect = { ...info };
    const { x, y, width, height } = info;
    const rotateStr = `rotate(${angle || 0}, ${x + width / 2} ${
      y + height / 2
    })`;
    return (
      <>
        <g className="active-sprites-container" transform={rotateStr}>
          {/* 边框 */}
          <rect
            x={info.x}
            y={info.y}
            width={info.width}
            height={info.height}
            stroke="#0067ed"
            fill="none"
            className="active-sprites-content"
          ></rect>
          {ready && (
            <Move
              info={info}
              angle={angle}
              stage={stage}
              activeSpriteList={activeSpriteList}
              mousePointInStage={this.mousePointInStage}
              getInitAttrMapData={this.getInitAttrMapData}
            />
          )}
          {/* 修改尺寸的锚点 */}
          {ready && (
            <Resize
              info={info}
              angle={angle}
              stage={stage}
              activeSpriteList={activeSpriteList}
              mousePointInStage={this.mousePointInStage}
              getInitAttrMapData={this.getInitAttrMapData}
            />
          )}
          {/* 旋转 */}
          {ready && (
            <Rotate
              info={info}
              angle={angle}
              stage={stage}
              activeSpriteList={activeSpriteList}
              mousePointInStage={this.mousePointInStage}
              getInitAttrMapData={this.getInitAttrMapData}
            />
          )}
        </g>
        {/* 辅助线 */}
        {auxiliaryLineList.map((line: Line) => (
          <line
            key={JSON.stringify(line)}
            {...line}
            stroke={"#0067ed"}
            strokeDasharray="4 4"
          ></line>
        ))}
        <g style={{ pointerEvents: "none" }}>
          {this.state.helpPoints.map((p) => (
            <circle
              key={JSON.stringify(p)}
              cx={p?.x}
              cy={p?.y}
              r="6"
              fill={p?.color || "#0067ed"}
            />
          ))}
        </g>
      </>
    );
  }
}
export default LegoActiveSpriteContainer;
