<template>
	<div class="carAuthDetail">
		<v-pageTitle>
			<span slot="title">车辆认证详情</span>
		</v-pageTitle>
		<div class="detail">
			<p>{{authDetail.carNo}} <span class="state">{{states[authDetail.state]}}</span></p>
			<p>车辆类型：<span>{{authDetail.carType}}</span></p>
			<p>教练：{{authDetail.coach}}</p>
			<p>行驶证信息：</p>
			<ul class="imgList">
				<li v-for="img in authDetail.imgs">
					<el-card>
						<img :src="img.src" />
					</el-card>
				</li>
			</ul>
		</div>
		<v-btnGroup>
			<el-button type="success" size="small" @click="_pass">审核通过</el-button>
			<el-button type="primary" size="small" @click="_noPass">审核不通过</el-button>
		</v-btnGroup>
		
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
	import btnGroup from 'common/btnGroup'
	import pageTitle from 'common/pageTitle'
	import iform from 'components/Forms/iform'
	export default {
		name:'carAuthDetail',
		data(){
			return {
				authDetail:{
					carNo:'粤B1234学',
					carType:'C1',
					coach:'张教练',
					state:0,
					imgs:[
						{src:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1648389404,2745940178&fm=27&gp=0.jpg'},
						{src:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3062509777,1416356248&fm=27&gp=0.jpg'}
					]
				},
				states:{
					'0':'未认证',
					'1':'认证通过',
					'2':'认证不通过'
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
			}
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
		},
		components:{
			'v-pageTitle':pageTitle,
			'v-btnGroup':btnGroup,
			'v-iform':iform
		}
	}
</script>

<style scoped lang="scss">
.carAuthDetail{
	.state{
		display: inline-block;
		padding: 3px 15px;
		border: 1px solid #6495ED;
		color: #6495ED;
		border-radius: 4px;
		margin-left: 10px;
	}
	p{
		padding: 5px;
	}
	.imgList{
		li{
			margin: 10px 0;
		}
		.el-card{
			width: 300px;
			img{
				width: 100%;
			}
		}
		
	}
}


</style>