<template>
	<div class="popup">
		<div class="popup-box">
			<div class="popup-title">
				当前门店配送范围为{{position.address}}
			</div>
			<div class="popup-content">
				是否确认在此范围内？
			</div>
			<div class="clearfix pop-bottom">
				<div class="btn reselection" @click="jump('location')">重新选择</div>
				<div class="btn confirm" @click="popHide">确认</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			position: {
				default: null,
				type: Object
			}
		},
		computed: {
			position() {
				return this.$store.getters['model.nearestStore/location'];
			}
		},
		methods: {
			popHide: function() {
				this.$emit('hdlHidePopup')
			},
			jump(router) {
				this.$command('router', router, 'push');
			}
		}
	}
</script>

<style>
	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		box-sizing: border-box;
		background-color: rgba(7, 17, 27, 0.6);
	}
	
	.popup-box {
		width: 630rpx;
		height: 300rpx;
		background-color: #ffffff;
		font-size: 32rpx;
		color: #111111;
		border-radius: 10rpx;
		text-align: center;
		padding: 40rpx 0rpx;
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -315rpx;
		margin-top: -150rpx;
	}
	
	.popup-title {
		margin: 0rpx 20rpx;
	}
	
	.pop-bottom {
		margin: 40rpx 78rpx 0rpx;
	}
	
	.reselection {
		float: left;
		background-color: #cccccc;
		margin-right: 94rpx;
	}
	
	.confirm {
		float: left;
		background-color: #fece00;
	}
</style>