<template>
	<div class="cancelList">
		<v-pageTitle>
			<span slot="title">历史取消订单</span>
		</v-pageTitle>
		
		<v-btnGroup>
			<el-button size="small" type='primary' >导出</el-button>
		</v-btnGroup>
		<br>
		<v-itable 
			:tableModel="table.tableModel" 
			border 
			:tableData="table.tableData"
			@selectionChange="_selectes">
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
	import {formModel,tableModel,tableData} from 'base/api/community/cancelList.js'
	import btnGroup from 'common/btnGroup'
	import pageTitle from 'common/pageTitle'
	import iform from 'components/Forms/iform'
	import itable from 'components/table/itable'
	export default {
		name:'missList',
		data(){
			return {
				
				table:{
					tableModel:[],
					tableData:tableData
				},
				pager:{
					total:10,
					p:0,
					s:10,
					sizes:[10,20,40]
				},
				selected:[]
			}
		},
		created(){
			const render = {
				label:'订单号',
				prop:'orderNo',
				width:200,
				align:'center',
				render:(h,params) =>{
					return h('span',{
						class:{
							'link-type':true
						},
						on:{
							click:() =>{
								this.$router.push({
									name:'cancelOrderDetail',
									params:{
										orderNo:params.row.orderNo
									}
								})
							}
						}
					},params.row.orderNo)
				}
			};
			
			var tables = [...tableModel];
			tables.insert(2,render);
			this.table.tableModel = tables;
		},
		components:{
			'v-iform':iform,
			'v-pageTitle':pageTitle,
			'v-btnGroup':btnGroup,
			'v-itable':itable
		},
		methods:{
			/*分页条数变化*/
			_handleSizeChange(){
				
			},
			
			/*分页查询*/
			_handleCurrentChange(){
				
			},
			
			
			/*表格选中*/
			_selectes(arr){
				this.selected = arr;
			},
			
			/*删除*/
			_delete(){
				if(this.selected.length == 0){
					this.$message({
						message:'请选择要删除的数据',
						type:'warning'
					})
				}else{
					
				}
			},
			
			/*新增*/
			_addNew(){
				this.$router.push({
					name:'noticeEdit'
				})
			},
			
			/*表单验证*/
			_validate(name){
				this.$refs[name].valiDate();
			},
			/*关闭的时候重置表单*/
			_reset(name){
				this.$refs[name].$emit('resetForm');
			},
			
		}
	}
</script>

<style>
</style>