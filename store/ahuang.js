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
      // 如果没有响应式 将未响应处理的数据挂在_preOb上
      // debugger
      store._preOb = JSON.parse(JSON.stringify(store.storeView))
      // 挂载 storeView会在页面展示 修改需调用setdata
      options.data.storeView = JSON.parse(JSON.stringify(store._preOb))
      options.data.storeModel = JSON.parse(JSON.stringify(store.storeModel))
      // 响应式处理
      observer(store.storeView)
    } else {
      options.data.storeView = Object.assign({}, store._preOb)
      options.data.storeModel = Object.assign({}, store.storeModel)
    }
    
    vm.store = store
    // onload时将实例插入队列
    store.routeToVm[vm.route] || (store.routeToVm[vm.route] = [])
    store.routeToVm[vm.route].push(vm)
    // setdata
    vm.setData(options.data)
    // 调用传入的onload
    user_onLoad && user_onLoad.call(this, e)
  }
  // 调用Page
  Page(options)
}

// 是否拥有_ob
const _isObr = (data) => {
  return data.hasOwnProperty('_preOb')
}

// 响应式处理
const observer = (data) => {
  _walk(data)
}

// 递归遍历
const _walk = (data, path = 'storeView') => {
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
      // 更改并遍历store.routeToVm
      // 除了当前路由 其他页面的setdata分别插入他们的onshow里执行 防止性能开销过大
      // ***
      // console.log(key, value, val === value)
      if (val === value) return
      // 设置store.view
      val = value
      // 设置preOb
      let preOb = store._preOb
      path.split('.').forEach((item, index) => {
        if (index > 0) {
          preOb = preOb[item]
        }
      })
      preOb[key] = value

      Object.keys(store.routeToVm).forEach(item => {
        store.routeToVm[item].forEach(vm => {
          // 更深层的路径要walk里找到
          let dataSign = `${path}.${key}`
          console.log(dataSign, value, vm)
          // 重新设置的对象需要响应式处理
          // ***
          vm.setData({
            [dataSign]: value
          })
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

export default ahuang