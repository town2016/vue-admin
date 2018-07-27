<template>
	<div class="pageTitle">
		<h2>
			<slot name="title"></slot>
			<slot name='expand' ></slot>
		</h2>
		<div class="subTitle">
			<p><slot name="subTitle"></slot></p>
			<div><slot name="subExpand"></slot></div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'pageTitle',
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped lang="scss">
.pageTitle{
	h2{
		font-size: 20px;
		color: #333;
		font-weight: 300;
		margin: 0;
		padding: 10px 0;
		border-bottom: 1px solid #ddd;
	}
	.subTitle{
		padding: 20px 0px 0 0px;
		p{
			color: #333;
			background-color: #F1F1F1;
			line-height: 30px;
			font-size: 14px;
			padding: 0 10px;
			margin: 0;
		}
		div{
		
		}
	}
}
</style>