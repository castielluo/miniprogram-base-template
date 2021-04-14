import aHu from "../../store/aHu";

aHu({
  data: {
    url: "",
  },
  onLoad() {},
  onShow() {
    if (this.options.url) {
      let url = decodeURIComponent(this.options.url);
      this.setData({
        url,
      });
    }
  },
});
