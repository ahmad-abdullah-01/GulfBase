module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@app': './src/app',
            '@theme': './src/theme',
            '@i18n': './src/i18n',
            '@services': './src/services',
            '@store': './src/store',
            '@components': './src/components',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@assets': './assets'
          },
        },
      ],
      'react-native-reanimated/plugin'
    ],
  };
};
