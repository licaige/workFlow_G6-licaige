import { DivinePlusComponent } from "../component";
import { VNode } from "vue";

interface DvEmptySlots {
  default: VNode[];
  image: VNode[];
  description: VNode[];
  [key: string]: VNode[];
}

export declare class DvEmpty extends DivinePlusComponent {
  image: string;
  imageSize: number;
  description: string;
  $slots: DvEmptySlots;
}
