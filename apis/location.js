import { query, commonParams, commonHeader } from "./query.js";

const order_geocoder = (params) => {
  let resetParams = Object.create(null);
  resetParams.url = "/";
  let args = Object.assign({}, params, resetParams);
  return query(args);
};

export default {
  order_geocoder,
};
