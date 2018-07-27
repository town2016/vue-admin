<template>
	<div class="account">
		<div class="wrapper">
			<p class="title">个人钱包</p>
			<ul class="info-list">
				<li>
					<h5>账户余额</h5>
					<p><span>100.00</span>元</p>
				</li>
				<li>
					<h5>本周充值次数</h5>
					<p><span>1</span>次</p>
				</li>
				<li>
					<h5>本周余额提现次数</h5>
					<p><span>5</span>次</p>
				</li>
			</ul>
			<br>
			<p class="title">银行卡</p>
			<ul class="bank-list">
				<li v-for="bank in bnakList">
					<p>{{bank.bankName}}</p>
					<p>{{bank.bankCard | _backCardSplit}}</p>
				</li>
			</ul>
			<br>
			<p class="title">余额明细</p>
			<div class="balance">
				<v-iform :fields="search.formModel" :fieldData="search.formData">
					<div slot="iform-btns">
						<el-button type="success" size="small" @click="_valiDate">查询</el-button>
						<el-button type="default" size="small" @click="_reset">重置</el-button>
					</div>
				</v-iform>
			</div>
			<v-btnGroup>
				<el-button type="primary">导出</el-button>
			</v-btnGroup>
			<v-itable :tableModel="table.tableModel" border></v-itable>
			<br>
			<div align="center">
				<el-pagination
			      @size-change="_handleSizeChange"
			      @current-change="_handleCurrentChange"
			      :current-page="pager.p"
			      :page-sizes="pager.sizes"
			      :page-size="pager.s"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="pager.total">
			    </el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import btnGroup from 'common/btnGroup'
	import {account_formModel,account_tableModel} from 'base/api/resource/resource'
	import iform from 'components/Forms/iform'
	import itable from 'components/table/itable'
	export default {
		name:'account',
		data(){
			return {
				bnakList:[
					{
						bankCard:'6233525656458986'	,
						bankName:'招商'
					},
					{
						bankCard:'6233525656458986'	,
						bankName:'建设'
					},
					{
						bankCard:'6233525656458986'	,
						bankName:'工商'
					}
				],
				search:{
					formModel:account_formModel,
				    formData:{}
				},
				table:{
					tableModel:account_tableModel
				},
				pager:{
					total:10,
					p:0,
					s:10,
					sizes:[10,20,40]
				}
				
			}
		},
		filters:{
			//将银行卡号以4位数切割
			_backCardSplit(no){
				if(no.length>4){
					return no.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
				}
			}
		},
		methods:{
			_valiDate(){
				this.$refs.searchForm.valiDate();
			},
			_reset(){
				this.$refs.searchForm.$emit('resetForm');
			},
			_handleSizeChange(){
				
			},
			_handleCurrentChange(){
				
			}
		},
		components:{
			'v-iform':iform,
			'v-btnGroup':btnGroup,
			'v-itable':itable
		}
		
	}
</script>

<style scoped lang="scss">
.wrapper{
	.title{
		margin: 0 0 20px 0;
	}
	.info-list{
		padding:20px 10px;
		background-color: #F1F1F1;
		li{
			display: inline-block;
			width: 25%;
			box-sizing: border-box;
			padding: 0 20px;
			border-right: 1px solid #8B9CAC;
			h5{
				color: #8b9cac;
				margin-bottom: 10px;
				font-weight: 400;
			}
			p{
				font-size: 20px;
				color: #666;
				font-weight: 400;
			}
		}
		li:last-child{
			border: none;
		}
	}
	.bank-list{
		font-size: 0;
		li{
			display: inline-block;
			padding: 10px 15px;
			background-color: #F1F1F1;
			margin-right: 15px;
			border:1px dashed #8B9CAC;
			p{
				line-height: 1;
				padding: 5px 0;
				color: #333;
				font-size: 14px;
			}
		}
	}
}

</style>