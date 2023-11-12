# 发包实践
1）进入packages/tools 编译 yarn tsc
2）根目录 lerna version 会自动识别有变更的包，之后打tag（git tag可以查看）;并更新package.json的version
3）根目录 lerna publish from-package会比对package中version和线上一致性
参考：
publish原理：
https://juejin.cn/post/6946504838834290695
version原理：
https://juejin.cn/post/6935765350067732516#heading-0

命令讲解和lerna.json配置
https://github.com/willson-wang/Blog/issues/97
版本更新讲解
https://github.com/txiejun/lerna-usage