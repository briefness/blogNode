/**
 * 全局常量配置
 */
let httpSrc = 'http://127.0.0.1:9000'
if (process.env.NODE_ENV === 'production') {
  httpSrc = 'http://127.0.0.1:9000'
}
const httpUrl = httpSrc

export default {
  httpUrl
}
