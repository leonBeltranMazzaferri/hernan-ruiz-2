// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ESTE PLUGIN ES VITAL para Reanimated y debe ser el último
      'react-native-reanimated/plugin', 
    ],
  };
};