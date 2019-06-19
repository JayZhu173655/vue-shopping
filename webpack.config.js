//  由于webpack是基于NODE进行构建的，所以webpack的配置文件中，任何合法的NODE代码都是支持的
let path = require('path');

// 在内存中，根据指定的模版页面，生成一份内存中的首页，同时把自动打包好的bundle注入到页面底部
// 若果要配置插件，需要在导出的对象中，挂载一个plugins节点
const htmlWebpackPlugin = require('html-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 当以命令的形式运行webpack或webpack-dev-server的时候，工具会发现我们并没有提供要打包的入口和出口文件
// 此时，工具会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个配置对象，
// 然后根据这个对象，进行打包构建

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
       path: path.join(__dirname, './dist'), // 打包输出路径
       filename: 'bundle.js' //指定打包输出的文件名
    },
    mode: 'development',
    plugins: [
        // 所有webpack配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), // 指定模版文件路径
            filename: 'index.html' // 设置生成的内存页面名称
        }),
        new VueLoaderPlugin(),


    ],
    module: {
        // 配置第三方loader模块
        rules: [
            // 第三方模块匹配规则
            {
                // 处理css结尾文件
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // 处理less结尾的文件
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 处理scss结尾的文件
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                // 处理图片的url路径 如果use只有一个加载器，可以指定字符串属性值，多个加载器应是数组
                test: /\.(jpg|png|gif|bmp|jpeg)$/,

                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit给定的值，是图片大小，单位是byte,如果我们引用的图片，大于或等于给定的limit值，
                            // 则不会被转为base64格式的字符串，如果图片小于给定的limit值，则会被转成base64的字符串
                            limit: 13186
                        }
                    }
                ]

            },
            {
                // 处理字体文件的loader url-loader也可以处理字体文件
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                // 配置babel来转换高级的ES语法
                test: /\.js$/,
                use:  'babel-loader',
                exclude: /node_modules/
            },
            {
                //配置.vue处理文件
                test: /\.vue$/,
                use: 'vue-loader',
            }
        ]
    },
    resolve: {
        alias: {
            // 设置Vue被导入时候的包
            // "vue$": "vue/mui/vue.js"
        }
    }
};