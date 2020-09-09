/* config-overrides.js */

module.exports = (config) => {
  // add sass loader
  // allow global vars (https://stackoverflow.com/questions/44345881/using-webpack-to-prepend-variables-for-scss)
  // js sharing (https://til.hashrocket.com/posts/sxbrscjuqu-share-scss-variables-with-javascript)
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: "sass-loader",
        query: {
          sourceMap: false,
          prependData: "@import \"src/assets/scss/main.scss\";",
        },
      },
    ],
  });
  
  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            modifyVars: {
              "primary-color": "#ff1d58"
              // #101010 or #f6F6F7
              // #A5A7BD or #F3F5FA
            }
          }
        }
      }
    ]
  });

  return config;
};
