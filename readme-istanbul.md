## 代码覆盖率集采（插桩）
istanbuljs：https://github.com/gotwarlost/istanbul
nyc：https://github.com/istanbuljs/nyc

- 编译时插桩，即在代码转译过程中插入覆盖率采集代码，产出代码本身即拥有采集能力，譬如babel-plugin-istanbul，前端采用方式
- 运行时插桩，即产出代码本身不具有采集能力，在运行时插入采集代码， 适用 nodejs 环境
权限的组件库指南采用编译时插桩的方式，cypress不提供代码插桩的能力，但提供统计能力
