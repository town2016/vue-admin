<template>
	<div class="addScheduling">
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
				<v-calendar mulity ></v-calendar>
			</div>
		</div>
		<br>
		<div class="form-wrapper" >
			<el-form label-width="150px">
				<el-form-item label="价格："  >
					<el-input placeholder="价格" class="align-width">
						<template slot="append">元/小时</template>
					</el-input>
				</el-form-item>
				<!--<el-form-item label="内部价格："  >
					<el-input placeholder="请输入内部价格" class="align-width">
						<template slot="append">元/小时</template>
					</el-input>
				</el-form-item>-->
				<el-form-item label="最小预约时段：" >
					<el-select v-model="form.formData.timeAtr" class="align-width" @change="_setMintSlot">
						  	<el-option
						      v-for="item in form.options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排班时间：" >
					<div class="reserveTimes">
						<div class="block" v-for="(timeSlot,index) in reserveTimes" :class="{newSlot:index!=0}">
							<el-time-picker
								class="timePicker"
							    v-model="timeSlot.startTime"
							    value-format = 'HH:mm'
							    :picker-options="{
							      selectableRange: '00:00:00 - 22:00:00',
							      format:'HH:mm'
							    }"
							    @change="_setTimes($event,timeSlot)"
							    placeholder="请选择开始时间">
						    </el-time-picker>
						    
						    <span>&nbsp;至&nbsp;</span>
						    <el-time-picker
						    	readonly
						    	class="timePicker"
						    	value-format = 'HH:mm'
							    v-model="timeSlot.endTime"
							    :picker-options="{
							      selectableRange: '00:00:00 - 21:59:59',
							      format:'HH:mm'
							    }"
							    placeholder="请选择结束时间">
						    </el-time-picker>
						    <el-button type='primary' class="timebts" @click="_addNewTimeSlot" v-if="index == 0">添加时间段</el-button>
						    <el-button type='text' class="timebts deleteBtn" @click="_deleteNewTimeSlot(index)" v-if="index != 0"><i class="el-icon-circle-close-outline"></i></el-button>
						</div>
					</div>
				</el-form-item>
				<el-form-item label="最小时段内车辆数：" type="number" >
					{{form.formData.c1Count>0&&form.formData.c2Count?(form.formData.c1Count*1+form.formData.c2Count*1):0}}车
				</el-form-item>
				<el-form-item label="c1车数："  >
					<el-input  class="align-width" v-model="form.formData.c1Count" placeholder="没有该车辆，填0/不填"></el-input>
				</el-form-item>
				<!--<el-form-item label="c1预留内部："  >
					<el-input  class="align-width"></el-input>
				</el-form-item>-->
				<el-form-item label="c2车数："  >
					<el-input  class="align-width" v-model="form.formData.c2Count" placeholder="没有该车辆，填0/不填"></el-input>
				</el-form-item>
				<!--<el-form-item label="c2预留内部："  >
					<el-input  class="align-width"></el-input>
				</el-form-item>-->
				<el-form-item label="预留失效天数："  >
					<el-input  class="align-width"></el-input>
				</el-form-item>
				<el-form-item label="优惠配置："  >
					<div class="block">
						 <el-radio v-model="form.formData.transfrom" label="1">返积分</el-radio>
						 <div class="transfrom">
						 	<el-select v-model="form.formData.timeAtr" class="align-inner-width">
								<el-option v-for="opt in form.options" :key="opt.value" :lable="opt.label" :value="opt.value"></el-option>
							</el-select>
							<span>&nbsp;返&nbsp;</span>
							<el-select v-model="form.formData.timeAtr" class="align-inner-width">
								<el-option v-for="opt in form.options" :key="opt.value" :lable="opt.label" :value="opt.value"></el-option>
							</el-select>
						 </div>
					</div>
					<!--<div class="block">
						 <el-radio v-model="form.formData.transfrom" label="2">反课时</el-radio>
						 <div class="transfrom">
						 	<el-select v-model="form.formData.timeAtr" class="align-inner-width">
								<el-option v-for="opt in form.options" :key="opt.value" :lable="opt.label" :value="opt.value"></el-option>
							</el-select>
							<span>&nbsp;返&nbsp;</span>
							<el-select v-model="form.formData.timeAtr" class="align-inner-width">
								<el-option v-for="opt in form.options" :key="opt.value" :lable="opt.label" :value="opt.value"></el-option>
							</el-select>
						 </div>
					</div>
					<div class="block">
						 <el-radio v-model="form.formData.transfrom" label="3">现金</el-radio>
					</div>-->
				</el-form-item>
				<el-form-item style="margin-left: -110px;">
					<el-checkbox  v-model="form.formData.isPublishTime" label="true">发布排班时间</el-checkbox >
					<div class="transfrom">
						<el-date-picker 
							type="date" 
							v-model="form.formData.publishTime.ymd" 
							placeholder="请选择日期"
							class="publishtime">
						</el-date-picker>
						<el-time-picker
						    	class="publishtime"
						    	v-model="form.formData.publishTime.hms"
							    :picker-options="{
							      selectableRange: '08:30:00 - 15:30:00'
							    }"
							    placeholder="请选择结束时间">
						    </el-time-picker>
					</div>
				</el-form-item>
			</el-form>
		</div>
		
		<v-btnGroup>
			<el-button>返回</el-button>
			<el-button type="primary" v-if="form.formData.isPublishTime">保存</el-button>
			<el-button type="primary" v-else>立即发布</el-button>
		</v-btnGroup>
		
	</div>
</template>

<script>
	import pageTitle from 'common/pageTitle'
	import btnGroup from 'common/btnGroup'
	import calendar from 'components/calendars/calendar'
	import iform from 'components/Forms/iform'
	import {add_formModel} from 'base/api/scheduling/scheduling.js'
	export default {
		name:'addScheduling',
		components:{
			'v-pageTitle': pageTitle,
			'v-calendar': calendar,
			'v-btnGroup': btnGroup,
			'v-iform':iform
		},
		data(){
			return {
				form:{
					inline:false,
					fromModel:add_formModel,
					formData:{
						isPublishTime:false,
						timeAtr:2,
						publishTime:{
							ymd:'',
							hms:''
						}
					},
					options:[
						{label:'2小时',value:2}
					]
				},
				reserveTimes:[
					{
						startTime:'',
						endTime:'',
						
					}
				]
			}
		},
		methods:{
			_addNewTimeSlot(){
				var lastSlot = this.reserveTimes[this.reserveTimes.length-1];
				if(lastSlot.startTime == ''){
					this.$message({
						message:'请先添加当前时间段',
						type:'warning'
					});
					return;
				}
				var data = {
					startTime:'',
					endTime:''
				};
				
				if(lastSlot.endTime.split(":")[0]*1<22){
					data.startTime = lastSlot.endTime;
					data = this._setTimes(data.startTime,data);
				}
				this.reserveTimes.push(data);
			},
			_deleteNewTimeSlot(index){
				this.reserveTimes.splice(index,1);
			},
			_setMintSlot(val){
				this.reserveTimes.map((item) =>{
					if(item.startTime != ''){
						this._setTimes(item.startTime,item);
					}
				})
			},
			_setTimes($event,slot){
				if($event != null){
					var strT = $event.split(":");
					slot.endTime =  strT[0]*1+this.form.formData.timeAtr+':'+strT[1];
				}else{
					slot.startTime = '';
					slot.endTime = '';
				};
				return slot;
			}
		}
	}
</script>

<style scoped lang="scss">
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
.form-wrapper{
	.el-form-item__label{
		width: 100px !important;
	}
	
	.block{
		margin-bottom: 20px;
		position: relative;
	}
	.align-width{
		width: 370px !important;
	}
	.align-inner-width{
		width: 135px;
	}
	.reserveTimes{
		.timebts{
			position: absolute;
			top: 0;
			left: 400px;
		}
		.deleteBtn{
			color: #ff0000;
		}
		.timePicker{
			width: 170px;
		}
		
	}
	.publishtime{
		width: 181px;
	}
}
.transfrom{
	display: inline-block;
}
</style>