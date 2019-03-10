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
		component:forms,
		meta: {crumbs: [{name: '表单组件', path: '/forms'}], name: '表单组件'}
	},
	{
		path:'/home',
		name:'home',
		component:home
	},
	{
		path:'/menus',
		name:'menus',
		component:menus,
		meta: {crumbs: [{name: '菜单组件', path: '/menus'}], name: '菜单组件'}
	},
	{
		path:'/tables',
		name:'tables',
		component:tables, 
		meta: {crumbs: [{name: '表格组件', path: '/tables'}], name: '表格组件'}
	},
	{
		path:'/countTos',
		name:'countTos',
		component:countTos,
		meta: {crumbs: [{name: '数字递增组件', path: '/countTos'}], name: '数字递增组件'}
	},
	{
		path:'/calendars',
		name:'calendars',
		component:calendars,
		meta: {crumbs: [{name: '日程表组件', path: '/calendars'}], name: '日程表组件'}
	},
	{
		path:'/ctimepicker',
		name:'ctimepicker',
		component:ctimepicker,
		meta: {crumbs: [{name: '日程表组件', path: '/calendars'}], name: '日程表组件'}
	},
	{
		path:'/editors',
		name:'editors',
		component:editors,
		meta: {crumbs: [{name: '富文本组件', path: '/editors'}], name: '富文本组件'}
	}
]
