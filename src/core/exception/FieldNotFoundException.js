/**
 * 定义字段未定义异常组件。
 *
 */

export default class FieldNotFoundException extends Error {
    /* Exceptions for Remote START */
    static MSG = '未找到指定的成员属性';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, FieldNotFoundException);
        }
        this.name = 'FieldNotFoundException';
        this.message = `${FieldNotFoundException.MSG}. ${message}`;
    }
}
