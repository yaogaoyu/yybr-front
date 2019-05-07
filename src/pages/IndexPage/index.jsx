import { Fragment } from 'react';
import { View } from 'core/base';
import { ViewCls, ServiceWired } from 'core/decorator';
import { NavBar, ListView } from 'antd-mobile';
// import Link from 'components/Link';
import { Link } from 'react-router-dom';
import IndexService from './IndexService';
import './index.less';

const data = [
    {
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];

/* eslint-disable */
const ListBody = (props) => {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
};
/* eslint-enable */

export default
@ViewCls('list')
class Index extends View {
    @ServiceWired(IndexService)
    service

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    #onEndReached = () => {
        console.log('onEndReached');
    };

    render() {
        return (
            <Fragment>
                <NavBar
                    mode="light"
                    rightContent={[
                        <Link key="1" className="nav-right link" to="/collections">收藏夹</Link>,
                    ]}
                >
                    书籍列表
                </NavBar>
                <ListView
                    ref={(el) => {
                        this.lv = el;
                    }}
                    dataSource={data}
                    renderFooter={() => {
                        return (
                            <div style={{ padding: 30, textAlign: 'center' }}>
                                {this.state.isLoading ? 'Loading...' : 'Loaded'}
                            </div>
                        );
                    }}
                    renderSectionHeader={(sectionData) => {
                        console.log(sectionData);
                        return <div>Task</div>;
                    }}
                    renderBodyComponent={() => {
                        return <ListBody />;
                    }}
                    // renderRow={}
                    // renderSeparator={separator}
                    style={{
                        // height: this.state.height,
                        overflow: 'auto',
                    }}
                    pageSize={4}
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.#onEndReached}
                    onEndReachedThreshold={10}
                />
            </Fragment>
        );
    }
}
