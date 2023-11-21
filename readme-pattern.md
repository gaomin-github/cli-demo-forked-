# 依赖注入？
把依赖公共部分抽象（增加复用性）
https://juejin.cn/post/6951269906629427236

# IOC 控制反转
## 什么是？
举例说明：Class A使用了Class B，A不需要直接new来获得B对象，将定位B的具体实现的权利转交给了第三方（如依赖注入容器），自己只管使用。

A 只负责调度，B有就调度B，B没有就不响应？
## 怎么用
以弹窗控制为例：
modalService：弹窗新增删除；打开关闭弹窗时更新ui；
modalManager：接受弹窗事例/组件登记，同步到modalService中；监听弹窗关闭打开，发给service
modalRegister：轮询实例，登记到manager

好处：
1）modalManger不用关心具体的弹窗实例，登记什么注册什么
2）modalManager打开关闭监听，只去注册表触发
3）弹窗展示列表ui由service维护

## ioc好处：
管理器和实例解耦，没有明显依赖；
管理器改动方便了