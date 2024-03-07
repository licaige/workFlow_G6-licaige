interface User {
  id: number;
  age: number;
}
type PartialUser = Partial<User>;
type PickUser = Required<Pick<PartialUser, 'id'>>;
