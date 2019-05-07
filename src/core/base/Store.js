/**
 * 定义数据容器组件。
 *
 */

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import Exception from './Exception';
import RouterTool from '../../router/Router';

/**
 * 运行时数据存储对象，单例模式
 */
export default class Store {
    constructor() {
        if (Store.instance) {
            return Store.instance;
        }
        this.data = {};
        Store.instance = this;
        this.subject$ = new BehaviorSubject(null);
    }

    /**
     *  数据注册
     */
    register(flow) {
        const key = flow.getKey();
        const initData = flow.getInitData() || {};
        if (typeof key !== 'string') {
            throw new Exception('注册的key必须是字符串类型！');
        }
        if (!key) {
            throw new Exception('注册的key不允许为空！');
        }
        if (!this.data[key]) {
            this.data[key] = initData;
        } else {
            this.data[key] = Object.assign({}, initData, this.data[key]);
        }
    }

    /**
     *  获取数据
     */
    getData(key) {
        if (!key) {
            return null;
        }
        return this.data[key] || null;
    }

    /**
     *  设置菜单白名单
     */
    setOpenPath(path) {
        RouterTool.setOpenPaths(path);
    }
}
