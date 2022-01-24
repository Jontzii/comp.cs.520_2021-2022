import { createStore } from 'vuex'
import Constant from '../Constant';

export default createStore({
  state: {
    players: [ 
        { name: 'Kurri' },
        { name: 'Gretzky' }
      ],
    notifications: []
  },
  mutations: {
    addPlayer(state, name){
      //TODO - mutate the state
    },
    removeIndex(state, index){
      //TODO - mutate the state
    },
    removeLast(state){
      //TODO - mutate the state
    },
    addNotification(state, status) {
      //TODO - mutate the state
    },
    removeAllNotifications(state) {
      //TODO - mutate the state
    }
  },

  actions: {
    [Constant.REMOVE_PLAYER]({ commit,  } , ind) {
      commit( 'removeIndex', ind );
    },
    [Constant.REMOVE_LAST]({ commit,  } ) {
      commit( 'removeLast' );
    },
    [Constant.REMOVE_DELAY]({ commit,  } ) {
        commit('addNotification', "The last item will be removed with delay")
        //TODO - remove with delay, remove also the notification
    },
    [Constant.ADD_PLAYER]({ commit,  } , e) {
      const form = e.target
      const inputElem =form.querySelector("#input_player") 
      const inputVal = inputElem.value
      commit('addPlayer', inputVal)
    },
  },
  getters: {
    players: state => state.players,
    notifications: state => {
      return state.notifications
    },

  }
})