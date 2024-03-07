const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const webpackBar = require('webpackbar')
const resolvePath = (...segments) => path.resolve(__dirname, ...segments)

module.exports = {
  mode: 'development',
  entry: resolvePath('src', 'index.js'),
  stats: 'errors-warnings',
  output: {
    path: resolvePath('dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@': resolvePath('src'),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'microApp1',
      filename: 'remoteEntry.js',
      exposes: {
        './app': './src/App',
      },
    }),
    new HtmlWebpackPlugin({
      template: resolvePath('public', 'index.html'),
    }),
    new webpackBar(),
  ],
  devServer: {
    static: {
      directory: resolvePath('public'),
    },
    hot: true,
  },
}
