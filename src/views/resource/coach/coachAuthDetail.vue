<template>
	<div class="coachAuthDetail">
		<v-pageTitle>
			<span slot="title">教练认证信息</span>
		</v-pageTitle>
		<div class="coach-detail clearfix">
			<div class="coach-icon">
				<img src="../../../assets/logo.png" alt="教练"/>
			</div>
			<div class="coachInfo">
				<div class="coach-name">
					{{coachInfo.name}}
					<span class="state">{{states[coachInfo.state]}}</span>
				</div>
				<ul class="">
					<li>性别：<span>{{coachInfo.sex === 'man'?'男':'女'}}</span></li>
					<li>年龄：<span>{{coachInfo.age}}</span></li>
					<li>户籍：<span>{{coachInfo.hhr}}</span></li>
				</ul>
				<ul class="">
					<li>电话：<span>{{coachInfo.phone}}</span></li>
					<li>驾校：<span>{{coachInfo.school}}</span></li>
					<li>所在城市：<span>{{coachInfo.address}}</span></li>
				</ul>
				<ul class="">
					<li>驾考类型：<span>{{coachInfo.coacheType}}</span></li>
					<li>教练车：<span>{{coachInfo.coachCar}}</span></li>
				</ul>
				<ul class="">
					<li>身份证号：<span>{{coachInfo.idNo}}</span></li>
				</ul>
			</div>
		</div>
		<br>
		<p>教练证件信息</p>
		<ul class="certificates clearfix">
			<li v-for="certificate in certificates">
				<div class="img-box">
					<img :src="certificate.url" />
				</div>
				<p class="certificatesName">{{certificate.name}}</p>
			</li>
		</ul>
		<div>
			<el-button type="success" @click="_pass">审核通过</el-button>
			<el-button type="primary" @click='_noPass'>审核不通过</el-button>
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
	export default {
		name:'coachAuthDetail',
		data(){
			return {
				coachInfo:{
					name:'张天翼',
					sex:'man',
					age:30,
					hhr:'深圳市',
					phone:'13536393632',
					school:'深港',
					address:'深圳市',
					coacheType:['A1','A2','C1','C2'],
					coachCar:'粤B21453',
					idNo:'325363944545X',
					state:1
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
				
				states:{
					0:'未认证',
					1:'认证通过',
					2:'认证未通过'
				},
				
				certificates:[
					{
						name:'教练证正面/工作证',
						url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3091871418,1791523410&fm=27&gp=0.jpg'
					},{
						name:'行驶证正面',
						url:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2111565289,149047732&fm=27&gp=0.jpg'
					},{
						name:'驾驶证正面',
						url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1569515108,3626089821&fm=27&gp=0.jpg'
					},{
						name:'身份证正面',
						url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=680756696,610110959&fm=27&gp=0.jpg'
					}
				]
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
			'v-iform':iform
		}
	}
</script>

<style scoped lang="scss">
	.coach-detail{
		background-color: #F1F1F1;
		padding:30px 0;
	}
	.coach-icon{
		float: left;
		width: 80px;
		border-radius: 50%;
		overflow: hidden;
		background-color: #fff;
		border: 1px solid #8b9cac;
		margin: 20px;
		img{
			min-height: 100%;
			width: 100%;
		}
	}
	.coachInfo{
		position: relative;
		margin:0 0 0 110px;
		.coach-name{
			font-size: 16px;
			padding: 0 15px;
			margin-bottom: 10px;
			.state{
				display: inline-block;
				font-size: 12px;
				color:#8b9cac;
				border: 1px solid #8b9cac;
				padding: 5px 12px;
				margin: 0px 0 0 10px;
				border-radius: 3px;
			}
		}
		ul{
			padding: 0;
			width:100%;
			li{
				display: inline-block;
				padding: 0 15px;
				color: #8b9cac;
				line-height: 1;
				margin-bottom: 5px;
				border-right: 1px solid #666;
				font-size: 12px;
			    &:last-of-type{
			    	border: none;
			    }
			}
		}
	}
	.certificates{
		margin: 20px 0;
		width: 700px;
		li{
			float: left;
			margin: 0 30px 20px 0px;
			.img-box{
				width: 297px;
				height: 201px;
				padding: 10px;
				display: table-cell;
				vertical-align: middle;
				border:1px dashed #8b9cac;
				border-bottom: none;
				text-align: center;
				
				img{
					max-width: 100%;
					display: inline-block;
					max-height: 100%;
				}
			}
			.certificatesName{
				width: 297px;
				padding: 10px;
				border:1px solid #8b9cac;
				text-align: center;
				font-size: 12px;
			}
		}
	}
</style>