/**
 * 定义ServiceCls注解，自动将Service放入容器
 */

import ServiceContainer from 'core/base/ServiceContainer';

export default (Service) => {
    ServiceContainer.getInstance().push(Service);
    return Service;
};
