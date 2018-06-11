import http from '../config/http'

/**
 * 账号密码登录
 */
export const accountLogin = (username, password) => http.post('/loginVerify', {username, password})
