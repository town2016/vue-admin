<template>
	<div class="newsCenter">
		<v-pageTitle>
			<span slot="title">消息中心</span>
		</v-pageTitle>
		<br>
		<v-iform 
			formName="searchForm" 
			ref='searchForm' 
			:fields='form.formModel' 
			:fieldData="form.formData">	
			<div slot="iform-btns">
				<el-button type="success" size="small" @click="_validate('searchForm')">查询</el-button>
				<el-button type="default" size="small" @click="_reset('searchForm')">重置</el-button>
			</div>
		</v-iform>
		<br>
		<v-btnGroup>
			<el-button type="primary" size="small" @click="_addNews">新增</el-button>
		</v-btnGroup>
		<br>
		<v-itable :tableModel="table.tableModel" border :tableData="table.tableData"></v-itable>
	</div>
</template>

<script>
	import {formModel,tableModel,tableData} from 'base/api/appNews/appNews.js'
	import btnGroup from 'common/btnGroup'
	import pageTitle from 'common/pageTitle'
	import iform from 'components/Forms/iform'
	import itable from 'components/table/itable'
	export default {
		name:'newsCenter',
		data(){
			return {
				form:{
					formModel:formModel,
					formData:{}
				},
				table:{
					tableModel:[],
					tableData:tableData
				}
			}
		},
		created(){
			const render = {
				label:'操作',
				width:200,
				render:(h,params) =>{
					var box = h('div',[
						h('span',{
							class:{
								'link-type':true
							}
						},'查看'),
						h('span',{
							class:{
								'link-type':true
							},
							on:{
								click:() =>{
									this._fallback();
								}
							}
						},'撤回'),
						h('span',{
							class:{
								'link-type':true
							}
							
						},'编辑'),
						h('span',{
							class:{
								'link-type':true
							},
							on:{
								click:() =>{
									this._publish();
								}
							}
						},'发布')
					]);
					
					return box;
				}
			};
			
			var tables = [...tableModel];
			tables.push(render);
			this.table.tableModel = tables;
		},
		methods:{
			
			/*表单验证*/
			_validate(name){
				this.$refs[name].valiDate();
			},
			/*关闭的时候重置表单*/
			_reset(name){
				this.$refs[name].$emit('resetForm');
			},
			
			/*发布*/
			_publish(){
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
			    		message:'发布成功',
			    		type:'success'
			    	})
				}).catch((reason) =>{
					this.$message({
			    		message:reason,
			    		type:'error'
			    	})
				});
			},
			
			/*撤回*/
			_fallback(){
				this.$confirm('确认撤回该公告吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '撤回成功!'
		          });
		        });
			},
			
			/*新增*/
			_addNews(){
				this.$router.push({
					name:'newsEdit'
				})
			}
			
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