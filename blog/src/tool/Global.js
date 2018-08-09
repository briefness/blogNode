/**
 * 全局常量配置
 */
let httpSrc = 'http://127.0.0.1:9000'
// let httpSrc = 'http://47.100.183.43:9000'
if (process.env.NODE_ENV === 'production') {
  httpSrc = 'http://www.langmingzi.com:9000'
}
const httpUrl = httpSrc

export default {
  httpUrl
}
