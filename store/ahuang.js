import store from './store'


const ahuang = (options) => {
  _init(options)
  handError()
  initPlugin()
}

const _init = (options) => {
  // 判断路由队列
  if (!store.routeToVm) {
    store.routeToVm = {}
  }
  let user_onLoad = options.onLoad
  // reset option onload
  options.onLoad = function(e) {
    let vm = this
    // 先判断是否已被响应式处理
    if(!_isObr(store)) {
      // 如果没有响应式 将未响应处理的数据挂在_noOb上
      store._noObView = JSON.parse(JSON.stringify(store.storeView))
      store._noObModel = JSON.parse(JSON.stringify(store.storeModel))
      // 挂载 storeView会在页面展示 修改需调用setdata
      options.data.storeView = JSON.parse(JSON.stringify(store._noObView))
      options.data.storeModel = JSON.parse(JSON.stringify(store._noObModel))
      // 响应式处理
      observer(store.storeView, 'storeView')
      observer(store.storeModel, 'storeModel')
    } else {
      options.data.storeView = Object.assign({}, store._noObView)
      options.data.storeModel = Object.assign({}, store.storeModel)
    }

    
    vm.store = store
    // onload时将实例插入队列
    store.routeToVm[vm.route] || (store.routeToVm[vm.route] = [])
    // *** 需检查栈里两个同样页面时 vm重复还是怎样
    store.routeToVm[vm.route].push(vm)
    // setdata *** 需检查再次进入页面是否重设 如是 则不必在set里遍历
    vm.setData(options.data)
    // 调用传入的onload
    user_onLoad && user_onLoad.call(this, e)
  }
  // 调用Page
  Page(options)
}

// 是否拥有_ob
const _isObr = (data) => {
  return data.hasOwnProperty('_noObView')
}

// 响应式处理
const observer = (data, type) => {
  _walk(data, type)
}

// 递归遍历
const _walk = (data, path) => {
  Object.keys(data).forEach(item => {
    if (Object.prototype.toString.call(data[item]) === '[object Array]') {
      // 是数组 重写原型方法
    } else if (typeof data[item] === 'object') {
      _walk(data[item], path + '.' + item)
    }
    _defineReactive(data, item, path, data[item])
  })
}

// 设置响应式 最后一个val防止死循环栈溢出
const _defineReactive = (data, key, path, val) => {
  Object.defineProperty(data, key, {
    get: function() {
      // console.log(key, path)
      return val
    },
    set: function (value) {
      /* if (typeof value === 'object' && Object.prototype.toString.call(value) !== '[object Array]') {
        value = JSON.parse(JSON.stringify(value))
      } */
      console.log(value)
      // 更改并遍历store.routeToVm
      console.log(key, value, val, JSON.stringify(val) === JSON.stringify(value))
      // *** 检查字符串和数组情况
      if (JSON.stringify(val) === JSON.stringify(value)) return
      // 设置store.storeView或store.storeModel
      val = value

      // 设置store类型
      let type = path.startsWith('storeView')

      // 设置noOb
      let noObView = store._noObView
      let noObModel = store._noObModel

      path.split('.').forEach((item, index) => {
        if (index > 0) {
          type ? noObView = noObView[item] : noObModel = noObModel[item]
        }
      })
      type ? noObView[key] = JSON.parse(JSON.stringify(value)) : noObModel[key] = JSON.parse(JSON.stringify(value))

      // 重新设置的对象需要响应式处理
      if (typeof value === 'object' && Object.prototype.toString.call(value) !== '[object Array]') {
        _walk(val)
      }

      Object.keys(store.routeToVm).forEach(item => {
        // 除了当前路由 其他页面的setdata分别插入他们的onshow里执行 防止性能开销过大
        // ***
        store.routeToVm[item].forEach(vm => {
          // 更深层的路径要walk里找到
          let dataSign = `${path}.${key}`
          console.log(dataSign, value, vm, path)
          if (type) {
            vm.setData({
              [dataSign]: JSON.parse(JSON.stringify(value))
            })
          } else {
            let modelPath = vm.data
            path.split('.').forEach(item => {
                modelPath = modelPath[item]
            })
            modelPath[key] = JSON.parse(JSON.stringify(value))
          }
          
        })
      })
      // 自定义watcher通知
    }
  })
}

// 错误处理
const handError = () => {}

// 插件
const initPlugin = () => {}
// 指令

// 注册事件
const _on = () => {}

// 触发事件
const _emit = () => {}

// 非pro环境打印日志
const _log = () => {}

// 挂载静态方法
ahuang.on = _on
ahuang.emit = _emit
ahuang.log = _log

export default ahuang