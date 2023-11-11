# 接入步骤
1）初始化：npx storybook@6.5.8 init 
生成.storybook 和 assets文件夹
package.json下生成storybook指令

2）安装cross-env

3）修改运行指令

4）stories.tsx不支持tsx问题处理
在.stories/main.js中增加配置bable部分
react版本从16.9 降到16.3
重新安装

5）init失败或者启动提示node_modules任何问题，调整storybook相关和react版本

storiybook工作原理：

基于webpakck + vite
https://juejin.cn/post/7273025863981973504#heading-2
