/**
 * 定义抽象业务流组件。
 *
 */

import Dispatcher from './Dispatcher';

// 业务流父组件，在视图中连接业务流组件与视图组件
export default class Service {
    /*
     * 推送数据到Store
     * @protected
     */
    dispatch(data, key) {
        if (!data) {
            return;
        }
        Dispatcher.dispatch(data, key);
    }
}
