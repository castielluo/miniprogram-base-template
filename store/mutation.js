import aHu from "./aHu";
import store from "./store";

const initMutation = () => {
  // 更新用户信息
  aHu.on("UPDATE_USERINFO", (payload) => {
    console.log(payload);
    if (payload.hasOwnProperty("mobile") && payload.mobile) {
      payload.formatMobile =
        payload.mobile.slice(0, 3) + "****" + payload.mobile.slice(-4);
    }
    store.storeView.userInfo = payload;
    wx.setStorageSync("userInfo", payload);
  });

  // 更新token
  aHu.on("UPDATE_TOKEN", (payload) => {
    console.log(payload);
    store.storeModel.token = payload;
    wx.setStorageSync("token", payload);
  });

  // 更新沉浸式顶部栏信息
  aHu.on("UPDATE_NAVIGATIONINFO", (payload) => {
    store.storeView.navigationInfo = payload;
    wx.setStorageSync("navigationInfo", payload);
  });

  // 更新系统信息
  aHu.on("UPDATE_SYSTEMINFO", (payload) => {
    store.storeView.systemInfo = payload;
    wx.setStorageSync("systemInfo", payload);
  });

  // 更新临时login的code
  aHu.on("UPDATE_CODE", (payload) => {
    store.storeModel.code = payload;
    wx.setStorageSync("code", payload);
  });

  // 更新登录态
  aHu.on("UPDATE_LOGIN", (payload) => {
    store.storeView.isLogin = payload;
    wx.setStorageSync("isLogin", payload);
  });

  // 更新来源小程序appid
  aHu.on("UPDATE_FROM_APPID", (payload) => {
    store.storeModel.fromAppid = payload;
  });

  // 事件:更新地理位置
  aHu.on("UPDATE_LOCATION", (location) => {
    store.storeModel.location = location;
    wx.setStorage({
      key: "location",
      data: location,
    });
  });



  /* -------------------------------------------------------- 柏林墙 -------------------------------------------------------------- */

  // 初始化沉浸式头部高度
  let navigationInfo = wx.getStorageSync("navigationInfo");
  if (navigationInfo) {
    aHu.emit("UPDATE_NAVIGATIONINFO", navigationInfo);
  }

  // 初始化设备信息
  let systemInfo = wx.getStorageSync("systemInfo");
  systemInfo && aHu.emit("UPDATE_SYSTEMINFO", systemInfo);

  // 初始化用户信息
  let userInfo = wx.getStorageSync("userInfo");
  userInfo && aHu.emit("UPDATE_USERINFO", userInfo);

  // 初始化token
  let token = wx.getStorageSync("token");
  token && aHu.emit("UPDATE_TOKEN", token);

  // 初始化wx.login的code
  let code = wx.getStorageSync("code");
  code && aHu.emit("UPDATE_CODE", code);

  // 初始化登录态
  let isLogin = wx.getStorageSync("isLogin");
  isLogin && aHu.emit("UPDATE_LOGIN", isLogin);

  // 初始化位置信息
  let location = wx.getStorageSync("location");
  location && aHu.emit("UPDATE_LOCATION", location);

};

export default initMutation;
