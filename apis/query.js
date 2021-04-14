import store from "../store/store.js";
import config from "../config/index";
import * as log from "../utils/log";
import aHu from "../store/aHu";

// 返回公用参数 请用自己的公参替换
const commonParams = () => ({
  imsi: "MiniProgram",
  ssid: "MiniProgram",
  expectStartTime: Math.floor(+new Date() / 1000),
  mac: store.storeView.userInfo.openId || "MiniProgram",
  imei: store.storeView.userInfo.openId || "MiniProgram",
});

// 返回公用header
const commonHeader = () => ({
  "Version-Code": config.version, // 版本号
  "sub-platform":
    store.storeView.systemInfo.system &&
    store.storeView.systemInfo.system.indexOf("iOS") !== -1
      ? "iOS"
      : "Android", // 标识平台类型：Android、iOS
  Platform: "",
  "Device-Type": store.storeView.systemInfo.model, // 设备型号
  "Device-Id": store.storeView.userInfo.openId || "MiniProgram", // openid
  Timestamp: Math.floor(+new Date()),
  Cookie: store.storeModel.token || "",
  "Cache-Control": "max-age=600",
});

// 请求成功调用的方法
const handleResp = (cfg) => (res) => {
  if (res.header && (res.header["Set-Cookie"] || res.header["set-cookie"])) {
    console.log(res.header["Set-Cookie"]);
    let token = res.header["Set-Cookie"] || res.header["set-cookie"];
    aHu.emit("UPDATE_LOGIN", true);
    aHu.emit("UPDATE_TOKEN", token);
    console.log(`${store.storeModel.token}`);
  }
  cfg.loading && wx.hideLoading();
  if (res.statusCode && res.statusCode !== 200) {
    cfg.fail && cfg.fail(res.data || {});
    return;
  }
  console.log(
    `${config.env.current}接口:${cfg.url}`,
    res,
    cfg.data,
    cfg.header
  );
  const resData = res.data.data || {};
  const { code, content, message } = resData;
  if (code === 0) {
    // 成功
    cfg.success && cfg.success(content);
  } else if ([411, 412].includes(code)) {
    // 411:token过期  412:token失效
    aHu.emit("UPDATE_TOKEN", null);
    navigateToLogin();
  } else {
    cfg.fail && cfg.fail(resData); // 其余code在fail回调处理

    if (code === 500) {
      return;
    } // 应业务方要求500也不弹错误消息
    if (!cfg.notToast) {
      // 是否弹错误消息
      wx.showToast({
        title: message,
        icon: "none",
      });
    }
  }
  if (code !== 0) {
    // 不是成功状态的接口进行日志上报
    log.warn(`接口:${cfg.url}`, res, cfg.data, cfg.header);
  }
};

// 请求失败调用的方法
const requestFail = (cfg) => (err) => {
  log.error(`接口:${cfg.url}`, err, cfg.data, cfg.header);
  cfg.loading && wx.hideLoading();
  cfg.fail &&
    cfg.fail(err.data || { message: "Error. Please try again later." });
};

// 请求完成调用的方法
const requestComplete = (fn) => (res) => {
  fn && fn(res);
};

// 请求主体
const query = (cfg = {}) => {
  cfg.loading && wx.showLoading({ mask: true }); // 是否显示loading

  cfg.data = { ...commonParams(), ...(cfg.data || {}) };
  cfg.header = { ...commonHeader(), ...(cfg.header || {}) };
  let params = {
    url: config.apiBaseUrl[config.env.current] + cfg.url || "",
    data: cfg.data,
    header: cfg.header,
    timeout: cfg.timeout || 3000,
    method: cfg.method || "POST",
    dataType: cfg.dataType || "json",
    success: handleResp(cfg),
    fail: requestFail(cfg),
    complete: requestComplete(cfg.complete),
  };
  return wx.request(params);
};

// 跳转登录页
const navigateToLogin = () => {
  // 先清除登录状态
  aHu.emit("UPDATE_LOGIN", false);
  let pages = getCurrentPages();
  if (pages.length) {
    if (pages[pages.length - 1].route.indexOf("pages/login/login") === -1) {
      wx.navigateTo({
        url: "/pages/login/login",
      });
    }
  }
};

export { query, commonHeader, commonParams };
