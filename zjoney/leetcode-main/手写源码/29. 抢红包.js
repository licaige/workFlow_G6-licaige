
const redenvelope = function(people, amount) {
  let randSum = 0
  let randList = []
  let res = []

  for (let i = 0; i < people; i++) {
    let rand = Math.random()
    randList.push(rand)
    randSum += rand
  }

  randList.forEach((rand) => {
    const numSum = Number(((amount * rand / randSum).toFixed(2)))
    res.push(numSum)
  })

  return res
}
const redenvelopeRes = redenvelope(13, 200)
const sum= redenvelopeRes.reduce((acc,val) => {
  return acc + val 
}, 0)
console.log('redenvelopeRes', redenvelopeRes, sum)