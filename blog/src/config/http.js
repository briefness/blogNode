'use strict'
import global_ from '@/tool/Global'
import axios from 'axios'
import router from '../router'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 如果 http 状态码是 401 ，则跳转到登录页
  if (response && response.status === 401) {
    router.push({path: '/login'})
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    // alert('你的网络跑不动了，请重连一下再试')
    // alert(res.msg)
  }
  if (res.data && (!res.data.success)) {
    // alert(res.data.error_msg)
  }
  return res.data
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: global_.httpUrl,
      url,
      data: JSON.stringify(data),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: global_.httpUrl,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  delete (url, params) {
    return axios({
      method: 'delete',
      baseURL: global_.httpUrl,
      url,
      params,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  put (url, data) {
    return axios({
      method: 'put',
      baseURL: global_.httpUrl,
      url,
      data: JSON.stringify(data),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
