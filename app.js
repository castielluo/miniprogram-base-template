// app.js
import initMutation from "./store/mutation";
import aHu from "./store/aHu";
import config from "./config/index";
import authorization from "./service/authorization";

// 数美 https://www.ishumei.com/help/documents.html?id=22330
const SMSdk = require("./utils/smsdk/fp.min");
SMSdk.initConf({
  organization: "rzXTwoApJWcZIspgSmU2",
  apiHost: "fp-it.fengkongcloud.com",
});

App({
  onLaunch: function (options) {
    // 初始化注册的mutation
    initMutation();
    // 展示本地存储能力
    let logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    // 登录前获取openId
    authorization.getOpenId();

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            },
          });
        }
      },
    });

    // 场景值
    let scene = options.scene;
    let channelId = null;
    aHu.emit("UPDATE_MINI_SCENE", scene);
    console.log(options);
    switch (scene) {
      case 1146: // 位置消息场景值
        break;
      case 1012: // 长按图片识别二维码
        break;
      case 1013: // 手机相册扫二维码
        break;
      case 1047: // 扫描小程序码
        channelId =
          options.query &&
          options.query.scene &&
          options.query.scene.startsWith("channelId") &&
          options.query.scene.split("channelId")[1];
        channelId && wx.setStorageSync("channelId", channelId);
        break;
      case 1048: // 长按图片识别小程序码
        channelId =
          options.query &&
          options.query.scene &&
          options.query.scene.startsWith("channelId") &&
          options.query.scene.split("channelId")[1];
        channelId && wx.setStorageSync("channelId", channelId);
        break;
      case 1049: // 手机相册扫小程序码
        channelId =
          options.query &&
          options.query.scene &&
          options.query.scene.startsWith("channelId") &&
          options.query.scene.split("channelId")[1];
        channelId && wx.setStorageSync("channelId", channelId);
        break;
      case 1037: // 从小程序进入
        console.log(options.referrerInfo.appId);
        log.info("小程序" + options.referrerInfo.appId + "跳入");
        aHu.emit("UPDATE_FROM_APPID", options.referrerInfo.appId);
        break;
      default:
        break;
    }
  },
  onShow(options) {
    console.log("onshow");
    let navigationInfo = wx.getStorageSync("navigationInfo");
    let systemInfo = wx.getStorageSync("systemInfo");
    if (!navigationInfo || !systemInfo) {
      this.getSystenInfoFunc();
    }
  },

  getSystenInfoFunc() {
    // 沉浸式头部统一获取及处理
    let navigationInfoOrigin = wx.getStorageSync("navigationInfo");
    let systemInfoOrigin = wx.getStorageSync("systemInfo");
    console.log(navigationInfoOrigin);
    console.log(systemInfoOrigin);
    // 如果没有获取过屏幕高度等信息
    if (!navigationInfoOrigin.top) {
      navigationInfoOrigin = wx.getMenuButtonBoundingClientRect();
      systemInfoOrigin = wx.getSystemInfoSync();
      if (navigationInfoOrigin.top == 0) {
        // 兼容iphone6s的top为0情况
        navigationInfoOrigin.top = navigationInfoOrigin.height / 2;
        navigationInfoOrigin.height = navigationInfoOrigin.height / 2;
      }
    }
    aHu.emit("UPDATE_NAVIGATIONINFO", navigationInfoOrigin);
    aHu.emit("UPDATE_SYSTEMINFO", systemInfoOrigin);
  },

  globalData: {
    userInfo: wx.getStorageSync("userInfo"),
    openid: wx.getStorageSync("openid"),
    selectedIndex: 0,
    _fmOpt: {
      partnerCode: "rqcx", // 合作方
      appName: "driverMiniPro", // 应用名
      fpUrl: config.fmHost[config.env.current] + "/miniProgram/profile.json", // 请填入部署设备指纹服务器的host，确保与第一步设置的服务器域名相同
    },
  },
  SMSdk,
});
