import axios from "axios";
import { message } from "antd";
import { getLocalStorage, clearLocalStorage, setLocalStorage } from "./session";

const BASE_URL = "/";

function successState(response, method) {
  // 统一判断后端返回的错误码
  const data = response.data;
  if (data.code === 200) {
    return data;
  } else {
    const error = new Error("请求错误", data);
    error.response = response;
    if (data.code === 401) {
      window.location.hash = "#/login";
      clearLocalStorage("token");
      throw error;
    } else {
      throw error;
    }
  }
}

function errorState(error) {
  if (error.message) {
    // console.log("error.response", error.response);
    if (error.response?.status === 401) {
      message.config({
        maxCount: 1, //最大提示框数量，超过限制被关闭
      });
      clearLocalStorage("token");
      window.location.hash = "#/login";
    } else if (error.response?.status !== 200) {
      //判断http返回状态码错误
      message.config({
        maxCount: 1, //最大提示框数量，超过限制被关闭
      });
    } else {
      message.config({
        maxCount: undefined, //最大提示框数量，超过限制被关闭
      });
    }
    message.error(error.response?.data?.msg || error.message);
  }
}

const request = (options) => {
  let { url, method, data = {}, params = {}, customSuccess, customError, headers, target, responseType } = options;
  let { userInfo = {} } = JSON.parse(getLocalStorage("user")) || {};

  if (target) {
    params = { user_id: userInfo?.userId, token: 1, ...params };
  }

  // 兼容新的接口php转java接口参数,必选account_id，user_id
  if (target) {
    data = { user_id: userInfo?.userId, account_id: userInfo?.accountId, ...data };
  }

  // 获取当前URL的哈希值
  let currentHash = window.location.hash;

  // 短剧channelId:21,漫剧channelId:23
  const hashMapping = {
    "/content/shorttv": {
      channel_id: 21,
      media_type: "playlet",
    },
    "/content/animatedcomic": {
      channel_id: 23,
      media_type: "animatedcomic",
    },
  };

  // 检查当前哈希值是否包含特定路径
  if (currentHash.includes("/content/shorttv") || currentHash.includes("/content/animatedcomic")) {
    let { channel_id, media_type } = hashMapping["/content/shorttv"];
    if (currentHash.includes("/content/animatedcomic")) {
      ({ channel_id, media_type } = hashMapping["/content/animatedcomic"]);
    }

    if (target === "content") {
      if (method === "get") {
        // 如果是其他请求，将channel_id和media_type添加到params对象中
        params.channel_id = channel_id;
        params.media_type = media_type;
      } else {
        // 如果是POST请求，将channel_id和media_type添加到data对象中
        data.channel_id = channel_id;
        data.media_type = media_type;
      }
    } else if (target === "special") {
    } else {
      if (method === "get") {
        // 如果没有target且是其他请求，将默认channelId添加到params对象中
        params.channelId = channel_id;
      } else {
        // 如果没有target且是POST请求，将默认channelId添加到data对象中
        data.channelId = channel_id;
      }
    }
  }

  let httpDefaultOpts = {
    // http默认配置
    method: method,
    baseURL: BASE_URL,
    url: url,
    timeout: 30000,
    params: params,
    data: data,
    headers: {
      // 'X-Requested-With': 'XMLHttpRequest',
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  if (responseType) {
    httpDefaultOpts.responseType = options.responseType;
  }
  if (headers) {
    httpDefaultOpts.headers["Content-Type"] = headers["Content-Type"];
  }

  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts)
      .then((response) => {
        if (response?.headers?.authorization) {
          setLocalStorage("token", response.headers.authorization);
        }
        if (httpDefaultOpts.responseType === "blob") {
          resolve(response);
        } else {
          let res;
          if (!customSuccess) {
            res = successState(response, method);
          } else {
            res = customSuccess(response);
          }
          resolve(res);
        }
      })
      .catch((error) => {
        if (!customError) {
          errorState(error);
        } else {
          customError(error);
        }
        reject(error?.response?.data || error);
      });
  });

  return promise;
};

axios.interceptors.request.use(
  (config) => {
    // console.log('request.interceptors.request config',config)
    if (config.url !== "/login" && config.url !== "/captcha") {
      const token = getLocalStorage("token");
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  (res) => {
    // do something after getting the responese
    // console.log('request res',res)
    // return res.data
    return res;
  },
  (err) => {
    return Promise.reject(err);
    // switch (err.response?.status) {
    //   case 401:
    //     message.error('未授权！请重新登录')
    //     clearLocalStorage('token')
    //     window.location.href = '/#/login'
    //     break
    //   case 500:
    //     message.error('服务器内部错误，请稍候重试')
    //     break
    //   default:
    //     break
    // }
    // message.error(err.response?.data?.msg ||'服务器内部错误，请稍候重试')
    // console.log('request err',err)
  }
);

export default request;
