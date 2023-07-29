import Vue from 'vue'
import Vuex from 'vuex'
import datos_cursos from './cursos_module' //asi el modulo pasa a formar parte del almacen principal

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    datos_cursos //registrar
  }
})
