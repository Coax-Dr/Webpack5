module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        // 取值：usage false entry
        corejs: 3
      }
    ],
    ['@babel/preset-react'],
  ],
  plugins: [
    ["react-refresh/babel"]
  ]
}