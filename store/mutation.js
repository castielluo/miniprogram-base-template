import aHu from './aHu'
import store from './store'

const initMutation = () => {
  aHu.on('UPDATE_NAME', (payload) => {
    store.storeView.userInfo.name = payload
  }),
  aHu.on('UPDATE_NICKNAME', (payload) => {
    store.storeView.userInfo.nickname = payload
  })
  aHu.on('SET_NAMELIST', (payload) => {
    store.storeView.nameList = [1,2,3]
  })
  aHu.on('UPDATE_NAMELIST', (payload) => {
    store.storeView.nameList.push(payload)
  })
}
export default initMutation