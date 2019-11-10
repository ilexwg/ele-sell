import axios from 'axios';
import service from './api.js';
import {Toast} from 'vant';

const config = require('../../config/index');

// service 循环遍历输出不同的请求方法
const instance = axios.create({
  // baseURL: 'http://192.168.0.103:3000/api',
  baseURL: `http://localhost:${config.build.port}/api`,
  timeout: 1000
});

const Http = {}; // 包裹请求方法的容器

// 请求格式/参数的统一
for (const key in service) {
  const { url, method } = service[key];

  Http[key] = async function(
    params, // 请求参数 get(放到url上), post/put/patch(放到data上), delete(放到url上)
    isFormData = false, // 是否是form-data请求
    config = {} // 配置参数
  ) {
    let newParams = {};

    // Content-Type 是否为 form-data 的判断
    if (params && isFormData) {
      newParams = new FormData();

      for (const key in params) {
        newParams.append(key, params[key]);
      }
    } else {
      newParams = params;
    }

    // 不同请求的判断
    let response = {}; // 请求的返回值
    if (method === 'post' || method === 'put' || method === 'patch') {
      try {
        response = await instance[method](url, newParams, config);
      } catch (err) {
        response = err;
      }
    } else if (method === 'get' || method === 'delete') {
      config.params = newParams;
      try {
        response = await instance[method](url, config);
      } catch (err) {
        response = err;
      }
    }

    return response;
  };
}

// 拦截器的添加
instance.interceptors.request.use(
  config => {
    // 发起请求前做些什么
    Toast.loading({
      mask: false,
      duration: 0, // 0 一直存在
      forbidClick: true,
      message: '加载中...'
    });
    return config;
  },
  err => {
    // 请求错误
    Toast.clear();
    Toast('请求失败, 请稍后再试!');
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  res => {
    // 请求成功
    Toast.clear();
    return res.data;
  },
  err => {
    Toast.clear();
    Toast('请求失败, 请稍后再试!');
    return Promise.reject(err);
  }
);

export default Http;
