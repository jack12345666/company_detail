const state = {
  deptId: null
}

const actions = {}

const mutations = {
  changeDeptId(state, payload) {
    state.deptId = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
