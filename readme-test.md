# e2e
(puppeteer)











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

## jest怎么写
util(jest)
async
mock
window
react component（enzyme| react-dom/test-utils | react-test-render)
react-cli：（redux，selector)
snapshot




