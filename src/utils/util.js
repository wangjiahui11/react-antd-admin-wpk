export const durationFormat = (seconds) => {
  let hours = Math.floor(seconds / 3600);
  hours = hours > 9 ? hours : "0" + hours;
  let minutes = Math.floor((seconds % 3600) / 60);
  minutes = minutes > 9 ? minutes : "0" + minutes;
  let remainingSeconds = seconds % 60;
  remainingSeconds = remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds;

  return hours + ":" + minutes + ":" + remainingSeconds;
};

export const debounce = (fn, wait) => {
  var timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, wait);
  };
};

export const throttle = (func, delayTime) => {
  var delay = delayTime || 1000;
  var previousDate = new Date();
  var previous = previousDate.getTime(); // 初始化一个时间，也作为高频率事件判断事件间隔的变量，通过闭包进行保存。

  return function (args) {
    var context = this;
    var nowDate = new Date();
    var now = nowDate.getTime();
    if (now - previous >= delay) {
      // 如果本次触发和上次触发的时间间隔超过设定的时间
      func.call(context, args); // 就执行事件处理函数 （eventHandler）
      previous = now; // 然后将本次的触发时间，作为下次触发事件的参考时间。
    }
  };
};

// 捕获promise错误的方法
export const awaitWrap = (promise) => {
  return promise.then((data) => [null, data]).catch((err) => [err, null]);
};

/**
 * 获取参数值
 */
export const getQueryValue = (key, url) => {
  const reg = new RegExp("(^|&|\\?|#)" + key + "=([^&#]*)", "g");
  const match = url.match(reg);
  if (match) {
    return match[match.length - 1].split("=")[1];
  }
  return null;
};

// 获取白名单
export const whiteRouteListFn = (route, whiteList = ["/homepage"]) => {
  route.map((ele) => {
    if (ele.isShow) whiteList.push(ele.key);
    if (ele?.children?.length) return whiteRouteListFn(ele.children, whiteList);
  });
  return whiteList;
};

// 处理下载文件
export const downloadFile = (response) => {
  try {
    if (response.status === 200) {
      const blob = new Blob([response.data], { type: response.data.type });
      const linkNode = document.createElement("a");
      linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
      document.body.appendChild(linkNode);
      linkNode.click(); //模拟在按钮上的一次鼠标单击
      URL.revokeObjectURL(linkNode.href); // 释放URL 对象
      return true;
    } else {
      throw new Error(`请求失败，状态码：${response.status}`);
    }
  } catch (error) {
    console.error("文件下载出错:", error);
    return false; // 失败返回false或其他失败标识
  }
};

export const formatTime = (seconds) => {
  if (!seconds) return "";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  let formattedTime;
  if (hours) {
    formattedTime = `${String(hours)}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  } else {
    formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return formattedTime;
};
