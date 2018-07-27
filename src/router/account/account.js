const recharge  = (resolve) =>{require(['views/account/recharge'],resolve)}
const cash  = (resolve) =>{require(['views/account/cash'],resolve)}
const banks  = (resolve) =>{require(['views/account/banks'],resolve)}
const account = [
	{
		path:'/recharge',
		name:'recharge',
		component:recharge
	},{
		path:'/cash',
		name:'cash',
		component:cash
	},{
		path:'/banks',
		name:'banks',
		component:banks
	}
]

export default account
