/**
 * 格式化时间戳
 * @param {*} timeStamp
 * @param formatStr 格式化形式
 * @param unit 单位 1毫秒 1000秒
 */
function formatTime(timeStamp, formatStr = "yyyy-MM-dd HH:mm:ss", unit = 1000) {
  if (timeStamp) {
    timeStamp = parseInt(timeStamp * unit);
    const date = new Date(timeStamp);
    const Y = date.getFullYear();
    const M = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return formatStr
      .replace("yyyy", Y)
      .replace("MM", addZero(M))
      .replace("dd", addZero(d))
      .replace("HH", addZero(h))
      .replace("mm", addZero(m))
      .replace("ss", addZero(s));
  }
  return timeStamp;
}

/**
 * 数字补0
 * @param {*} num
 */
function addZero(num) {
  if (typeof num === "number") {
    return num < 10 ? "0" + num : num;
  }
  console.log("addZero param's type is not Number");
  return num;
}
// 从geocoder中获取cityCode
const getCityCodeByGeocoder = (geocoder) =>
  geocoder.ad_info.city_code.replace(geocoder.ad_info.nation_code, "");

// 判断版本大小
function version(configV, reqV) {
  if (configV && reqV) {
    let arr1 = configV.split("."),
      arr2 = reqV.split(".");
    let minLength = Math.min(arr1.length, arr2.length),
      position = 0,
      diff = 0;
    // 依次比较版本号每一位大小，当对比得出结果后跳出循环
    while (
      position < minLength &&
      (diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0
    ) {
      position++;
    }
    diff = diff != 0 ? diff : arr1.length - arr2.length;
    return diff > 0;
  } else {
    return false;
  }
}

module.exports = {
  formatTime,
  getCityCodeByGeocoder,
  version,
};
