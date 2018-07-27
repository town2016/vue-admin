export const states = {
	0:'待审核',
	1:'审核通过',
	2:'提现成功',
	3:'提现失败'
}
export const role = 'F2';
export const roleF1 = [
	{
		label:'全部',
		value:0
	},{
		label:'待审核',
		value:1
	},{
		label:'审核通过',
		value:2
	},{
		label:'提现成功',
		value:3
	},{
		label:'提现失败',
		value:4
	}
];

export const roleF2 = [
	{
		label:'全部',
		value:0
	},{
		label:'待审核',
		value:0
	},{
		label:'财务确认',
		value:1
	},{
		label:'提现成功',
		value:2
	},{
		label:'提现失败',
		value:3
	}
]
export const formModel = [
	
	{
		prop:'pulishDate',
		label:'筛选时间',
		width:290,
		elemType:'datetimerange'
	},{
		prop:'state',
		label:'提现状态',
		elemType:'select',
		col:'label',
		colVal:'value',
		defaultValue:0,
		options:role == 'F1'?roleF1:roleF2
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
				defaultValue:0,
				options:[
					{
						label:'用户名',
						value:0
					},{
						label:'电话号码',
						value:1
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
		selectable:function(row,index){
			if(role == 'F1'){
				if(row.state == 1){
					return true;
				}else{
					return false;
				}
			}else if(role == 'F2'){
				if(row.state == 2){
					return true;
				}else{
					return false;
				}
			}
			
		},
		align:'center'
	},{
		type:'index',
		width:50,
		align:'center'
	},{
		prop:'ceaateTime',
		label:'申请时间',
		width:150,
		align:'center'
	},{
		prop:'concatPhone',
		label:'联系电话',
		width:120,
		align:'center'
	},{
		prop:'cashAmt',
		label:'提现金额',
		align:'center'
	},{
		prop:'balance',
		label:'账户余额',
		align:'center'
	},{
		prop:'bankName',
		label:'开户行',
		align:'center'
	},{
		prop:'bankCardNo',
		label:'银行卡号',
		width:200,
		align:'center'
	},{
		prop:'dealPerson',
		label:'处理人',
		align:'center'
	},{
		prop:'FinanceConfirmTime',
		label:'财务确认时间',
		width:150
	},{
		prop:'remark',
		label:'备注',
		align:'center'
	}
	
	
]

export const tableData = [
	{
		id:'appNews1',
		name:'赵四',
		concatPhone:'13632353639',
		cashAmt:'200.00',
		balance:'400.00',
		bankName:'中国银行',
		bankCardNo:'6235345844651654556',
		dealPerson:'唐朝',
		FinanceConfirmTime:'2017-12-11   12:05:22',
		state:0,
		ceaateTime:'2017-12-11   10:05:22',
		remark:''
	},{
		id:'appNews2',
		name:'赵四',
		concatPhone:'13632353639',
		cashAmt:'200.00',
		balance:'400.00',
		bankName:'中国银行',
		bankCardNo:'6235345844651654556',
		dealPerson:'唐朝',
		FinanceConfirmTime:'2017-12-11   12:05:22',
		state:1,
		ceaateTime:'2017-12-11   10:05:22',
		remark:''
	},{
		id:'appNews3',
		name:'赵四',
		concatPhone:'13632353639',
		cashAmt:'200.00',
		balance:'400.00',
		bankName:'中国银行',
		bankCardNo:'6235345844651654556',
		dealPerson:'唐朝',
		FinanceConfirmTime:'2017-12-11   12:05:22',
		state:2,
		ceaateTime:'2017-12-11   10:05:22',
		remark:''
	},{
		id:'appNews4',
		name:'赵四',
		concatPhone:'13632353639',
		cashAmt:'200.00',
		balance:'400.00',
		bankName:'中国银行',
		bankCardNo:'6235345844651654556',
		dealPerson:'唐朝',
		FinanceConfirmTime:'2017-12-11   12:05:22',
		state:3,
		ceaateTime:'2017-12-11   10:05:22',
		remark:'转账失败'
	}
]
