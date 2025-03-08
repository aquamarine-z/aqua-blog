const path = require('path');

module.exports = function (context, options) {
  return {
    name: 'custom-webpack-plugin',
    configureWebpack(config, isServer) {
      return {
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, '../'), // "@/*" 指向项目根目录
            '@src': path.resolve(__dirname, '../src'), // "@src/*" 指向 src 目录
          },
        },
      };
    },
  };
};