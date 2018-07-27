const coach = (resolve) =>{require(['views/resource/coach/coach'],resolve)}
const coachDetail = (resolve) =>{require(['views/resource/coach/coachDetail'],resolve)}
const examroom = (resolve) =>{require(['views/resource/examRoom/examroom'],resolve)}
const cars = (resolve) =>{require(['views/resource/cars/cars'],resolve)}
const carAuth = (resolve) =>{require(['views/resource/cars/carAuth'],resolve)}
const carAuthDetail = (resolve) =>{require(['views/resource/cars/carAuthDetail'],resolve)}
const integralDetail = (resolve) =>{require(['views/resource/coach/integralDetail'],resolve)}
const coachAuth = (resolve) =>{require(['views/resource/coach/coachAuth'],resolve)}
const coachAuthDetail = (resolve) =>{require(['views/resource/coach/coachAuthDetail'],resolve)}
export const resource = [
	{
		path:'/coach',
		name:'coach',
		component:coach
	},
	{
		path:'/coachDetail',
		name:'coachDetail',
		component:coachDetail
	},
	{
		path:'/examroom',
		name:'examroom',
		component:examroom
	},
	{
		path:'/cars',
		name:'cars',
		component:cars
	},
	{
		path:'/carAuth',
		name:'carAuth',
		component:carAuth
	},
	{
		path:'/carAuthDetail',
		name:'carAuthDetail',
		component:carAuthDetail
	},
	{
		path:'/integralDetail',
		name:'integralDetail',
		component:integralDetail
	},
	{
		path:'/coachAuth',
		name:'coachAuth',
		component:coachAuth
	},
	{
		path:'/coachAuthDetail',
		name:'coachAuthDetail',
		component:coachAuthDetail
	}
	
]
