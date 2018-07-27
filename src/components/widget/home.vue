<template>
	<div class="home">
		<h1>WELCOME TO CLOUD COACH OF LILI&nbsp;&nbsp;<sub>--CLZ</sub></h1>
	</div>
</template>

<script>
	export default {
		name:'home'
	}
</script>

<style scoped lang="scss">
.home{
	width: 100%;
	height: 100%;
	overflow: hidden;
	text-align: center;
	h1{
		font-size: 40px;
		margin-top: 300px;
		margin-bottom: 200px;
		-webkit-box-reflect: below 0 -webkit-linear-gradient(top,rgba(250,250,250,0),rgba(250,250,250,.0) 30%,rgba(250,250,250,0.5)); 
		box-reflect: below 0 -webkit-linear-gradient(top,rgba(250,250,250,0),rgba(250,250,250,.0) 30%,rgba(250,250,250,0.5));
		background-image: -webkit-gradient(linear, left center, right center, from(rgba(176, 31, 184, 1)), to(rgba(255, 189, 76, 1)));
	    -webkit-background-clip: text;
	    -webkit-text-fill-color: transparent;
	}
	
}
</style>