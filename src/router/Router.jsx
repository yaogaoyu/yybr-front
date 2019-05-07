/**
 * 定义路由组件。
 *
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import PageUnreachableException from 'core/exception/PageUnreachableException';
import RouteConfig from 'config/RouteConfig';


export default class RouterGenerator {
    static genRouter() {
        const routers = RouterGenerator.getRouters(RouteConfig);
        return (
            <Switch>
                {
                    routers.map((route) => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        );
                    })
                }
            </Switch>
        );
        // <Route component={Exception} />
    }

    static routers = null;

    /**
     *  获取路由
     * @param routerConf
     * @returns {boolean}
     */
    static getRouters(routerConf) {
        if (!RouterGenerator.routers) {
            RouterGenerator.routers = routerConf.map((router) => {
                return {
                    path: router.path,
                    exact: router.exact,
                    main: Loadable({
                        loader: () => { return router.page(); },
                        loading: (props) => {
                            if (props.error) {
                                throw new PageUnreachableException(props.error);
                            }
                            // return <Loading />;
                            return null;
                        },
                        render(loaded, props) {
                            const Component = loaded.default;
                            return <Component {...props} />;
                        },
                    }),
                };
            });
        }
        return RouterGenerator.routers;
    }
}
