/**
 * 定义API拦截器注册器, 单例模式
 */

let instance;

export default class ApiInterceptorRegister {
    constructor() {
        if (!instance) instance = this;
        return instance;
    }

    static getInstance() {
        if (!instance) {
            instance = new ApiInterceptorRegister();
        }
        return instance;
    }

    setRequestInterceptor(requestInterceptor) {
        this.requestInterceptor = requestInterceptor;
    }

    setResponseInterceptor(responseInterceptor) {
        this.responseInterceptor = responseInterceptor;
    }
}
