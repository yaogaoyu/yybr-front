/**
 * 定义Service对象已存在异常组件。
 *
 */

export default class ServiceNotFoundException extends Error {
    /* Exceptions for Remote START */
    static MSG = '未找到指定的Service';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, ServiceNotFoundException);
        }
        this.name = 'ServiceNotFoundException';
        this.message = `${ServiceNotFoundException.MSG}. ${message}`;
    }
}
