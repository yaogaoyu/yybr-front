import { View } from 'core/base';
import PropTypes from 'prop-types';

export default
class Link extends View {
    static propTypes = {
        text: PropTypes.string,
        className: PropTypes.string,
        to: PropTypes.string.isRequired,
    };

    static defaultProps = {
        text: '',
        className: '',
        to: '',
    };

    #handleClick = () => {
        window.history.pushState('', '', `/#${this.props.to}`);
    };

    render() {
        return (
            <span onClick={this.#handleClick} className={this.props.className}>
                {this.props.text || this.props.children}
            </span>
        );
    }
}
