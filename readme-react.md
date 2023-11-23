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

react工作过程描述

html调用js，执行react component render


## hydrate问题（解决方案）
1. 坑
https://zhuanlan.zhihu.com/p/33887159

# 初次执行
1）jsx用ast解析为 React.createElement;
问：解析用的什么？ReactElement和React.createElement关系？和fiber的关系

2）自顶向下构造节点，节点数据结构包括
父节点，第一个兄弟节点，第一个子节点

问：
1.1）构造树的算法是什么？
1.2）循环构造/循环和递归的过程区别？

3）对于类组件，发生了什么？
怎么订阅状态更新做rerender？

4）对于函数组件，发生了什么？函数组件如何保存状态？

5）render和真正的画出dom，区别是什么？

6）组件render顺序？一个组件render结束，父组件得到了什么？

# update

1）state变更，发生什么？
给组件打上update标志；
函数组件，遍历effectList，哪些对State有订阅，挨个执行（添加到执行队列），执行render


2）props变更，会发生什么？

组件执行生命周期

组件比对，记忆hooks链条


组件重新生成fiber树，

update的起点，是发生了状态变更的节点，还是根节点（怎么控制的？）
生成的fiber树是