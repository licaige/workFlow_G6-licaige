export interface IPerson {
  user?: {
    name: string;
    age: number;
  }
}
export interface IEvents {
  (e: 'change', hidden: boolean): void
}