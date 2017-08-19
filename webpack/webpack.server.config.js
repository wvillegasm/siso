const path = require('path'),
  fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const config = {
  entry: './src/server.js',
  output: {
    path: path.resolve(`${__dirname}/..`, 'build'),
    filename: 'server.js'
  },
  externals: nodeModules,
    module: {
      rules: [
        {
          test: /\.json$/,
          use: 'json-loader',
          exclude: /(node_modules)/,
        }, {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /(node_modules)/,
        }
      ]
    },
  target: 'node',
  externals: [nodeModules]
};

module.exports = config;