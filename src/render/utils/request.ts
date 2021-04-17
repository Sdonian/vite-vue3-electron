import axios, { AxiosInstance } from 'axios';
//const baseUrl = 'http://132.232.34.148/api/'
const baseUrl = "http://localhost:5000/api"
import { getToken } from '@/utils/auth'
import { useStore } from 'vuex'

const store = useStore();

class request {
  public _http: AxiosInstance;
  private static instance: request;
  private constructor() {
    this._http = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    });

    this._http.interceptors.request.use(
      config => {
        // if (store.getters.token) {
        //   config.headers.common['authorization'] = 'Bearer ' + getToken();
        // }
        return config
      },
      error => {
        console.log(error) // for debug
        return Promise.reject(error)
      }
    )
  }
  //单例
  static getInstance() {
    if (!this.instance) {
      this.instance = new request();
    }
    return this.instance;
  }
  //基础方法
  async httpGet(url: string, params?: any) {
    try {
      const res = await this._http.get(url, { params: params });
      return this.disposeData(res);
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
  async httpPost(url, data) {
    try {
      const res = await this._http.post(url, data);
      return this.disposeData(res);
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
  async httpDelete(url, params) {
    try {
      const res = await this._http.delete(url, { params: params });
      return this.disposeData(res);
    }
    catch (error) {
      return Promise.reject(error);
    }
  }
  async httpPut(url, data) {
    try {
      const res = await this._http.put(url, data);
      return this.disposeData(res);
    }
    catch (error) {
      return Promise.reject(error);
    }
  }
  getConfig() {
    return { baseUrl: baseUrl };
  };
  //处理统一返回数据
  disposeData(res) {
    const { data } = res;
    const { isPositive, errorMsg, stateCode } = data;
    if (isPositive) {
      return Promise.resolve(data);
    } else {
      // Message({
      //     message: `错误信息:${errorMsg},错误代码：${stateCode}` || 'Error',
      //     type: 'error',
      //     duration: 5 * 1000
      // })
      //return Promise.reject(errorMsg);
      throw new Error(`错误信息:${errorMsg}` || 'Error');
    }
  }
}
export default request.getInstance();