const newsCenter  = (resolve) =>{require(['views/appNews/newsCenter'],resolve)}
const newsEdit  = (resolve) =>{require(['views/appNews/newsEdit'],resolve)}
const appNews = [
	{
		path:'/newsCenter',
		name:'newsCenter',
		component:newsCenter
	},{
		path:'/newsEdit',
		name:'newsEdit',
		component:newsEdit
	}
]

export default appNews
