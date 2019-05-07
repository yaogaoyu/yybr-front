/**
 * 定义路由配置。
 *
 */

export default [{
    path: '/',
    exact: true,
    page: () => {
        return import('../pages/IndexPage');
    },
// }, {
//     path: '/tableDemo',
//     page: () => {
//         return import('../pages/TableDemo');
//     },
// }, {
//     path: '/third',
//     page: () => {
//         return import('../pages/Third');
//     },
// }, {
//     path: '/pureViewTest',
//     page: () => import('../pages/PurePageDemo'),
// }, {
//     path: '/customForm',
//     page: () => import('../pages/CustomFormDemo'),
// }, {
//     path: '/listDemo',
//     page: () => import('../pages/ListDemo'),
// }, {
//     path: '/rxjsDemo',
//     page: () => import('../pages/RxDemo'),
// }, {
//     path: '/responsiveForm',
//     page: () => import('../pages/ResponsiveForm'),
// }, {
//     path: '/responsiveListDemo',
//     page: () => import('../pages/ResponsiveListDemo'),
},
];
