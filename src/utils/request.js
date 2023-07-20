/**
 * axios 二次封装
 */

import axios from "axios";
import config from "../config";
import { ElMessage } from 'element-plus'
import router from "../router";
import storage from '@/utils/storage'
const TOKEN_INVALID = 'token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'
// 创建axios实例对象，添加全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000,

})

// 请求拦截
service.interceptors.request.use((req) => {
    // TO-DO
    const headers = req.headers
    const { token } = storage.getItem('userInfo') || ''
    if (!headers.Authorization) headers.Authorization = 'Bear ' + token
    return req
})

// 响应拦截
service.interceptors.response.use((res) => {
    const { code, data, msg } = res.data
    if (code === 200) {
        return data
    } else if (code === 50001) {
        ElMessage.error(TOKEN_INVALID)
        setTimeout(() => {
            router.push('/login')
        }, 1500)
        return Promise.reject(TOKEN_INVALID)
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})
/**
 * 请求核心函数
 * @param {*} options 请求配置
 * @returns service
 */
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data
    }
    if (typeof options.mock !== 'undefined') {
        // console.log(options.mock);
        // console.log(  'config.mock'+config.mock);
        config.mock = options.mock
    }
    if (config.env === 'production') {
        // 生产模式使用baseApi
        service.defaults.baseURL = config.baseApi
    } else {
        // config.mock为true,使用mockApi,否则baseApi
        service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
    }
    return service(options)
}
['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
    request[item] = (url, data, options) => {
        return request({
            url,
            data,
            method: item,
            ...options
        })
    }
})
export default request