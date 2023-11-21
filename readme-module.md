# 用tsc编译的工具函数 指令可以指定用ejs/cjs
"build:esm" : " tsc --module es2015 --target es5 --outDir dist/esm " ,
"build:cjs" : " tsc --module commonjs --target es5 --outDir dist/cjs " ,

# 需要loader等tsc无法完成的，webpack不支持编译为ejs，替换成rollup

webpack情况参考：
https://stackoverflow.com/questions/65781464/outputting-library-as-es6-module-with-webpack

webpack原理参考：
https://blog.csdn.net/cc18868876837/article/details/115468351

webpack的esm输出插件（还没用）
https://juejin.cn/post/7006333039085092901


esm和cjs区别，使用场景？为啥webpack不支持还能跑？
区别：
https://juejin.cn/post/6974404976022192141
更深的探究：
https://blog.csdn.net/cc18868876837/article/details/115468351






## 锁版本


# npm
package-lock.json和 package.json冲突时以package.json为准

- 1）缓存结构 
  - npm 安装依赖后通常会在用户目录下 .npm/_cacache 里进行缓存，内容如下：
    - content-v2 存储tar包的缓存
    - index-v5 存储tar包的hash，根据lock文件中 intergrity, version, name 生成唯一key，对应该目录中缓存记录，从而找到 tar 包的 hash
- 2）缓存命令
  - npm 命令
    - npm cache clean: 清除缓存, 为了保证缓存数据的完整性, 一般会加上--force参数
    - npm cache verify: 验证缓存数据的有效性和完整性, 清理垃圾数据   

# yarn
yarn会基于使用频率确定谁该被安装在根目录，npm则是优先安装的依赖版本提升（npm可以通过 npm dedupe 实现该功能）。都没从根本上解决重复安装的问题，因为只能提升某包的一个依赖版本。
package-lock.json 自带版本锁定和依赖结构，一旦依赖改动影响范围较大，yarn.lock 只包含版本锁定，并不确定依赖结构，需要结合 package.json 确定依赖结构
1）缓存结构
  - yarn 缓存按照平铺形式生成，可以通过 yarn cache dir 查询缓存目录，内容包括压缩包、.yarn-metadata.json、解压文件、bin文件等，条目命名规则遵循 {slug}/node_modules/{packageName} ，其中 slug 由版本、哈希值、uid构成

2）缓存命令
  - yarn cache clean: 清理缓存
  - yarn cache ls: 列出当前缓存的包的列表
  - yarn cache dir: 显示缓存的目录
  - yarn config set yarn-offline-mirror ./npm-packages-offline-cache 设置离线镜像目录，通过设置 yarn config set yarn-offline-mirror-pruning true 保持目录及时更新



# pnpm 三层寻址
参考：
https://zhuanlan.zhihu.com/p/553804414

安装目录：
所有版本，和版本diff内容，存储在全局 .pnpm_store
目的：跨项目共享安装包
每个项目下有.pnpm目录，打平依赖仓库结构 硬链接到全局
依赖内的文件，只能访问自己的node_modules安装包，软链到.pnpm

1）依赖内访问，访问自己package.json中声明的node_moduels
2）以软链形式访问到项目根目录的node_modules
3) 项目根目录硬链到全局.pnpm_store

## 依赖幻影：

影依赖是指，项目代码引用的某个包没有直接定义在 package.json 中，而是作为子依赖被某个包顺带安装了。代码里依赖幻影依赖的最大隐患是，对包的语义化控制不能穿透到其子包，也就是包 a@patch 的改动可能意味着其子依赖包 b@major 级别的 Break Change。

正因为这三层寻址的设计，使得第一层可以仅包含 package.json 定义的包，使 node_modules 不可能寻址到未定义在 package.json 中的包，自然就解决了幻影依赖的问题。

## pnpm-store
硬链接的地址不是npm包源码，而是基于内容的hash文件；版本升级，也只需存储改动diff

## pnpm install发生什么
检查.npmrc配置
罗列依赖版本组合
store中没缓存就去下载
store有缓存，硬链接store到.pnpm
内部依赖通过软链，放到自己的node_modules下
项目直接依赖通过软链，放到根目录node_module下
更新pnpm-yaml

## .npmrc作用
在.npmrc中新增，依赖项会被强制提升到根目录（子模块不安装依赖，也可以访问）


