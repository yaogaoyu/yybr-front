/**
 * 定义自动注入装饰器
 */

import ServiceContainer from 'core/base/ServiceContainer';
import ParameterShouldNotNullException from '../exception/ParameterShouldNotNullException';
import ServiceNotFoundException from '../exception/ServiceNotFoundException';

export default (serviceCls) => {
    if (!serviceCls) {
        throw new ParameterShouldNotNullException();
    }
    return (target, fieldName) => {
        const serviceInstance = ServiceContainer.getInstance().getInstanceByClass(serviceCls);
        if (!serviceInstance) {
            throw new ServiceNotFoundException(`[${serviceCls.name} -> ${fieldName}]`);
        }
        // 将当前视图注入到service中
        Reflect.set(target, fieldName, serviceInstance);
        return target;
    };
};
