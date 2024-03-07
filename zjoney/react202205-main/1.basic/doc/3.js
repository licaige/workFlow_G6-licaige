

class Parent {
  constructor() {
    console.log('Parent');
  }
}
class Child extends Parent {
  constructor() {
    super();
    console.log('Child');
  }
}
let child = new Child();
console.log(child);