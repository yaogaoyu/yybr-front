/**
 * 定义Demo 模块的接口池
 */

import { ApiMapper } from 'core/decorator';

export default
@ApiMapper()
class TableDemo {
    static mapping = {
        /** ***************** 人员模块接口 ****************** */
        // 列举人员列表
        'people list': { method: 'get', url: '/peoples' },
    };
}
