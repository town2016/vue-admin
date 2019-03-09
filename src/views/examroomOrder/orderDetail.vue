<template>
	<div class="examroomOrderDetail">
		<v-pageTitle>
			<span slot="title">订单号：d1f8e7102abd4477b182b15cf641132c</span>
			<span slot="expand" class="expand">订单状态：已支付</span>
			<span slot="subExpand">订单详情</span>
		</v-pageTitle>
		<br>
		<v-dtable  :tableData="table.tableData" :tableDoc="table.tableDoc" :columns="table.columns"></v-dtable>
	</div>
</template>

<script>
	import pageTitle from 'common/pageTitle'
	import dtable from 'components/table/dtable'
	export default {
		name:'examroomOrderDetail',
		data(){
			return {
				table:{
					tableData:{
						name:'town',
						age:25,
						job:'Front Engineer',
						skill:'VUE,JS',
						workingLife:5
					},
					tableDoc:{
						name:'姓名',
						age:'年龄',
						job:'工作',
						skill:'专业技能',
						workingLife:'工作年限'
					},
					columns:2
				}
			}
		},
		components:{
			'v-pageTitle':pageTitle,
			'v-dtable':dtable
		}
	}
</script>

<style scoped lang="scss">
.examroomOrderDetail{
	.expand{
		margin-left: 100px;
	}
}
</style>