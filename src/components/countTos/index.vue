<template>
	<el-card class="countTos">
		<v-countTo :startVal="0" :endVal="1000" :duration="1000" class="student">
			<div slot='icon'><img src="../../assets/images/persons.png"/></div>
			<span>个</span>
			<p slot="desc" class="desc">学员</p>
		</v-countTo>
	</el-card>
</template>

<script>
	import countTo from './countTo'
	export default {
		name: 'countTos',
		components: {
			'v-countTo': countTo
		}
	}
</script>

<style scoped>
	.student{
		width: 400px;
		background-color:cornflowerblue;
	}
</style>