// 找到最短路径，效率低
export default function (map) {
  return {
    data() {
      return {
        radio2: 0,
        history: [],
        shortestPath: [],
      }
    },
    methods: {
      // 下一步，可递归，连续下一步
      // ex:上一步，即来的方向不能重新走
      nextStep(ex) {
        if (
          this.path[0] &&
          ex[0] == this.output[0] && 
          ex[1] == this.output[1]
        ) {
          this.path.push([
            ...ex,
          ])
          this.history.push(JSON.parse(JSON.stringify(this.path)))
          this.timer1 = setTimeout(() => {
            this.rollBack()
          }, this.time)
          return void 0
        }
        this.path.push([
          ...ex,
          this.getDirection(ex)
        ])
        this.timer1 = setTimeout(() => {
          // 无路可走，回退
          if (this.path[this.path.length - 1][2].length == 0) {
            this.rollBack()
          } else {
            // 找一个方向走，并把该方向排除
            const direction = this.path[this.path.length - 1][2].shift()
            this.index = [...this.goNext(ex, direction)]
            this.nextStep(this.index)
          }
        }, this.time)
      },
      // 回退一步，可递归，连续回退
      rollBack() {
        let len = this.path.length
        // 回退到第一步，且没有其他方向，迷宫无解
        if (
          len == 0 ||
          (
            len == 1 &&
            Array.isArray(this.path[0][2]) &&
            this.path[0][2].length == 0
          )
        ) {
          if (this.history.length > 0) {
            let minLen = this.history[this.history.length - 1].length
            this.history.forEach(item => {
              if (item.length < minLen) {
                minLen = item.length
              }
            })
            this.shortestPath = this.history.filter(item => item.length == minLen)
            //出口一：到达终点
            console.log(this.shortestPath)
            console.log(this.history)
            this.path = this.shortestPath[0]
            clearTimeout(this.timer1)
            clearTimeout(this.timer2)
            return true
          } else {
            console.log('走不到出口')
            clearTimeout(this.timer1)
            clearTimeout(this.timer2)
            // 出口二：无解
            return false
          }
        }
        const ex = this.path.pop()
        this.timer2 = setTimeout(() => {
          if (Array.isArray(ex[2]) && ex[2].length !== 0) {
            this.nextStep(ex)
          } else {
            this.rollBack()
          }
        }, this.time)
      },
      // 给我当前坐标和一个方向，获取下一步坐标
      goNext(index, direction) {
        return map.find(item => item.type == direction)?.do(index)
      },
      // 根据坐标获取可以走的方向
      getDirection(index) {
        let x, y, direction = []
        for(let i of this.directions) {
          [x, y] = this.goNext(index, i)
          // 如果下一步是路
          if (this.map[x]?.[y] == 0) {
            if (this.path.find(item => item[0] == x && item[1] == y)) {
              continue
            }
            // console.log(JSON.stringify(this.path), x, y)
            direction.push(i)
          }
        }
        return direction
      },
      handleChange(item) {
        console.log(item)
        this.path = this.shortestPath[item]
      },
    }
  }
}

// 排除冗余路径，效率高，但是找不到最短路径
function init(map) {
  return {
    methods: {
      // 下一步，可递归，连续下一步
      // ex:上一步，即来的方向不能重新走
      nextStep(ex) {
        if (
          this.path[0] &&
          ex[0] == this.output[0] && 
          ex[1] == this.output[1]
        ) {
          this.getDirection(ex)
          this.path.push([
            ...ex,
          ])
          //出口一：到达终点
          console.log(this.path)
          clearTimeout(this.timer1)
          clearTimeout(this.timer2)
          return true
        }
        this.path.push([
          ...ex,
          this.getDirection(ex)
        ])
        this.timer1 = setTimeout(() => {
          // 无路可走，回退
          if (this.path[this.path.length - 1][2].length == 0) {
            this.rollBack()
          } else {
            // 找一个方向走，并把该方向排除
            const direction = this.path[this.path.length - 1][2].shift()
            this.index = [...this.goNext(ex, direction)]
            this.nextStep(this.index)
          }
        }, this.time)
      },
      // 回退一步，可递归，连续回退
      rollBack() {
        let len = this.path.length
        // 回退到第一步，且没有其他方向，迷宫无解
        if (
          len == 0 ||
          (
            len == 1 &&
            Array.isArray(this.path[0][2]) &&
            this.path[0][2].length == 0
          )
        ) {
          console.log('走不到出口')
          clearTimeout(this.timer1)
          clearTimeout(this.timer2)
          // 出口二：无解
          return false
        }
        // 将已经回退的冗余步骤删掉
        this.removeIndex = this.removeIndex.filter(item => item < len - 1)
        const ex = this.path.pop()
        this.timer2 = setTimeout(() => {
          if (Array.isArray(ex[2]) && ex[2].length !== 0) {
            this.nextStep(ex)
          } else {
            this.rollBack()
          }
        }, this.time)
      },
      // 给我当前坐标和一个方向，获取下一步坐标
      goNext(index, direction) {
        return map.find(item => item.type == direction)?.do(index)
      },
      // 根据坐标获取可以走的方向
      getDirection(index) {
        let x, y, direction = []
        for(let i of this.directions) {
          [x, y] = this.goNext(index, i)
          // 如果下一步是路
          if (this.map[x]?.[y] == 0) {
            // 这种方式只能排除冗余的步骤，没法准确找到最短路径
            // 如果下一步是已经走过的
            if (this.path.find(item => item[0] == x && item[1] == y)) {
              let last = this.path[this.path.length - 1]
              // 且下一步不是上一步时
              if (last[0] != x || last[1] != y) {
                this.path.forEach((item, ind) => {
                  if (ind < this.path.length - 1 && item[0] == x && item[1] == y) {
                    // 找到路径中走过的下标
                    if (this.removeIndex[this.removeIndex.length - 1] == ind + 1) {
                      this.removeIndex.push(ind + 2)
                    } else if (this.removeIndex.length == 0 || this.removeIndex[this.removeIndex.length - 1] < ind + 1) {
                      this.removeIndex.push(ind + 1)
                    }
                  }
                })
              }
              continue
            }
            console.log(JSON.stringify(this.path), x, y)
            direction.push(i)
          }
        }
        return direction
      }
    }
  }
}