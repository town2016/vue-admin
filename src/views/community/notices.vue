<template>
	<div class="notices">
		<v-pageTitle>
			<span slot="title">公告栏</span>
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
	</div>
</template>

<script>
	import {formModel,tableModel,tableData} from 'base/api/community/notices.js'
	import btnGroup from 'common/btnGroup'
	import pageTitle from 'common/pageTitle'
	import iform from 'components/Forms/iform'
	import itable from 'components/table/itable'
	export default {
		name:'notices',
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
				selected:[]
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
							},
							
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
			
			//*发布*/
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
			
			_validate(){
				
			}
		}
	}
</script>

<style>
</style>