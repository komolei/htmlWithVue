const webpack = require('webpack')

const entry = require('./entry')

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: entry,
    resolve: {
        extensions: ['.js', '.scss', '.png','.css',]
    },
    output: {
        filename: 'js/[name].f96ec250f4f92f153ea6.bundle.js',
        // filename: 'js/[name].[chunkhash].bundle.js',
        /* 下面三行 起注释作用 */
        library: 'someLibName',
        libraryTarget: 'umd',
        auxiliaryComment: 'Test commit',
        path: path.resolve(process.cwd(), 'dist'),
        pathinfo: true, // 适用于开发环境，告诉webpack引入bundle的注释
        // publicPath: '/dist/',
        publicPath: '/',
        // sourceMapFilename: "[file].map",
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
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1000
                }
            },
            // {
            //   test: /\.html$/,
            //   loader: 'html-loader',
            //   options: {
            //     attrs: ['img:src']
            //   }
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(process.cwd(), 'dist'), {
            root: path.resolve(process.cwd(), 'dist'),
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            title: 'ybren',
            template: 'src/h11.html'
        })
    ],
}