const path = require("path");

module.exports = {
  entry: './components/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: require.resolve('babel-loader'),
        query: {
          cacheDirectory: true,
          plugins: [['import', { libraryName: 'antd', style: true }]],
        },
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: { '@primary-color': '#42b983' },
              },
            },
          }
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentContext: path.resolve(__dirname, "components"),
                localIdentName: "[hash:base64]",
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.png?$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};
