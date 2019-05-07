/**
 * 定义异常组件。
 *
 */

export default class Exception extends Error {
    /* Exceptions for Remote START */
    static CONNECTION_TIMEOUT = '远端请求超时。';

    static NO_CONTAINER = '未找到容器。';
    /* Exceptions for Remote END */

    static PARAMETER_INVALIDE = '无效的参数。';

    static TYPE_INCORRECT = '错误的数据类型。';

    static LOG_DRIVER_UNDEFINED = '未定义的日志驱动。';

    /**
     * 构造函数。
     */
    constructor(message) {
        super();
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, Exception);
        }
        this.name = 'DYException';
        this.message = message;
    }
}
