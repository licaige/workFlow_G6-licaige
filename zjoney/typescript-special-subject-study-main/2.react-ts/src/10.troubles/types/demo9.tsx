function foo(bar: string) {
  return { baz: 1 };
}
type FooReturn = ReturnType<typeof foo>; // { baz: number }

function foo() {
  return {
    a: 1,
    b: 2,
    subInstArr: [
      {
        c: 3,
        d: 4,
      },
    ],
  };
}

type InstType = ReturnType<typeof foo>;
type SubInstArr = InstType['subInstArr'];
type SubIsntType = SubInstArr[0];

let baz: SubIsntType = {
  c: 5,
  d: 6,
};

//如果你不喜欢拆开的话 那就从左往右看
type SubIsntType2 = ReturnType<typeof foo>['subInstArr'][0];
let baz2: SubIsntType2 = {
  c: 5,
  d: 6, // type checks ok!
};
