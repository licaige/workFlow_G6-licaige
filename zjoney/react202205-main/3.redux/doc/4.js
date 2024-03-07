

function foo(a) {
  function bar(b) {
    console.log(a, b);
  }
  bar(2);
}
foo(1);