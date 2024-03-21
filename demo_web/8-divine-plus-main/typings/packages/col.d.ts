import { DivinePlusComponent } from "../component";

export interface ResponsiveColumnProperties {
  span: number;
  offset: number;
}

export type ResponsiveColumn = number | ResponsiveColumnProperties;

export declare class DvCol extends DivinePlusComponent {
  span: number;
  offset: number;
  push: number;
  pull: number;
  xs: ResponsiveColumn;
  sm: ResponsiveColumn;
  md: ResponsiveColumn;
  lg: ResponsiveColumn;
  xl: ResponsiveColumn;
  tag: string;
}
