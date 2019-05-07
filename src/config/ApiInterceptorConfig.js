/**
 * Api响应结果拦截器配置
 */

import ApiInterceptorRegister from 'core/api/ApiInterceptorRegister';
import ApiResponseInterceptor from 'core/api/ApiResponseInterceptor';
import ApiRequestInterceptor from 'core/api/ApiRequestInterceptor';

// 添加默认的拦截器，可进行配置
const interceptorRegister = new ApiInterceptorRegister();
// 实现自定义拦截器可参照底层定义的拦截器，建议自定义拦截器继承自底层定义的拦截器
interceptorRegister.setRequestInterceptor(new ApiRequestInterceptor());
interceptorRegister.setResponseInterceptor(new ApiResponseInterceptor());
