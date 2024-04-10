/*
 * 时间戳格式转正常时间格式显示
 */

/**格式化日期，如月、日、时、分、秒保证为2位数
 * @param {Object} n
 */
function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n;
}

/**参数number为毫秒时间戳，format为需要转换成的日期格式
 * @param {Object} number
 * @param {Object} format
 * 使用formatTime(1545903266795, 'Y年M月D日 h:m:s')或者formatTime(1545903266795, 'Y-M-D h:m:s')即可
 */
function formatTime (number, format) {
  let time = new Date(number)
  let newArr = []
  let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
  newArr.push(time.getFullYear())
  newArr.push(formatNumber(time.getMonth() + 1))
  newArr.push(formatNumber(time.getDate()))

  newArr.push(formatNumber(time.getHours()))
  newArr.push(formatNumber(time.getMinutes()))
  newArr.push(formatNumber(time.getSeconds()))

  for (let i in newArr) {
    format = format.replace(formatArr[i], newArr[i])
  }
  return format;
}

/*
* 时间戳转换（10位数）/（13位）
* */
//时间戳13位
function formatDate(time) {//时间戳转日期
  let date = new Date(time);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
  // return y + '-' + MM + '-' + d;
}
//时间戳10位
function formatDate(time) {//时间戳转日期
  let date = new Date(parseInt(time) * 1000);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
  // return y + '-' + MM + '-' + d;
}

/*
*时间戳转日期时间 (可自定义返回格式)
* */
function formatDate(data,formatstr){
  var arrweek=["日","一","二","三","四","五","六"];
  var str=formatstr.replace(/yyyy|YYYY/,date.getFullYear()).replace(/yy|YY/,
    $addZero(date.getFullYear() % 100,2)).replace(/mm|MM/,$addZero(date.getMonth() + 1,
    2)).replace(/m|M/g,date.getMonth() + 1).replace(/dd|DD/,$addZero(date.getDate(),2)).replace(/d|D/g,
    date.getDate()).replace(/hh|HH/,$addZero(date.getHours(),2)).replace(/h|H/g,
    date.getHours()).replace(/ii|II/,$addZero(date.getMinutes(),2)).replace(/i|I/g,
    date.getMinutes()).replace(/ss|SS/,$addZero(date.getSeconds(),2)).replace(/s|S/g,
    date.getSeconds()).replace(/w|g/,$addZero(date.getDay(),2)).replace(/W/g,arrweek[date.getDay()]);
  return str;
}
function $addZero(v,size){
  for(var i=0,len=size-(v+"").length;i<len;i++){
    v="0"+v;
  }
  return v+""
}

// 使用示例
// 年、月、日、时、分、秒
var date = jutils.formatDate(new Date(1634002035*1000),"YYYY-MM-DD HH:ii:ss");
// 2021-10-12 09:27:15
//年、月、日、周
var date = jutils.formatDate(new Date(1634002035*1000),"YYYY-MM-DD 周W");
//2021-10-12 周二
//时、分、秒
var date = jutils.formatDate(new Date(1634002035*1000),"HH:ii:ss");
//09:27:15
/*
*获取当前时间戳的方法
* */
var times = Date.parse(new Date());//不推荐使用，因为毫秒级别的数值被转化为000 ，不准确！

var times = (new Date()).valueOf();//获取当前毫秒的时间戳，准确！

var times = new Date().getTime();//返回数值单位是毫秒；

// 时间转时间戳毫秒方法

(new Date(this.zzsj)).getTime()   //getTime()返回数值的单位是毫秒
/*
* 时间转换成时间戳
* */
Date.parse()//转时间戳
/*
* 获取当前的年月日
* */
function getDatetime(){
  //获取当前的年月日
  let date_ = new Date();
  let seperator1 = "-";
  let year = date_.getFullYear();
  let month = date_.getMonth() + 1;
  let strDate = date_.getDate();
}
/*
* 获取当前星期几
* */
function getDatetime(){
  //获取当前星期几
  let date_ = new Date();
  let days = date_.getDay();
  switch(days) {
    case 1:
      days = '星期一';
      break;
    case 2:
      days = '星期二';
      break;
    case 3:
      days = '星期三';
      break;
    case 4:
      days = '星期四';
      break;
    case 5:
      days = '星期五';
      break;
    case 6:
      days = '星期六';
      break;
    case 0:
      days = '星期日';
      break;
  }
  this.days = days;
}

//简写方式，把星期写成数组从数组中获取
function getDatetime(){
  //获取当前星期几
  let date_ = new Date();
  let days = date_.getDay();
  let arr = ['星期日', '星期一','星期二','星期三','星期四','星期五','星期六']
  this.days = arr[days]
}
/*
* Js获取当前日期时间及其它操作
* */
var Date = new Date();
Date.getYear();        //获取当前年份(2位)
Date.getFullYear();    //获取完整的年份(4位,1970-????)
Date.getMonth();       //获取当前月份(0-11,0代表1月)
Date.getDate();        //获取当前日(1-31)
Date.getDay();         //获取当前星期X(0-6,0代表星期天)
Date.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
Date.getHours();       //获取当前小时数(0-23)
Date.getMinutes();     //获取当前分钟数(0-59)
Date.getSeconds();     //获取当前秒数(0-59)
Date.getMilliseconds();    //获取当前毫秒数(0-999)
Date.toLocaleDateString();     //获取当前日期
var time=Date.toLocaleTimeString();     //获取当前时间
Date.toLocaleString( );        //获取日期与时间

/*
*获取当前月的第一天
* */
function getCurrentMonthFirst=()=>{
  var date=new Date();
  date.setDate(1);
  return common.getdateNoTime(date);
}

/*
* 获前取n天日期
* */
function getBeforeDate=()=>{
  var n = n;
  var d = new Date();
  var year = d.getFullYear();
  var mon = d.getMonth() + 1;
  var day = d.getDate();
  if (day <= n) {
    if (mon > 1) {
      mon = mon - 1;
    } else {
      year = year - 1;
      mon = 12;
    }
  }
  d.setDate(d.getDate() - n);
  year = d.getFullYear();
  mon = d.getMonth() + 1;
  day = d.getDate();
  const s = year + '-' + (mon < 10 ? '0' + mon : mon) + '-' + (day < 10 ? '0' + day : day);
  return s;
}
/*
* 根据两个日期，判断相差天数
* */
/**
 * @zhiparam sDate1 开始日期 如：2016-11-01
 * @param sDate2 结束日期 如：2016-11-02
 * @returns {nDays} 返回相差天数
 */
function daysBetween = (sDate1, sDate2) => {
  var time1 = Date.parse(new Date(sDate1));
  var time2 = Date.parse(new Date(sDate2));
  var nDays = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
  return nDays;
}

/*
* 根据bai两个日期，判断相差月数
* */
/**
 * @zhiparam startDate 开始日期 如：2016-11-01
 * @param endStart结束日期 如：2016-11-02
 * @returns {intervalMonth} 返回相差月数
 */
function getIntervalMonth = (startDate, endStart) => {
  var startMonth = new Date(startDate).getMonth();
  var endMonth = new Date(endStart).getMonth();
  var intervalMonth =
    new Date(endStart).getFullYear() * 12 + endMonth - (new Date(startDate).getFullYear() * 12 + startMonth);
  return intervalMonth;
}
/*
* 获取几个月前的输入日期
* */
/**
 *{param:DateTime} date 输入日期(YYYY-MM-DD)
 *{param:number } monthNum 月数
 */
function getIntervalMonth = (startDate, endStart) => {
  var dateArr = date.split('-');
  var year = dateArr[0]; //获取当前日期的年份
  var month = dateArr[1]; //获取当前日期的月份
  var day = dateArr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中月的天数
  var year2 = year;
  var month2 = parseInt(month) - monthNum;
  if (month2 <= 0) {
    var absM = Math.abs(month2);
    year2 = parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
    month2 = 12 - (absM % 12);
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}

/*
* 时间戳转换时间
* */
function getdate= (date) => {
  var now = new Date(date),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
  return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + now.toTimeString().substr(0, 8);
}
/*
* 时间戳转换时间 - 无时分秒
* */
function getdateNoTime= (date) => {
  var now = new Date(date),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
  return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
}
/*
*时间戳转换时间-无日期
* */
function getdateTime= (date) => {
  var now = new Date(date),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
  return now.toTimeString().substr(0, 8);
}
/*
* 获取当前日期
* */
function formatting= (time) => {
  let date = new Date();
  if (time !== undefined) {
    date = new Date(time);
  }
  const seperator1 = '-';
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`;
  }
  const currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
/*
* js获取每个月最后一天的三种方法
* 接到一个需求，需要输入年份和月份，返回这个月的最后一天的日期。
* 当时的第一想法就是：一三五七八十腊，三十一天永不差；
* 四六九十一，三十天；二月平年28天，闰年29天。
* 闰年是能被4除尽的年份。内心OS：哇，这要好多判断，好麻烦！！
但是第一种方法就是按照上述来实现的，然后想到Date中是否有相关的方法可以实现，
* 通过查看文档，发现是ok的，第二和第三种方法都是通过Date来实现的。
* 具体思路可参考下面三种实现方法
* */
/*
* 第一种方法
实现思路：对月份进行31天和30天的分组，如果是2月份判断是否闰年，
* 如果其他月份就判断该月份属于31天那组月份组，还是30天月份组，
* 根据判断结果返回对应的日期。
* */

function getLastDay(year, month) {
  const isLeapYear = ((year % 4)==0) && ((year % 100)!=0) || ((year % 400)==0)
  const maxDays = [1,3,5,7,8,10,12]
  const middleDays = [4,6,9,11]
  month = Number(month)
  if (month == 2) {
    if (isLeapYear) {
      return 29
    } else {
      return 28
    }
  }  else  if (maxDays.includes(month)) {
    return 31
  } else if (middleDays.includes(month)) {
    return 30
  }
}
/*
*第二种方法
实现思路：获取下个月的1号的00：00时刻，然后减去1秒(或者毫秒、分钟、小时)，再输出day即可获取当月最后一天的日期。
* */
function getLastDay(year, month) {
  return new Date(new Date(`${month<12?year:++year}-${month==12?1:++month} 00:00`).getTime() - 1).getDate()
}
/*
* 第三种方法
实现思路：利用Date函数对传入的日期参数（参数值为0），new Date(year,month,date)，month取值范围为0-11（这样直接传入需求的月份就是下一个月）。
* */
function getLastDay(year, month) {
  const date1 = new Date(year, month, 0)
  return date1.getDate()
}
