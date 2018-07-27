<template>
	<div class="refund">
		<v-pageTitle>
			<span slot="title">退费申请</span>
			<span slot="subTitle">退费申请列表</span>
		</v-pageTitle>
		<br>
		<v-iform :fields="form.formModel" :fieldData="form.formData" ref="searchForm" >
			<div slot="iform-btns">
				<el-button type="success" size="small" @click="_valiDate('searchForm')">查询</el-button>
				<el-button type="default" size="small" @click="_reset('searchForm')">重置</el-button>
			</div>
		</v-iform>
		<v-btnGroup>
			<el-button type="primary" size="small" @click="_pass">审核通过</el-button>
			<el-button type="primary" size="small" @click='_noPass'>审核不通过</el-button>
		</v-btnGroup>
		<br>
		<v-itable :tableModel="table.tableModel" :tableData="table.tableData" border></v-itable>
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
	import pageTitle from 'common/pageTitle'
	import iform from 'components/Forms/iform'
	import {formModel,tableModel,tableData} from 'base/api/examroom/examroom'
	import btnGroup from 'common/btnGroup'
	import itable from 'components/table/itable'
	export default {
		name:'refund',
		data(){
			return {
				form:{
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
				}
			}
		},
		components:{
			'v-pageTitle':pageTitle,
			'v-iform':iform,
			'v-btnGroup':btnGroup,
			'v-itable':itable
		},
		created(){
			const render = {
				prop:'orderNo',
				label:'订单号',
				width:200,
				render:(h,params) =>{
					return h('a',{
						class:{
							'link-type':true
						},
						on:{
							click:() =>{
								this.$router.push({
									name:'examOrderDetail',
									params:{
										id:params.row.id
									}
								})
							}
						}
					},params.row.orderNo)
				}
			};
			var tables=[...tableModel];
			tables.insert(2,render);
			this.table.tableModel = tables;
		},
		methods:{
			/*表单验证*/
			_valiDate(name){
				this.$refs[name].valiDate();
			},
			/*关闭的时候重置表单*/
			_reset(name){
				this.$refs[name].$emit('resetForm');
			},
			
			/*分页条数变化*/
			_handleSizeChange(){
				
			},
			
			/*分页查询*/
			_handleCurrentChange(){
				
			},
			
			//*审核通过*/
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
				this.noPass.visible = true;
			},
			
			/*关闭模态窗*/
			_close(name){
				this[name].visible = false;
				this._reset(name);
			},
			
			
			
			
			
			/*提交不通过*/
			_submitNoPass(){}
		}
	}
</script>

<style>
</style>