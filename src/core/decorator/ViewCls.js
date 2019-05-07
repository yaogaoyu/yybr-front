/**
 * 定义视图装饰器
 */
import React from 'react';
import Store from 'core/base/Store';
import ViewKeyUndefinedException from '../exception/ViewKeyUndefinedException';

export default (propsKey) => {
    if (!propsKey) {
        throw new ViewKeyUndefinedException(`[${propsKey}]`);
    }
    return (ViewCls) => {
        return class extends React.PureComponent {
            constructor(props) {
                super(props);
                this.store = new Store();
                this.store.data[propsKey] = {};
            }

            componentDidMount() {
                this.subscribe = this.store.subject$.subscribe({
                    next: (key) => {
                        if (key === propsKey) {
                            this.forceUpdate();
                        }
                    },
                });
            }

            componentWillUnmount() {
                Reflect.deleteProperty(this.store.data, propsKey);
                this.subscribe.unsubscribe();
            }

            render() {
                const props = {
                    ...this.store.getData(propsKey),
                    ...this.props,
                };
                /* eslint-disable react/jsx-filename-extension */
                return (<ViewCls {...props} />);
                /* eslint-enable react/jsx-filename-extension */
            }
        };
    };
};
