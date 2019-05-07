import { View } from 'core/base';
import { ViewCls, ServiceWired } from 'core/decorator';
import CollectionsService from './CollectionsService';

export default
@ViewCls('collections')
class Collections extends View {
    @ServiceWired(CollectionsService)
    service;

    render() {
        return (
            <div>
                收藏列表页
            </div>
        );
    }
}
