import form_State from './state'
import form_Getters from './getters'
import form_Mutations from './mutations'
import inLine from '../inLine'
export default {
  state: {...form_State, ...inLine.state},
  getters: {...form_Getters, ...inLine.getters},
  mutations: {...form_Mutations, ...inLine.mutations}
}
