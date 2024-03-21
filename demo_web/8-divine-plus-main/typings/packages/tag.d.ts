import { DivinePlusComponent, DivinePlusComponentSize } from "../component";

export type TagType = "primary" | "gray" | "success" | "warning" | "danger";
export type TagTheme = "dark" | "light" | "plain";

export declare class DvTag extends DivinePlusComponent {
  type: TagType;
  closable: boolean;
  disableTransitions: boolean;
  hit: boolean;
  color: string;
  size: DivinePlusComponentSize;
  effect: TagTheme;
}
