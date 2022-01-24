

import App from '@/App'
import Constant from '@/Constant'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'


const delay = (delay, cb = null) => {
  return new Promise(resolve =>
    setTimeout(() => {
      if (typeof cb === 'function') return resolve(cb());
      resolve();
    }, delay)
  );
};

const actions = {
  [Constant.REMOVE_PLAYER]({ commit,  } , ind) {
    commit( 'removeIndex', ind );
  },
  [Constant.REMOVE_LAST]({ commit,  } ) {
    commit( 'removeLast' );
  },
  [Constant.REMOVE_DELAY]({ commit,  } ) {
    commit('addNotification', "The last item removed with delay")
      setTimeout(() => {
        commit('removeLast')
        commit('removeAllNotifications')
      }, 3000);
  },
  [Constant.ADD_PLAYER]({ commit,  } , e) {
    commit('incrementCount')
    const form = e.target
    const inputElem =form.querySelector("#input_player") 
    const inputVal = inputElem.value
    commit('addPlayer', inputVal)
  },

}

const test_store = createStore({
  state: {
    count: 0,
    players: [ 
        { name: 'Tuukka Rask' },
        { name: 'Reijo Mikkolainen' }
      ],
    notifications: []
  },
  mutations: {
    addPlayer(state, name){
      state.players.push({name: name})
    },
    incrementCount(state,){
      // console.log("increment called")
      state.count++
    },
    removeIndex(state, index){
      state.players.splice(index,1)
    },
    removeLast(state){
      state.players.pop()
    },
    addNotification(state, status) {
      state.notifications.push(status)
    },
    removeAllNotifications(state) {
      state.notifications = [];
    }
  },

  actions: actions,
  getters: {
    players: state => state.players,
    notifications: state => {
      return state.notifications
    },

  }
})


describe('Players', () => {
  
  it('calls an "add player" action when form is submitted', async function() {
    const wrapper = mount(App, {
      global: {
        plugins: [test_store]
      }
    })
    const count = test_store.state.count
    await addPlayer(wrapper, "Mölli")    
    await delay(500)
    const count2 = test_store.state.count
    expect(count).toBe(0)
    expect(count2).toBe(1)
  })

  it('adds a list item when form is submitted', async function() {
    const wrapper = mount(App, {
      global: {
        plugins: [test_store]
      }
    })
    await addPlayer(wrapper, "Nummelin")    
    await delay(500)
    const li_elems = wrapper.findAll("li")
    expect(li_elems.length).toBe(4) //Mölli, Nummelin
  })


})



const addPlayer = async (wrapper, player_name)=>{
  const input = wrapper.find("#input_player");
  await input.setValue(player_name);
  const form = wrapper.find('form');
  form.trigger('submit')
}






