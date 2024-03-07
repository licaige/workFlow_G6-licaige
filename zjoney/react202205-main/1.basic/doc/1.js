function createElement(type) {
  console.log(type);
  return { type }
}
let result = createElement(createElement('h1'));