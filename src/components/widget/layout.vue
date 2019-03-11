<template>
	<div class="layout">
		<v-toper></v-toper>
		<div class="container">
			<v-sideBar></v-sideBar>
			<div class="main-content">
			  <v-taber></v-taber>
			  <v-Crumbs></v-Crumbs>
				<el-card :class="{'_blank':ishome}">
					<router-view></router-view>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script>
	import toper from 'components/widget/toper'
	import sideBar from 'components/widget/sideBar'
	import Crumbs from 'components/crumbs'
	import taber from 'components/taber'
	export default {
		name:'layput',
		data(){
			return {
				ishome:false
			}
		},
		created(){
			if(this.$route.name == 'home'){
				this.ishome = true;
			}
		},
		watch:{
			$route:function(val,oval){
				if(val.name == 'home'){
					this.ishome = true;
				}else{
					this.ishome = false;
				}
			}
		},
		components:{
			'v-toper':toper,
			'v-sideBar':sideBar,
			'v-Crumbs': Crumbs,
			'v-taber': taber
		}
	}
</script>

<style scoped lang="scss">
.layout{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.container{
		width: 100%;
		flex: 1;
		height: 100%;
		overflow: hidden;
		display: -webkit-flex;
	}
	.main-content{
		flex: 1;
		height: 100%;
		padding:15px;
		box-sizing: border-box;
		background-color: #f1f1f1;
		overflow: auto;
	}
	._blank{
		box-shadow: none;
		background-color: transparent;
		height: 100%;
	}
}
</style>