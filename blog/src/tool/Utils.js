/**
 * 判断是否为字符串
 * @Author   mory
 * @param    {object}   obj 判断对象
 * @return   {Boolean}      判断结果
 */
function isString (obj) {
  return (typeof obj === 'string') && obj.constructor === String
}
/**
 * 判断字符串是否为空
 * @Author   mory
 * @param    {object}   obj 判断对象
 * @return   {Boolean}      判断结果 true: 空
 */
function stringIsNull (obj) {
  if (isString(obj)) {
    return (obj === null || obj === undefined || obj === '')
  }
}
/**
 * 判断是否为整数
 * @Author   mory
 * @param    {object}   obj 判断对象
 * @return   {Boolean}      判断结果
 */
function isInteger (obj) {
  return Math.floor(obj) === obj
}

/**
 * 获取当前日期时间
 * @Author   mory
 */
function getCurrentTime () {
  let currentDate = new Date()
  let year = currentDate.getFullYear()
  let month = currentDate.getMonth() + 1
  let day = currentDate.getDate()
  let hour = currentDate.getHours()
  let minutes = currentDate.getMinutes()
  let date = year + '.' + zeroize(month) + '.' + zeroize(day) + ' ' + zeroize(hour) + ':' + zeroize(minutes)
  return date
}
/**
 * 日期补零
 * @Author   mory
 */
function zeroize (date) {
  let zeroizeDate = date
  if (parseInt(date) < 10) {
    zeroizeDate = '0' + date
  }
  return zeroizeDate
}
/**
 * 获取路由的名称，level从1开始
 * @Author   mory
 */
function getRouteName (fullRoute, level) {
  if (this.isString(fullRoute) && this.isInteger(level)) {
    let name = fullRoute.split('/')[level]
    return name === undefined ? '' : name
  }
}

/**
 * 正则匹配字符串中的某个字段
 * @Author   mory
 */
// function regexMatch (targetStr) {
// }

export default {
  isInteger,
  isString,
  getRouteName,
  stringIsNull,
  getCurrentTime,
  zeroize
}
