<template>
	<div class="editors">
		<v-editor @on-change="_getContext"></v-editor>
	</div>
</template>

<script>
	import editor from './editor'
	export default {
		name:'editors',
		components:{
			'v-editor':editor
		},
		methods:{
			_getContext(ctx){
				
			}
		}
	}
</script>

<style>
</style>