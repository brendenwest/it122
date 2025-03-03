import path from 'path'
import webpack from 'webpack'
import util from 'util'
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const stylesHandler = "style-loader";

export default {
  entry: './src/index.js',
  experiments: {
    outputModule: true,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
    ],
  },
  resolve: {
    fallback: {
      "async_hooks": false,
      "crypto": false,
      "fs": false,
      "http": false,
      "net": false,
      "path": false,
      "querystring": false,
      "stream": false,
      "url": false,
      "util": false,
      "zlib": false,
    },
  },
  plugins: [
        new webpack.DefinePlugin({
          'process.env.DEBUG_MIME': JSON.stringify(process.env.DEBUG_MIME)
        })
  ],
};