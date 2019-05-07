import { View } from 'core/base';
import { NavBar, Icon } from 'antd-mobile';

export default
class Nav extends View {
    /**
     * 处理后退按钮
     */
    back = () => {
        window.history.back();
    };

    render() {
        return (
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.back}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                ]}
            >
                NavBar
            </NavBar>
        );
    }
}
