class User {
  constructor(uname: string, age: number) {}
}
type TCtor = ConstructorParameters<typeof User>;

function init(...info: TCtor) {
  const [uname] = info;
  console.log('[ name ]', uname);
}

init('玛利亚', 20);
//ioc
