<template>
	<div class="ctimepicker">
		<input type="text" readonly class="timeText" />
		<div class="droper-down">
			<div class="time-wrapper">
				<div class="column">
					<ul>
						<li v-for=" h in 24">{{h-1>=10?h-1:'0'+(h-1)}}</li>
					</ul>
				</div>
				<div class="column">
					<ul>
						<li v-for=" m in 12">{{m*5>=10?m*5:'0'+(m*5)}}</li>
					</ul>
				</div>
				<div class="column">
					<ul>
						<li v-for=" s in 60">{{s>=10?s:'0'+s}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ctimepicker',
		data() {
			return {

			}
		},
		props: {

		}
	}
</script>

<style scoped lang="scss">
	.ctimepicker {
		display: inline-block;
		position: relative;
		.timeText {
			border: 1px solid #dcdfe6;
			height: 38px;
			line-height: 38px;
			text-align: center;
			padding: 0 23px;
			border-radius: 5px;
		}
		.droper-down {
			position: absolute;
			top: 100%;
			padding: 15px 0px;
			left: 0;
			right: 0;
			.time-wrapper {
				display: flex;
				justify-content: space-between;
				border: 1px solid #e4e7ed;
				background-color: #fff;
				-webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
				border-radius: 2px;
				position: relative;
				&:after {
					content: '';
					height: 7px;
					width: 7px;
					position: absolute;
					border-top: 1px solid #e4e7ed;
					border-left: 1px solid #e4e7ed;
					background-color: #fff;
					top: -6px;
					left: 50%;
					transform: rotate3d(0,0,1,45deg);
					margin-left: -4px;
				}
				>.column {
					flex: 1;
					max-height: 260px;
					overflow: auto;
					border-right: 1px solid #E4E7ED;
					&::-webkit-scrollbar {
						display: none;
					}
					li {
						text-align: center;
						padding: 8px 0;
						cursor: pointer;
					}
					li:hover {
						background-color: #f5f7fa;
						color: #606266;
					}
				}
			}
		}
	}
</style>