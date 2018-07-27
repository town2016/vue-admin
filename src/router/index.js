import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/widget/layout'

Vue.use(Router)


import {routes} from './routes.js'
import {resource} from './resource/resource.js'
import scheduling from './scheduling/scheduling.js'
import examroom from './examroom/examroomOrder'
import community from './community/community.js'
import appNews from './appNews/appNews.js'
import account from './account/account.js'
import users from './users/users.js'

const childs = [...routes,...resource,...scheduling,...examroom,...community,...appNews,...account,...users];
export default new Router({
  routes: [
   	{
   		name:'layout',
   		path:'/',
   		component:layout,
   		redirect:'/home',
   		children:childs
   	}
  ]
})
