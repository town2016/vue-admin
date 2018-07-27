<template>
	<div class="coachDetail">
		<v-pageTitle>
			<span slot="title">教练信息</span>
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
		
		<el-tabs v-model="tab.activeName">
		    <el-tab-pane label="绑定学员" name="first">
		    	<v-students></v-students>
		    </el-tab-pane>
		    <el-tab-pane label="个人账户" name="second">
		    	<v-account></v-account>
		    </el-tab-pane>
		    <el-tab-pane label="积分管理" name="third">
		    	<v-integral></v-integral>
		    </el-tab-pane>
	  	</el-tabs>
		
		
	</div>
</template>

<script>
	import students from './students'
	import account from './account'
	import pageTitle from 'common/pageTitle'
	import integral from './integral'
	export default {
		name:'coachDetail',
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
				
				states:{
					0:'未认证',
					1:'认证通过',
					2:'认证未通过'
				},
				tab:{
					activeName:'first'
				}
			}
		},
		created(){
			console.log(this.$route.query);
		},
		components:{
			'v-pageTitle':pageTitle,
			'v-students':students,
			'v-account':account,
			'v-integral':integral
		}
	}
</script>

<style scoped lang="scss">
.coachDetail{
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
				color:#6495ED;
				border: 1px solid #6495ED;
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
}
</style>