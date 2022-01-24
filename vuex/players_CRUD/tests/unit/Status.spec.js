import App from '@/App'
import Constant from '@/Constant'
import Status from '@/components/Status'
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

const test_store = createStore({
  state: {
    players: [ 
        { name: 'pia' },
        { name: 'petteri' }
      ],
    notifications: []
  },
  mutations: {
    addPlayer(state, name){
      state.players.push({name: name})
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

  actions: {
    [Constant.REMOVE_PLAYER]({ commit,  } , ind) {
      commit( 'removeIndex', ind );
    },
    [Constant.REMOVE_LAST]({ commit,  } ) {
      commit( 'removeLast' );
    },
    [Constant.REMOVE_DELAY]({ commit,  } ) {
      // jest.fn()
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
  },
  getters: {
    players: state => state.players,
    notifications: state => {
      return state.notifications
    },

  }
})




describe('Status', () => {

  it('renders without notification', () => {

    const wrapper = mount(Status,
      {
        global: {
          provide: { 
            store: test_store
          } 
        }
      }
    )

    expect(wrapper.html()).toContain('<div id=\"status\" class=\"status\"><span></span></div>')
  })

  it('adds alert if the last player is removed with delay', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [test_store]
      }
    })
  
    await wrapper.find('#rm_delay').trigger('click')
    delay(500)
    const status = wrapper.find("#status").html()
    expect(status).toContain('Alert')
  
  })


})


