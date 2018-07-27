<template>
	<div class="dtable">
	
		<table>
			<tr v-for="(tds,index) in tables" :key="index">
				<td v-for="(td,index) in tds" :class='{col:index%2 == 0,colVal:index%2 != 0}' >
					<span v-if="index%2 == 0">{{ tableDoc[td] != undefined ? tableDoc[td] : td }}</span>
					<span v-else>{{ td }}</span>
				</td>
			</tr>
		</table>
		
	</div>
</template>

<script>
	export default {
		name:'dtable',
		data(){
			return {
				tables:[]
			}
		},
		props:{
			columns:{
				type:Number,
				default (){
					return 2
				}
			},
			tableData:{
				type:Object,
				default(){
					return {}
				}
			},
			tableDoc:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		created(){
			this._initData();
		},
		methods:{
			_initData(){
				var that = this;
				var keys = Object.keys(this.tableData);
				this.tables = [];
				var Lists = [];
				while(keys.length>0){
					Lists.push(keys.splice(0,this.columns));
				};
				
				Lists.map(item =>{
					for(var k =0;k<item.length;k++){
					    if(this.tableData[item[k]] != undefined){
					    	item.splice((k+1),0,this.tableData[item[k]]);
					    	k++;
					    }
					}
					if(item.length<this.columns*2){
						item.length = this.columns*2;
					}
				});
				
				this.tables = Lists;
			}
		},
		computed:{
			cols(){
				return Math.ceil(24/this.columns)
			}
		}
	}
</script>

<style scoped lang="scss">

table{
	width: 100%;
	table-layout: fixed;
	border-collapse: collapse;
	margin-top: -1px;
	td{
		border: 1px solid #ebeef5;
		position: relative;
		padding: 10px 15px;
		word-break: break-all;
	}
	.tdInner{
		height: 100%;
		position: relative;
		display: flex;
	}
	.col{
		width: 20%;
		background-color: #f5f7fa;
	}
	.colVal{
		width: 80%;
	}
}

</style>