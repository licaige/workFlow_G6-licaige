import React from "react";
import type { IStageApis, ISprite } from "../type";

export interface IBaseSpriteProps<IProps> {
  sprite: ISprite<IProps>;
  stage: IStageApis;
  active?: boolean;
  editing?: boolean;
}

export class BaseSprite<IProps = any, IState = any> extends React.Component<
  IBaseSpriteProps<IProps>,
  IState
> {}
