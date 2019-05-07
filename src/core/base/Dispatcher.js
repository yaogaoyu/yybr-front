/**
 * 定义数据驱动视图分发器。
 * 视图容器工厂组件，将视图组件与工作流组件绑定。
 *
 */

import ViewKeyNotFoundException from '../exception/ViewKeyNotFoundException';
import Store from './Store';

export default class Dispatcher {
    /*
     * 数据驱动。
     */
    static dispatch(nextData, key) {
        if (!key) {
            return;
        }
        const store = new Store();
        const data = store.getData(key);
        if (!data) {
            throw new ViewKeyNotFoundException(`[${key}]`);
        }
        // 将新数据与老数据进行合并/覆盖
        store.data[key] = Object.assign({}, data, nextData);
        store.subject$.next(key);
    }
}
