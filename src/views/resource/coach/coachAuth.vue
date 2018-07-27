<template>
	<div class="coach">
		<v-pageTitle>
			<span slot="title">教练认证</span>
			<span slot="subTitle">教练列表</span>
		</v-pageTitle>
		<div class="form-wrapper">
			<v-iform :fields="search.formModel" :inline="true"  ref="searchForm" :fieldData.sync='search.formData' @submitForm='_submit'>
				<div slot="iform-btns">
					<el-button type="success" size="small" @click="_valiDate('name')">查询</el-button>
					<el-button type="default" size="small" @click="_reset('searchForm')">重置</el-button>
				</div>
			</v-iform>
		</div>
		<v-btnGroup>
			<el-button type="primary" size="small">导出</el-button>
			<el-button type="success" size="small" @click="_pass">审核通过</el-button>
			<el-button type="danger" size="small" @click="_noPass">审核不通过</el-button>
		</v-btnGroup>
		<v-itable :tableModel="table.tableModel" border :tableData='table.tableData' @selectionChange = "_getSelected"></v-itable>
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
				<el-button type="primary" size="small" @click="_valiDate('noPass')">确认</el-button>
			</div>
		</el-dialog>
		
		
		
	</div>
</template>

<script>
	import {formModel,tableModel,states,tableData} from 'base/api/resource/coachAuth.js'
	import iform from 'components/Forms/iform'
	import pageTitle from 'common/pageTitle'
	import btnGroup from 'common/btnGroup'
	import itable from 'components/table/itable'
	export default {
		name:'coach',
		data(){
			return {
				search:{
					formModel:formModel,
					formData:{}
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
				},
				selected:[]
			}
		},
		created(){
			var tables = [...tableModel];
			const state = {
				label:'认证状态',
				prop:'state',
				width:100,
				align:'center',
				render:(h,params) =>{
					var state = params.row.state;
					var statu = ''
					if(state == 0){
						statu = h('span',{
							class:{
								'link-type':true
							}
						},states[state]);
					}else if(state == 1){
						statu = h('span',{
							class:{
								'_success':true
							}
						},states[state]);
					}else{
						statu = h('span',{
							class:{
								'_danger':true
							},
						},states[state]);
					}
					
					return statu;
				}
			};
			const see = {
				label:'认证信息',
				width:80,
				align:'center',
				render:(h,params) =>{
					return h('span',{
						class:{
							'_success':true
						},
						style:{
							cursor:'pointer'
						},
						on:{
							click:() =>{
								this.$router.push({
									path:'/coachAuthDetail',
									query:{
										id:params.row.id
									}
								})
							}
						}
					},'查看');
				}
			};
			
			tables.insert(9,state);
			tables.insert(10,see);
			this.table.tableModel = tables;
		},
		methods:{
			_submit(formData){
				console.log(formData);
			},
			/*表单验证*/
			_valiDate(name){
				this.$refs[name].valiDate();
			},
			/*关闭的时候重置表单*/
			_reset(name){
				this.$refs[name].$emit('resetForm');
			},
			_handleSizeChange(){
				
			},
			_handleCurrentChange(){
				
			},
			
			//*审核通过*/
			_pass(){
				if(!this._checkIsSelected()){
					return;
				}
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
			_checkIsSelected(){
				if(this.selected.length == 0){
					this.$message({
						message:'请至少选择一项数据',
						type:'warning'
					})
					return false;
				}
				return true;
			},
			_getSelected(arr){
				this.selected = arr;
			},
			
			/*审核不通过*/
			_noPass(){
				if(!this._checkIsSelected()){
					return;
				}
				this.noPass.visible = true;
			},
			/*关闭模态窗*/
			_close(name){
				this[name].visible = false;
				this._reset(name);
			},
			/*提交不通过*/
			_submitNoPass(){}
		},
		components:{
			'v-pageTitle':pageTitle,
			'v-iform':iform,
			'v-btnGroup':btnGroup,
			'v-itable':itable
		}
	}
</script>

<style scoped lang="scss">
.form-wrapper{
	margin: 20px 0 0 0;
}
</style>