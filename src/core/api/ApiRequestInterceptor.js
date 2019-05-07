/**
 * 定义API请求拦截器
 */

// import isEmpty from 'lodash.isempty';
// import ParameterShouldNotNullException from 'core/exception/ParameterShouldNotNullException';
// import ApiResponseHandler from './ApiResponseHandler';

export default class ApiRequestInterceptor {
    /**
     * 请求拦截处理
     * handler Array|ApiResponseHandler Api响应处理对象，数组或对象
     */
    perform(config) {
        return config;
    }

    errorHandler(err) {
        return Promise.reject(err);
    }
}
