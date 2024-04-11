// 4
function fn () {
  return new Promise(resolve => {
    console.log('Promise1')
    fn1()
    setTimeout(() => {
      console.log('Promise2')
      resolve()
      console.log('Promise3')
    }, 0)
  })
}

async function fn1 () {
  var p = Promise.resolve().then(() => {
    console.log('Promise6')
  })
  await p.then(() => {
    console.log('Promise7')
  })
  console.log('end')
}
console.log('script')
setTimeout(() => {
  console.log('setTimeout')
}, 0)
fn().then(() => {
  console.log('Promise4')
})


// 第4题
// script Promise1 Promise6 Promise7 end setTimeout Promise2 Promise3 Promise4