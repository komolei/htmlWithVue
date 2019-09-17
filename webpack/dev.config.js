const base = require('./base.config');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const dev = {
    mode: 'development',
    devtool: 'inline-source-map',
    // devtool: 'eval-source-map', // delete unuse code // find it doesn't work
    devServer: {
        contentBase: path.resolve(process.cwd(), 'dist'),
        // contentBase:path.join(__dirname,'../dist'),
        historyApiFallback: true,
        // historyApiFallback: {

        //     // rewrites: [
        //     //   { from: /.*/, to: path.posix.join(path.resolve(process.cwd(),'dist/'), 'index.html') },
        //     // ],
        //     // index: path.posix.join(path.resolve(process.cwd(),'dist/'), 'index.html')

        //   },
        compress: false,
        host: 'localhost',
        port: 3000,
        hot: true,
        // index: '/',
        inline: true,
        open: true,
        publicPath: '/',
        // openPage: 'dist/index.html'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    // optimize performance
    // performance: {
    //     hints: "error",
    //     maxEntrypointSize: 400000,
    //     maxAssetSize: 100000
    // },

    watch: true,
    // watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: 2000,
    //     ingored: /node_modules/
    // }
    
}
// let plugins = [
//     new webpack.NamedModulesPlugin(),
//     new webpack.HotModuleReplacementPlugin()
// ]
// let devSetting = Object.assign({}, base, dev);
// plugins.forEach(item => devSetting.plugins.push(item))
// module.exports = devSetting;

module.exports = merge(base, dev);