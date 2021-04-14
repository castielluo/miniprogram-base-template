export default {
  // 有页面需要渲染的数据放这里
  storeView: {
    // 用户信息
    userInfo: {},
    systemInfo: {},
    imageUrl: "",
    // 沉浸式顶部栏信息
    navigationInfo: {},
    // 是否登录
    isLogin: false,
  },
  // 全局变量只需要做逻辑判断不渲染的放这里
  storeModel: {
    token: "",
    // wx.login返回的code
    code: "",
    // 当前地理信息
    location: {
      latitude: 0,
      longitude: 0,
    },
    fromAppid: "",
    version: "0.1.0",
  },
};
