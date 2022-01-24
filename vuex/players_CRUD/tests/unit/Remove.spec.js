import App from '@/App'
import Constant from '@/Constant'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Remove from '@/components/Remove'
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
    commit('incrementCount')
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


const rmPlayer = async (wrapper)=>{
  const button = wrapper.find('#rm_last');
  button.trigger('click')
}



describe('Remove', () => {
  // test('rm_last button', () => {
  //   const wrapper = mount(Remove)
  //   expect(wrapper.find('#rm_last').isVisible()).toBe(true)
  // })
  // test('rm_delay button', () => {
  //   const wrapper = mount(Remove)
  //   expect(wrapper.find('#rm_delay').isVisible()).toBe(true)
  // })


  it('calls an "remove player" action when the rm_last is clicked', async function() {
    const wrapper = mount(App, {
      global: {
        plugins: [test_store]
      }
    })
    const count = test_store.state.count
    await rmPlayer(wrapper)    
    await delay(500)
    const count2 = test_store.state.count
    expect(count).toBe(0)
    expect(count2).toBe(1)
  })

  it('removes list items when the rm_last is clicked', async function() {
    const wrapper = mount(App, {
      global: {
        plugins: [test_store]
      }
    })
    const count = test_store.state.count
    await rmPlayer(wrapper)    
    await delay(500)
    
    const li_elems = wrapper.findAll("li")
    expect(li_elems.length).toBe(0)
  })



})
