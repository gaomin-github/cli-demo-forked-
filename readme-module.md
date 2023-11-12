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
