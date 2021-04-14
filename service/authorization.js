import config from "../config/index";
import store from "../store/store";
import aHu from "../store/aHu";
import api from "../apis/index";
import { CODE_RISK_STRONG, CODE_RISK_WEAK } from "../utils/constant";

const { user_login, user_openid } = api;
// 登录
const autoLogin = (goBind = false) => {
  return new Promise((resolve, reject) => {
    // 微信登录
    wx.login({
      success: ({ code }) => {
        if (code) {
          console.log(code);
          // 缓存code
          aHu.emit("UPDATE_CODE", code);
          user_login({
            notToast: true,
            data: {
            },
            success: (content) => {
              // 已绑定
              aHu.emit("UPDATE_LOGIN", true);
              aHu.emit("UPDATE_USERINFO", content);
              aHu.emit("UPDATE_JUST_LOGIN", true);
              resolve({
                code: 0,
                content,
                message: "",
              });
            },
            fail: ({ code, content, message }) => {
              // 未绑定或其他
            },
          });
        } else {
          wx.showToast({
            title: "获取code失败",
            icon: "none",
          });
        }
      },
    });
  });
};

// 登录前获取openId
const getOpenId = () => {
  let storeOpenid = store.storeView.userInfo.openId;
  if (storeOpenid) return; // 如果有就不获取
  wx.login({
    success: ({ code }) => {
      if (code) {
        user_openid({
          notToast: true,
          data: {
          },
          success: ({ openid }) => {
            openid &&
              aHu.emit("UPDATE_USERINFO", {
                openId: openid,
              }); //更新openID
          },
        });
      }
    },
  });
};

export default {
  autoLogin,
  getOpenId,
};
