interface User {
  id: number;
  age: number;
}
type PartialUser = Partial<User>;
const data: PartialUser = {};
export { PartialUser };

// -?
