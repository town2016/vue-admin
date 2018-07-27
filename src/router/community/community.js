const notices  = (resolve) =>{require(['views/community/notices'],resolve)}
const blackList  = (resolve) =>{require(['views/community/blackList'],resolve)}
const missList  = (resolve) =>{require(['views/community/missList'],resolve)}
const cancelList  = (resolve) =>{require(['views/community/cancelList'],resolve)}
const orderDetail  = (resolve) =>{require(['views/community/orderDetail'],resolve)}
const noticeEdit  = (resolve) =>{require(['views/community/noticeEdit'],resolve)}
const community = [
	{
		path:'/notices',
		name:'notices',
		component:notices
	},{
		path:'/blackList',
		name:'blackList',
		component:blackList
	},{
		path:'/missList',
		name:'missList',
		component:missList
	},{
		path:'/cancelList/:id',
		name:'cancelList',
		component:cancelList
	},{
		path:'/cancelOrderDetail/:orderNo',
		name:'cancelOrderDetail',
		component:orderDetail
	},{
		path:'/noticeEdit',
		name:'noticeEdit',
		component:noticeEdit
	}
	
	
]

export default community
