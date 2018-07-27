<template>
	<div class="cash">
		<v-pageTitle>
			<span slot="title">提现</span>
			<span slot="subTitle">提现记录</span>
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
			<el-button type="success" size="small" v-if="role == 'F1' " @click="_beforePass">审核通过</el-button>
			<el-button type="danger" size="small" v-if="role == 'F1' " @click="_noPass">审核不通过</el-button>
			<el-button type="success" size="small" v-if="role == 'F2' "  @click="_beforeCash">提现成功</el-button>
			<el-button type="danger" size="small" v-if="role == 'F2' " @click="_noPass">提现失败</el-button>
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
		<el-dialog title="审批意见" 
			:visible.sync="noPass.visible" 
			@close="_close('noPass')">
			<v-iform 
				:fields="noPass.formModel" 
				:fieldData="noPass.formData" 
				:inline='noPass.inline' 
				:rules="noPass.rules" 
				ref="noPass" 
				@submitForm='_submitNoPass'
				formName="noPass"></v-iform>
			<div slot="footer">
				<el-button type="default" size="small" @click="_close('noPass')">取消</el-button>
				<el-button type="primary" size="small" @click="_validate('noPass')">确认</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {formModel,tableData,tableModel,states,role} from 'base/api/account/cash.js'
	import btnGroup from 'common/btnGroup'
	import pageTitle from 'common/pageTitle'
	import iform from 'components/Forms/iform'
	import itable from 'components/table/itable'
	export default {
		name:'cash',
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
				role:role,
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
			var name = {
				prop:'name',
				label:'姓名',
				align:'center',
				render:(h,params) =>{
					return h('span',{
						class:{
							'link-type':true
						}
					},params.row.name)
				}
			};
			var state = {
				prop:'state',
				label:'提现状态',
				align:'center',
				render:(h,params) =>{
					return h('span',{
						class:{
							'link-type':params.row.state == 0,
							'_danger':params.row.state == 3,
							'_success':params.row.state == 2
						}
					},states[params.row.state])
				}
			}
			var tables = [...tableModel];
			tables.insert(3,name);
			tables.insert(9,state);
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
			
			/*审核通过前确认*/
			_beforePass(){
				if(this.selected.length == 0){
					this.$message({
			    		message:'请至少选择一项数据',
			    		type:'warning'
			    	});
					return;
				};
				this.$confirm('是否确认同意提现？','提示',{
					confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
				}).then(res =>{
					this._pass();
				})
			},
			
			/*审核通过*/
			_pass(){
				
				new Promise(function (resolve, reject) {
				    var timeOut = parseInt(Math.random() * 10);
				    setTimeout(function () {
				        if (timeOut%2 == 0) {
				            resolve(200);
				        }else {
				            reject('网络错误，请稍后重试');
				        }
				    }, 500);
				}).then((r) =>{
			    	this.$message({
			    		message:'审核通过',
			    		type:'success'
			    	})
				}).catch((reason) =>{
					this.$message({
			    		message:reason,
			    		type:'error'
			    	})
				});
			},
			
			/*审核不通过*/
			_noPass(){
				if(this.selected.length == 0){
					this.$message({
			    		message:'请至少选择一项数据',
			    		type:'warning'
			    	})
					return;
				}
				this.noPass.visible = true;
			},
			
			/*关闭模态窗*/
			_close(name){
				this[name].visible = false;
				this._reset(name);
			},
			
			/*提交审批意见*/
			_submitNoPass(){},
			
			/*提现成功*/
			_beforeCash(){
				if(this.selected.length == 0){
					this.$message({
			    		message:'请至少选择一项数据',
			    		type:'warning'
			    	});
					return;
				};
				this.$confirm('是否确认已成功提现？','提示',{
					confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
				}).then(res =>{
					this._cashSuccess();
				})
			},
			_cashSuccess(){
				new Promise(function (resolve, reject) {
				    var timeOut = parseInt(Math.random() * 10);
				    setTimeout(function () {
				        if (timeOut%2 == 0) {
				            resolve(200);
				        }else {
				            reject('网络错误，请稍后重试');
				        }
				    }, 500);
				}).then((r) =>{
			    	this.$message({
			    		message:'提现成功',
			    		type:'success'
			    	})
				}).catch((reason) =>{
					this.$message({
			    		message:reason,
			    		type:'error'
			    	})
				});
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