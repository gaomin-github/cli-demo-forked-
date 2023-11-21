# 线上资源部署（性能｜容灾｜安全）
部署：html放在redis上，其它部署在cdn上；html访问哪个cdn资源，由控制访问的服务动态分配
${fileUrl}/static 的形式

- HTML 用 Goofy Web 部署，是覆盖式的部署。需要在 Goofy 平台手动创建项目
- JS、CSS 用 CDN 托管，是非覆盖式的部署。在 SCM 平台勾选配置即可进行快速部


# 静态资源cdn容灾怎么做的？
1. 监听资源加载onError，创建一个新的 script 换成新的cdn地址
2. 全局监听 onError，做法同上
3. 用cdn融合，在原有的请求中替换cdn地址

1）在应用入口模板中引入cdn兜底逻辑（ejs插入公共逻辑）
2）静态资源上增加事件
 <!-- <script ${fileUrl}/static/ onerror={} -->
3）异步加载的资源js
webpack中用plugin，代理所有js资源加载，在这里做cdn retry
4）动态加载的css：
用
<!-- 
new MiniCssExtractPlugin({
  filename: function({ chunk }) {
    if (chunk.name === INDEX_MERGED) {
      return `${paths.RESOURCE_BUILDE_PATH}css/[name].css`;
    } else {
      return `${paths.RESOURCE_BUILDE_PATH}css/[name].[contenthash:8].css`;
    }
  },
  chunkFilename: `${paths.RESOURCE_BUILDE_PATH}css/[name].[contenthash:8].chunk.css`,
  ignoreOrder: true,
  insert: function (linkTag) {
    const oldLinkTabonerror = linkTag.onerror;
    linkTag.onerror = function () {
      typeof oldLinkTabonerror === 'function' && oldLinkTabonerror(e);
      const fullhref = linkTag.href;
      if (window.staticCDNErrorHandler && window.tryToLoadBackupCdn) {
        window.staticCDNErrorHandler(fullhref, 'link');
        window.tryToLoadBackupCdn(fullhref, 'link', true, resolve);
        return;
      }
    };
    document.head.appendChild(linkTag);
  }
}),
-->
# 线上debug sourceMap
1）Sourcemap 2011 标准定义了一种格式，用于将压缩后的 JavaScript 代码映射回原始代码。标准的核心是一个 JSON 文件，该文件包含了以下信息：
- 压缩后的 JavaScript 文件的路径和内容。
- 原始 JavaScript 文件的路径和内容。
- 映射信息，包括每个压缩后的代码位置与对应的原始代码位置。

2）编译文件末尾会添加sourcemap映射源， 当现代浏览器看到该sourceMappingURL指令时，它们会从提供的位置下载源映射，并使用内部的映射信息来验证正在运行的客户端代码与原始源代码。

3）浏览器仅在开发人员工具打开时下载并应用源映射。对于普通用户来说没有性能影响。

参考：https://blog.sentry.io/debuggable-javascript-with-source-maps/

4）webpack关于sourcemap的生成配置
./webpack-sourceMap-config.png

5）sourcemap生成影响打包速度：单独起一个异步的sourcemap打包任务



# 怎么操作，能访问到编译前后的的代码 来debug
1）sourceMap上传服务器（内部）；（打包的资源sourceMapurl信息也要写服务器对应映射）

# 怎么根据错误，定位到相关代码段
根据error.stack（参考sentry）获取报错的上下文代码列表
列表中的每个文件，关注执行的代码行｜函数名；每个文件都是一个单元，按照结构嵌套
git blame 和commit定位开发人员
定制预警指标