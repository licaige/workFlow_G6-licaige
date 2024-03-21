import { DivinePlusComponent } from "../component";

export declare class DvProgress extends DivinePlusComponent {
  type: "line" | "circle" | "dashboard";
  percent: number;
  strokeWidth: number;
  strokeLinecap: string;
  circleWidth: number;
  status: "success" | "error" | "warning";
  color:
    | string
    | Function
    | Array<string | { color: string; percentage: number }>;
  backColor: string;
  textColor: string;
  showText: boolean;
  textInside: boolean;
  format(percentage: number): string;
}
