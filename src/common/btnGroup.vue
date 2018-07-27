<template>
	<div class="btnGroup">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name:'btnGroup'
	}
</script>

<style scoped lang="scss">
.btnGroup{
	padding: 10px 0;
}
</style>