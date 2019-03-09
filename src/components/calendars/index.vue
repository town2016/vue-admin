<template>
	<div class="calendars">
	  <iTitle><span slot='title'>普通日程表，默认展示以当天为第一天的向后展开两周的时间</span></iTitle>
		<v-calendar></v-calendar><br>
		<iTitle><span slot='title'>自选日期，查询不在默认日期的任务安排，可以查询之前和之后的</span></iTitle>
    <v-calendar picker='true'></v-calendar><br>
    <iTitle><span slot='title'>多选，查询多个日期的任务安排</span></iTitle>
    <v-calendar mulity='true'></v-calendar>
	</div>
</template>

<script>
	import calendar from './calendar'
	export default {
		name:'calendars',
		components:{
			'v-calendar':calendar
		}
	}
</script>

<style>
</style>