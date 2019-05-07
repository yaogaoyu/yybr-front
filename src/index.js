/**
 * 应用入口。
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import 'moment/locale/zh-cn';
import App from './pages/App';

// Log.setConsoleLogDriver();
// // 设置在url中加入日志级别，默认不显示日志。
// const query = Config.routeType === 'hash' ? window.location.hash : window.location.search;
// const llvMatchArr = query.match(/&?llv=(.+?)(?:&|$)/);
// if (llvMatchArr && llvMatchArr[1]) {
//     Log.setLevel(llvMatchArr[1]);
// }
/* eslint-disable react/jsx-filename-extension */
// ReactDOM.render(Router.genRouter(), document.getElementById('app'));
// const Container = Router.genContainer();
ReactDOM.render(<App />, document.getElementById('app'));
/* eslint-enable react/jsx-filename-extension */
