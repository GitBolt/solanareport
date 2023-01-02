import { getTokenAccounts } from "@/utils";

export default {
  namespaced: true,
  state: {
    connected: false,
    tokenAccounts: {},
  },
  getters: {
    connected(state) {
      return state.connected;
    },
    tokenAccounts(state) {
      return state.tokenAccounts;
    },
  },
  mutations: {
    setConnected(state, connected) {
      state.connected = connected;
    },
    setTokenAccounts(state, tokenAccounts) {
      state.tokenAccounts = tokenAccounts;
    },
  },
  actions: {
    setConnected({ commit }, connected) {
      commit("setConnected", connected);
    },
    async getTokenAccounts({ commit }, workspace) {
      const tokenAccounts = await getTokenAccounts(workspace);
      commit("setTokenAccounts", tokenAccounts);
    },
  },
};
