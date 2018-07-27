export const formModel = [
	
	{
		prop:'publishTime',
		label:'添加日期',
		elemType:'datetimerange',
	},
	{
		prop:'noticeType',
		label:'关键词搜索',
		group:true,
		childs:[
			{
				prop:'sign',
				elemType:'select',
				col:'label',
				colVal:'value',
				width:120,
				options:[
					{
						label:'车牌号',
						value:0
					}
				],
				defaultValue:0
			},{
				prop:'keyword',
				elemType:'input',
				placeholder:'请输入...'
			}
		]
	},
]

export const tableModel = [
	{
		type:'selection',
		width:50
	},{
		type:'index',
		width:50
	},{
		prop:'title',
		label:'车牌号',
		width:180
	},{
		prop:'updateTime',
		label:'操作时间',
		width:180
	},{
		prop:'remark',
		label:'备注'
	}
	
]

export const tableData = [
	{
		title:'粤B.25564',
		remark:'爽约次数过多',
		updateTime:'2017-12-11   10:05:22'
	}
]
