import config from "../config/index";
import store from "../store/store";
import aHu from "../store/aHu";
import api from "../apis/index";

const { order_geocoder } = api;
console.log(api);

// 获取坐标,并更新geocoder
const updateLocationAndGeocoder = (alwaySuccess = false) => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: "gcj02",
      success: (location) => {
        // 获得权限,更新权限
        aHu.emit("UPDATE_SCOPE", {
          "scope.userLocation": true,
          "scope.writePhotosAlbum": store.storeView.scope.writePhotosAlbum,
        });
        // 更新数据
        aHu.emit("UPDATE_LOCATION", location);
        // 获取geocoder
        order_geocoder({
          data: {
            latitude: location.latitude,
            longitude: location.longitude,
            getPoi: 1,
            electronicFence: true,
          },
          success: (content) => {
            console.log(content);
            // 更新全局geocoder
            content.result.pois = content.result.pois.slice(0, 3);
            aHu.emit("UPDATE_GEOCODER", content.result);
            resolve(content);
          },
          fail: (err) => {
            if (alwaySuccess) {
              resolve();
            } else {
              reject(0);
            }
          },
        });
      },
      fail: (res) => {
        // 失去权限,更新权限
        aHu.emit("UPDATE_SCOPE", {
          "scope.userLocation": false,
          "scope.writePhotosAlbum": store.storeView.scope.writePhotosAlbum,
        });
        if (alwaySuccess) {
          resolve();
        } else {
          reject(res);
        }
      },
    });
  });
};

export default {
  updateLocationAndGeocoder,
};
