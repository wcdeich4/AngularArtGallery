const path = require('path');

  module.exports = {
        //Webpack does support mu;tiple entry points
    //ex: entry: ['./src/file_1.js', './src/file_2.js'],
    entry: {
    index: './script.js',
    about: './script.js',
    credits: './credits.ts',
    FractileGenerator: './FractileGenerator.ts',

  },
  // devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
            test: /\.(jpe?g|png|gif|ico|js|svg|html?|css)$/i, 
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
        }
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };