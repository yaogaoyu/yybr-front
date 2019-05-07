import { View } from 'core/base';
import { ViewCls, ServiceWired } from 'core/decorator';
import ChaptersService from './ChaptersService';

export default
@ViewCls('chapters')
class Chapters extends View {
    @ServiceWired(ChaptersService)
    service;

    render() {
        return (
            <div>
                章节列表页
            </div>
        );
    }
}
