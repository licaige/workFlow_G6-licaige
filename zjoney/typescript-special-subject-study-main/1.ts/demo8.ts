interface Person {
  readonly id: number;
}
const data: Person = {
  id: 456,
};

data.id = 789;
