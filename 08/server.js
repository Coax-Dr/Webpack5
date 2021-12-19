const express = require("express");
const webpack = require("webpack");
const WebpackDevMiddleWare = require("webpack-dev-middleware");
const WebpackHotMiddleWare = require("webpack-hot-middleware");

const app = express();
const config = require("./webpack.config");
const compiler = webpack(config);

app.use(WebpackDevMiddleWare(compiler, {
  publicPath: config.output.publicPath
}));

app.use(WebpackHotMiddleWare(compiler, {
  log: false,
  heartbeat: 2000
}));

app.listen(3000, () => { console.log("app listening in 3000") })