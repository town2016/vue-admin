<template>
	<div class="customTable" >
		<table :style="{width:tableWidth+'px'}" :class="{'border':border}">
			<thead v-if="theaderModel.length>0" >
				<tr :class="headerClass">
					<td v-for="(head,Hindex) in theaderModel" :key="Hindex" v-if="head.type && head.type == 'text' " :style="{width:head.width+'px'}" :class="head.classes">{{head.label}}</td>
					<td v-else-if="head.type == undefined && head.render == undefined">{{headerData[0][head.prop]}}</td>
					<td v-else :style="{width:head.width+'px'}" :class="head.classes">
						<v-render  :render="head.render" :row="headerData[0]"  :column="head" :index="Hindex"></v-render>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="body in bodyData">
					<td v-for="(tr,Bindex) in tbodyModel" v-if="tr.type && tr.type == 'text' ">{{tr.label}}</td>
					<td v-else-if="tr.type == undefined && tr.render == undefined">{{body.row[tr.prop]}}</td>
					<td v-else :style="{width:tr.width+'px'}" :class="tr.classes">
						<v-render  :render="tr.render" :row="body"  :column="tr" :index="Bindex"></v-render>
					</td>
				</tr>
			</tbody>
			<tbody v-if="tfooterModel.length>0">
				<tr :class="footerClass">
					<td v-for="head in tfooterModel"></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import render from 'components/table/expand.js'
	export default {
		name:'customTable',
		data(){
			return {
				headerData:[],
				bodyData:[],
				arr:[{name:'1'},{text:'2'}]
			}
		},
		components:{
			'v-render':render
		},
		props:{
			theaderModel:{
				type:Array,
				default(){
					return {}
				}
			},
			theaderData:{
				type:Object,
				default(){
					return {}
				}
			},
			tbodyModel:{
				type:Array,
				default(){
					return []
				}
			},
			tbodyData:{
				type:Array,
				default(){
					return []
				}
			},
			tfooterModel:{
				type:Array,
				default(){
					return []
				}
			},
			headerClass:{
				type:String,
				default(){
					return ''
				}
			},
			footerClass:{
				type:String,
				default(){
					return ''
				}
			},
			border:{
				type:[Boolean,String],
				default(){
					return undefined
				}
			},
			headerClass:{
				type:String,
				default(){
					return ''
				}
			}
		},
		created(){
			this.$set(this,'headerData',this._dataTranform([this.theaderData]));
			this.$set(this,'bodyData',this._dataTranform(this.tbodyData));
		},
		methods:{
			_dataTranform(arr){
				var newArr = [];
				arr.map((item,index) =>{
					newArr.push({
						index:index,
						row:item
					});
				});
				return newArr;
			},
			_tableWidth(arr){
				var tabelWidth = 0;
				arr.map(item =>{
					if(item.width){
						tabelWidth += item.width
					}
				});
				return tabelWidth;
			}
		},
		computed:{
			tableWidth(){
				return this._tableWidth(this.theaderModel);
			}
		}
		
	}
</script>

<style scoped lang="scss">
.customTable {
	width: 100%;
	overflow: auto;
	border: 1px solid #ebeef5;
	border-top: none;
	table{
		border-collapse: collapse;
		border-color: #F1F1F1;
		min-width: 100%;
		table-layout: fixed;
		tbody{
			tr:hover{
				td{
					background-color: #f5f7fa;
				}
			}
		}
		td{
			text-align: center;
			border-top: 1px solid #ebeef5;
			padding: 0 10px;
		}
	}
	table.border{
		td{
			border-left: 1px solid #ebeef5;
			border-right: 1px solid #ebeef5;
		}
	}
	
}
</style>