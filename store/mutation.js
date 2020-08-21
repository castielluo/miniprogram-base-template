import aHu from './aHu'
import store from './store'

const initMutation = () => {
  aHu.on('UPDATE_USERINFO', (payload) => {
    store.storeView.userInfo = payload
  })
}
export default initMutation