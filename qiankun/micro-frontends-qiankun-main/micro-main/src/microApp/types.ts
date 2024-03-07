
export type TMicroApp = {
  label?: string;
  name: string;
  entry: string;
  activeRule: string;
  container: string;
  props?: any;
};

export type TMicroApps = TMicroApp[];

export type TInitQiankun = any
