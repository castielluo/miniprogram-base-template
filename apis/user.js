import {query, commonParams, commonHeader} from './query.js'

const userInfo = (params) => {
  let resetParams = Object.create(null)
  resetParams.url = '/user/v1/queryWebUserInfo'
  resetParams.header = commonHeader()
  resetParams.data = Object.assign({}, params.data, commonParams())
  let args = Object.assign({}, params, resetParams)
  return query(args)
}




export default {
  userInfo,
}