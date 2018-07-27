<template>
	<div class="newsEdit">
		<v-pageTitle>
			<span slot="title">新增消息</span>
		</v-pageTitle>
		<v-iform 
			:fields="form.formModel" 
			:fieldData="form.formData"
			:inline="form.inline" 
			:rules="form.rules"
			:label-width="form.label_width" 
			formName="noticeForm" 
			@submitForm="_formResult"
			ref="newsForm">
		</v-iform>
		<v-upload required @change = "_getImgList" ref="uploadCtr" accept="image/jpeg,image/png">
			<span slot="label">头图</span>
		</v-upload>
		<br>
		<v-editor @on-change='_getContext'  ref="editors" required>
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
	import upload from 'components/uploadList/upload'
	export default {
		name:'newsEdit',
		data(){
			return {
				
				form:{
					formData:{},
					imgList:[],
					context:'',
					inline:false,
					label_width:100,
					rules:{
						category:[
							{required:true,message:'请选择分类'}
						],
						title:[
							{required:true,message:'请填写标题'}
						],
						abstract:[
							{required:true,message:'请填写消息摘要'}
						]
					},
					formModel:[
						{
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
							elemType:'input',
							label:'标题',
							prop:'title'
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
			'v-pageTitle':pageTitle,
			'v-upload':upload
		},
		methods:{
			_getContext(ctx){
				this.form.context = ctx;
			},
			_publish(){
				this.$refs.newsForm.valiDate();
				var formFlag = true,uploadFlag = true,editorFlag = true;
				if(this.isEmptyObject(this.form.formData)){
					formFlag = false;
				}
				if(!this.$refs.uploadCtr.valiDate()){
					uploadFlag = false;
				}
				if(!this.$refs.editors.valiDate()){
					editorFlag = false;
				}
				
				if(editorFlag == false || uploadFlag == false || formFlag == false){
					return;
				}
				
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
				}).catch(er =>{
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
			},
			
			_getImgList(arr){
				this.form.imgList = arr;
			},
			
			_formResult(formData){
			
				this.form.formData = formData;
			}
		}
	}
</script>

<style scoped lang="scss">
	.btnGroup{
		padding-left: 100px;
	}
</style>