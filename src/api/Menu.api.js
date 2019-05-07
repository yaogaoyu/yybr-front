/**
 * 定义 菜单 模块的接口池
 */

import { ApiMapper } from 'core/decorator';

export default
@ApiMapper()
class Menu {
    static mapping = {
        /** ***************** 菜单模块接口 ****************** */
        // 列举菜单
        'get menu': { method: 'get', url: '/menu' },
    };
}
