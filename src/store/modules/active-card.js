const SET_ITEM = 'SET_ITEM'
const INIT_ITEM = 'INIT_ITEM'
const RESET_ITEM = 'RESET_ITEM'

export default ({
  state: {
    inactiveItems: []
  },
  getters: {
    getItem: state => {
      return state.inactiveItems
    }
  },
  mutations: {
    [SET_ITEM] (state, id) {
      state.inactiveItems.push(id)
    },
    [INIT_ITEM] (state) {
      state.inactiveItems = []
    },
    [RESET_ITEM] (state, index) {
      state.inactiveItems.splice(index, 1)
    }
  },
  actions: {
    inactiveItemsInit ({ commit }) {
      commit(INIT_ITEM)
    },
    setInactiveItem ({ commit }, id) {
      commit(SET_ITEM, id)
    },
    resetInactiveItem ({ state, commit }, id) {
      commit(RESET_ITEM, state.inactiveItems.indexOf(id))
    }
  }
})
