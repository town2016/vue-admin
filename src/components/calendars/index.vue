<template>
	<div class="calendars">
		<v-calendar></v-calendar>
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