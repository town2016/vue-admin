const examOrderDetail = (resolve) =>{require(['views/examroomOrder/orderDetail'],resolve)}
const refund = (resolve) =>{require(['views/examroomOrder/refund'],resolve)}
const examroom = [
	{
		path:'/refund',
		name:'refund',
		component:refund
	},
	{
		path:'/examOrderDetail/:id',
		name:'examOrderDetail',
		component:examOrderDetail
	}
]


export default examroom