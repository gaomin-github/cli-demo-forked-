# 最佳实践：
安装全局依赖：使用yarn install
安装依赖到root路径：yarn add -W packageA
安装依赖到单独package： lerna add xxx --scope package / yarn workspace packageB add xxxx
发布npm:  直接运行npm publish
运行script：yarn run xxx

# demo测试流程
1） tools btns modals无引用关系，更新tools只有tools版本更新了
2) 为btns添加tools的引用，发布btns
3) tools修改；version时 btns和tools版本都会更新

# 更新版本指令
yarn lerna version
yarn lerna from-package

# lerna
1）子包发布提示 402 ：设置为public
https://github.com/lerna/lerna/issues/1821
## 1）前置信息

 需要登陆 adduser; addUser和login的邮箱不能重复

## 2）安装lerna提示maximum 需要查看node版本和lerna版本是否匹配
参考：https://github.com/lerna/lerna/issues/3609

## 3）子包发布提示404

2.1）没有明显信息时， 可以检查一下npm group是否发布，@xxx 对应一个 npm group；应该先在npm上创建一个组织
2.2）子项目注册表配置
fetch PUT 404 https://registry.yarnpkg.com/@cli-demo-pj%2fbtns 777ms
lerna ERR! E404 Not found
处理：子包的package.json中publishConfig.registry = "https://registry.npmjs.org"
原因：用npm的registry发布
相关参考：
https://github.com/npm/cli/issues/1637
https://stackoverflow.com/questions/39115101/getting-404-when-attempting-to-publish-new-package-to-npm
https://github.com/lerna/lerna/issues/3812
https://github.com/lerna/lerna/tree/main/libs/commands/publish#per-package-configuration


 ## 4）lerna命令找不到

lerna命令找不到时，npm常会要求全局安装
避免全局安装的方式：npx
npm对包的执行不友好，只能通过 
  1. 全局安装 npm i xxx -g 然后执行包 xxx -v
  2. 找到对应bin目录 ./node_modules/eslint/bin/xxx.js -v
  3. 通过package.json的script来执行
      都比较繁琐
npx可单独执行包，可直接通过npx xxx -v来执行
npx好处主要是避免全局安装，比如：
$ npx create-react-app my-react-app
  4. 首先npx会创建下载一个临时的create-react-app
  5. 然后新建一个my-react-app后就删除create-react-app
避免安装更多的node模块。
