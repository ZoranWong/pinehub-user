<template>
	<div id="purchase">
		<div id="select_date">
			<picker :range="selectDate" :value="nowSelectDate" id="select_date_ranges" @change="selectDateNow">{{selectDate[nowSelectDate]}}</picker>
			<i id="select_date_arrow"></i>
		</div>
		<div id="purchase_total">
			<em>总计进货货额</em>
			<i>￥{{purchaseTotal}}</i>
		</div>
		<div id="purchase_order">
			<div v-for="item in purchaseList" :key="index+1" class="purchase_order">
				<div class="purchase_order_sn">
					<i>订单编号</i><em>{{item.code}}</em>
					<span class="purchase_order_status">{{item.status}}</span>
				</div>
				<div class="purchase_order_over">
					<i>{{item.type}}</i>
					<em>￥{{item.paymentAmount}}</em>
				</div>
				<div class="purchase_order_date">
					<em>{{item.paidAt}}</em>
					<i></i>
				</div>
				<i class="purchase_info_circle"></i>
				<i class="purchase_info_circle right_circle"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Purchase',
		data() {
			return {
				nowSelectDate: 0,
				selectDate: ["今日", "本周", "本月"]
			}
		},
		props: {
			onloadPurchase: {
				default: "",
				type: Function
			}
		},
		computed: {
			purchaseTotal() {
				return this.$store.getters['model.my.store.status.purchase/totalNum'];
			},
			purchaseList() {
				console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.$store.getters)
				return this.$store.getters['model.my.store.status.purchase/list'];
			}
		},
		methods: {
			selectDateNow(e) {
				let num = e.target.value;
				this.nowSelectDate = num;
				if(num == 0) {
					this.onloadPurchase('hour');
					console.log(666);
				} else if(num == 1) {
					this.onloadPurchase('week');
					console.log(888)
				} else {
					this.onloadPurchase('month');
					console.log(999)
				}
			}
		},
		mounted() {
			this.onloadPurchase('hour');
		}
	}
</script>

<style scoped>
	#select_date {
		margin: 20rpx;
		padding: 6rpx 20rpx;
		line-height: 52rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
		position: relative;
	}
	
	#select_date_ranges {
		font-size: 28rpx;
		font-weight: 300;
	}
	
	#select_date_arrow {
		position: absolute;
		right: 20rpx;
		top: 22rpx;
		height: 20rpx;
		width: 20rpx;
		background: url(../../../../../static/images/icon/select_arrow.png) no-repeat center center;
		background-size: 90%;
	}
	
	#purchase_total {
		margin: 20rpx;
		padding: 6rpx 20rpx;
		line-height: 52rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
		font-size: 28rpx;
		font-weight: 300;
	}
	
	#purchase_total em {
		display: inline-block;
		font-weight: 400;
	}
	
	#purchase_total i {
		display: inline-block;
		float: right;
		color: #828282;
	}
	
	.purchase_order {
		background: #FFFFFF;
		border-radius: 10rpx;
		font-size: 34rpx;
		font-weight: 300;
		padding: 20rpx;
		margin: 20rpx;
		overflow: hidden;
		position: relative;
		box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
	}
	
	.purchase_order_sn {
		font-size: 28rpx;
		line-height: 48rpx;
		overflow: hidden;
		font-weight: 300;
		margin-bottom: 1rpx;
		/*background: green;*/
	}
	
	.purchase_order_sn i {
		display: inline-block;
		color: #111111;
		font-weight: 400;
		padding-right: 10rpx;
	}
	
	.purchase_order_sn em {
		display: inline-block;
	}
	
	.purchase_order_status {
		font-weight: 300;
		color: #FECE00;
		float: right;
	}
	
	.purchase_order_over {
		font-size: 28rpx;
		font-weight: 300;
		margin-bottom: 10rpx;
	}
	
	.purchase_order_over i {
		display: inline-block;
	}
	
	.purchase_order_over em {
		display: inline-block;
		float: right;
	}
	
	.purchase_order_date {
		margin-top: 10rpx;
		padding-top: 10rpx;
		border-top: 1rpx dashed #f3f3f3;
	}
	
	.purchase_order_date em {
		display: inline-block;
		font-size: 28rpx;
		font-weight: 200;
		color: #CCCCCC;
	}
	
	.purchase_order_date i {
		height: 32rpx;
		width: 32rpx;
		background: url(../../../../../static/images/icon/myordermore.png) no-repeat center center;
		background-size: 80%;
		display: inline-block;
		float: right;
		margin-top: 10rpx;
	}
	
	.purchase_info_circle {
		position: absolute;
		background: #FAFAFA;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		bottom: 60rpx;
		right: -22rpx;
		z-index: 1;
	}
	
	.purchase_info_circle.right_circle {
		left: -22rpx;
	}
</style>