import path from 'path'
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const stylesHandler = "style-loader";

export default {
  entry: './src/index.js',
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
  }
};