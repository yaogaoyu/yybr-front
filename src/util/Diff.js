/**
 *  自定义scu diff方法
 */

/* eslint-disable */
export default class Diff {
    static props(newValue = {}, oldValue = {}) {
        if (Object.keys(newValue).length !== Object.keys(oldValue).length) {
            return true;
        }
        // 增加antd form的单独判读
        if (newValue.form && newValue.form.getFieldDecorator && newValue.form.getFieldDecorator.name === 'bound getFieldDecorator') {
            return true;
        }
        for (const key in newValue) {
            const newType = typeof(newValue[key]);
            const oldType = typeof(oldValue[key]);
            if (newType !== oldType) {
                return true;
            }
            switch (newType) {
                case 'string':
                case 'number':
                case 'boolean':
                case 'null':
                case 'undefined':
                     if (newValue[key] !== oldValue[key]) {
                        return true;
                     };
                     break;
                default:
                   if (Diff.handleObject(newValue[key], oldValue[key])) {
                       return true;
                   };
            }
        }
        return false;
    }

    static handleObject(newValue, oldValue) {
        const type = Object.prototype.toString.call(newValue);
        switch (type) {
            case '[object Array]':
                if (newValue.length !== oldValue.length) {
                    return true;
                }
                return Diff.compare(newValue, oldValue);
            case '[object Object]':
                if (Object.keys(newValue).length !== Object.keys(oldValue || {}).length) {
                    return true;
                }
                return Diff.compare(newValue, oldValue);
            default:
                let flag = true;
                try {
                    flag = newValue.toString() !== oldValue.toString();
                } catch (e) {
                    return flag;
                }
                return flag;
        }
    }

    static compare(newValue, oldValue) {
        let flag = true;
        try {
            flag = JSON.stringify(newValue) !== JSON.stringify(oldValue);
        } catch (e) {
            return flag;
        }
        return flag;
    }
}
