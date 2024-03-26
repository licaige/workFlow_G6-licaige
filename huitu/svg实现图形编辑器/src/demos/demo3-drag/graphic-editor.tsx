import React from "react";
import { Stage } from "./stage";
import { Sprite } from "./sprite";
import { ISprite, ISpriteAttrsLike, ISpriteMeta } from "./type";
import Drag from "./edit/drag";
import { findSpriteInSpriteList } from "./helper";

interface IProps {
  width: number;
  height: number;
  onReady?: () => void;
}

interface IState {
  spriteList: ISprite[];
  activeSpriteList: ISprite[];
}

export class GraphicEditorCore extends React.Component<IProps, IState> {
  private readonly registerSpriteMetaMap: Record<string, ISpriteMeta> = {};

  stage: any = { api: {}, store: () => ({}) };

  readonly state: IState = {
    spriteList: [],
    activeSpriteList: []
  };

  componentDidMount() {
    const stageDom = document.getElementById("graphic-editor-stage");
    const rect = stageDom?.getBoundingClientRect();
    console.log("yf123 stageRect", rect);

    this.stage = {
      apis: this,
      store: () => {
        return {
          ...this.state,
          ...this.props,
          coordinate: { x: rect?.x, y: rect?.y }
        };
      }
    };
  }

  /**
   * 注册精灵
   * @param {ISprite} sprite
   */
  public registerSprite = (spriteMeta: ISpriteMeta) => {
    if (this.registerSpriteMetaMap?.[spriteMeta.type]) {
      console.warn(`Sprite ${spriteMeta.type} is already registered.`);
      return;
    }
    this.registerSpriteMetaMap[spriteMeta.type] = spriteMeta;
  };

  /**
   * 添加精灵到画布
   * @param {ISprite | ISprite[]} sprite
   */
  public addSpriteToStage = (sprite: ISprite | ISprite[]) => {
    const { spriteList } = this.state;
    const newSpriteList = [...spriteList];
    if (Array.isArray(sprite)) {
      newSpriteList.push(...sprite);
    } else {
      newSpriteList.push(sprite);
    }
    this.setState({
      spriteList: newSpriteList
    });
  };

  updateActiveSpriteList = (activeSpriteList: ISprite[]) => {
    this.setState({ activeSpriteList });
  };

  /**
   * 更新精灵列表
   * @param spriteList
   * @param addToHistory
   */
  public updateSpriteList = (spriteList: ISprite[], addToHistory = false) => {
    const needUpdateSpriteList = spriteList;
    const spriteMap = {} as any;
    // eslint-disable-next-line no-return-assign
    needUpdateSpriteList.forEach(
      (sprite: ISprite) => (spriteMap[sprite.id] = sprite)
    );
    this.setState(({ spriteList }: IState) => {
      const newSpriteList = spriteList.map((sprite: ISprite) => {
        const newSprite = spriteMap[sprite.id];
        if (!newSprite) {
          return sprite;
        }
        return { ...newSprite };
      });

      return {
        spriteList: newSpriteList
      };
    });
  };

  /**
   * 更新精灵的配置
   * @param sprite
   * @param attrs
   * @param addToHistory
   */
  public updateSpriteAttrs = (
    sprite: ISprite | string,
    attrs: ISpriteAttrsLike,
    addToHistory = false
  ) => {
    this.setState(({ spriteList, activeSpriteList }: IState) => {
      const newSpriteList = [...spriteList];
      const newActiveSpriteList = [...activeSpriteList];

      const { sprite: targetSprite, index } = findSpriteInSpriteList(
        spriteList,
        sprite
      );
      if (targetSprite) {
        const newSprite = {
          ...targetSprite,
          attrs: {
            ...targetSprite.attrs,
            ...attrs
          }
        };
        newSpriteList[index] = newSprite;
        const { index: j } = findSpriteInSpriteList(activeSpriteList, sprite);
        if (j !== -1) {
          newActiveSpriteList[j] = newSprite;
        }
      }
      return {
        spriteList: newSpriteList,
        activeSpriteList: newActiveSpriteList
      };
    });
  };

  render() {
    const { registerSpriteMetaMap, stage } = this;
    const { width, height } = this.props;
    const { spriteList, activeSpriteList } = this.state;
    return (
      <Stage id="graphic-editor-stage" width={width} height={height}>
        {/* 精灵列表 */}
        {spriteList.map((sprite) => {
          // 从注册好的精灵映射里拿到meta和精灵组件
          const spriteMeta = registerSpriteMetaMap[sprite.type];
          const SpriteComponent =
            (spriteMeta?.spriteComponent as any) ||
            (() => <text fill="red">Undefined Sprite: {sprite.type}</text>);
          const { attrs } = sprite;
          return (
            <Sprite key={sprite.id} sprite={sprite}>
              <SpriteComponent sprite={sprite} />
            </Sprite>
          );
        })}
        <Drag
          scale={1}
          stage={stage}
          pressShift={false}
          activeSpriteList={activeSpriteList}
          registerSpriteMetaMap={registerSpriteMetaMap}
        />
      </Stage>
    );
  }
}
