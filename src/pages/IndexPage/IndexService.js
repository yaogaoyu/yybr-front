import { Service } from 'core/base';
import { ServiceCls } from 'core/decorator';

export default
@ServiceCls
class IndexService extends Service {
    update() {
        this.dispatch({
            text: 'service update Index!',
        }, 'index');
    }
}
