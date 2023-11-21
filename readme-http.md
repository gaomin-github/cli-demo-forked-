tcp 握手
ssl 握手
http 缓存
https 原理

## cdn 动态资源加速


## 请求cdn资源流程
client -- dns解析 -------->  权威cdn
          <-----caname-----
          -----cname-----> cdndns
          <----cdn边缘ip--- cdnDns
          ------request---> cdn边缘ip ---------> 中间源机 ------> cdn源站
          <------------------缓存-----------------缓存------------cdn源站
          
