# react

## 心智模型
https://juejin.cn/post/7241813423461515323
关注点：没有生命周期，数据变化触发响应

## 代数效应
新的语法思维

搜索实现：切换tab，变更搜索条件后，需要手动触发搜索吗？

## error boundary
https://github.com/HuJiaoHJ/blog/issues/12
1）用法：在组件外用 异常捕获组件包裹

异常捕获组件：componentDidCatch 捕获异常，按照异常渲染兜底

2）捕获哪些？
render异常
生命周期
构造函数

原因：用的try catch实现的；源码中tryCatch加载了renderRoot 和commit上，所有只有这两个阶段会抛出


3）不能捕获哪些？
处理函数
setTimeout
errorboundary自己抛出的异常
服务端渲染

4）函数组件怎么抛出？
