import store from '../store/store.js'
import config from '../config/index'

// 返回公用参数
const commonParams = () => {
  return {
    openid: store.storeView.openid
  }
}

// 返回公用header
const commonHeader = () => {
  return {
    openid: store.storeView.openid
  }
}

// 请求成功调用的方法
const requestSuccess = (fn) => {
  return (res) => {
    console.log(res)
    fn && fn(res)
  }
}

// 请求失败调用的方法
const requestFail = (fn) => {
  return (ret) => {
    console.log(ret)
    fn && fn(ret)
  }
}

// 请求完成调用的方法
const requestComplete = (fn) => {
  return (result) => {
    console.log(result)
    fn && fn(result)
  }
}

// 请求主体
const query = (params) => {
  console.log(params)
  let cfg = {
    url: config.apiBaseUrl[config.env.current] + params.url || '',
    data: params.data || {},
    header: params.header || {},
    timeout: params.timeout || 3000,
    method: params.method || 'POST',
    dataType: params.dataType || 'json',
    success: requestSuccess(params.success),
    fail: requestFail(params.fail),
    complete: requestComplete(params.complete)
  }
  return wx.request(cfg)
}

export {
  query,
  commonHeader,
  commonParams
}