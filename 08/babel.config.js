module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        // 取值：usage false entry
        corejs: 3
      }
    ]
  ]
}