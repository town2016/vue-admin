<template>
	<div class="timerpicker">
		<v-ctimepicker></v-ctimepicker>
	</div>
</template>

<script>
	import ctimepicker from './ctimepicker'
	export default{
		name:'timepicker',
		components:{
			'v-ctimepicker':ctimepicker
		}
		
	}
</script>

<style>
	.timerpicker{
		padding-bottom: 400px;
	}
</style>