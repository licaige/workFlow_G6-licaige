
    /**
     * 科学计算符号法
     * param : 0.0000005
     */
    scientificNotationToString = (param) => {
      let strParam = String(param)
      let flag = /e/.test(strParam)
      if (!flag) return param
      // 指数符号 true: 正，false: 负
      let sysbol = true
      if (/e-/.test(strParam)) {
        sysbol = false
      }
      // 指数
      let index = Number(strParam.match(/\d+$/)[0])
      // 基数
      let basis = strParam.match(/^[\d\.]+/)[0].replace(/\./, '')
      if (sysbol) {
        return basis.padEnd(index + 1, 0)
      } else {
        return basis.padStart(index + basis.length, 0).replace(/^0/, '0.')
      }
    };
    
    // test 
    console.log(0.0000005); // 控制台打印0.00
    console.log(scientificNotationToString(0.0000005));// 控制台打印0.0000005