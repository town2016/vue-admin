export const pulished = {
	tableModel:[
		{
			prop:'summary',
			label:'当日汇总'
		},
		{
			prop:'outPrice',
			label:'外部均价  元/小时',
		},
		{
			prop:'innerPrice',
			label:'内部均价',
		},
		{
			prop:'innerPrice',
			label:'内部均价',
		}
	]
}



export const add_formModel = [
	{
		prop:'outerPrice',
		label:'外部价格：',
		placeholder:'外部价格',
		slot:'元/小时',
		elemType:'input',
		defaultValue:''
	},
	{
		prop:'innerPrice',
		label:'内部价格：',
		placeholder:'内部价格',
		slot:'元/小时',
		elemType:'input',
		defaultValue:''
	},
	{
		elemType:'select',
		label:'预留时段：',
		prop:'reserveTime',
		placeholder:'请选择预留时段',
		defaultValue:2,
		col:'label',
		colVal:'value',
		options:[
			{label:'2小时',value:2},
			{label:'4小时',value:4},
			{label:'6小时',value:6}
		]
	}
]
