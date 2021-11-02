const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'boundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false
            }
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|svg|gif|jpg|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false, // 是否转化为esModule
            }
          }
        ]
      }
    ]
  }
}