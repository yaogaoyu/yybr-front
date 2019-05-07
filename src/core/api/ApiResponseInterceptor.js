/**
 * 定义API响应拦截器
 */

export default class ApiResponseInterceptor {
    /**
     * 响应拦截处理
     * response Array|ApiResponseHandler Api响应处理对象，数组或对象
     */
    perform(response) {
        const { data, config } = response;
        const { code } = data;
        switch (code) {
            case 0:
            case '0':
            case 200:
            case '200':
                return Promise.resolve(data);
            case 900:
                window.location.href = data.redirectUrl;
                break;
            default:
                return Promise.reject({
                    error: -1,
                    code: data.code,
                    reason: data.msg || '接口错误',
                    data: data.data || data.result,
                });
        }
        return response;
    }

    errorHandler(err) {
        const { response } = err;
        return Promise.reject(response.data.message || `服务器错误[status=${response.status}]`);
    }
}
