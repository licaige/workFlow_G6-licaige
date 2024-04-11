const arr = [
  { id: '01', name: 'xxx', pid: '00' },
  { id: '02', name: 'xxx', pid: '01' },
  { id: '03', name: 'xxx', pid: '01' },
  { id: '04', name: 'xxx', pid: '01' },
  { id: '05', name: 'xxx', pid: '02' },
  { id: '06', name: 'xxx', pid: '02' },
  { id: '07', name: 'xxx', pid: '02' },
  { id: '08', name: 'xxx', pid: '02' },
  { id: '09', name: 'xxx', pid: '02' },
  { id: '10', name: 'xxx', pid: '02' },
  { id: '11', name: 'xxx', pid: '02' },
  { id: '12', name: 'xxx', pid: '03' },
  { id: '13', name: 'xxx', pid: '03' },
  { id: '14', name: 'xxx', pid: '04' },
  { id: '15', name: 'xxx', pid: '04' },
  { id: '16', name: 'xxx', pid: '04' },
  { id: '17', name: 'xxx', pid: '04' },
  { id: '18', name: 'xxx', pid: '04' },
  { id: '19', name: 'xxx', pid: '10' },
]

function arrToTree (arr, {getId, getParentId}) {
  const result = []
  arr.forEach(item => {
    item.children = []
    let pid = getParentId(item)
    let id = getId(item)
    if (pid === '00') {
      result.push(item)
    }
    for (let i = 0; i < arr.length; i++) {
      if (getParentId(arr[i]) === id) {
        item.children.push(arr[i])
      }
    }
  })
  return result
}
function getId (item) {
  return item.id
}
function getParentId (item) {
  return item.pid
}

function arrToTree2 (arr) {
  return arrToTree(arr, { getId, getParentId })
}

