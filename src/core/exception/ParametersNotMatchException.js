/**
 * 定义参数异常组件。
 *
 */

export default class ParametersNotMatchException extends Error {
    /* Exceptions for Remote START */
    static MSG = '传入参数不匹配';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, ParametersNotMatchException);
        }
        this.name = 'ParametersNotMatchException';
        this.message = `${ParametersNotMatchException.MSG}. ${message}`;
    }
}
