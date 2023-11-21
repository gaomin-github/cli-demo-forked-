# 监控包含哪些模块？
白屏监控
请求监控
静态资源监控
异常监控
卡死｜崩溃监控
fps监控
pv uv
首屏监控

监控的作用：基于埋点的问题做链路排查
数据问题：查看请求达到｜是否正常（用logId）
接口正常，查看js异常报错；js有报错，根据sourceMap查看报错位置；
js没有报错，查看控制台报错；浏览器插件；



## 内存（泄漏）监控

## 监控数据上报
1）用xhr上报，服务端或许要跨域
2）不要在首屏rerender之前上报
3）数据批量上报
4）beforeunload前，没完成上报的数据，存在indexedDb中
## 监控数据设计：埋点的几大要素
事件
属性
属性值

## 监控的sdk组成：
收集
组装（包括公共部分参数初始化）
上报/发送管理
时间校准Plugin｜（notrequired)
流量限制Plugin
sdk实例：对收集｜组装｜上报做管理
## 白屏监控
摆平判断标准 = (dom节点少&图片判断是纯色屏) ｜ 异常文案 ｜ 相似度检测异常

1）截图判断
1.1） 页面load结束，如果有任何元素MutationObserver上报，证明没有白屏；如果load 2s左右，没有上报，截图，有可能是白屏了

1.2）为防止误报，遍历元素
从 document.body 或通过 rootSelect 指定根元素开始遍历 Dom 树，每次遍历到一个可见 Dom 元素累$$score = {1 \above{1pt} 2 ^ {depth - 1}}$$计一个分数：（depth 为该元素相对根元素深度）。当总分达到阈值（默认为 1.5）时停止遍历。

1.3）设置一个窗口期，2-8s，观察是否有时间上报，没有，上报白屏
首屏2s 非首屏8s
是否首屏：performance.now() - Date.now() < 10s 认为是首屏

2）格子标记：页面划分成格子（10*10），按照像素位置获取元素，判断元素是否为空
类似：p/span判断text是否有内容
其它，判断是否透明
按照格子点位对应的空白元素比例，判断是否白屏

3）白屏的原因
js加载｜解析
js过大，性能白屏
js执行异常
## 请求监控
在xhr前后，增加埋点；结合performance.getEntriesByType('resource')获取dnslookup时间，减少干扰

## 静态资源监控
1）资源异常：通过全局error 监听；静态资源加载异常不会冒泡到window,要设置在捕获阶段；
2）资源家在时间：用performance.getEntriesByType('resource') 方法获取，该方法返回当前页面从开始加载到当前时刻内的全部静态资源加载列表，其中既包括加载成功的资源信息，也可能包括请求失败的资源信息

资源监控要求浏览器支持 PerformanceResourceTiming，在浏览器不支持的情况下，不进行相关数据上报

## 异常监控（JS）
1）页面
1.1）监听全局 window.error：
跨域脚本，常捕获不到error.trace 需要在脚本上增加 crossorigin="anonymous"
1.2）监听 unhandledrejection：使用promise，发生了异常但没有catch时，onerror监听不到
2）组件
ErrorBoundary
3）异步
try catch
### 错误消息怎么拿
1）try catch 或 onError拿到errorObj；通过trace拿到编译后的错误堆栈信息；用sourceMap反解，拿到对应的原始代码

### 错误消息怎么使用
错误页面分类
js错误列表分类
按照error.message聚合 ｜ 按照errorType 和堆栈信息聚合
报错具体代码行展示（这个代码上怎么实现反解的呢？）

## 卡死|崩溃监控
崩溃的表现：页面看不到了，js不运行
卡死的表现：js鼠标｜输入｜focus没有响应
1. 崩溃监控方案
参考：https://zhuanlan.zhihu.com/p/40273861

1）利用beforeunload + sessionStorage
页面初始化，以sessionStorage为维度，增加标记；页面关闭，用beforeunload清除标记；如果页面卡死了，下次打开，标记还在sessionStorge，判断标记在（可以加一些时长判断）
1.1） 这种方案很依赖用户行为，用户如果不刷新，就会漏报
这样做了：页面打开，上报一个start点位；页面关闭，打一个end标记，start时一起上报；如果落单start对，说明有卡死发生
1.2）要考虑同一个域名，多tab卡死监控
1.3）为什么存在sessionStorage而不是localStorage?：要考虑多tab场景
2. serviceWorker心跳
打开页面，以sessionId为维度注册；SW间隔几秒向页面发送消息，页面发送keepHealth消息；SW没有收到，上报崩溃状态
页面关闭 beforeunload：SW取消注册

3. 卡死的原因：内存不足；死循环；假的卡死（被挡住了）
观察是否有基本的事件响应；观察内存；控制台等；

卡死很难监控，常作为bug上报

## FPS：响应时间>50ms就会觉得卡顿
页面初始化响应时间用：perfornamce duration判断
帧检测：帧数<30就会有卡顿感
静止下的页面，帧数都在60左右，上报没有意义；需要判断的是runloop的mode，获取一段时间帧数，放到数组，求均值

1. 收集方式：requestAnimationFrame收集时间段内fps数，以1000ms为一个任务；收集不同任务中fps由低到高占比；
例如：slowly: < 30
smoothly: > 50

2. 数据分析方式：
第一类收集：收集丢帧率

丢帧率 = 丢帧数 / 总帧数 或者直接检测当前帧数
收集原则：没必要全量，数据太多，资源浪费；用上报丢帧 ｜ 丢帧率 替代
总帧数：和设备刷新频率有关；android通常为60

第二类收集：收集帧数分布图（<30的分布；>50的分布）

## pv（page view） uv（unique view)
1）pv：需要给不同页面/路由/组件，用唯一标志区分
2）uv：要区分用户（结合用户ip，区域，硬件信息，浏览器环境等）给用户生成一个key，存在localStorage中

## 首屏相关数据收集
参考：https://juejin.cn/post/7097157902862909471#heading-12
tip：首屏信息可以先收集，延后上报(ttu之后）；避免影响ttu

初始化和切换中的几个指标：
### 1）FCP（first content painting) 
fp：浏览器渲染页面时首个像素绘制到屏幕上的时间点，首个像素的绘制不一定会引起视觉上的变化，默认背景和自定义背景色是同一个，视觉上无变化但事实上触发了 FP
fcp：浏览器首次绘制来自DOM的内容

1.1）1.8s以内，算良好的FCP
数据由谷歌定义，参考：
https://web.dev/first-contentful-paint/
https://web.dev/defining-core-web-vitals-thresholds/


一个良好的测量阈值为页面加载的第 75 个百分位数，且该阈值同时适用于移动和桌面设备。
参考：
https://web.dev/defining-core-web-vitals-thresholds/


1.2）数据怎么获取？
通过 performance.getEntriesByType('paint') 方法获取， FP和 FCP 就在其中
找到 name 为 first-paint 的对象，描述的即为 FP 的指标数据，其中 startTime 即为 FP 时间
找到 name 为 first-contentful-paint 的对象，描述的即为 FCP 的指标数据，其中 startTime 即为 FCP 时间

问题：要考虑兼容性

### 2）FMP（渲染过程元素增量最大的时间点：
performace暂时不支持；可以用mutationObserver自己实现

### 3）LCP FID 等

### 4）TTI（time to interactive）浏览器明确定义
tti：浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源


### 4）TTV(time to visit)；ttu（time to use)
是业务方结合业务实际情况自行定义的可见/可编辑时间，而后者是有明确定义的

ttu：可以埋在render组件中

### 微前段的首屏

1）load_app_time：子应用加载耗时时间
start：html里面的资源加载时间
end：js入口文件执行时间

2）mount_app_time：子应用入口，到render的耗时

3）TTFMP：页面核心元素加载及渲染完成的时间
在元素上绑定elementtiming='important-paragraph'
计算：用intersectionObserver实现

4）MFFP：子应用首次渲染的时间点（也是子应用开始加载的白屏时间）

5）MFFCP：子应用首次渲染内容的时间点
收集：mutationObserver回调，获取内容渲染时间

6）MFLCP：在 LCP 中从页面打开到渲染期间用户开始进行操作期间内最大的渲染元素作为 LCP 元素，但是在微前端场景中需要的最大元素为从微前端应用加载到微前端区域内最大的渲染内容

收集：用Element timing Api
https://wicg.github.io/element-timing/
