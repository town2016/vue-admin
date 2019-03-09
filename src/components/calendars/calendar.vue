<template>
	<div class="calendar">
		<ul class="todoList clearfix">
			<li v-for="(date,index) in dateList" 
				 :class="{'active':selected.indexOf(index) >= 0,'default':date.state === 'default','blue':date.state === 'blue','green':date.state === 'default'}" 
				 :key="index"
				 @click="selectionHandler(date, index)">
				<span>{{date.day}}</span>
				<span>{{date.week}}</span>
			</li>
			<li class="cusTime" v-if="picker">
				<el-date-picker placeholder='自定义时间' v-model='cusTime' @change="setCusTime"></el-date-picker>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'calendar',
		data () {
			return {
				dateList: [], // 默认日程表
				selected: [], // 已选择的日程的下标
				selectedDates: [], // 已选择了日程具体时间
				cusTime: '' // 自定义的时间
			}
		},
		props: {
		  /*
		   * 是否多选
		   */
			mulity: {
				type: [Boolean, String],
				default () {
					return undefined
				}
			},
			/*
			 * 是否出现自定义日期选择框
			 */
			picker: {
				type: [Boolean, String],
				default(){
					return undefined
				}
			}
		},
		created () {
			this.makeCalendar()
			/*
			 * 默认选中当日
			 */
			this.selectionHandler(this.dateList[0], 0)
		},
		methods:{
		  /*
		   * 创建日程表
		   */
			makeCalendar () {
				const dayTimes = 86400000
				const timeStamp = new Date().setHours(0, 0, 0, 0)
				for (var i = 0; i < 14; i++) {
					var times = timeStamp+dayTimes*i
					this.dateList.push(this.dateFactory(times))
				}
			},
			/*
			 * 日期格式转换
			 */
			dateFactory (times) {
				const weeks = ['日', '一', '二', '三', '四', '五', '六']
				var newDate = new Date(times)
				var dateObj = {}
				dateObj.day = this.timeFormate(newDate).substr(5)
				dateObj.week = '周' + weeks[newDate.getDay()]
				if (newDate.getDay() % 2 === 0) {
					dateObj.state = 'blue'
				} else if (newDate.getDay() % 3 === 0) {
					dateObj.state = 'green'
				} else {
					dateObj.state = 'default'
				}
				
				dateObj.value = newDate
				
				return dateObj
			},
			/*
			 * 返回选择的日期
			 */
			selectionHandler (_date,_index) {
				if (_index === -1) {
					this.isShow = false
				} else {
					this.isShow = true
				}
				if (this.mulity) {
					var index = this.selected.indexOf(_index)
					if (index >= 0) {
						this.selected.splice(index,1)
						this.selectedDates.splice(_date,1)
					} else {
						this.selected.push(_index)
						this.selectedDates.push(_date)
					}
				} else {
					this.$set(this,'selected',[_index])
					this.$set(this,'selectedDates',[_date])
				}
				this.$emit('on-change',this.selectedDates)
			},
			/*
			 * 设置自定义的时间
			 */
			setCusTime (value) {
				if (value) {
					var _date = this.dateFactory(value)
					var _index = -1;
					this.dateList.map((item,index) =>{
						if (item.day === _date.day) {
							_index = index
						}
					})
					this.selectionHandler(_date,_index)
				}
			}
		}
	}
</script>

<style scoped lang="scss">

.todoList{
	margin: 0;
	padding: 0;
	li{
		list-style: none;
		padding: 5px 20px;
		float: left;
		margin: 5px;
		cursor: default;
		position: relative;
		overflow: hidden;
		background-color: #F1F1F1;
		span{
			display: block;
			text-align: center;
			font-size: 12px;
			margin: 1px 0;
			color: #666;
		}
		span:first-of-type{
			font-size: 12px;
		}
	}
	li.active{
		background-color: #6495ED;
		span{
			color: #fff;
		}
		&:after{
			display: none !important;
		}
	}
	li.blue{
		&:after{
			content: '';
			height: 0;
			display: block;
			position: absolute;
			border-style: solid;
			border-color: transparent  #6495ED transparent  transparent;
			border-width: 12px 12px  0px 12px;
			bottom: 0;
			right: 0;
		}
	}
	li.green{
		&:after{
			content: '';
			height: 0;
			display: block;
			position: absolute;
			border-style: solid;
			border-color: transparent lawngreen transparent  transparent;
			border-width: 12px 12px  0px 12px;
			bottom: 0;
			right: 0;
		}
	}
	li.cusTime{
		height: 45px;
		line-height: 45px;
		text-align: center;
		font-size: 12px;
		border-radius: 3px;
		
		color: #6495ed;
		box-sizing: border-box;
		padding: 0 15px;
		background-color: #fff;
		
	}
}
</style>