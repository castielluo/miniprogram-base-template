import aHu from './aHu'
import store from './store'

const initMutation = () => {
  aHu.on('UPDATE_NAME', (payload) => {
    store.storeModel.userInfo.name = payload
  })
}
export default initMutation