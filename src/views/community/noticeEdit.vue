<template>
	<div class="noticeEdit">
		<v-pageTitle ref="title">
			<span slot="title">新增公告</span>
		</v-pageTitle>
		<v-iform 
			:fields="form.formModel" 
			:inline="form.inline" 
			:rules="form.rules"
			:label-width="form.label_width" 
			formName="noticeForm" 
			ref="noticeForm">
		</v-iform>
		<v-editor @on-change='_getContext' style="margin-top: -20px;" ref="editors" required>
			<span slot="label">正文</span>
		</v-editor>
		<div class="btnGroup" >
			<el-button type="success" size="small" @click="_publish">发布</el-button>
			<el-button type="primary" size="small" @click="_save">保存</el-button>
			<el-button type="default" size="small" @click="_cancel">取消</el-button>
		</div>
	</div>
</template>

<script>
	import pageTitle from 'common/pageTitle'
	import iform from 'components/Forms/iform'
	import editor from 'components/editor/editor'
	export default {
		name:'noticeEdit',
		data(){
			return {
				
				form:{
					rules:{
						title:[
							{required:true,message:'请填写标题'}
						],
						category:[
							{required:true,message:'请选择分类'}
						],
						abstract:[
							{required:true,message:'请填写摘要'}
						],
					},
					formData:{},
					inline:false,
					label_width:100,
					formModel:[
						{
							elemType:'input',
							label:'标题',
							prop:'title'
						},{
							elemType:'select',
							label:'分类',
							prop:'category',
							col:'label',
							colVal:'value',
							options:[
								{
									label:'考场通知',
									value:1
								},{
									label:'系统通知',
									value:2
								}
							],
							defaultValue:1
						},{
							elemType:'textarea',
							label:'摘要',
							prop:'abstract'
						},
					]
				}
			}
		},
		components:{
			'v-editor':editor,
			'v-iform':iform,
			'v-pageTitle':pageTitle
		},
		methods:{
			_getContext(ctx){
				
			},
			_publish(){
				this.$message({
					message:'发布成功',
					type:'success'
				});
				this._reset();
			},
			_cancel(){
				this.$confirm('要在关闭之前保存所编辑的内容吗？','提示',{
					confirmButtonText:'保存',
					cancelButtonText:'取消',
					 type: 'warning'
				}).then(res =>{
					this._reset();
				}).catch(() =>{
					this._reset();
				});
			},
			_save(){
				this.$message({
					message:'保存成功',
					type:'success'
				});
				this._reset();
			},
			_reset(){
				for(var k in this.$refs){
					if(this.$refs[k].resetForm){
						this.$refs[k].$emit('resetForm');
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.btnGroup{
		padding-left: 100px;
	}
</style>