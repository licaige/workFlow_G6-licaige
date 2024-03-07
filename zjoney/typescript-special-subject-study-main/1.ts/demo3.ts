interface FistType {
  id: number;
  firstName: string;
  lastName: string;
}

interface SecondType {
  id: number;
  address: string;
  city: string;
}

//两种类型中的共有属性
type ExtractType1 = Extract<keyof FistType, keyof SecondType>;
type ExtractType2 = Exclude<keyof FistType, keyof SecondType>;
