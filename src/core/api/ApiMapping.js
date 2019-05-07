/**
 * API映射池, 单例模式
 */

// 定义全局api映射对象
const apiMapping = {};
// 定义单例对象
let instance = null;

export default class APIMapping {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    static getInstance() {
        if (!instance) {
            instance = new APIMapping();
        }
        return instance;
    }

    getApiMapping() {
        return apiMapping;
    }

    addMapping(mapping) {
        Object.assign(apiMapping, mapping);
    }

    getApi(name) {
        return apiMapping[name];
    }
}
