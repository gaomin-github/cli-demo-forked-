# e2e
## 组成部分：

1）用例编写 执行
jest：执行时间短（用了结果缓存）;工具完善
mocha：启动速度快；执行需要集成工具；提供生命周期钩子【before,after]
getNumDiffPixels

2）控制客户端
puppeteer
playwright
cypress
testcafe

3）结果上报

## 采用的模式：
mocha启动，跑用例
puppeteer 创建页面对象
jest访问页面dom，以及做快照比对


## 实践经验
1）mock
纯ui展示，不mock接口
增删改查，做mock：请求拦截｜全局信息提前注入
2）操作原子化
选择｜点击｜判断常常有重复，抽取为原子操作
3）两个判断维度
节点是否存在判断
截图比对ui：涉及到截图的最好用mock，防止接口挂掉比对失败
截图对比的方式是像素对比，感兴趣可以去看看pixelmatch的对比算法。具体到代码中做的事情就是，mock接口，第一次保存截图并提交，后续对比时候找已有的截图做对比
https://github.com/mapbox/pixelmatch
4）e2e范围应该尽可能集中，不要引入外部业务｜截图
5）接入ci(webhook和pipeline)

## puppeteer
安装pupputeer的时候，会一起下载Chromium。如果你不需要下载Chromium, 可以使用 pupputeer-core


## cypress
https://docs.cypress.io/guides/core-concepts/introduction-to-cypress

基于mocha API 的基础上开发的一套开箱即用的 E2E 测试框架
- 不依赖前端框架，也无需其他测试工具库
- 配置简单，有 GUI 图形工具
- 只能跑chrome

demo：
1)安装（包不全，需要更多）
"cypress": "^9.2.1",
"cypress-image-snapshot": "^4.0.1",
"cypress-mochawesome-reporter": "^2.3.0",
"cypress-real-events": "^1.7.0",
"@types/cypress-image-snapshot": "^3.1.6",

2）配置json文件（指定环境，浏览器大小，全局信息）
const cypressConfigContent = readFileSync(path.resolve(__dirname, '../cypress.json'), 'utf8');
3）打开页面 
cyPromise = cypress.open(merge({}, cypressConfig)) 
4）在then和catch中采集成功失败信息
5）覆盖率采集
scripts中添加
"coverate": “npx nyc report --reporter=text-summary"
## play

## testCafe
## webDriver
https://chromedriver.chromium.org/


# ui
1）testing-library 
@testing-library/jest-dom": "5.16.5",
"@testing-library/react": "12.1.5",
"@testing-library/user-event
关注渲染生成的dom结构，以及用户交互，不在意具体的实现细节
- 可以理解为都是深渲染

2）enzyme
- 暴露了组件实例，可以直接获取组件方法和state进行测试
  - 缺点：测试代码依赖组件实际实现
- 不过enzyme也可以获取dom元素，进行测试，同时使用 simulate 模拟出发用户交互事件
是基于组件测试的，提供了 shadow render 和 deep render 两种方式

https://articles.wesionary.team/react-testing-library-vs-enzyme-afd29db380ac

# jest接入
1）npm install --save-dev jest
2) 如果适配ts：pnpm i --save-dev ts-jest@24.0.2    
3）test.ts报类型错误：pnpm i @types/jest@26.0.22    
4）生成jest.config.js：yarn jest --init 
5）如果需要测react组件：pnpm i @testing-library/react@12.1.5     
6）script中增加 test指令
7）如果测试代码依赖到BOM，DOM，比如读window，相对便捷的做法是引入jsdom环境，在启动上会稍有耗时（相比项目依赖，这个耗时可以忽略，大概1-2s

## jest怎么写
util(jest)
async
mock
window
react component（enzyme| react-dom/test-utils | react-test-render)
react-cli：（redux，selector)
snapshot




