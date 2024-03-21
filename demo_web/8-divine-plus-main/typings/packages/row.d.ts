import { DivinePlusComponent } from "../component";

export type HorizontalAlignment =
  | "start"
  | "end"
  | "center"
  | "space-around"
  | "space-between";

export type VertialAlignment = "top" | "middle" | "bottom";

export declare class DvRow extends DivinePlusComponent {
  gutter: number;
  type: string;
  justify: HorizontalAlignment;
  align: VertialAlignment;
  tag: string;
}
