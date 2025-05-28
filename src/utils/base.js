export const preventableFn = (event, ...argus) => {
  return new Promise(async (resolve, reject) => {
    if (typeof event === "function") {
      const executeResult = await event(...argus);
      if (executeResult === false) {
        reject(false);
      } else if (event.then || event.catch) {
        return event;
      } else {
        resolve(executeResult);
      }
    } else if (event === false) {
      reject(false);
    } else {
      resolve(event);
    }
  });
};

// ---防抖的操作----
export const debounce = (func, wait = 300) => {
  let timeout;
  return function () {
    const args = [...arguments];
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (func) func.apply(null, args);
    }, wait);
  };
};

// 转换时间格式 createTime: ['2024-05-01', '2024-06-02']  => { createStartTime: '2024-05-01', createEndTime: '2024-06-02' }
export const transformDateRange = (value, key = "createTime", len = 4) => {
  // 检查值是否是数组
  if (Array.isArray(value) && value.length === 2) {
    const [startTime, endTime] = value;
    if (["time", "Time"].includes(key)) {
      return {
        startTime,
        endTime,
      };
    } else {
      return {
        [`${key.slice(0, -len)}StartTime`]: startTime,
        [`${key.slice(0, -len)}EndTime`]: endTime,
      };
    }
  }
  return {};
};
