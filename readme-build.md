# package.json中的module字段：
为了在require时，找到入口文件
https://github.com/sunyongjian/blog/issues/37


# require和import
require：amd规范；运行时调用；复制和浅拷贝；module.exports导出
import: es6语法；编译时调用；添加引用；export导出
参考：https://www.cnblogs.com/wenxuehai/p/14246989.html

es6  用 import + export
node 用 require + exports
# cjs es esm amd 名词解释和原理
1) commonjs（require)：最早广泛应用在node
同步加载；运行时加载输出
加载es模块，需要import()方法+异步函数
2）es(import):浏览器和node13上可以用
编译时输出，异步加载
加载cjs：只能整体加载； ES6 模块需要支持静态代码分析，而 CommonJS 模块的输出接口是module.exports，是一个对象，无法被静态分析，所以只能整体加载
3）amd:同时支持cjs和ejs
不支持动态加载

# 编译工具中模块怎么做的
1）babel：
手册：
https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md

babel怎么实现import语法的？又怎么实现动态导入的（两件事）
使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require
babel怎么把es6转换成es5的？

## 编译(compiler)和打包(bundle)区别？
编译：语法转换（jsx，ts等转js）
打包：适配cjs esm ；以及做模块拆分管理

## vite
编译：esbuild做（go实现，并发执行，快）
打包：开发环境下不需要打包；生产环境用rollup
### 过程描述
1）初始化启动：esbuild编译源代码和依赖库，服务启动，客户端获取资源；依赖库缓存；js缓存
2）编辑更新，变更部分重新编译，推送变更部分，客户端更新变更block
3）初次访问：资源缓存在浏览器；以import为维度，在页面生成<script type="module">;

### 优点
不用打包 bundle
esbuild编译快
静态资源缓存

### 缺点
请求多
浏览器缓存，服务重启编译时间长
只支持esm（可以用polyfill，构造一个systemJs，支持esm写法）
（可以关注systemJs）

优化思路：
用serviceWorker缓存

### 原理
1）用esbuild做编译（语法转换）
devServer 冷启动时，会先进行依赖预编译。程序会扫描项目 html 入口文件，通过 esbuild 逐层查找依赖项，直到找出全部依赖的模块，然后对这部分模块进行预优化。如果这些模块是非 ESModule 模块化方案，那么预构建时会转换成 ESModule 统一标准格式。
存储到缓存目录node_modules/.vite

2）不处理es cjs兼容，放弃不支持esm的端；用浏览器esm能力自动引入模块
3）esbuild处理依赖仓库
4）浏览器缓存
5）热更新：http+connect；html中注入ws监听；文件有变更，计算变更内容，通知客户端；客户端拉新增变更，旧的废弃；
参考：https://zhuanlan.zhihu.com/p/512365282
tip：计算变更时向上遍历，如果向上没有，reload兜底

利用 HTTP 头来加速整个页面的重新加载，源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存


## webpack：模块管理
编译：webpack 引用多种插件loader实现
打包：webpack自己做

### 过程描述
1）初始化启动：从入口开始编译资源，打包，生成bundle，服务启动，客户端启动
2）编辑更新：走和初始化启动一样的流程；更新推送给客户端，客户端reload

缺点：初次访问，大量http请求发出；因为没有bundle，代码都是独立的。

### 原理
1）webpack的模块兼容（cjs&umd）；同步加载管理；异步加载管理
参考：
https://juejin.cn/post/6844903802382860296#heading-4

umd既支持es6又支持cjs；webpack打包不支持输出ejs，实际上应该有这个能力
因此webpack打包产物可以同时在浏览器和服务端执行

2）babel做词法转换
ts tsx等转换

3）loadable + webpack编译后的产物：
<!-- 
(self.webpackChunkbear_fe = self.webpackChunkbear_fe || []).push([
  [sourceMapInfo], 
  { num1: 当前组件内的代码块, num2: 组件引用的外部代码块}
  ]
) 
// 附加sourceMapUrl
-->
4）webpack的sourceMap作用

5）开发和线上对sourceMap的实践

6）HMR实现和应用：和vite一样的

7）treeShaking怎么做的？
7.1）收集所有export
7.2）从入口遍历运行时环境，为export打是否使用标记。
其中，sources 属性为模块经过转译后的结果；而 runtimeRequirements 则是基于 AST 计算出来的，为运行该模块时所需要用到的运行时
参考：https://mp.weixin.qq.com/s/nkBvbwpzeb0fzG02HXta8A
7.3）为7.2）中收集的没用到的添加dead code标识
7.4）uglify/terser压缩代码时，删除deadcode标识了的代码

## rollup
理念上 ，rollup 采取优化优先的策略，webpack 则是代码正确性优先；从而导致实现上的差异， webpack 依赖 package.json 中的 sideEffects 字段来判断 module 是不是有 sideEffect，如果 pcakage.json 没有写 sideEffects，webpack 则谨慎的认为这个包下的所有 module 都有 sideEffect；rollup 并不依赖 package.json 中的 sideEffects ，而是自己做了相对激进的 sideEffects 分析，Math.random() 这种 function 调用 rollup 认为是没有 sideEffect 的。

Rollup 通过 node-ressolve 插件也会识别 package.json 中的 sideEffects，再综合自己对 sideEffect 的判断，偏向于选择无 sideEffect。 Package.json 中申明某个文件有 sideEffect，但自己的判断没有，则认为没有 sideEffect。
若  package.json 中申明某个文件无 sideEffect，则认为无 sideEffect


# loadable原理

# esbuild角色？

# 其它 system

  - System是自执行挂载在global上面的，所以这里只能import然后直接从global上面使用
  - System导出的库，必须通过System.import来加载，这个加载是异步的
  - System.import并不会被webpack识别打包，import里面是模块的地址，支持相对路径寻址
  api文档可以参照https://github.com/systemjs/systemjs/blob/main/docs/api.md
其中system.register接口比较重要，参照https://github.com/systemjs/systemjs/blob/main/docs/system-register.md