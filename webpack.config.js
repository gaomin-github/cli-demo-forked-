const path = require("path");
const PACKAGE = process.env.PACKAGE || 'btns';

const commonConfig = {
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  entry: `./packages/${PACKAGE}/src/index.ts`,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  }
};

module.exports = [{
  ...commonConfig,
  output: {
    publicPath: "/",
    filename: "index.js",
    path: path.join(__dirname, "lib/ejs"),
    libraryTarget: 'ejs'
  },
}, {
  ...commonConfig,
  output: {
    publicPath: "/",
    filename: "index.js",
    path: path.join(__dirname, "lib/cjs"),
    libraryTarget: 'commonjs'
  },
}];


