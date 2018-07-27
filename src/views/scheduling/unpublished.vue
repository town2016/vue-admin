<template>
	<div class="unpublished">
		<v-pageTitle>
			<span slot="title">排班管理</span>
			<span slot="subTitle">排班管理</span>
		</v-pageTitle>
		<br>
		<div class="calendar-wrapper clearfix">
			<div class="label">
				排班日期
			</div>
			<div class="calendar-box">
				<v-calendar @on-change="_getTodoList" picker></v-calendar>
			</div>
		</div>

		<v-btnGroup v-if="isShow">
			<el-button type='primary' @click="_addNew">新增排班</el-button>
		</v-btnGroup>
		<br>
		<div class="date-plan">
			<div class="plan-header">
				<div class="plan-date">{{calendar.curDate.day}}</div>
				<div class="plan-name">预约情况</div>
			</div>
			<v-ctable 
				:theaderModel='table.theaderModel' 
				:tbodyModel="table.tbodyModel" 
				:tbodyData="table.tbodyData" 
				:theaderData='theaderData' 
				border
				headerClass="theader">
			</v-ctable>
		</div>

	</div>
</template>

<script>
	import ctable from 'components/table/ctable'
	import pageTitle from 'common/pageTitle'
	import btnGroup from 'common/btnGroup'
	import calendar from 'components/calendars/calendar'
	import itable from 'components/table/itable'
	export default {
		name: 'unpublished',
		data() {
			return {
				table: {

					theaderModel: [{
							type: 'text',
							width: 100,
							label: '当日汇总'
						}, {
							prop: 'outerPrice_ave',
							width: 150,
							classes: 'brnone',
							render: (h, params) => {
								return h('span', '外部均价：' + params.row.outerPrice_ave.toFixed(2) + '/小时')
							}
						}, {
							prop: 'innerPrice_ave',
							width: 150,
							classes: 'blnone',
							render: (h, params) => {
								return h('span', '内部均价：' + params.row.innerPrice_ave.toFixed(2) + '/小时')
							}
						}, {
							prop: 'c1Count',
							width: 100,
							classes: 'brnone',
							render: (h, params) => {
								return h('span', 'C1数：' + params.row.c1Count)
							}
						}, {
							prop: 'c1Reserve',
							width: 100,
							classes: 'blnone',
							render: (h, params) => {
								return h('span', '预留数：' + params.row.c1Reserve)
							}
						}, {
							prop: 'c2Count',
							width: 100,
							classes: 'brnone',
							render: (h, params) => {
								return h('span', 'C2数：' + params.row.c1Count)
							}
						}, {
							prop: 'c2Reserve',
							width: 100,
							classes: 'blnone',
							render: (h, params) => {
								return h('span', '预留数：' + params.row.c1Reserve)
							}
						}, {
							prop: 'progress',
							width: 350,
							render: (h, params) => {
								return h('div', [
									h('el-progress', {
										props: {
											'text-inside': true,
											'stroke-width': 18,
											'percentage': Math.ceil(params.row.reserved / params.row.total * 100)
										},
										style: {
											width: '60%',
											float: 'left',
											'text-align': 'left'
										}
									}),
									h('span', {
										style: {
											width: '38%',
											float: 'right',
											'text-align': 'right'
										}

									}, '预约进度：' + params.row.reserved + '/' + params.row.total)
								])
							}
						}, {
							width: 180,
							render: (h, params) => {
								return h('div', {
									style: {
										display: 'flex',
										width: '100%',
										'justify-content': 'space-between'
									}
								}, [
									h('el-button', {
										attrs: {
											type: 'text'
										},
										on: {
											click: () => {
												var msg = '确定发布当日全部排班？';
												var cbok = function(){alert(1)};
												this._confirm(msg,cbok);
											}
										}
									}, '发布排班'),
									h('el-button', {
										attrs: {
											type: 'text',
										},
										style: {
											color: '#ff0000'
										},
										on: {
											click: () => {
												var msg = '确定删除当日全部排班？';
												var cbok = function(){alert(1)};
												this._confirm(msg,cbok);
											}
										}
									}, '删除')
								])
							}
						}

					],
					tbodyModel: [{
						prop: 'createDate',
					}, {
						prop: 'outerPrice',
						classes: 'brnone',
						render: (h, params) => {
							return h('span', '外部均价：' + params.row.outerPrice.toFixed(2) + '/小时')
						}
					}, {
						prop: 'innerPrice',
						classes: 'blnone',
						render: (h, params) => {
							return h('span', '内部均价：' + params.row.innerPrice.toFixed(2) + '/小时')
						}
					}, {
						prop: 'c1Count',
						classes: 'brnone',
						render: (h, params) => {
							return h('span', 'C1数：' + params.row.c1Count)
						}
					}, {
						prop: 'c1Reserve',
						classes: 'blnone',
						render: (h, params) => {
							return h('span', '预留数：' + params.row.c1Reserve)
						}
					}, {
						prop: 'c2Count',
						classes: 'brnone',
						render: (h, params) => {
							return h('span', 'C2数：' + params.row.c1Count)
						}
					}, {
						prop: 'c2Reserve',
						classes: 'blnone',
						render: (h, params) => {
							return h('span', '预留数：' + params.row.c1Reserve)
						}
					}, {
						prop: 'progress',
						render: (h, params) => {
							return h('div', [
								h('el-progress', {
									props: {
										'text-inside': true,
										'stroke-width': 18,
										'percentage': Math.floor((params.row.c2Reserve + params.row.c1Reserve) / (params.row.c1Count + params.row.c2Count) * 100)
									},
									style: {
										width: '60%',
										float: 'left',
										'text-align': 'left'
									}
								}),
								h('span', {
									style: {
										width: '38%',
										float: 'right',
										'text-align': 'right'
									}

								}, '预约进度：' + (params.row.c2Reserve + params.row.c1Reserve) + '/' + (params.row.c1Count + params.row.c2Count))
							])
						}
					}, {
						render: (h, params) => {
							return h('div', {
								style: {
									display: 'flex',
									width: '100%',
									'justify-content': 'space-between'
								}
							}, [
								h('el-button', {
									attrs: {
										type: 'text'
									},
									on: {
										click: () => {
											var msg = `确定发布当前<span class="link-type">${params.row.createDate}</span>排班？`;
											var cbok = function(){alert(1)};
											this._confirm(msg,cbok);
										}
									}
								}, '发布排班'),
								h('el-button', {
									attrs: {
										type: 'text'
									},
									on: {
										click: () => {
											this.$router.push({
												name:'addScheduling'
											})
										}
									}
								}, '编辑'),
								h('el-button', {
									attrs: {
										type: 'text'
									},
									style: {
										color: '#ff0000'
									},
									on: {
										click: () => {
											var msg = `确定删除当前<span class="link-type">${params.row.createDate}</span>排班？`;
											var cbok = function(){alert(1)};
											this._confirm(msg,cbok);
										}
									}
								}, '删除')
							])
						}
					}],
					
					tbodyData: [{
						id:'1N',
						createDate: '06:30-08:30',
						outerPrice: 198,
						innerPrice: 157,
						c1Count: 50,
						c1Reserve: 20,
						c2Count: 50,
						c2Reserve: 10
					}, {
						id:'2N',
						createDate: '08:30-10:30',
						outerPrice: 180,
						innerPrice: 120,
						c1Count: 50,
						c1Reserve: 20,
						c2Count: 40,
						c2Reserve: 12
					}]
				},
				calendar:{
					curDate:[]
				},
				isShow:true
			}
		},
		components: {
			'v-pageTitle': pageTitle,
			'v-calendar': calendar,
			'v-itable': itable,
			'v-btnGroup': btnGroup,
			'v-ctable': ctable
		},
		created() {},
		methods:{
			/*拉取排班列表*/
			_getTodoList(dates){
				this.calendar.curDate = dates[0];
				var newDate = new Date().setHours(0,0,0,0);
				if(this.calendar.curDate.value.getTime()<newDate){
					this.isShow = false;
				}else{
					this.isShow = true;
				}
			},
			
			/*新增排班*/
			_addNew(){
				this.$router.push({
					name:'addScheduling'
				})
			},
			
			/*确认框*/
			_confirm(msg,cbok){
				this.$confirm(msg,'提示',{
					  dangerouslyUseHTMLString: true,
					  confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
				}).then(() =>{
					cbok && cbok();
				});
			},
			
			
		},
		computed: {
			theaderData() {
				var data = {
					outerPrice_ave: 0,
					innerPrice_ave: 0,
					c1Count: 0,
					c1Reserve: 0,
					c2Count: 0,
					c2Reserve: 0,
					reserved: 0,
					total: 0
				};
				var len = this.table.tbodyData.length,
					outerPrice_sum = 0,
					innerPrice_sum = 0;
				this.table.tbodyData.map(item => {
					outerPrice_sum += item.outerPrice;
					innerPrice_sum += item.innerPrice;
					data.c1Count += item.c1Count;
					data.c2Count += item.c2Count;
					data.c1Reserve += item.c1Reserve;
					data.c2Reserve += item.c2Reserve;
				});
				data.reserved = data.c1Reserve + data.c2Reserve;
				data.total = data.c1Count + data.c2Count;
				data.outerPrice_ave = outerPrice_sum / len;
				data.innerPrice_ave = innerPrice_sum / len;
				return data;
			}

		}
	}
</script>

<style  lang="scss">
	.plan-header {
		width: 100%;
		height: 60px;
		border: 1px solid #F1F1F1;
		border-bottom: none;
		line-height: 60px;
		text-align: center;
		.plan-date {
			width: 100px;
			float: left;
		}
		.plan-name {
			margin: 0 0 0 100px;
		}
	}
	
	.calendar-wrapper {
		.label {
			width: 100px;
			text-align: center;
			float: left;
			margin-top: 10px;
		}
		.calendar-box {
			margin: 0 0 0 100px;
		}
	}
	
	.date-plan {
		table tr.theader {
			background: #f5f7fa;
		}
		table.border {
			td.blnone {
				border-left: none !important;
			}
			td.brnone {
				border-right: none !important;
			}
		}
	}
</style>