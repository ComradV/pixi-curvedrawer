
var path = require('path');
 
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/, // запустим загрузчик во всех файлах .js
      exclude: [/node_modules/, /pixi.min.js/], // проигнорируем все файлы в папке  node_modules 
      use: [{ loader: 'jshint-loader'}]
    }]
  }
 };
 
 //Faced issue using jshint:  https://stackoverflow.com/questions/49178525/jshint-loader-not-working-with-webpack-version-4