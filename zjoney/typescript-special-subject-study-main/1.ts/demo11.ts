type petGroup = 'dog' | 'cat' | 'fish';
interface IPetInfo {
  name: string;
  age: number;
}

type IPets = Record<petGroup, IPetInfo>;
