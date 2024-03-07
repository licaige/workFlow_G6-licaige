export type TMenuItem = {
  id: number;
  name: string;
  path: string;
  icon: string;
  children: TMenuItem[];
}

export type TMenuList = TMenuItem[]