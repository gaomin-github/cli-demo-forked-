## 其它通用安全防御：
1）cookie 设置为httpOnly：cookie不支持被js读写
2）cookie 设置secure：只有https请求才会携带cookie

## CSRF(cross site request frogery)跨站请求伪造
攻击方式
1）攻击者自己做了网站，或利用xss；展示一个提交按钮，向官方站点发请求（删数据｜取款等）因为用户登录过官方站点会带cookie过去，能通过识别
预防：
服务端校验refer（但可以被绕过）
页面初始化生成token，提交表单时携带token

2）攻击者把官方网站嵌入自己的站点，用户点击页面，可能hi点击了官方站点的删除等
预防：
页面设置为不可嵌入（不支持放到iframe）：X-Frame-Options: deny
用CSP


## XSS（cross site script)
攻击方式：
1）发了一个官方网站链接，后缀js段；访问后js把官方账号信息发给恶意仓库
2）评论区发了一段地址链接评论，其它用户点入，执行之后的js，破坏用户官方dom结构
3）评论区输入异常信息，其它人访问到评论，js执行

### 通用预防方式：
1）用户的输入做转义；过滤；
2）用textContent替代 innerHTMl 等
3）浏览器CSP策略

### react下防御
 如果不要用dangerousHTML 框架已经处理了内容的转义
工程角度配置：
1）运行时：ies/filter-xss 运行时过滤不再白名单上的标签
2）编译时：ies/babel-plugin-filter-xss：做AST风险点识别，风险点中包裹运行时过滤API，自动防御
3）合入时，扫描代码
4）上线时，再扫描代码

### xss攻击代码分类
dangerouslySetInnerHTML
innerHTML
document.write
url相关的XSS
DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，<a> 标签的 href 属性，JavaScript 的 eval()、setTimeout()、setInterval() 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。


### 以上手段暂时不能预防，需要case by case的攻击分类
ssr模板拼接
使用dompurify
模板下发参数


<!-- 1. 开发阶段：
用户源代码中存在XSS攻击风险点【React.dangerouslySetInnerHTML】。
<div dangerouslySetInnerHTML={html}/>
2. 编译阶段：
- 运行时插件【@ies/filter-xss】会提供filterXSS 过滤实现。
- 编译时插件【@ies/babel-plugin-filter-xss】会将风险点包裹filterXSS。
<div dagenouslySetInnerHTML={filterXSS(html)}/>
3. 程序执行阶段：
- 页面渲染时，运行时【@ies/filter-xss】会在全局挂载filterXSS 。
- 攻击脚本<script>alert(1)</script> 作为数据输入，调用filterXSS 。
<div dagenouslySetInnerHTML={filterXSS('<script>alert(1)</script')}/>
- 使用filterXSS执行结果进行渲染，防御成功。 -->
<!-- <div dagenouslySetInnerHTML={'&lt;script&gt;alert(1)&lt;/script&gt;')}/>` -->