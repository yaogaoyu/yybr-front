/**
 * 定义接口404异常组件。
 *
 */

export default class ApiNotFoundException extends Error {
    /* Exceptions for Remote START */
    static MSG = '未知接口';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, ApiNotFoundException);
        }
        this.name = 'ApiNotFoundException';
        this.message = `${ApiNotFoundException.MSG}. ${message}`;
    }
}
