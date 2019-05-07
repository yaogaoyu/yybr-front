/**
 * 定义页面无法到达的异常。
 *
 */

export default class PageUnreachableException extends Error {
    /* Exceptions for Remote START */
    static MSG = '无法到达的页面';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, PageUnreachableException);
        }
        this.name = 'PageUnreachableException';
        this.message = `${PageUnreachableException.MSG}. ${message}`;
    }
}
