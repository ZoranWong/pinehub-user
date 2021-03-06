var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// copy from ./webpack.prod.conf.js
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ToolConfigLoader = require('./tool-config-loader');

// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
// })

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            extract: true
        })
    },
    // cheap-module-eval-source-map is faster for development
    // devtool: '#cheap-module-eval-source-map',
    devtool: '#source-map',
    output: {
        path: config.build.assetsRoot,
        // filename: utils.assetsPath('[name].[chunkhash].js'),
        // chunkFilename: utils.assetsPath('[id].[chunkhash].js')
        filename: utils.assetsPath('[name].js'),
        chunkFilename: utils.assetsPath('[id].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),

        // copy from ./webpack.prod.conf.js
        // extract css into its own file
        new ExtractTextPlugin({
            // filename: utils.assetsPath('[name].[contenthash].css')
            filename: utils.assetsPath('[name].wxss')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'common/vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    (module.resource.indexOf('node_modules') >= 0
                        || module.resource.indexOf('iview') >= 0
                        || module.resource.indexOf('jssdk') >= 0)
                ) || count > 2
            }
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //   filename: 'index.html',
        //   template: 'index.html',
        //   inject: true
        // }),
        new FriendlyErrorsPlugin(),
        new ToolConfigLoader('dev-staging')
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

module.exports = webpackConfig;
