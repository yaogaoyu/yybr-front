import { View } from 'core/base';
import { ViewCls, ServiceWired } from 'core/decorator';
import PropTypes from 'prop-types';
import IndexService from './IndexService';

export default
@ViewCls('index')
class Index extends View {
    static propTypes = {
        text: PropTypes.string,
    };

    static defaultProps = {
        text: '',
    };

    @ServiceWired(IndexService)
    service;

    render() {
        return (
            <div>
                {this.props.text || 'Index'}
                <button
                    type="button"
                    onClick={() => {
                        this.service.update();
                    }}
                >
                    update
                </button>
            </div>
        );
    }
}
