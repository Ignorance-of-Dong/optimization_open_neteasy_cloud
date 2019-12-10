/*
 * @Author: Mr.zheng
 * @Date: 2019-12-04 10:10:00
 * @LastEditors: Mr.zheng
 * @LastEditTime: 2019-12-04 10:10:00
 * @Description: webpack测试文件
 */
import path from 'path'
import merge from 'webpack-merge'
import webpack from 'webpack'
const webpackCommon = require('./webpack.config.common')
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 显示进度条
const ROOT_PATH = process.cwd();
const DIST_PATH = path.resolve(ROOT_PATH, "build");
import Config from '../web.config'
const chalk = require('react-dev-utils/chalk')


module.exports = merge(webpackCommon, {
    mode: 'development',
    entry: {
        build: path.resolve(process.cwd(), 'test/index.tsx')
    },
    output: {
        path: DIST_PATH,
        filename: "[name].[hash].js"
    },
    devtool: "source-map",
    devServer: {
        hot: true,
        host: "0.0.0.0",                                                // 可以使用手机访问
        port: Config.Serverport,
        compress: true,                                                 // 一切服务都将启动gzip压缩
        clientLogLevel: "none",                                         // 禁止浏览器控制台上输出热重载进度【这可能很繁琐】
        noInfo: true,                                                   // 启用以后【其他信息会被隐藏而错误和警告仍会显示】
        quiet: true,                                                    // 清除webpack【热重载默认在虚拟环境下打包，不在终端显示】
        // proxy: {                                                     // 代理到后端的服务地址，会拦截所有以api开头的请求地址
        //   "/api": "http://localhost:4000"
        // }
    },
    plugins: [
        new ProgressBarPlugin({
            format: ' Avtion [:bar] ' + ':percent' + ' (:elapsed seconds)',
            clear: false,
            callback: () => {
                console.log(' \n 成功启动服务！！！😊😊😊')
                console.log(` \n Local:            http://localhost:${Config.Serverport}/`)
                console.log(` On Your Network:  http://${Config.IPv4}:${Config.Serverport}/`)
                console.log('\n\nNote that the development build is not optimized.')
                console.log(`To create a production build, use ${chalk.yellow('npm runs build')}.`)
            }
        }),
        new webpack.HotModuleReplacementPlugin(), // 对文件实现热更新
    ]
}) 