
export const formModel = [
	
	{
		prop:'pulishDate',
		label:'筛选时间',
		width:290,
		elemType:'datetimerange',
		options:{
			shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
              picker.$emit('pick', [start, end]);
            }
          }]
		}
	},{
		label:'高级搜索',
		group:true,
		childs:[
			{
				prop:'newsType',
				label:'',
				classes:'noRadiusRight',
				width:120,
				elemType:'select',
				col:'label',
				colVal:'value',
				defaultValue:3,
				options:[
					{
						label:'用户名',
						value:0
					},{
						label:'电话号码',
						value:1
					},{
						label:'订单编号',
						value:3
					}
				]
			},{
				prop:'content',
				label:'',
				elemType:'input',
				classes:'noRadiusLeft',
				placeholder:'请输入...'
			}
		]
	}
]



export const tableModel = [
	{
		type:'selection',
		width:50,
		align:'center'
	},{
		type:'index',
		width:50,
		align:'center'
	},{
		prop:'createTime',
		label:'充值时间',
		width:180,
		align:'center'
	},{
		prop:'orderNo',
		label:'订单编号',
		width:180,
		align:'center'
	},{
		prop:'batchNo',
		label:'交易流水号',
		align:'center',
		width:200,
	},{
		prop:'name',
		label:'姓名',
		align:'center',
		width:100
	},{
		prop:'phone',
		label:'电话',
		align:'center',
		width:120		
	},{
		prop:'rechargeAmt',
		label:'充值金额',
		width:200,
		align:'center'
	},{
		prop:'payType',
		label:'支付方式',
		align:'center'
	}
]

export const tableData = [
	{
		id:'appNews1',
		name:'赵四',
		orderNo:'20180228121522445861',
		phone:'13632353639',
		rechargeAmt:'400.00',
		bankName:'中国银行',
		batchNo:'6235345844651654556',
		dealPerson:'唐朝',
		createTime:'2018-01-15 21:15:25',
		payType:'微信'
	}
]
