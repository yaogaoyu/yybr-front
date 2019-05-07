/**
 * 定义视图基类
 */
import { Component } from 'react';
import { Diff } from 'util';

export default class View extends Component {
    /**
     * 增加scu属性对比
     */
    shouldComponentUpdate(nextProps) {
        return Diff.props(nextProps, this.props);
    }

    /**
     * 重写setState,不进行scu判断，强制刷新
     */
    setState = (state, callback) => {
        return Component.prototype.setState.call(this, state, (...args) => {
            if (callback) {
                callback(...args);
            }
            this.forceUpdate();
        });
    }


    render() {
        return null;
    }
}
