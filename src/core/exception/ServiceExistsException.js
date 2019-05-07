/**
 * 定义Service对象已存在异常组件。
 *
 */

export default class ServiceExistsException extends Error {
    /* Exceptions for Remote START */
    static MSG = 'Service已存在';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, ServiceExistsException);
        }
        this.name = 'ServiceExistsException';
        this.message = `${ServiceExistsException.MSG}. ${message}`;
    }
}
