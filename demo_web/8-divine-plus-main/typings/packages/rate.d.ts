import { DivinePlusComponent } from "../component";

type TStyle = {
  color?: string;
  fontSize?: string;
};

export declare class DvRate extends DivinePlusComponent {
  vModel: number;
  max: number;
  readonly: boolean;
  allowClear: boolean;
  allowHalf: boolean;
  texts: string[];
  showScore: boolean;
  iconName: string;
  iconStyle: TStyle;
  iconSelectedStyle: TStyle;
}
