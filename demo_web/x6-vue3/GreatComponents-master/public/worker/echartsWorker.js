// 使用fetch - body.getReader()进行大数据取流
// 使用TextDecoder将Uint8Array类型数据读成字符串
// 因为fetch取流每次数据量太小/分片太小，所以每10次流处理一次

function formatNumberPointToTwo(num, xiaoshu = 2){
  if(!num || num ==''){ 
    num = 0
  }
  return Number.parseFloat(num).toFixed(xiaoshu)
}
self.onmessage = function(e) {
  console.log('主线程传参', e, self)
  if (e.data.isOver) return
  const { that, detail, selectedIndex, isChangeUnit, type } = e.data
  const { params } = {
    ...detail,
  };
  let chartData = {};
  let xData = [],
    firstYear = Number(params.year.split(',')[0]),
    lastYear = Number(params.year.split(',')[1]);
  xData = new Array(lastYear - firstYear + 1).fill(0).map((_, index) => firstYear + index)
  that.lineOption.xAxis.data = xData;
  function groupForCover2(detail, selectedIndex, isChangeUnit, that) {
    that.indexSumLoading = false;
    function does(response) {
      const ar = response.split('{\"name\":')
      ar.shift()
      if (ar[ar.length - 1].lastIndexOf(']}') == -1) {
        ar.pop()
      } else {
        ar[ar.length - 1] = ar[ar.length - 1].split(']}')[0] + ']},'
      }
      if (ar.length) {
        let data = ar.map(item => JSON.parse('{\"name\":' + item.slice(0, -1)))
        if (data.length) {
          var series = []
          series = data.map(item => {
            return {
              name: item.name,
              data: item.valueList.map((m) =>
                isChangeUnit
                  ? formatNumberPointToTwo(
                      m[selectedIndex] / 10000,
                      1
                    )
                  : formatNumberPointToTwo(m[selectedIndex], 1)
              ),
              ...that.symbolStyle,
            }
          })
          chartData = {
            // xData,
            series,
          };
          that.isRightShow = true;
          
          that.lineOption.yAxis.name =
            (that.currentIndexItem?.name || "") +
            (that.currentIndexItem?.unit || "");
          that.lineOption.series = [...chartData.series]
        }
        self.postMessage({that})
      }
    }
    return new Promise(async (resolve) => {
      const map = {
        'resourceNum': '/water/resource/amount/water/cover/region/list/',
        'economicSocial': '/water/resource/amount/water/cover/region/list/',
        'waterSupply': '/water/supply/list/',
        'waterEfficiency': '/levels/efficiency/list/',
      }
      const resp = await fetch(`/water_resource${map[type]}groupForCover`, {
        method: 'post',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const reader = resp.body.getReader()
      const decoder = new TextDecoder()
      let code
      for (let i = 0;;i++) {
        // value是Uint8Array类型
        const {value, done} = await reader.read()
        if (done) {
          break
        }
        if (i==0) {
          code = value
        } else {
          const arrayOne = new Uint8Array(code);
          const arrayTwo = new Uint8Array(value);
          
          const mergedArray = new Uint8Array(arrayOne.length + arrayTwo.length);
          mergedArray.set(arrayOne);
          mergedArray.set(arrayTwo, arrayOne.length);
          code = mergedArray
        }
        if (i % 10) continue
        const text = decoder.decode(code)
        does(text)
      }
      const text = decoder.decode(code)
      does(text)
      resolve(that.lineOption.series)
    });
  }
  groupForCover2(detail, selectedIndex, isChangeUnit, that).then((data) => {
    if (!Array.isArray(data) || data.length == 0) {
      chartData = {
        xData: [],
        series: [],
      };
    } else {
      chartData.xData = [...xData]
      chartData.series = [...that.lineOption.series]
    }
    
    that.changeLineChartData = chartData
    that.lineOption.legend.data = that.changeLineChartData.series
      .filter((e) => e.data.length)
      .map((e) => e.name);
    self.postMessage({that, done: true})
  })
  .catch((res) => {
    console.log("res:", res);
  })
}

// axios在worker线程中使用需要使用importScripts引入
// axios大数据取流使用onDownloadProgress

// axios({
//   method: 'post',
//   url: "/water_resource/water/resource/amount/water/cover/region/list/groupForCover",
//   data: params,
//   responseType: 'stream', // 对于大数据，建议使用流处理
//   onDownloadProgress: (progressEvent) => {
//     const ar = progressEvent.currentTarget.response.split('{\"name\":')
//     ar.shift()
//     if (ar[ar.length - 1].lastIndexOf(']}') == -1) {
//       ar.pop()
//     } else {
//       ar[ar.length - 1] = ar[ar.length - 1].split(']}')[0] + ']},'
//     }
//     if (ar.length) {
//       let data = ar.map(item => JSON.parse('{\"name\":' + item.slice(0, -1)))
//       data = arrayDiff(data, oldData)
//       console.log(data)
//       if (data.length) {
//         console.log(1111)
//         var series = []
//         series = data.map(item => {
//           return {
//             name: item.name,
//             data: item.valueList.map((m) =>
//               isChangeUnit
//                 ? formatNumberPointToTwo(
//                     m[selectedIndex] / 10000,
//                     1
//                   )
//                 : formatNumberPointToTwo(m[selectedIndex], 1)
//             ),
//             ...that.symbolStyle,
//           }
//         })
//         chartData = {
//           // xData,
//           series,
//         };
//         that.isRightShow = true;
        
//         that.lineOption.yAxis.name =
//           (that.currentIndexItem?.name || "") +
//           (that.currentIndexItem?.unit || "");
//         that.lineOption.series.push(...chartData.series)
//         oldData = [...that.lineOption.series]
//       }
//     }
//     resolve()
//   },
// }
// ).then(({ code, data }) => {
//   if (!Array.isArray(data.data) || data.data.length == 0) {
//     chartData = {
//       xData: [],
//       series: [],
//     };
//   } else {
//     chartData.xData = [...xData]
//     chartData.series = [...that.lineOption.series]
//   }
//   const len = chartData.series?.filter(item => item.data.length > 0)?.length
//   if (len >= 30) {
//     const isCalulate = that.activeSelectValue == "calulate"
//     that.lineOption.tooltip.formatter = (params, ticket, callback) => {
//       let res = `${params[0].name}：<br/>`;
//       for (let i = 0; i < params.length; i++) {
//         if (i % Math.ceil(len / 30) == 0) res += '<br/>'
//         res += `<div style="width: ${isCalulate ? '350px': '150px'};display: inline-block;">${params[i].marker}${params[i].seriesName}： ${params[i].value}</div>`;
//       }
//       return res;
//     }
//   } else {
//     that.lineOption.tooltip.formatter = (params, ticket, callback) => {
//       let res = `${params[0].name}：`;
//       for (let i = 0; i < params.length; i++) {
//         res += `<br/>${params[i].marker}${params[i].seriesName}： ${params[i].value}`;
//       }
//       return res;
//     }
//   }
  
//   that.changeLineChartData = chartData
//   console.log('&*&*&', that.changeLineChartData.series)
//   that.lineOption.legend.data = that.changeLineChartData.series
//     .filter((e) => e.data.length)
//     .map((e) => e.name);
// })