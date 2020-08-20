import aHu from './aHu'
import store from './store'

const initMutation = () => {
  aHu.on('UPDATE_NAME', (payload) => {
    store.storeView.userInfo.name = payload
  }),
  aHu.on('UPDATE_NICKNAME', (payload) => {
    store.storeView.userInfo.nickname = payload
  })
}
export default initMutation