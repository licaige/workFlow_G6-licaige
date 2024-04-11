import { singleton } from "./index.js";
class A {
  constructor() {

  }
}
const singleA = singleton(A)
const a1 = new singleA()
const a2 = new singleA()
console.log(a1 === a2)

export default singleA