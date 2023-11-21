
## 开发性能
1）写代码规范
保存用prettier，提交用eslint+lintstage 做check
2）commit：分支命名规范
3）本地用esbuild，加速代码转换；也可以直接用esbuild编译
4）开发时写单测，jest应用缓存
5）pnpm-lock 锁版本，避免依赖不知，冲突难定位
6）发测试包：平台打包，自动部署html到redis；
7）线上问题定位：sourceMap异步上传，查看源代码
8）合入做mrCheck lintCheck jest检测，meego状态检测；包体积检测；合入后自动发布；
9）大项目组件类，用storybook
