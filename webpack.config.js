//webpack cli的使用

module.exports = {
    entry: './src/main.js',

    // 设置项目的模式development production两种
    mode: 'development',
    module: {
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader', //要特别注意 先倒入style-loader 然后才导入css-loader
                ],
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader', //要特别注意 先倒入style-loader 然后才导入css-loader
                    'less-loader'
                ],
            }
        ],
      },
}


// 了解webpack的插件
// 使用html-webpack-plugin 
//插件 在module.exports = {} 里面配置plugin数组
