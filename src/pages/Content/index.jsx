import { View } from 'core/base';
import { ViewCls, ServiceWired } from 'core/decorator';
import ContentService from './ContentService';

export default
@ViewCls('content')
class Reader extends View {
    @ServiceWired(ContentService)
    service;

    render() {
        return (
            <div>
                章节列表页
            </div>
        );
    }
}
