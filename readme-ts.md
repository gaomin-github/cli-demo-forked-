2.eslint配置

# 2 lerna配置monorepo



# 1 ts
# 1.1）安装
#本地用npm i typescript -g 全局安装；
#sandbox用yarn add typescript@version 安装
# 1.2）初始化配置文件(生成tsconfig.json)
#本地：tsc --init
#sandbox: yarn tsc -init
# 1.3）ts-loader安装
#yarn add ts-loader@8.0.0 -d 
# 1.4）ts-loader配置到webpack中；修改entry
<!-- 
{   
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
        {
        loader: "ts-loader",
        options: {
            transpileOnly: true,
            happyPackMode: true,
        },
        },
        {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-react"],
        },
        },
    ],
}, -->

# 1.5）提示缺少ts安装包
<!-- Try `npm i --save-dev @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react' -->
# 1.6）提示jsx语法不可用：修改tsconfig jsx选项
<!-- 参考：https://www.typescriptlang.org/docs/handbook/jsx.html -->

# 1.7）提示tsx文件找不到，在webpack中配置resolve.extension
<!-- https://segmentfault.com/q/1010000040243658 -->

# 1.8）提示tsx导入 需要moduleFederation
<!-- 参考：
https://stackoverflow.com/questions/71463698/why-we-need-nodenext-typescript-compiler-option-when-we-have-esnext/71473145#71473145

https://github.com/vercel/next.js/issues/46078 -->

# 1.9）tsconfig.json配置关于 module和moduleResolution
<!-- module: 'esnext',
moduleResulution: 'node', -->

# 1.10）生成文件没有.d.ts
<!-- 需要在tsconfig中添加    "declaration": true, -->
# 1.11）生成文件没有.js.map
<!-- 需要在tsconfig中添加    "sourceMap": true, -->