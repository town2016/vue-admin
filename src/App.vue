<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	body {
		margin: 0;
	}
	
	html,
	body {
		width: 100%;
		height: 100%;
	}
	
	#app {
		height: 100%;
	}
	
	.clearfix:after {
		content: '';
		display: block;
		clear: both;
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
</style>