# 包体积监控+分析+优化

## 引起包体积增大的原因
1）重复/无用导入
2）包升级
3）webpack分包异常
4）treeShaking失效
对于【不合理引入】我们可以使用【查询某个模块为何被引入】通过分析依赖关系直接定位
对于【webpack 分包导致体积增大】，这个时候第一步找到变化的模块是什么（可以通过【比较指定 chunk group 里的文件增减情况】或者 source-map-explorer 的 html 产物），第二步使用【查询某个模块为何被引入】，我们可以开两个窗口一个显示当前 MR 的module graph，一个显示target branch 的module graph，对比这个模块前后的依赖 graph 的变化，这个时候我们可能会发现这个模块多了几个依赖方或者少了几个依赖方
参考：
https://webpack.docschina.org/guides/tree-shaking/
https://cn.rollupjs.org/introduction/#tree-shaking
https://cn.rollupjs.org/configuration-options/#treeshake

5）polyfill引入冗余代码
  polyfill全局替换，为全局添加了方法
  解法：动态引用（polyfill-runtime）取代全局替换
- https://babeljs.io/docs/babel-preset-env 根据项目配置browserslist 自动执行语法转换和 polyfill。
- https://babeljs.io/docs/babel-plugin-transform-runtime 

## 优化的写法
1）只import必需的
bad: import * from
good: import { } from 

2）动态导入加载

3）分端｜环境；只用必须的代码

4）异步依赖注入（没太理解）

5）Tree shaking默认是保守的，因为代码中可能会存在副作用。如果确信代码中无副作用，可以通过类似/*#__pure__*/或者配置sideEffects来实现去除

## rollup 分析
rollup-plugin-visualizer

## webpack 分析

1）提交，打包

2）生成stat.json
stat.json中包含：chunkName,chunkSize, chunkGroup(depend的chunk集合)

3）体积比对在build ci中发生，
targetBranch体积获取方式：
 3.1）获取目标分支包体积：build时有target_branch 来获取stat.json
 3.2）目标分支通常是主分支，有新合入时，包体积常会自动存入db

4）根据写死的影响首屏的chunkListName，遍历比对体积变化
tip: chunkList的文件名常常是filename_hash，根据名称比对时要去hash

5）所有文件，做增减，体积变更比对

6）首屏体积增长符合预期，合入target分支合入后，自动打包，包体积埋点上报，建立监控

7）包体积用专用的打包命令和平台，生成html（bundle-analyze)

8）stat.json可能会太大，node下无法读取（用stream而不是string）

  <!-- const writeStream = fs.createWriteStream(filename, { flags: 'w' });
  const jsonStream = new JsonStreamStringify(Promise.resolve(statsJson));
  jsonStream.pipe(writeStream);
  jsonStream.on('end', () => resolve(true)); -->

