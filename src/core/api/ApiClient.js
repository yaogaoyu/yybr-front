/**
 * 定义API调用类
 */

import Axios from 'axios';
import Config from 'config/config.json';
import 'config/ApiInterceptorConfig';
import 'config/ApiMapperConfig';
import HttpMethodNotSupportException from 'core/exception/HttpMethodNotSupportException';
// import NetworkException from 'core/exception/NetworkException';
import ApiNotFoundException from 'core/exception/ApiNotFoundException';
import ApiMapping from './ApiMapping';
import ApiInterceptorRegister from './ApiInterceptorRegister';

class Http {
    static METHOD = {
        GET: 'GET',
        POST: 'POST',
        DELETE: 'DELETE',
        PUT: 'PUT',
    };

    constructor() {
        this.axios = Axios.create();
        const apiInterceptorRegister = new ApiInterceptorRegister();
        const { requestInterceptor, responseInterceptor } = apiInterceptorRegister;
        this.axios.interceptors.request.use(requestInterceptor.perform, requestInterceptor.errorHandler);
        this.axios.interceptors.response.use(responseInterceptor.perform, responseInterceptor.errorHandler);
    }

    /**
     * 定义生成http query string的方法
     * @param queryData Object query参数
     * @return string query字符串
     */
    genQuery(queryData) {
        if (!queryData) return '';
        let ret = '';
        // 防止IE接口缓存，加上时间戳
        // if (Device.isIE()) queryData.timestamp = new Date().getTime();
        let query;
        for (query in queryData) {
            if ({}.hasOwnProperty.call(queryData, query)) {
                ret += `&${query}=${encodeURIComponent(queryData[query])}`;
            }
        }
        return ret.replace(/&/, '?');
    }

    /**
     * 获取http请求配置
     */
    getHttpConfig(method, url, data, type) {
        let sendURL = url;
        const config = Object.assign({}, {
            url: sendURL,
            withCredentials: true,
            method,
        });
        if (method === Http.METHOD.GET) {
            sendURL += this.genQuery(data);
            config.url = sendURL;
        } else {
            let contentType = '';
            let cfgData = data;
            switch (type) {
                case 'json':
                    contentType = 'application/json';
                    cfgData = JSON.stringify(data || {});
                    break;
                case 'file':
                    contentType = 'multipart/form-data';
                    cfgData = new FormData();
                    for (const key in data) {
                        if ({}.hasOwnProperty.call(data, key)) {
                            cfgData.append(key, data[key]);
                        }
                    }
                    break;
                case 'formData':
                    contentType = 'application/x-www-form-urlencoded';
                    config.transformRequest = [(requestData) => {
                        let ret = '';
                        let index = 0;
                        for (const k in requestData) {
                            if ({}.hasOwnProperty.call(requestData, k)) {
                                ret += `${index === 0 ? '' : '&'}${encodeURIComponent(k)}=${encodeURIComponent(requestData[k])}`;
                                index += 1;
                            }
                        }
                        return ret;
                    }];
                    break;
                default:
                    break;
            }
            config.headers = { 'Content-Type': contentType };
            config.data = cfgData;
        }
        return config;
    }

    /**
     * HTTP 请求远端数据。
     * @return Promise
     */
    http(method, url, data, type = 'json') {
        if (!url) return null;
        const send = this.axios.request;
        const config = this.getHttpConfig(method, `${Config.api.domain}${url}`, data, type);
        return send(config);
    }
}

const http = new Http();

class ApiClient {
    /**
     * 生成restful的完整请求URL
     */
    genRestfulUrl(url, urlParam) {
        if (!url) return '';
        if (!urlParam) return url;
        let k;
        let ret = url;
        for (k in urlParam) {
            if ({}.hasOwnProperty.call(urlParam, k)) {
                const reg = new RegExp(`{${k}}`, 'g');
                ret = ret.replace(reg, `${urlParam[k]}`);
            }
        }
        return ret;
    }

    /**
     * 发送请求
     * @param name APIMapping中的设置 String  [require]
     * @param restParam restful中的参数，key值跟ApiMapping中设置的变量名对应 Object    [option]
     * @param queryData query参数 Object    [option]
     * @param data POST参数 Object    [option]
     * @param type 发送类型，enum('json', 'file', 'formData')    [option]
     */
    send(name, restParam, queryData, data, type = 'json') {
        const api = ApiMapping.getInstance().getApi(name);
        if (!api) {
            throw new ApiNotFoundException(`未定义的请求 <<<${name}>>>`);
            // return Promise.reject(`未定义的请求 <<<${name}>>>`);
        }
        let { url } = api;
        if (!url) {
            throw new ApiNotFoundException(`未定义的请求URL <<<${name}>>>`);
            // return Promise.reject(`未定义的请求URL <<<${name}>>>`);
        }
        // 处理URL path参数
        url = this.genRestfulUrl(url, restParam);
        // 处理请求方式
        let method = api.method || Http.METHOD.GET;
        method = method.toUpperCase();
        // 请求数据
        let reqData = data;
        if (!Http.METHOD[method]) throw new HttpMethodNotSupportException();
        // 非GET请求请求进行请求query添加
        if (method !== Http.METHOD.GET && queryData) {
            url += http.genQuery(queryData);
        }
        if (method === Http.METHOD.GET) {
            reqData = queryData;
        }
        return http.http(method, url, reqData, type);
    }

    /**
     * 发送GET请求
     * @param name APIMapping中的设置 String  [require]
     * @param queryData query参数 Object  [require]
     * @param restParam restful中的参数，key值跟ApiMapping中设置的变量名对应 Object  [option]
     */
    get(name, queryData, restParam) {
        return this.send(name, restParam, queryData, null, 'json');
    }

    /**
     * 发送POST请求
     * @param name APIMapping中的设置 String  [require]
     * @param data POST参数 Object [require]
     * @param queryData query参数 Object  [option]
     * @param restParam restful中的参数，key值跟ApiMapping中设置的变量名对应 Object  [option]
     * @param type 发送类型，enum('json', 'file', 'formData') String  [option]
     */
    post(name, data, restParam, queryData, type = 'json') {
        return this.send(name, restParam, queryData, data, type);
    }
}

const apiClient = new ApiClient();
export default apiClient;
