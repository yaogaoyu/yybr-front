/**
 * 定义视图标识未找到的异常组件。
 *
 */

export default class ViewKeyNotFoundException extends Error {
    /* Exceptions for Remote START */
    static MSG = '未找到指定的视图标识';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, ViewKeyNotFoundException);
        }
        this.name = 'ViewKeyNotFoundException';
        this.message = `${ViewKeyNotFoundException.MSG}. ${message}`;
    }
}
