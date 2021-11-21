const path = require('path');
const packagePath = path.resolve(__dirname, 'package.json');
const pkg = require(packagePath);

// React Styleguidist官网：https://react-styleguidist.js.org/
module.exports = {
  title: 'React 业务组件库',
  version: pkg.version, // 同上 使用 package.json 的 version
  usageMode: 'expand',  // 自动打开文档的缩放
  pagePerSection: true, // 是否每页一个组件显示
  styleguideDir: 'dist_docs',
  exampleMode: 'expand',  // 表示示例代码是否展开或者合上文档中代码示例的标签初始化状态，决定是否展开
  webpackConfig: require('./webpack.config'),
  components: 'components/**/*.jsx',
  // [2021.11.21]暂时先用 JSX 去书写，TS 暂时还不熟
  // components: 'components/**/*.tsx',  // 写入对应目录的文档
  // propsParser: require('react-docgen-typescript')
  //   .withCustomConfig('./tsconfig.json', {
  //     shouldRemoveUndefinedFromOptional: true,
  //   }).parse,
  verbose: true,  // 打印详细信息
  compilerConfig: {
    target: { ie: 11 },
    transforms: {
      modules: false,
      // to make async/await work by default (no transformation)
      asyncAwait: false,
    },
  },
  // 优化文档中的组件名
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath.replace(/index.jsx/g, ''));
    return `import { ${name} } from '${pkg.name}'`;
  },
  // 在使用 @version 时 使用 package.json 的 version
  updateDocs(docs, file) {
    if (docs.doclets.version) {
      const version = pkg.version;
      docs.doclets.version = version;
      docs.tags.version[0].description = version;
    }
    return docs;
  }
};
