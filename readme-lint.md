# lint代码格式化
  ## 安装 eslint 相关包
  ## 新建 eslint 文件，package 内引用
  ## 新建 prettier 文件
设置好 prettier 规则之后，修改 vscode 配置，保存文件会按照 prettier 自动格式化
参考：
https://blog.csdn.net/s2422617864/article/details/122534362

## 搭配使用规则：
  prettier做代码格式（空格）校验，保存时自动化修改
  eslint做unused这类的提示，commit时提示
  原理参考：待补充

# lint staged校验
eslint是最新的ts相关校验，tslint已经逐渐废弃
1) 安装husky：控制git的生命周期

2）husky不生效：需要启用 参考：
https://blog.csdn.net/mrhaoxiaojun/article/details/124736650

3）husky是否生效测试：
3.1）有的版本在package.json中，增加 
"husky": {
  "hooks": {
    "pre-commit": "cho \"[Husky] pre-commit hello\""
  }
}

3.2) 有的版本在.husky文件夹（启用后自动生成）中
新建pre-commit 可执行文件内容：
echo \"[Husky] pre-commit hello\"

4） 安装lint-staged相关包，在package.json中配置lint-staged
 "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,less,json,md}": [
      "prettier --write"
    ]
  }

4.1) 验证lint-staged是否生效：在tsx里写一个try不带catch

# commit格式校验

