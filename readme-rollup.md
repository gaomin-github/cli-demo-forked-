# 安装相关插件
pnpm i rollup@2.70.2 rollup-plugin-filesize@9.1.2 rollup-plugin-multi-input@1.3.1 rollup-plugin-postcss@4.0.2 rollup-plugin-progress@1.1.2 rollup-plugin-typescript2@0.32.1 @rollup/plugin-babel@5.3.1 @rollup/plugin-commonjs@22.0.0 @rollup/plugin-json@4.1.0 @rollup/plugin-node-resolve@13.2.1

## rollup启动报错（不知道原因，但是错误处理好了？）
1）包找不到：（预期安装到根目录的devDependencies去根目录node_moduels找
2）Unresolved dependencies 照抄引用的包，重新安装

# stories文件夹被打进去
修改tsconfig include字段去掉stories

# 打包的文件非常复杂，看起来把react打包进去了
修改rollup.config 在external中轮询，peerDependencies不打包
1）项目中直接引用安装包，寻址规则：在node_modules找，没找到再去上级的node_modules找
2）peerDependencies：外部环境有安装包，优先用外部环境的包，作为预防在dependencies中也要添加
参考：
https://docs.qq.com/aio/DSHhTeUdpR2dqVlZv?p=JH7SRpMxgylyA3H62ugn6W


