import React from 'react';
import {
    HashRouter, BrowserRouter, MemoryRouter, StaticRouter, Route,
} from 'react-router-dom';
import { View } from 'core/base';
import {
    routeType,
} from 'config/config.json';
import Router from '../router/Router';

export default class App extends View {
    state = {
        loading: false,
    };

    /**
     * 判断使用的路由方式
     */
    _getRouteType() {
        switch (routeType) {
            case 'browser':
                return BrowserRouter;
            case 'memory':
                return MemoryRouter;
            case 'static':
                return StaticRouter;
            default:
                return HashRouter;
        }
    }

    render() {
        const RouterType = this._getRouteType();
        const layout = (
            <RouterType>
                <Route
                    render={() => {
                        return (
                            <div>
                                {Router.genRouter()}
                            </div>
                        );
                    }}
                />
            </RouterType>
        );
        return layout;
    }
}
