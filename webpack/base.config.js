const webpack = require('webpack')

const entry = require('./entry')

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: entry,
    resolve: {
        extensions: ['.js', '.scss', '.png', '.css',]
    },
    output: {
        filename: 'js/[name].[hash].bundle.js',
        path: path.resolve(process.cwd(), 'dist'),
        pathinfo: false, // 适用于开发环境，告诉webpack引入bundle的注释
        // publicPath: '/dist/',
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: {
                    // modules: true,
                    // sourceMap: true
                }
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
                //       stage: 2
                //     })
                //   ]
                // }
            },

            ]
            // use: ExtractTextPlugin.extract({
            //     use: [
            //         {
            //             loader: 'css-loader',
            //         },
            //         "postcss-loader"
            //     ],
            //     fallback: 'style-loader'
            // })
        },
        {
            test: /\.scss$/,
            // use: ExtractTextPlugin.extract({
            //     use: [
            //         {
            //             loader: 'css-loader',
            //         }, {
            //             loader: 'postcss-loader'
            //         }, {
            //             loader: 'sass-loader',
            //             // options: {
            //             //     sourceMap: true,
            //             // }
            //         },
            //     ],
            //     fallback: 'style-loader'
            // })
            use: [{
                loader: 'style-loader'
            },
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
                //       stage: 2
                //     })
                //   ]
                // }
            },

            {
                loader: 'sass-loader'
            }
            ]
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'fonts/[hash]-[name].[ext]',
                    // context: path.resolve('/dist/images'),
                    // publicPath: '/',
                    // outputPath:'images'
                    // outputPath: 'dist/images'

                }
            }]
        },
        {
            test: /\.(png|jpg|gif|svg)$/i,
            loader: 'url-loader',
            options: {
                limit: 100000
            }
        },
        {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                attrs: ['img:src']
            }
        }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(process.cwd(), 'dist'), {
            root: path.resolve(process.cwd(), 'dist'),
            verbose: true,
            dry: false,
            allowExternal: true, // 允许 CleanWebpackPlugin 清除本配置目录外的文件
            beforeEmit: true // 在 Webpack 工作完成、输出文件前夕执行清除操作
        }),
        new HtmlWebpackPlugin({
            title: 'ybren',
            // template: 'vueSrc/index.html'
            template: 'src/home.html'
            // template: 'src/fabric.html'
        })
    ],
}