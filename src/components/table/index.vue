<template>
	<el-card class="tables" ref="tables">
		<v-itable 
			:tableData='tableData' 
			:tableModel="tableModel" 
			:border="border" 
			@selectionChange = 'selectChange'>
		</v-itable>
	</el-card>
</template>

<script>
	import itable from './itable'
	export default {
		name:'tables',
		data(){
			return {
				border:true,
				tableData:[
					{
						id:1,
						type:0,
						name:'查看render'
					}
				],
				tableModel:[
					{
						type:'selection',
						width:55
					},
					{
						prop:'id',
						label:'ID',
						width:180,
					},
					{
						prop:'type',
						label:'类型',
						width:180,
						formatter(row,col,colVal){
							return colVal == 0?'类型1':'类型二'
						}
					},
					{
						prop:'name',
						label:'名称',
						render:(h,params) =>{
							return h(
								'a',
								{
									class:{
										'link-type':true
									},
									attrs:{
										'href':'javascript:;'
									},
									on:{
										click:() =>{
											this.clickEvents(params);
										}
									}
								},
								params.row.name
							)
						},
						method:(scope) =>{
							this.$message({
					          message: 'render success',
					          type: 'success'
					        });
						}
					}
				]
			}
		},
		methods:{
			selectChange(selections){
				console.log(selections)
			},
			clickEvents(params){
				console.log(params);
			}
		},
		components:{
			'v-itable':itable
		}
	}
</script>

<style>
</style>