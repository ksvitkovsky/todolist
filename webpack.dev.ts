import * as webpack from "webpack";
import * as HtmlPlugin from "html-webpack-plugin";

const devConfig: webpack.Configuration = {
  entry: "./source/app.tsx",
  output: {
    filename: "build/js/bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [new HtmlPlugin({ template: "public/index.html" })]
};

export default devConfig;
