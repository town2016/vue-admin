<template>
	<div class="countTo">
		<div class=" icon-box">
			<slot name="icon"></slot>
		</div>
		<div class="box">
			<slot name="desc"></slot>
			<p class="count">{{count}}<slot ></slot></p>
		</div>
	</div>
</template>

<script>
	export default{
		name: "countTo",
		data () {
			return {
				count: 0,
				timer: null
			}
		},
		props: {
			startVal:{
				type: [Number, String],
				default () {
					return 0
				}
			},
			endVal: {
				type: [Number, String],
				default () {
					return 0
				}
			},
			duration: {
				type: [Number, String],
				default () {
					return 500
				}
			}
		},
		mounted () {
			this.$nextTick(() =>{
				this._countTo()
			})
		},
		methods: {
			_countTo () {
				var speed = Math.floor((this.endVal - this.startVal)/(this.duration/20))
				if (speed < 1) {
					this.count = this.endVal
				} else {
					var buffer = 0
					this.timer = null
					this.timer = setInterval(() =>{
						buffer += speed
						if (buffer >= this.endVal) {
							window.clearInterval(this.timer)
							this.count = this.endVal
						}else{
							this.count = buffer
						}
					}, 20)
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.countTo{
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 8px;
	padding: 5px 0;
	.icon-box{
		padding: 8px 30px;
		border-right: 1px solid #fff;
		img{
			display: block;
		}
	}
	.box{
		flex: 1;
		box-sizing: border-box;
		.icon{
			width: 48px;
			height: 48px;
			overflow: hidden;
			display: -webkit-box;
			justify-content: center;
			align-items: center;
		}
		.count{
			text-align: center;
			font-size: 36px;
			color: #fff;
			font-weight: 200 !important;
			margin: 10px;
			span{
				font-size: 18px;
			}
		}
		.desc{
			font-size: 18px;
			color: #fff;
			text-align: center;
			margin: 10px;
		}
	}
}
</style>