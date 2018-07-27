<template>
	<div class="banks">
		<v-pageTitle>
			<span slot="title">银行卡</span>
			<span slot="subTitle">银行卡绑定</span>
		</v-pageTitle>
		<br>
		<v-iform :fields="form.formModel" :fieldData="form.formData" formName="searchForm" ref="searchForm">
			<div slot="iform-btns">
				<el-button type="success" size="small" @click="_validate('searchForm')">查询</el-button>
				<el-button type="default" size="small" @click="_reset('searchForm')">重置</el-button>
			</div>
		</v-iform>
		<v-btnGroup>
			<el-button type="primary" size="small">导出</el-button>
		</v-btnGroup>
		<v-itable 
			:tableModel="table.tableModel" 
			:tableData="table.tableData" 
			border
			@selectionChange="_setSelected">
		</v-itable>
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
</template>

<script>
	import {formModel,tableData,tableModel} from 'base/api/account/banks.js'
	import btnGroup from 'common/btnGroup'
	import pageTitle from 'common/pageTitle'
	import iform from 'components/Forms/iform'
	import itable from 'components/table/itable'
	export default {
		name:'banks',
		data(){
			return {
				form:{
					formModel:formModel,
					formData:{}
				},
				table:{
					tableData:tableData,
					tableModel:[]
				},
				pager:{
					total:10,
					p:0,
					s:10,
					sizes:[10,20,40]
				},
				selected:[],
				noPass:{
					inline:false,
					visible:false,
					formModel:[
						{
							elemType:'textarea',
							prop:'reason',
							label:'审批意见',
							placeholder:'请输入审批意见......',
						}					
					],
					formData:{},
					rules:{
						reason:[
							{required:true,message:'请输入审批意见'}
						]
					}
				}
			}
		},
		created(){
			var state = {
				prop:'state',
				label:'银行卡状态',
				align:'center',
				render:(h,params) =>{
					return h('span',{
						class:{
							'_success':params.row.state == 0,
							'_danger':params.row.state == 1
						}
					},params.row.state == 1?'有效卡号':'无效卡号')
				}
			};
			
			var tables = [...tableModel];
			tables.push(state);
			this.table.tableModel = tables;
		},
		methods:{
			/*分页条数变化*/
			_handleSizeChange(){
				
			},
			
			/*分页查询*/
			_handleCurrentChange(){
				
			},
			/*表单验证*/
			_validate(name){
				this.$refs[name].valiDate();
			},
			/*关闭的时候重置表单*/
			_reset(name){
				this.$refs[name].$emit('resetForm');
			},
			
			/*获取选中的数据*/
			_setSelected(arr){
				this.selected = arr;
			},
			
			
			
			
			
		},
		components:{
			'v-iform':iform,
			'v-pageTitle':pageTitle,
			'v-btnGroup':btnGroup,
			'v-itable':itable
		},
	}
</script>

<style scoped lang="scss">
</style>