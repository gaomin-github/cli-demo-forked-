
1）只跑白名单里的测试：配置 testMatch，语法是 micromatch
https://jestjs.io/docs/configuration#testmatch-array-string
https://github.com/micromatch/micromatch

2）覆盖率
collectCoverageFrom 和 coveragePathIgnorePatterns 配置哪些文件要测覆盖率
（一个是 micromatch，一个是正则）

coverageThreshold 配置如果某个模块某个方面的覆盖率不足多少，则认为测试不通过
- 其语法是 { '路径': 覆盖率配置 }。global 路径表示 others 的覆盖率数据，即除去包含下面写明的模块，其他模块的覆盖率。
- 非负数的意思是覆盖的百分比，负数的意思是最多允许多少没覆盖的分支/函数/行数/语句数

3）每个测例超时
配置 globals['ts-jest'].timeout；globals['ts-jest'] 是用来配置 ts-jest 的

4）编译/转码
transform 配置某种文件要交给什么编译器/转码器
transformIngorePatterns 配置哪些文件不需要转码，可以节省编译时间

5）moduleNameMapper 配置全局的路径映射，即 webpack 的 alias，tsconfig.json 的 paths
同时可以用来全局地 mock 一些模块
https://jestjs.io/docs/configuration#modulenamemapper-object-string-string

6）全局变量
'ts-jest' 是配置 ts-jest 用的，参考 https://kulshekhar.github.io/ts-jest/user/config/

7）如果我在写某个模块的测试，只想关注某个模块每个文件的覆盖率：
使用命令行选项 --collectCoverageFrom=，后面跟的是想收集覆盖率的业务代码的（不是测试文件的） glob 表达式，不需要 <rootDir> 和 ./
yarn jest:coverage test-file-regexp --collectCoverageFrom='src/helpers/*'

8）突然出现 xxx is not a function/read property 'xxx' of undefined
很可能是循环引用导致的，例如
临时方案：在 .test.ts 文件中提前 import 循环链中的某个模块，有可能避免出错。例如上图中的报错可以在 .test.ts 中提前 import 'src/api/index.ts' 暂时解决。很多时候 import '$store' 也能解决

9）如何打断点调试
利用 Node.js 的 inspector API。
https://nodejs.org/dist/v10.7.0/docs/api/debugger.html#debugger_v8_inspector_integration_for_node_js

9.1）把 jest 改成 node --inspect node_modules/.bin/jest --runInBand --config ./jest.config.js

--inspect 可以换成
- --inspect-brk 执行第一句代码前暂停，便于打好断点再执行
- --inspect=9000  debugger 监听 9000 端口（默认是9229端口）
参考：
https://nodejs.org/dist/v10.7.0/docs/api/debugger.html#debugger_v8_inspector_integration_for_node_js
 
9.2）- 选 Chrome 作为客户端，以访问 chrome://inspect，在 Remote Target 里找到那个 ws 连接，点开调试器即可

9.3）- 选 VSCode 作为客户端的同学可以配置 launch.json，添加 attach 的配置，保存，然后点开始调试即可
{
      "type": "node",
      "request": "attach",
      "name": "Attach",
      "port": 9229,
      // 测试退出后，自动尝试重连 debugger，本地短时间内修改测试后再跑一次的时候比较有用
      "restart": true,
      // 连接 debugger 的超时时间，可以设得很长
      "timeout": 100000000
    }

