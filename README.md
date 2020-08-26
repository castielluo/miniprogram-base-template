<img src="https://wx1.sbimg.cn/2020/08/22/3TwCD.png" width="100"  height="50"/>

# 轻量级的小程序脚手架

## Features
### 轻量化的状态管理器
* 进行渲染层storeView和逻辑层storeModel数据分离并单独响应式处理。降低不必要的渲染性能开销；
* 在每个页面实例维护变更store并整合属性，在实例生命周期onShow混入处理渲染数据的函数，极大降低即时性能开销；

### 统一管理的接口请求
* 把api文件夹独立出来，并分文件进行模块区分，比如有关用户的接口请求，统一在user.js文件里封装；
* 对接口请求进行劫持，注入公共头部及请求体参数；对处理结果进行统一错误处理；

### 配置文件
* config文件夹统一管理环境变量及公共配置项

### Gulp构建
* gulp分支引入了gulp通用构建任务，可以使用es6更多新特性和scss编码


## Todo
* 视图管道filter
* 更多的工具类

## License
[MIT](https://github.com/castielluo/miniprogram-base-template/blob/master/LICENSE.txt)

