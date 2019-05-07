/**
 * 定义字段未定义异常组件。
 *
 */

export default class PageNotFoundException extends Error {
    /* Exceptions for Remote START */
    static MSG = '404, Page Not Found!';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, PageNotFoundException);
        }
        this.name = 'PageNotFoundException';
        this.message = `${PageNotFoundException.MSG}. ${message}`;
    }
}
