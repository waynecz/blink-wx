/**
 * Webpack 热加载中间件
 */
var webpackConfig = require('../build/webpack.dev.js');
var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var compiler = webpack(webpackConfig);

// HMR配置
module.exports = {
    webpackDevMiddleware: webpackDevMiddleware(compiler, {
        hot: true,
        filename: 'app.js',
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
        historyApiFallback: true,
        quiet: false
    }),
    webpackHotMiddleware: webpackHotMiddleware(compiler, {
        log: () => {}
    })
}
