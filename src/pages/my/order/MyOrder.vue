<template>
	<div id="tab_content_main">
		<div class="order_info" v-for="(orderList,index) in myorderList" :key="index">
			<div class="order_info_sn">
				<i>订单编号</i><em>{{orderList.code}}</em>
				<span class="order_info_status">{{orderList.status}}</span>
			</div>
			<div class="order_info_glist">
				<dl v-for="(items,ind) in orderList.orderItems" :key ="ind">
					<dd><img :src="items.mainImage"/></dd>
					<dt>
						<em>{{items.name}}</em>
						<span>单价 ￥{{items.sellPrice}} 数量 {{items.quality}} 份</span>
						<span>总价 ￥{{items.totalAmount}}</span>
					</dt> 
				</dl>
			</div>
			<div class="order_info_ads">
				<i>自提地址</i>
				<em>{{orderList.reveiverAddress}}</em>
			</div>
			<div class="order_info_glist_total">
				<div class="order_info_glist_date">
					{{orderList.createdAt}}
				</div>
				<em>共{{orderList.quality}}件商品</em>实付<i>￥{{orderList.totalAmount}}</i>
			</div>
			<div class="order_info_btn" v-if="orderList.status=='待支付'">
				<i>立即支付</i>
				<i class="delete">取消订单</i>
			</div>
			<i class="order_info_circle"></i>
			<i class="order_info_circle right_circle"></i>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'MyOrder',
		props: {
			status: {
				default: 'all',
				type: String
			},
			loadOrders: {
				default:"",
				type: Function
			},
			myorderList:{
				default:"",
				type:Function 
			}
		},
		data() {
			return {
				orderList: {},
				myorderList:{} 
			};
		},
		//算术方法
		computed: {

		},
		methods: {
		},

		watch: {
			status(v) {
				// console.log(v)
			}
		},
		created() {
			var status=this.status
			this.loadOrders(status); 	
		},
		mounted() {
			console.log(this.myorderList,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
			this.$command('my-orders');
			this.loadOrders("all");
		}

	}
</script>

<style scoped>
	#tab_content_main {}
	
	.order_info {
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
	
	.order_info_sn {
		font-size: 32rpx;
		line-height: 68rpx;
		border-bottom: 1rpx solid #f3f3f3;
		overflow: hidden;
		font-weight: 400;
		margin-bottom: 20rpx;
		/*background: green;*/
	}
	
	.order_info_sn i {
		display: inline-block;
		color: #111111;
		font-size: 34rpx;
		padding-right: 20rpx;
	}
	
	.order_info_sn em {
		display: inline-block;
	}
	
	.order_info_status {
		font-weight: 300;
		color: #FECE00;
		float: right;
	}
	
	.order_info_ads {
		font-size: 28rpx;
		line-height: 40rpx;
		font-weight: 400;
		margin-bottom: 10rpx;
	}
	
	.order_info_ads i {
		display: inline-block;
		font-size: 30rpx;
		padding-right: 20rpx;
	}
	
	.order_info_ads em {
		display: inline-block;
		margin-top: 20rpx;
	}
	
	.order_info_glist {
		overflow: hidden;
		clear: both;
		margin-top: 20rpx;
	}
	
	.order_info_glist dl {
		overflow: hidden;
		margin-bottom: 20rpx;
	}
	
	.order_info_glist dl:last-child {
		margin-bottom: 0;
	}
	
	.order_info_glist dl dd {
		display: inline-block;
		width: 140rpx;
		height: 140rpx;
		margin-right: 20rpx;
		float: left;
	}
	
	.order_info_glist dl dd img {
		display: block;
		width: 140rpx;
		height: 140rpx;
		background: #FAFAFA;
	}
	
	.order_info_glist dl dt {
		display: inline-block;
		width: 516rpx;
		height: 120rpx;
		float: left;
	}
	
	.order_info_glist dl dt em {
		font-size: 36rpx;
		font-weight: 300;
		line-height: 70rpx;
		color: #525252;
	}
	
	.order_info_glist dl dt span {
		display: block;
		font-size: 28rpx;
		font-weight: 300;
		color: #828282;
		line-height: 35rpx;
	}
	
	.order_info_glist_total {
		text-align: right;
		font-size: 28rpx;
		line-height: 46rpx;
	}
	
	.order_info_glist_total i {
		display: inline-block;
		color: #FECE00;
		padding-right: 10rpx;
	}
	
	.order_info_glist_total em {
		display: inline-block;
		padding-right: 10rpx;
	}
	
	.order_info_glist_date {
		display: inline-block;
		float: left;
	}
	
	.order_info_btn {
		margin-top: 20rpx;
		padding-top: 20rpx;
		border-top: 1rpx dashed #f3f3f3;
	}
	
	.order_info_btn i {
		font-size: 28rpx;
		float: right;
		background: #FECE00;
		border: 1rpx solid #FECE00;
		color: #111111;
		padding: 8rpx 15rpx;
		margin-left: 20rpx;
		border-radius: 10rpx;
	}
	
	.order_info_btn i.delete {
		background: #FFFFFF;
		border: 1rpx solid #CCCCCC;
		color: #525252;
	}
	
	.order_info_circle {
		position: absolute;
		background: #FAFAFA;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		bottom: 72rpx;
		right: -25rpx;
		z-index: 1;
	}
	
	.order_info_circle.right_circle {
		left: -25rpx;
	}
</style>