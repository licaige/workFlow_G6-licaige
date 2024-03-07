const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "jw",
    projectName: "react", // @jw/react
    webpackConfigEnv,
    argv,
  });
  delete defaultConfig.externals; // react 和 react-dom 就打包到当前项目中
  return merge(defaultConfig, {
    devServer:{
      port:3000 // react 项目
    }
  });
};


// 原生的webpack 配置