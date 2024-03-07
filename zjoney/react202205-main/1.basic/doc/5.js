let hookState = ['a'];
let vdom = {
  render() {
    console.log(hookState[0]);
  }
};

function compare(oldVdom, newVdom) {
  oldVdom.render();
}
compare(vdom, vdom)
hookState[0] = 'b';
compare(vdom, vdom)

