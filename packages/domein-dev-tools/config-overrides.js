const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      'react': path.resolve('./node_modules/react'),
      "@": path.resolve(__dirname, "src"),
      "@actions": path.resolve(__dirname, "src/store/actions.ts"),
      "@components": path.resolve(__dirname, "src/components"),
      "@domains": path.resolve(__dirname, "src/app"),
      "@hocs": path.resolve(__dirname, "src/hocs"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@sdk": path.resolve(__dirname, "src/sdk"),
      "@state": path.resolve(__dirname, "src/store/index.ts"),
      "@store": path.resolve(__dirname, "src/store/")
    }
  };

  return config;
};
