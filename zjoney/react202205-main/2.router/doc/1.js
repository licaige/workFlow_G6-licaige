

let pushState = () => {
  console.log('pushState');
}

function render() {
  console.log('render');
}
let oldPushState = pushState;
pushState = () => {
  oldPushState();
  render();
}
pushState();