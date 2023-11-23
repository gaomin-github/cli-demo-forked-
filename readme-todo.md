内存泄漏复现处理一轮
怎么接入ci
mr中的ci
监控


自定义hooks和原生hooks生命周期区别？
然后刷状态机 请求实现 hooks都重写一次（hooks使用场景都做整理）

依赖注入框架：弹窗管理 react中的应用 vue2.0和3.0区别？

ejs cjs umd 几种格式在微服务中怎么工作的？


堆栈错误上报

changeset

# 其它题目：
node中循环引用问题

## props.childern

生命周期为什么不可靠了

route keepalive

## immer

proxy
https://toflying.com/2022/07/08/6-talk-about-es6-proxy/
reflect

要刷的知识点
BOM对象有哪些？
刷新页面的方式
iframe的顶层对象
vue中用到的设计模式
适配器模式和桥接模式
localStorage要封装吗（作用是什么）
接口请求慢怎么分析？
前端资源多大算合理？（和fmp时间有关，也和网络超时+占用有关）
performance几个颜色块分别代表什么？紫色render耗时长如何优化？
引起reflow和repaint的api


for循环1000次，组件更新多少次？
框架怎么知道生成虚拟dom的世纪？
构造函数？
让一个函数继承另一个函数？
this指向确定？
递归｜回溯｜循环
深拷贝实现？
快速排序远离？
正则匹配？
进程、线程、堆、栈
js单线程，怎么实现异步操作的？
rem是什么？怎么计算的？实现原理？移动端适配有几种方案？
1px问题
relative 偏离 原本空间会被影响吗？
浮动的副作用
原型和原型链
获取对象的原型
类型判断
new操作符实现原理
call apply bind
闭包和使用场景
es6场景新特性
set/map区别？
symbol是什么？用来做什么？
事件循环机制：js node
pm2原理？有哪些模式？
let const var区别
promise实现原理？
回调地狱是什么？为什么会产生？
promise.all远离
instanceOf原理？怎么实现？
控制元素的显示隐藏
calc计算乘除？
http握手
http状态码
302 301 307 304的区别？哪个seo更好？怎么用？
协商缓存 & etag last-modified区别
有强缓存，更新后怎么访问到最新文件‘
跨域怎么处理？
jsonp缺点？
base64和外链资源的应用场景？优缺点？
vue3相比2的提升
proxy和defineProperty对比？
sync修饰器作用
setState更新后和useState的区别？
Component和PureComponent区别
render什么时候渲染
createPortal使用场景？（历史探究）
react框架优化
类组件和函数组件区别？
事件绑定方式有几种？
React.refs作用


React lazy和vue路由懒加载比对？
react性能为什么强于vue？
双向数据绑定和单向数据流优缺点？
hooks局限性？
decorator作用？编译后效果？

移动端拖拽和web段区别？
for in/ for of区别？
对象被for of 遍历实现
链表反转怎么实现？复杂度？
链表添加、删除实现，复杂度多少？
移动端拖拽元素，怎么实现，优化？
不用promise实现第一个 第二个任务完成后再执行第3个
用发布订阅实现呢？
发布订阅和观察者模式的区别？ŒŒŒŒ
接口的六大设计原则？
防抖节流区别和使用场景？
判断图片进入当前视口？
ts泛型
webpack proxy原理？loader和plugin区别？(系统的描述)分包，动态加载的原理？module federation相关？

import().then之后得到的产物（模块化相关）

远程缓存 和 monorepo 的社区方案

进程、线程间如何通信
ajax和渲染页面是同一个进程吗？

http请求和tcp对应关系？

js 浮点数运算不精准？

min-width max-width width优先级
tls/ssl

es
1）set和map 特点区别


['1', '2', '3'].map(parseInt) 返回结果？怎么返回[1,2,3]

接口防刷新实现？

DOS DDOS攻击原理和防范？

JWT实现？

项目私有化定制

vue自定义指令
docker和k8s了解？

首屏秒开

不同源一定跨域吗？

fetch axios ajax区别？

spa优化

前端埋点

iframe 阻塞主页面load



协作图元素有哪些？
display怎么设置为inline

业务描述：工作流程 + 业务流程
性能指标采集
native离线化怎么保证资源不丢？过期策略？更新策略？
做npm 包一般产出什么格式，如何实现？
shaking原理和过程

useEffect实现原理
function组件如何保存状态？
promise异常捕获？

时间监听为什么常放在冒泡阶段而不是捕获阶段

移动端300ms延迟原因？怎么处理？

rem布局怎么实现？


# 系统的准备：
hooks写一轮
useInterval
https://sourcegraph.com/github.com/gaearon/overreacted.io@archive/-/blob/src/pages/making-setinterval-declarative-with-react-hooks/index.zh-hans.md
useDebounce
依赖注入写一轮
组件开发（弹窗｜选择器｜多选）
请求封装（并发限制｜请求缓存｜撤销｜异常｜重试｜容灾）
react源码（原理）
react中的优化写法
整理一套线上fps｜稳定性｜异常监控｜日志｜活跃度｜内存泄漏监控；日志上报
整理一套开发流程事件
中等常见算法题


性能优化整理

整理线上问题通用排查方案








ssr 列表/树，怎么取前两屏？

ejs和pageServer直出区别？
