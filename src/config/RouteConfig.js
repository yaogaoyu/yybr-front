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
}, {
    path: '/collections',
    page: () => {
        return import('../pages/Collections');
    },
}, {
    path: '/chapters',
    page: () => {
        return import('../pages/Chapters');
    },
}, {
    path: '/content',
    page: () => {
        return import('../pages/Content');
    },
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
