const home  = (resolve) =>{require(['components/widget/home'],resolve)}
const forms  = (resolve) =>{require(['components/Forms/index'],resolve)}
const menus  = (resolve) =>{require(['components/menus/index'],resolve)}
const tables  = (resolve) =>{require(['components/table/index'],resolve)}
const countTos  = (resolve) =>{require(['components/countTos/index'],resolve)}
const calendars  = (resolve) =>{require(['components/calendars/index'],resolve)}
const ctimepicker  = (resolve) =>{require(['components/timepicker/index'],resolve)}
const editors  = (resolve) =>{require(['components/editor/index'],resolve)}
export const routes = [
	{
		path:'/forms',
		name:'forms',
		component:forms
	},
	{
		path:'/home',
		name:'home',
		component:home
	},
	{
		path:'/menus',
		name:'menus',
		component:menus
	},
	{
		path:'/tables',
		name:'tables',
		component:tables
	},
	{
		path:'/countTos',
		name:'countTos',
		component:countTos
	},
	{
		path:'/calendars',
		name:'calendars',
		component:calendars
	},
	{
		path:'/ctimepicker',
		name:'ctimepicker',
		component:ctimepicker
	},
	{
		path:'/editors',
		name:'editors',
		component:editors
	}
]
