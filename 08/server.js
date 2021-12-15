const express = require("express");
const webpack = require("webpack");
const WebpackDevMiddleWare = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config");
const compiler = webpack(config);

app.use(WebpackDevMiddleWare(compiler, {
  publicPath: config.output.publicPath
}));

app.listen(3000, () => { console.log("app listening in 3000") })