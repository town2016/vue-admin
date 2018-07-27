<template>
	<div class="integralDetail">
		<v-pageTitle>
			<span slot='title'>积分明细</span>
		</v-pageTitle>
		<v-btnGroup>
			<el-button type=primary>导出</el-button>
		</v-btnGroup>
		<v-itable :tableModel="table.tableModel" :tabData="table.tableData" border></v-itable>
	</div>
</template>

<script>
	import pageTitle from 'common/pageTitle'
	import btnGroup from 'common/btnGroup'
	import itable from 'components/table/itable'
	import {integralDetail_tableModel} from 'base/api/resource/resource'
	export default {
		name:'integralDetail',
		data(){
			return {
				table:{
					tableModel:integralDetail_tableModel,
					tableData:[]
				}
			}
		},
		components:{
			'v-pageTitle':pageTitle,
			'v-btnGroup':btnGroup,
			'v-itable':itable
		}
	}
</script>

<style>
</style>