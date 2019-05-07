/**
 * webpack 打包配置文件
 */
const Path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const apiMocker = require('mocker-api');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const package = require('./package.json');
const HappyPack = require('happypack');

const defaultTheme = require('./etc/themes/default');

// 打包路径配置
const config = {
    src: {
        js: ['@babel/polyfill', Path.resolve(__dirname, 'src/index.js')],
        html: Path.resolve(__dirname, 'src/index.html'),
        // static: Path.resolve(__dirname, 'static')
    },
    output: {
        path: Path.resolve(__dirname, 'dist'),
        html: Path.resolve(__dirname, 'dist/index.html'),
        // static: Path.resolve(__dirname, 'dist/static')
    }
};

// node_module目录
const PATH_NODE_MODULES = Path.resolve(__dirname, 'node_modules');
// 判断是否是开发模式
const isDev = process.env.NODE_ENV === 'development';
// 主题变量
const theme = defaultTheme;

const pkgConfig =  {
    entry: {
        // index: ['@babel/polyfill', config.src.js]
    },
    output: {
        path: config.output.path,
        filename: '[name].min.js?[hash:8]',
        chunkFilename: '[id].min.js?[hash:8]',
    },
    mode: process.env.NODE_ENV,
    devtool: isDev ? 'source-map' : false,
    resolve: {
        alias: {
            core: Path.resolve(__dirname, 'src/core/'),
            util: Path.resolve(__dirname, 'src/util/'),
            api: Path.resolve(__dirname, 'src/api/'),
            components: Path.resolve(__dirname, 'src/components/'),
            config: Path.resolve(__dirname, 'src/config/'),
            service: Path.resolve(__dirname, 'src/service/'),
        },
        extensions: [ '.jsx', '.js', '.json' ]
    },
    devServer: {
        contentBase: config.output.path,
        // 配置mock
        // before(app) {
        //     apiMocker(app, Path.resolve('./mock/index.js'), {
        //         // 配置接口代理
        //         // proxy: {
        //         //     '/repos/*': 'https://api.github.com/',
        //         //     '/:owner/:repo/raw/:ref/*': 'http://127.0.0.1:2018'
        //         // },
        //         changeHost: true,
        //     })
        // },
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            enforce: 'pre',
            use: [{
                loader: 'eslint-loader'
            }],
            exclude: [PATH_NODE_MODULES]
        }, {
            // 转化ES6语法
            test: /\.jsx?$/,
            use: [
                'cache-loader',
                'happypack/loader?id=babelLoader'
            ],
            exclude: [PATH_NODE_MODULES]
        }, {
            // 图片转化，小于8k自动转化成base64编码
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 11920
                }
            }],
        }, {
            // 字体
            test: /\.(woff|svg|eot|ttf|otf)\??.*$/,
            use: [{
                loader: 'file-loader'
            }],
        }, {
            test: /\.css$/,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'happypack/loader?id=cssLoader'
            ]
        }, {
            // 处理本地less样式文件，开启css module功能
            test: /\.less$/,
            use: [
                'cache-loader',
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'happypack/loader?id=lessWithCssModuleLoader'
            ],
            exclude: [Path.resolve(__dirname, 'node_modules')]
        }, {
            // 处理依赖包中的less样式文件，不开启css module功能
            test: /\.less$/,
            use: [
                'cache-loader',
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'happypack/loader?id=lessLoader'
            ],
            include: [Path.resolve(__dirname, 'node_modules')]
        }]
    },
    plugins: [
        new HappyPack({
            id: 'babelLoader',
            threads: 4,
            loaders: [{
                loader: 'babel-loader'
            }]
        }),
        new HappyPack({
            id: 'lessWithCssModuleLoader',
            threads: 3,
            loaders: [
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    }
                },
                'postcss-loader',
                {
                    loader: 'less-loader',
                    options: {
                        modifyVars: theme,
                        javascriptEnabled: true
                    }
                }
            ]
        }),
        new HappyPack({
            id: 'lessLoader',
            threads: 2,
            loaders: [
                'css-loader',
                'postcss-loader',
                {
                    loader: 'less-loader',
                    options: {
                        modifyVars: theme,
                        javascriptEnabled: true
                    }
                }
            ]
        }),
        new HappyPack({
            id: 'cssLoader',
            threads: 2,
            loaders: [
                'css-loader',
                'postcss-loader',
            ]
        }),
        // post-css 自动添加样式前缀插件
        Autoprefixer,
        // 页面模板插件
        new HtmlWebpackPlugin({
            template: config.src.html,
            filename: config.output.html,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['vendor-react', 'vendor-antd', 'vendor', package.name],
            chunksSortMode: 'manual',
        }),
        //在开发时不需要每个页面都引用React
        new webpack.ProvidePlugin({
            'React': 'react',
        }),

        // 不打包moment的语言包，达到减少打包体积的效果
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /zh-cn/,
        ),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].min.css?[hash:8]',
            chunkFilename: '[name].min.css?[hash:8]'
        }),
        // new CopyWebpackPlugin([
        //     { from: config.src.static, to: config.output.static }
        // ])
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            cacheGroups: {
                // 单独打包react相关包
                react: {
                    priority: 199,
                    name: 'vendor-react',
                    filename: '[name].min.js?[hash:8]',
                    chunks: 'initial', // initial只对入口文件处理
                    minSize: 30000,
                    test: /(react|react-dom|react-router-dom)/,
                },
                // 单独打包antd包
                antd: {
                    priority: 100,
                    name: 'vendor-antdm',
                    filename: '[name].min.js?[hash:8]',
                    chunks: 'initial',
                    minSize: 30000,
                    test: /antd-mobile/,
                },
                // 单独打包其它
                vendors: {
                    priority: -10,
                    name: 'vendor',
                    filename: '[name].min.js?[hash:8]',
                    chunks: 'initial',
                    test: /node_modules/,
                    enforce: true
                },
                default: false,
            }
        }
    }
};

pkgConfig.entry[package.name] = config.src.js;
// 如果是开发模式，增加开发模式下的有用工具
if (isDev) {
    // 增加HMR，开发模式下进行热更新
    pkgConfig.devServer.hot = true;
    pkgConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
    pkgConfig.plugins.push(new CleanWebpackPlugin([config.output.path]));
    // pkgConfig.plugins.push(new BundleAnalyzerPlugin());
    // 打包压缩配置
    const minimizer = [
        new UglifyJsPlugin({
            // 启用压缩多线程缩短压缩时间
            parallel: 4,
            uglifyOptions: {
                // 打包时候自动删除debugger和console的调用代码
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    // drop_console: true,
                },
                // 打包时自动删除注释，减小文件体积
                output: {
                    comments: false,
                },
            },
        })
    ];
    pkgConfig.optimization['minimizer'] = minimizer;
}

module.exports = pkgConfig;