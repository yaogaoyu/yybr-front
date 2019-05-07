/**
 * 标记为apiMapping类
 */

import ParametersNotMatchException from 'core/exception/ParametersNotMatchException';
import FieldNotFoundException from 'core/exception/FieldNotFoundException';
import ApiMapping from '../api/ApiMapping';

/*
 * 将api映射放入映射池
 */
const mapping = (apiMapping) => {
    if (typeof apiMapping !== 'object') {
        throw new ParametersNotMatchException();
    }
    ApiMapping.getInstance().addMapping(apiMapping);
};

export default () => {
    return (apiMapper) => {
        const type = typeof apiMapper;
        let apiMapping;
        switch (type) {
            case 'object':
                apiMapping = apiMapper;
                break;
            case 'function':
                apiMapping = apiMapper.mapping;
                if (!apiMapping) {
                    throw new FieldNotFoundException('未找到名为「mapping」的静态字段');
                }
                break;
            default:
                throw new ParametersNotMatchException();
        }
        mapping(apiMapping || {});
        return apiMapper;
    };
};
