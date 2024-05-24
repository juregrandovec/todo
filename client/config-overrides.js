const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    zlib: require.resolve("browserify-zlib"),
    fs: false,
    // Add other polyfills as needed
  };
  config.plugins = (config.plugins || []).concat([new NodePolyfillPlugin()]);
  return config;
};
