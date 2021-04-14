import { query, commonParams, commonHeader } from "./query.js";

const user_info = (params) => {
  let resetParams = Object.create(null);
  resetParams.url = "/";
  let args = Object.assign({}, params, resetParams);
  return query(args);
};

const user_login = (params) => {
  let resetParams = Object.create(null);
  resetParams.url = "/";
  console.log(resetParams.url);
  let args = Object.assign({}, params, resetParams);
  return query(args);
};

// 绑定注册
const user_bind = (params) => {
  let resetParams = Object.create(null);
  resetParams.url = "/";
  console.log(resetParams.url);
  let args = Object.assign({}, params, resetParams);
  return query(args);
};

// 获取openId
const user_openid = (params) =>
  query({
    url: "/",
    ...params,
  });



export default {
  user_info,
  user_login,
  user_bind,
  user_openid,
};
