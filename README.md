<img src="https://raw.githubusercontent.com/castielluo/miniprogram-base-template/master/assets/logo.png" width="100"  height="50"/>

# 轻量级的小程序脚手架

## Features
### 轻量化的状态管理器
* 进行渲染层storeView和逻辑层storeModel数据分离并单独响应式处理。降低不必要的渲染性能开销；
* 在每个页面实例维护变更store并整合属性，在实例生命周期onShow混入处理渲染数据的函数，极大降低即时性能开销；
* 丰富的store文件注释，友好的二次开发体验^_^
* 更小的状态管理器体积

全局状态分为两块，分别是storeModel和storeView，其中storeView存放和渲染相关的数据，比如要在wxml里进行wx:if判断渲染的数据，如isLogin；而storeModel存放纯粹在js文件里进行逻辑处理的数据，如openid。   
全局状态以两种方式可以获取，分别是引入store以及使用页面实例进行获取，其中页面实例获取方式为this.data.storeModel和this.data.storeView。   
需要追踪改变状态，可以在mutation.js里进行注册，然后在页面业务需要处进行触发。除了全局状态，还可以做消息中心，注册方法aHu.on(),触发方法aHu.emit(),注销方法aHu.off(). 

``` 
// store.js
// 可仿照UPDATE_USERINFO编写业务mutation
import aHu from './aHu'
import store from './store'

const initMutation = () => {
  // 更新用户信息
  aHu.on('UPDATE_USERINFO', (payload) => {
    store.storeView.userInfo = payload
    wx.setStorageSync('userInfo', payload)
  })
}
export default initMutation

// 触发用户信息修改
aHu.emit('UPDATE_USERINFO', content)

// 注销该事件
aHu.off('UPDATE_USERINFO')
```
### Gulp构建
* 引入gulp通用构建任务，可以使用es6更多新特性和scss编码
* 压缩文件，更小的小程序包体积
* 使用方法：在根目录下执行npm i，然后使用npx gulp pro执行构建任务，即可查看dist文件夹下的文件。建议将dist文件夹设置为微信开发者工具的项目根目录，开发的时候可以使用npx gulp watch进行即时构建。
```
npx gulp pro
npx gulp watch
```

## 接口说明
首先可以在apis/内新增接口模块，如已有模块，直接新增在该模块内。如新增用户紧急联系人接口，可在apis/user.js内新增。   
如果新增了模块，在apis/index.js里导入并统一导出。    
使用api接口方法如下
```
import api from '../apis/index'

// 不建议在实例中顶部解构 容易循环错误
// const { user_login } = api 

api.user_login({
  data: {
    // ......
  },
  success: ({ code, content, message }) => {
    // ......
  },
})
```


### 配置文件
* config文件夹统一管理环境变量及公共配置项

### 目录说明
- apis 接口分模块统一管理
- config 小程序配置文件，可区分环境变量
- pages  存放页面文件
- service  存放公共的业务逻辑代码
- store  状态管理库及相关文件
- utils  存放第三方库及格式转换等工具类库


## service说明
service主要存放公共的业务逻辑代码，如用户授权模块，地理服务模块等。

## Todo
* 视图管道filter
* 更多的工具类

## License
[MIT](https://github.com/castielluo/miniprogram-base-template/blob/master/LICENSE.txt)




--- 罗泽学 2021.4.12
