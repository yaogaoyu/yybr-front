/**
 * 定义Service容器, 单例
 */

import ParameterShouldNotNullException from 'core/exception/ParameterShouldNotNullException';
import ParametersNotMatchException from 'core/exception/ParametersNotMatchException';
import ServiceExistsException from 'core/exception/ServiceExistsException';

// 定义容器
const container = new Map();
// 单例模式
let instance;

export default class ServiceContainer {
    constructor() {
        if (instance) return instance;
    }

    static getInstance() {
        if (!instance) instance = new ServiceContainer();
        return instance;
    }

    /**
     * 放入容器
     */
    push(Cls) {
        if (!Cls) {
            throw new ParameterShouldNotNullException();
        }
        if (typeof Cls !== 'function' || Cls.constructor !== Function) {
            throw new ParametersNotMatchException('参数类型必须是Class或Function');
        }
        if (container.has(Cls)) {
            throw new ServiceExistsException();
        }
        const service = new Cls();
        container.set(Cls, service);
    }

    /**
     * 移除
     */
    remove(Cls) {
        container.delete(Cls);
    }

    /**
     * 取出
     */
    getInstanceByClass(Cls) {
        if (typeof Cls !== 'function' || Cls.constructor !== Function) {
            throw new ParametersNotMatchException('参数类型必须是Class或Function');
        }
        return container.get(Cls);
    }
}
