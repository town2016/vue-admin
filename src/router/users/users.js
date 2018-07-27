const roles = (resolve) =>{require(['views/users/roles'],resolve)}
const seting = (resolve) =>{require(['views/users/seting'],resolve)}

const users = [
	{
		component:users,
		path:'/roles',
		name:'roles'
	},{
		component:seting,
		path:'/seting',
		name:'seting'
	}
]


export default users