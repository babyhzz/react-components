# PC 端 React 组件库


## 技术栈

- 基于 react + antd 的业务通用组件库，使用 rollup 打包
- 基于 react-styleguildist 和 webpack 的文档站建设

## 组件开发

新组件以文件夹形式统一放到 `components` 下，最终在 `components` 下的 `index.ts` 文件中导出

利用 plop 工具快速生成组件文件夹，会根据模板文件生成以组件命名的文件夹，同时修改`components` 下的 `index.ts`

```
yarn plop <ComponentName>
or
npx plop <ComponentName>
```

## 调试、开发组件库启动文档服务

```
yarn doc
or
npm run doc
```


## 文档打包

```
yarn build_doc
or
npm run build_doc
```

可以打包后部署到 gitee pages 上 [戳这里看](https://xxxxx) 添加 GitHub Actions 持续集成 提交自动部署

## 五、组件库打包

```
yarn build
or
npm run build
```

## 六、发布前准备

1. 首先确保已经登录 npm 账号并且拥有发布权限
2. 生成版本号、打 tag 和生成更改日志，其他用法详情见[standard-version](https://github.com/conventional-changelog/standard-version)

```
yarn release -- --release-as <版本号>
# Or
npm run release -- --release-as <版本号>
```

成功之后把 tag 推到远程

```
git push --follow-tags origin master
```

## 七、发布到 npm

如果之前没有登录过 npm 的话，需要先登录再执行发布命令。放到 npm scripts 里 pub 命令，其实就是打包和发布的组合命令，执行发布之前先打包文档部署。或者不想要部署文档就直接执行发布命令好了

```
yarn pub
or
npm run pub
```

## 八、组件库使用

1. 确保项目安装了 `antd` `react` `react-dom`
2. 直接 npm 安装使用包

tips: rollup 打包已经实现按需引入，无需引入插件

## 单元测试

```
yarn test
or
npm run test
```
