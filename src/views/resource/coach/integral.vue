<template>
	<div class="students">
		<v-iform :fields="search.formModel" :fieldData="search.formData"ref="searchForm">
			<div slot="iform-btns">
				<el-button type="success" size="small" @click="_valiDate">查询</el-button>
				<el-button type="default" size="small" @click="_reset">重置</el-button>
			</div>
		</v-iform>
		<!--<v-btnGroup>
			<el-button type="primary" size="small">导出</el-button>
		</v-btnGroup>-->
		<v-itable :tableModel="table.tableModel" border :tableData='table.tableData'></v-itable>
		<br>
		<div align="center">
			<el-pagination
		      @size-change="_handleSizeChange"
		      @current-change="_handleCurrentChange"
		      :current-page="pager.p"
		      :page-sizes="pager.sizes"
		      :page-size="pager.s"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="pager.total">
		    </el-pagination>
		</div>
	</div>
</template>

<script>
	import {integral_formModel,integral_tableModel} from 'base/api/resource/resource'
	import btnGroup from 'common/btnGroup'
	import itable from 'components/table/itable'
	import iform from 'components/Forms/iform'
	export default {
		name:'students',
		data(){
			return {
				search:{
					formModel:integral_formModel,
					formData:{}
				},
				table:{
					tableModel:[
						{
							label:'备注',
							render:(h,params) =>{
								return h('span',{
									on:{
										click:() =>{
											
										}
									}
								},'明细')
							}
						}
					],
					tableData:[]
				},
				pager:{
					total:10,
					p:0,
					s:10,
					sizes:[10,20,40]
				}
			}
		},
		created(){
			this.table.tableModel = [...integral_tableModel,...this.table.tableModel];
		},
		components:{
			'v-iform':iform,
			'v-btnGroup':btnGroup,
			'v-itable':itable
		},
		methods:{
			_valiDate(){
				this.$refs.searchForm.valiDate();
			},
			_reset(){
				this.$refs.searchForm.$emit('resetForm');
			},
			_handleSizeChange(){
				
			},
			_handleCurrentChange(){
				
			}
		}
	}
</script>

<style>
</style>