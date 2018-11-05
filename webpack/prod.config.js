const base = require('./base.config')

const merge = require('webpack-merge');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const webpack_prod_rules = [
    {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader',
            // options: {
            //     presets: ['babel/preset-env']
            // }
            // options: {
            //     'libraryName': 'antd',
            //     'style': true
            // }
        }]
        // use: 'babel-loader'
    },
    {
        test: /\.css$/,
        // use: [
        //     { loader: 'style-loader' },
        //     {
        //         loader: 'css-loader', options: {
        //             modules: true,
        //             sourceMap: true,
        //         }
        //     },
        //     { loader: 'postcss-loader' }
        // ]
        use: ExtractTextPlugin.extract({
            use: [
                // 'postcss-loader'
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    // options: {
                    //   ident: 'postcss',
                    //   config: {
                    //     path: __dirname + '/postcss.config.js'
                    //   },
                    //   plugins: () => [
                    //     postcssPresetEnv({
                    //       stage:2
                    //     })
                    //   ]
                    // }
                }

            ],
            fallback: 'style-loader'
        })
    },
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: [{
                loader: 'css-loader'
            },
            // {
            //   loader: 'postcss-loader'
            // },
            {
                loader: 'postcss-loader',
                // options: {
                //   ident: 'postcss',
                //   config: {
                //     path: __dirname + '/postcss.config.js'
                //   },
                //   plugins: () => [
                //     postcssPresetEnv({
                //       stage:2
                //     })
                //   ]
                // }
            },
            {
                loader: 'sass-loader',
                // options: {
                //     sourceMap: true,
                // }
            }
            ],
            fallback: 'style-loader'
        })
        // use: [
        //     { loader: 'style-loader' },
        //     { loader: 'css-loader' },
        //     { loader: 'sass-loader' }
        // ]
    },
    {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [{
            loader: 'file-loader',
            options: {
                // name: 'images/[sha512:hash:base64:7].[ext]',
                name: 'fonts/[hash]-[name].[ext]',
                // context: path.resolve('/dist/images'),
                // publicPath: '/',
                // outputPath: 'dist/images'
            }
        }]
    },
    // {
    //   test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    //   use: [{
    //     loader: 'file-loader',
    //     options: {
    //       // name: 'images/[sha512:hash:base64:7].[ext]',
    //       name: 'images/[hash]-[name].[ext]',
    //       // context: path.resolve('/dist/images'),
    //       publicPath: '/',
    //       // outputPath: 'dist/images'
    //     }
    //   }]
    // },
    {
        test: /\.(png|jpg|gif|svg)$/,
        // loader: 'url-loader',
        loader: 'url-loader',
        options: {
            limit: 1000,
            name: `images/[hash]-[name].[ext]`
        }
    },
]
const HtmlWebpackPlugin = require('html-webpack-plugin')

const prod = {
    mode: "production",
    module: {
        rules: webpack_prod_rules
    },
    // output: {
    //     pathinfo: false,
    // },
    plugins: [

        new ExtractTextPlugin('css/[name].f96ec250f4f92f153ea6.bundle.css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }],
            },
            canPrint: true
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            sourceMap: false,
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                parse: {
                    bare_returns: false,
                    html5_comments: true
                },
                // mangle: {
                //     safari10: true,
                // },
                mangle: true,
                output: {
                    comments: false,
                    beautify: false,
                    // safari10: true,
                },
                compress: {
                    drop_console: true
                },
                warnings: false
            },
            // extractComments: true,
        }),
        new HtmlWebpackPlugin({
            title: 'ybren ',
            template: 'src/h11.html'
        })
        // new webpack.DefinePlugin({ // <-- 减少 React 大小的关键
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
    ],
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: "async", // 必须三选一： "initial" | "all"(默认就是all) | "async"
            minSize: 30000, // 最小尺寸，默认0
            minChunks: 1, // 最小 chunk ，默认1
            maxAsyncRequests: 1, // 最大异步请求数， 默认1
            maxInitialRequests: 1, // 最大初始化请求书，默认1
            name: () => { }, // 名称，此选项课接收 function
            cacheGroups: { // 这里开始设置缓存的 chunks
                // priority: "0", // 缓存组优先级 false | object |
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendor: { // key 为entry中定义的 入口名称
                    chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    // test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor", // 要缓存的 分隔出来的 chunk 名称
                    minSize: 10000,
                    minChunks: 2,
                    enforce: true,
                    maxAsyncRequests: 1, // 最大异步请求数， 默认1
                    maxInitialRequests: 1, // 最大初始化请求书，默认1
                    reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
                },
            }
        }
    },
};

console.log('prod is:----------', merge(base, prod));

// module.exports = Object.assign({}, base, prod);

module.exports = Object.assign({}, base, prod);