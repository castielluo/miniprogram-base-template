//index.js
//获取应用实例
const app = getApp()
import api from '../../apis/index'
import aHu from '../../store/aHu'

aHu({
  data: {
    motto: 'Hello World',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (this.data.storeView.userInfo.length) {
      this.setData({
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          hasUserInfo: true
        })
        aHu.emit('UPDATE_USERINFO', res.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.setData({
            hasUserInfo: true
          })
          aHu.emit('UPDATE_USERINFO', res.userInfo)
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    this.setData({
      hasUserInfo: true
    })
    aHu.emit('UPDATE_USERINFO', e.detail.userInfo)
  }
})
