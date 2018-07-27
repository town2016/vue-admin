<template>
	<div class="blackList">
		<v-pageTitle>
			<span slot="title">黑名单</span>
		</v-pageTitle>
		<v-iform :fields="form.formModel" formName="searchForm" ref="searchForm">
			<div slot="iform-btns">
				<el-button type="success" size="small" @click="_validate('searchForm')">查询</el-button>
				<el-button type="default" size="small" @click="_reset('searchForm')">重置</el-button>
			</div>
		</v-iform>
		<br>
		<v-btnGroup>
			<el-button size="small" type='primary' @click="_addNew">添加</el-button>
			<el-button size="small" type='danger' @click="_delete">删除</el-button>
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
		
		<el-dialog title="添加黑名单" 
			:visible.sync="addDialog.visible" 
			@close="_close('addDialog')">
			<v-iform 
				:fields="addDialog.formModel" 
				:fieldData="addDialog.formData" 
				:inline='addDialog.inline' 
				:rules="addDialog.rules" 
				ref="addDialog" 
				@submitForm='_submit'
				formName="addDialog">
			</v-iform>
			<div slot="footer">
				<el-button type="default" size="small" @click="_close('addDialog')">取消</el-button>
				<el-button type="primary" size="small" @click="_validate('addDialog')">确认</el-button>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	import {formModel,tableModel,tableData} from 'base/api/community/blackList.js'
	import btnGroup from 'common/btnGroup'
	import pageTitle from 'common/pageTitle'
	import iform from 'components/Forms/iform'
	import itable from 'components/table/itable'
	export default {
		name:'blackList',
		data(){
			return {
				form:{
					formModel:formModel
				},
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
				selected:[],
				addDialog:{
					inline:false,
					visible:false,
					formModel:[
						{
							prop:'carID',
							label:'车牌号',
							elemType:'input'
						},{
							prop:'remark',
							label:'备注',
							elemType:'textarea'
						}
					],
					formData:{},
					rules:{
						carID:[
							{required:true,message:'请输入车牌号'}
						],
						remark:[
							{required:true,message:'请输入备注'}
						],
					}
				}
			}
		},
		created(){
			var tables = [...tableModel];
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
					this.$confirm('此操作不可恢复, 是否继续删除选中数据?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          this.$message({
			            type: 'success',
			            message: '删除成功!'
			          });
			        });
				}
			},
			
			/*新增*/
			_addNew(){
				this.addDialog.visible = true;
			},
			
			/*表单验证*/
			_validate(name){
				this.$refs[name].valiDate();
			},
			/*关闭的时候重置表单*/
			_reset(name){
				this.$refs[name].$emit('resetForm');
			},
			
			/*关闭添加弹窗*/
			_close(name){
				this.addDialog.visible = false;
				this._reset(name);
			},
			
			/*添加黑名单*/
			_submit(){
				
			}
			
		}
	}
</script>

<style>
</style>