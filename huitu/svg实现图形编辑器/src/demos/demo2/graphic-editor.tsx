import React from "react";
import { Stage } from "./stage";
import { Sprite } from "./sprite";
import { ISprite, ISpriteMeta } from "./type";

interface IProps {
  width: number;
  height: number;
  onReady?: () => void;
}

interface IState {
  spriteList: ISprite[];
}

export class GraphicEditorCore extends React.Component<IProps, IState> {
  private readonly registerSpriteMetaMap: Record<string, ISpriteMeta> = {};

  readonly state: IState = {
    spriteList: []
  };

  /**
   * 注册精灵
   * @param {ISprite} sprite
   */
  public registerSprite = (spriteMeta: ISpriteMeta) => {
    if (this.registerSpriteMetaMap[spriteMeta.type]) {
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

  render() {
    const { registerSpriteMetaMap } = this;
    const { width, height } = this.props;
    const { spriteList } = this.state;
    return (
      <Stage width={width} height={height}>
        {/* 精灵列表 */}
        {spriteList.map((sprite) => {
          // 从注册好的精灵映射里拿到meta和精灵组件
          const spriteMeta = registerSpriteMetaMap[sprite.type];
          const SpriteComponent =
            (spriteMeta?.spriteComponent as any) ||
            (() => <text fill="red">Undefined Sprite: {sprite.type}</text>);
          const { attrs } = sprite;
          return (
            <Sprite
              key={sprite.id}
              x={attrs.coordinate.x}
              y={attrs.coordinate.y}
            >
              <SpriteComponent sprite={sprite} />
            </Sprite>
          );
        })}
      </Stage>
    );
  }
}
