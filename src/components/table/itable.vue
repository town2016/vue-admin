<template>
	<div class="itable">
		<el-table
			:data="tableData"
			:border="border"
			highlight-current-row
			:span-method="merge"
			@current-change="handleCurrentChange"
			@selection-change="selectChangeHandler"
			style="width: 100%;">
			<el-table-column
				v-for="(col,index) in tableModel"
				:prop="col.prop"
				:label="col.label"
				:align="col.align"
				:key="col.prop"
				:width="col.width"
				:formatter="col.formatter"
				v-if="col.render === undefined && col.type === undefined && col.slot === undefined">
			</el-table-column>
			<el-table-column
			  :align="col.align"
			  v-else-if="col.type === 'selection' && col.render === undefined"
			  :type="col.type"
			  :width="col.width"
			  :selectable="col.selectable">
			</el-table-column>
			<el-table-column
        :align="col.align"
        v-else-if="col.type === 'radio' && col.render === undefined"
        :type="col.type"
        :width="col.width"
        :selectable="col.selectable">
        <template slot-scope='scope'>
          <el-radio v-model='curRowKey' :label='scope.row[rowKey]'>&nbsp;</el-radio>
        </template>
      </el-table-column>
			<el-table-column
				v-else-if="col.type === undefined && col.render !== undefined"
				:label="col.label"
				:id="col.prop"
				:align="col.align"
				:width="col.width"
				:key="col.prop">
				<template slot-scope='scope'>
					<v-render  :render="col.render" :row="scope"  :column="scope.row.column" :index="scope.row.$index" ></v-render>
				</template>
			</el-table-column>
			<el-table-column
			  :label="col.label"
			  v-else-if="col.slot" >
        <template slot-scope='scope'>
          <slot name='operation' :scope='scope'></slot>
        </template>
    </el-table-column>
		</el-table>
	</div>
</template>

<script>
	import render from './expand'
	export default {
		name: 'itable',
		data () {
		  return {
		    curRowKey: ''
		  }
		},
		props: {
			tableData: {
				type: Array,
				default(){
					return []
				}
			},
			tableModel: {
				type: Array,
				default(){
					return []
				}
			},
			border: {
				type: Boolean,
				default (){
					return false
				}
			},
			rowKey: {
			  type: [String, Number]
			},
			selectionChange: {
				type: Function,
				default(){
					return ''
				}
			},
			merge: {
        type: Function,
        default(){
          return function () {
            return {rowspan: 1, colspan: 1}
          }
        }
      }
		},
		created () {},
		methods: {
		  // 复选框发生变化的时候
			selectChangeHandler(selections){
				this.$emit('selectionChange', selections)
			},
			// 单选发生变化的时候
			handleCurrentChange (row) {
			  this.curRow = row
			  this.curRowKey = row[this.rowKey]
			  this.$emit('currentChange', row)
			}
		},
		components: {
			'v-render': render
		}
	}
</script>

<style>
</style>