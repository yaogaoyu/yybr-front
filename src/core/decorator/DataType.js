/**
 * 定义数据类型
 */

/**
 *  字段映射方法
 * @param obj
 */
const mapping = (obj) => {
    return (target) => {
        target.prototype.mapping = obj;
        return target;
    };
};

const mergeType = (target, name, type) => {
    const typeMap = target.typeMap || {};
    target.typeMap = Object.assign({}, typeMap, { [name]: type });
};

const string = (target, name) => {
    mergeType(target, name, 'string');
};

const number = (target, name) => {
    mergeType(target, name, 'number');
};

const boolean = (target, name) => {
    mergeType(target, name, 'boolean');
};

const array = (type) => {
    if (!type) {
        return (target, name) => {
            mergeType(target, name, { type: 'array' });
        };
    }
    return (target, name) => {
        mergeType(target, name, { type: 'array', itemType: type });
    };
};

const typed = (type) => {
    return (target, name) => {
        if (!type) {
            /* eslint-disable */
            console.warn(`${target.constructor.name}中@type必须规定对应实体类`);
            /* eslint-enable */
            return;
        }
        mergeType(target, name, type);
    };
};

export default {
    mapping,
    string,
    number,
    boolean,
    array,
    typed,
};
