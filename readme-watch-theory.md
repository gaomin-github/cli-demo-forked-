


 ### RUM 指标，Navigation 指标的介绍和采集方式已经足够清晰。通常分为两个思路：
1. RUM (真实用户指标) -> 可以通过 Web Vitals （https://github.com/GoogleChrome/web-vitals）相关文档学习
2. 页面加载指标 -> NavigationTiming (ResourceTiming + DOM Processing + Load) 可以通过 MDN 相关介绍学习

### 数据洞察
如果你对“数据洞察/可观测性”这个概念有所了解，那么你应该对 Kibana 或 Datadog 这类产品有所耳闻。在 kibana 或 Datadog 中都能够针对每一条上传的日志进行详细的追溯。和详细的上下文进行关联，让用户的体验可被观测，通过多种筛选找到需要用户的数据

通过数据探索，我们可以针对用户上报的任意维度，对一类日志进行过滤，而不只是获得被聚合过的列表信息数据。这样的消费方式有什么好处呢？
1. 我们可以直接定位到一条具体日志，找到一个现实的 data point 来分析问题
2. 这种视图的状态是易于保存的，我们可以将找到的数据日志通过链接发送给其他人，其他用户可以直接还原现场

### 问题定位
页面的卡顿不一定仅仅发生在页面加载阶段，有时页面的卡顿会来自于页面的一次交互，如点击，滚动等等。这类行为造成的卡顿，仅仅依靠 RUM / navigation 指标是无法定位的。如果我们能够通过某种方式（在PPT中已经说明），对操作行为计时。并将操作计时范围内触发的请求，静态资源和longtask上报以同样的瀑布图方式收敛到一起。则可以进一步定位页面的“慢操作”，从而提升页面交互体验

### 品质判断
给页面的整体性能分数再制定一个基准分数，当上文所述的性能得分超过分数线，才认为该页面的性能水平是“达标”的。而整站整体的达标水平，则可以利用整站达标的子页面数/全站页面数来计算，也就是达标率，通过达标率，我们可以非常直观的迅速找到需要优化的性能页面

### 请求和资源监控
1）手动打点
对于 XHR 请求： 通过 hook XHR 的 open 和 send
fetch请求，则通过 hook Fetch

2） resourceTiming 采集
1. pageLoad 前：通过 performance.getEntriesByType 获取 resource 信息
2. pageLoad后：通过 PerformanceObserver 监控 entryType 为 resource 的资源

### ResourceTiming注意点

经常遇到前端请求上报时间极长而后端对应接口日志却表现正常的情况。这通常就可能是由使用单纯的打点方案计算了太多非服务端因素导致的。影响一个请求在前端表现的因素除了服务端耗时以外，还包括网络，前端代码执行排队等因素

我们如何从 ResourceTiming 中分离出这些因素?
1）Chrome 方案（阿里的 ARMS ）
将线上采集的 ResoruceTiming 和 chrome timing 面板的指标进行类比还原出一个近似的各部分耗时值
2）规范划分阶段

### 监控上报影响包体积？
1）监控代码异常加载
2）同步的加载一段精简的代码，在其中启动 addEventListener 来采集先于监控主要逻辑发生的错误。并存储到一个全局队列中
3）将 SDK 的框架逻辑做成平台无关的，而各个数据监控，收集方案都只是以插件形式存在，那么这个 SDK 完全是可插拔的，类似 Sentry 所使用的 integration 方案

# 怎么做分析？

# 监控异常隔离

1）按照模块try catch异常，做异常封装上报
当SDK产生异常时不会影响主业务的流程；
当SDK产生异常时进行数据的封装、上报；
出现异常后，中止 SDK 的运行，并移除所有的监听

# 服务端事件校对
1）http请求 response会带一个 服务器发送资源时的服务器时间(T)；也可以让带上在服务端的处理时间（serverHandleTime）；
2）前端可以模拟这个时间：
httpTime：链路传输时间
TInFront = fetchStart + httpTime + serverHandleTime

httpTime = (fetchEnd - fetchStart - serverHandleTime )/2

TInFront可以和T来做时间校正