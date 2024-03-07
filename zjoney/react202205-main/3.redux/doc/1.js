

let dispatch;
let api = {
    dispatch: () => dispatch
}
console.log(api.dispatch());
dispatch = 100;
console.log(api.dispatch());