const published  = (resolve) =>{require(['views/scheduling/published'],resolve)};
const unpublished  = (resolve) =>{require(['views/scheduling/unpublished'],resolve)};
const addScheduling  = (resolve) =>{require(['views/scheduling/addScheduling'],resolve)};
const scheduling = [
	{
		path:'/published',
		name:'published',
		component:published
	},
	{
		path:'/unpublished',
		name:'unpublished',
		component:unpublished
	},
	{
		path:'/addScheduling',
		name:'addScheduling',
		component:addScheduling
	}
]


export default scheduling