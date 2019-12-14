const axios = require("axios");

// const { history } = require("../App");
const service = axios.create({
  // api的base_url      process.env.BASE_URL
  baseURL: "/api",
  // 请求超时时间
  timeout: 1000 * 30
});

// 添加拦截器
service.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem("token");
    if (token && token.length) {
      config.headers["token"] = token;
    }
    let data = config.data;
    if (data) {
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
    }
    return config;
  },
  error => {
    // 请求错误处理
    // console.log('--- start request, error: ', error)
    Promise.reject(error);
  }
);

// 对响应的拦截
service.interceptors.response.use(
  response => {
    // 成功请求到数据
    // 这里根据后端提供的数据进行对应的处理
    // console.log('--- response: ', response)
    if (response.status >= 400) {
      //  this.$q.notify(response.data.errMsg);
      console.log(response);
    }
    return response;
  },
  error => {
    // 响应错误处理
    if (error.response && error.response.data) {
      if (error.response.status === 401) {
        // history.push("/sign-in");
        console.log("not login");
        if (service.history) {
          service.history.push("/sign-in");
        }
      } else {
        console.error("---", error.response.data);
      }
    }

    return Promise.reject(error);
  }
);

export default service;
