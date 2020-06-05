import AppConsts from "./../lib/appconst";
import { Modal } from "antd";
import axios from "axios";

const qs = require("qs");

const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 900000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.data.error &&
      error.response.data.error.message &&
      error.response.data.error.details
    ) {
      Modal.error({
        title: error.response.data.error.message,
        content: error.response.data.error.details,
      });
    } else if (
      error.response &&
      error.response.data.error &&
      error.response.data.error.message
    ) {
      Modal.error({
        title: "LoginFailed",
        content: error.response.data.error.message,
      });
    } else if (!error.response) {
      // Modal.error({ content: "UnknownError" });
    }

    if (error.response && error.response.status === 401) {
      // authservice.logout();
      // window.location = "/user/login";
    }

    setTimeout(() => {}, 10000000);
    console.log(error.response);
    return Promise.reject(error);
  }
);

export default http;
