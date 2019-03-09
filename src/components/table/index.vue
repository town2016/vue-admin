<template>
	<el-card class="tables" ref="tables">
	  <h3 class="warn_tips" >温馨提示：使用单选表格时候rowKey属性必传，为了更好的性能，建议最好传入rowKey属性</h3>
	  <iTitle><span slot='title'>通过render函数创建自定义内容</span></iTitle>
		<v-itable 
			:tableData='tableData' 
			:tableModel="tableModel" 
			:border="border" 
			@selectionChange = 'selectChange'>
		</v-itable>
		<br>
		<iTitle><span slot='title'>通过Slot函数创建自定义内容</span></iTitle>
		<v-itable 
      :tableData='tableData' 
      :tableModel="tableModel1" 
      :border="border"
      rowKey='id'
      @selectionChange = 'selectChange'>
      <template slot='operation' slot-scope="scope">
        <el-button @click='_operation(scope)'>我是通过插槽插入的</el-button>
      </template>
    </v-itable>
    <br />
    <iTitle><span slot='title'>单选</span></iTitle>
    <v-itable 
      :tableData='tableData' 
      :tableModel="tableModel2" 
      :border="border"
      rowKey='id'
      @selectionChange = 'selectChange'>
      <template slot='operation' slot-scope="scope">
        <el-button @click='_operation(scope)'>操作</el-button>
      </template>
    </v-itable>
     <br />
    <iTitle><span slot='title'>表单式表格, 通过columns来控制一行显示几对键值对</span></iTitle>
    <v-dtable :tableData="table.tableData" :tableDoc="table.tableDoc" :columns="table.columns"></v-dtable>
	</el-card>
</template>

<script>
	import itable from './itable'
	import dtable from './dtable'
	export default {
		name:'tables',
		data(){
			return {
				border: true,
				table: {
          tableData: {
            name: 'town',
            age: 25,
            job: 'Front Engineer',
            skill: 'VUE,JS',
            workingLife: 5
          },
          tableDoc: {
            name: '姓名',
            age: '年龄',
            job: '工作',
            skill: '专业技能',
            workingLife: '工作年限'
          },
          columns: 2
        },
				tableData:[
					{
						id:1,
						type:0,
						name:'我是通过render函数生成的'
					}, {
            id:2,
            type:0,
            name:'我是通过render函数生成的'
          }
				],
				tableModel1: [
				  {
				    type:'selection',
            width:55
				  }, {
				    prop:'id',
            label:'ID',
            width:180
				  }, {
            prop:'type',
            label:'类型',
            width:180,
            formatter(row,col,colVal){
              return colVal == 0?'类型1':'类型二'
            }
          }, {
				    slot: 'operation',
				    label: '操作'
				  }
				  
				],
				tableModel2: [
          {
            type:'radio',
            width:55
          }, {
            prop:'id',
            label:'ID',
            width:180
          }, {
            prop:'type',
            label:'类型',
            width:180,
            formatter(row,col,colVal){
              return colVal == 0?'类型1':'类型二'
            }
          }, {
            slot: 'operation',
            label: '操作'
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
			},
			_operation (row) {
			  console.log(row.scope)
			}
		},
		components:{
			'v-itable':itable,
			'v-dtable': dtable
		}
	}
</script>

<style>
</style>