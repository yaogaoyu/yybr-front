import { Fragment } from 'react';
import { View } from 'core/base';
import { ViewCls, ServiceWired } from 'core/decorator';
import { NavBar } from 'antd-mobile';
// import Link from 'components/Link';
import { Link } from 'react-router-dom';
import IndexService from './IndexService';
import './index.less';

export default
@ViewCls('list')
class Index extends View {
    @ServiceWired(IndexService)
    service;

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        return (
            <Fragment>
                <NavBar
                    mode="light"
                    rightContent={[
                        <Link key="1" className="nav-right link" to="/collections">收藏夹</Link>,
                    ]}
                >
                    YYBR
                </NavBar>

            </Fragment>
        );
    }
}
