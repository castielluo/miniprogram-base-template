// index.js
// 获取应用实例
// const app = getApp();
import aHu from "../../store/aHu";

aHu({
  data: {},
  onShow: function () {},

  onLoad: function () {},

  toReg() {
    console.log(this.data.storeView.isLogin);
    if (this.data.storeView.isLogin) {
      //
    } else {
      wx.setStorageSync("activitySource", ""); // 正常登录流程activitySource设为空
      wx.navigateTo({
        url: "/pages/login/login?fromPage=index",
      });
    }
    this.mta("indexClick");
  },
});
