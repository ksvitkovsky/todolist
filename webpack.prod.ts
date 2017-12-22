import * as webpack from "webpack";
import * as HtmlPlugin from "html-webpack-plugin";

const prodConfig: webpack.Configuration = {
  entry: "./source/app.tsx",
  output: {
    filename: "js/bundle.js",
    path: __dirname + "/build"
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
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins: [new HtmlPlugin({ template: "public/index.html" })]
};

export default prodConfig;
