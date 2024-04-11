/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * {time: 开始时间， words:歌词内容}
*/
function parseLrc () {
  let lines = lrc.split('\n').slice(0, -1)
  return lines.map(item => {
    let [time, words] = item.split(']')
    // time = time.split('[')[1]
    time = time.substring(1)
    console.log(time)
    return {
      time: parseTime(time),
      words
    }
  })
}
let lrcData = parseLrc(lrc)
console.log(lrcData)
/**
 * 解析时间格式
 * 返回一个数字代表开始秒数
*/
function parseTime (timeString) {
  let [m, s] = timeString.split(':')
  return +m * 60 + +s
}

let doms = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('.container ul'),
  li: document.querySelectorAll('.container li'),
}

/**
 * 计算出当前播放器播放到第几秒时，
 * 歌词数组lrcData中应该高亮显示歌词的下标
 * 
*/

function findIndex () {
  let curTime = doms.audio.currentTime
  for (let i = 0; i < lrcData.length; i++) {
    if (curTime < lrcData[i].time) {
      return i - 1
    }
  }
  return lrcData.length - 1
}

/**
 * 根据歌词生成dom
*/
function parseDom () {
  // 批量更新，frag文档片段
  let dom = document.createDocumentFragment()
  lrcData.forEach(item => {
    let li = document.createElement('li')
    li.innerText = item.words
    dom.append(li)
  })
  doms.ul.appendChild(dom)
  doms.li = doms.ul.children
}

parseDom()

/**
 * 根据播放器时间，计算滚动高度，并给li加active
*/
function handlePlay (event) {
  document.querySelector('.active')?.classList?.remove('active')
  let curTime = doms.audio.currentTime || event.target.currentTime
  console.log(curTime, event)
  let curLi = doms.li[findIndex(curTime)]
  curLi.classList.add('active')
  doms.ul.style.transform = `translateY(${195 - 30 * findIndex(curTime)}px)`
}

doms.audio.addEventListener('timeupdate', handlePlay)