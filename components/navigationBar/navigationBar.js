import store from "../../store/store";
import aHu from "../../store/aHu";

Component({
  options: {
    // styleIsolation: 'apply-shared'
  },
  properties: {
    title: {
      type: String,
      value: "如祺推客",
    },
    customBack: {
      // 自定义返回
      type: Boolean,
      value: false,
    },
    showBack: {
      // 显示返回按钮
      type: Boolean,
      value: true,
    },
    inSharePage: {
      // 在分享页
      type: Boolean,
      value: false,
    },
  },
  data: {
    info: {
      statusBarHeight: store.storeView.systemInfo.statusBarHeight,
      top: store.storeView.navigationInfo.top,
      left: store.storeView.navigationInfo.left,
      bottom: store.storeView.navigationInfo.bottom,
      navHeight:
        store.storeView.navigationInfo.height +
        (store.storeView.navigationInfo.top -
          store.storeView.systemInfo.statusBarHeight) *
          2,
    },
  },
  methods: {
    handleBack() {
      if (this.data.customBack) {
        this.triggerEvent("back");
      } else if (this.data.inSharePage) {
        const pages = getCurrentPages();
        if (pages.length > 1) {
          wx.navigateBack();
        } else {
          wx.redirectTo({ url: "/pages/index/index" });
        }
      } else {
        wx.navigateBack();
      }
    },
  },
});
