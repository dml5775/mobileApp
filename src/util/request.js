import axios from "axios";

axios.defaults.baseURL = window.env === "prod" ? window.prodBaseUrl : window.devBaseUrl;
axios.defaults.timeout = 120000;

export const getFetch = async(url, params = {}) => {
  try {
    const res = await axios.get(url, { params });
    return res;
  } catch (e) {
    return {
      code: -1,
      message: e.message,
      status: false,
    };
  }
};

export const postFetch = async(url, params = {}) => {
  try {
    const res = await axios.post(url, params);
    return res;
  } catch (e) {
    return {
      code: -1,
      message: e.message,
      status: false,
    };
  }
};

export const debounce = (fn, delay) => {
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

export const toTop = () => {
  let distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
  const step = distance / 50; //每步的距离
  (function jump() {
    if (distance > 0) {
      distance -= step;
      window.scrollTo(0, distance);
      setTimeout(jump, 10);
    }
  })();
};

export const GetQueryString = name => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
  let context = "";
  if (r != null)
    context = r[2];
  reg = null;
  r = null;
  return context == null || context == "" || context == "undefined" ? "" : context;
};
export const GetRequest = () => {
  const url = location.search; //获取url中"?"符后的字串
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    const str = url.substr(1);
    const strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};


export const MP = (ak) => {
  return new Promise(function(resolve, reject) {
    window.onload = function() {
      resolve(window.BMap);
    };
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `http://api.map.baidu.com/api?v=2.0&ak=${ak}`;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const changeTwoDecimal = x => {

  let f_x = parseFloat(x);
  if (isNaN(f_x)) {
    return false;
  }
  f_x = Math.round(x * 100) / 100;
  let s_x = f_x.toString();
  let pos_decimal = s_x.indexOf(".");
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += ".";
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += "0";
  }
  return s_x;
};