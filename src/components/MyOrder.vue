<template>
	<div id="tab_content_main">
		<div class="order_info">
			<span class="order_info_sn">
						<i>订单编号</i>
						<em>SN201809</em>
					</span>
			<span class="order_info_ads">
						<i>自提</i>
						<em>半岛路与长江西路交口锦江之星酒店2楼2121室</em>
					</span>
			<div class="order_info_glist">
				<ul>
					<li><span>蛋黄酥套餐</span><em><i>*</i>1</em></li>
					<li><span>莫斯套餐</span><em><i>*</i>1</em></li>
					<li><span>高端定制午餐</span><em><i>*</i>1</em></li>
					<li><span>超级无敌双蛋黄套餐</span><em><i>*</i>1</em></li>
				</ul>
			</div>
			<div class="order_info_glist_total">
				共1件商品，实付￥6.00
			</div>
			<div class="order_info_btn">
				<i class="delete">删除订单</i>
				<i>立即支付</i>
			</div>
			<div class="order_info_status">
				生产中
			</div>
		</div>
		<div class="order_info">
			<span class="order_info_sn">
						<i>订单编号</i>
						<em>SN201809</em>
					</span>
			<span class="order_info_ads">
						<i>自提</i>
						<em>半岛路与长江西路交口锦江之星酒店2楼2121室</em>
					</span>
			<div class="order_info_glist">
				<ul>
					<li><span>蛋黄酥套餐</span><em><i>*</i>1</em></li>
					<li><span>莫斯套餐</span><em><i>*</i>1</em></li>
					<li><span>高端定制午餐</span><em><i>*</i>1</em></li>
					<li><span>超级无敌双蛋黄套餐</span><em><i>*</i>1</em></li>
				</ul>
			</div>
			<div class="order_info_glist_total">
				共1件商品，实付￥6.00
			</div>
			<div class="order_info_btn">
				<i class="delete">删除订单</i>
				<i>立即支付</i>
			</div>
			<div class="order_info_status">
				生产中
			</div>
		</div>
		<div class="order_info">
			<span class="order_info_sn">
						<i>订单编号</i>
						<em>SN201809</em>
					</span>
			<span class="order_info_ads">
						<i>自提</i>
						<em>半岛路与长江西路交口锦江之星酒店2楼2121室</em>
					</span>
			<div class="order_info_glist">
				<ul>
					<li><span>蛋黄酥套餐</span><em><i>*</i>1</em></li>
					<li><span>莫斯套餐</span><em><i>*</i>1</em></li>
					<li><span>高端定制午餐</span><em><i>*</i>1</em></li>
					<li><span>超级无敌双蛋黄套餐</span><em><i>*</i>1</em></li>
				</ul>
			</div>
			<div class="order_info_glist_total">
				共1件商品，实付￥6.00
			</div>
			<div class="order_info_btn">
				<i class="delete">删除订单</i>
				<i>立即支付</i>
			</div>
			<div class="order_info_status">
				生产中
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MyOrder',
		data() {
			return {

			};
		},
		methods: {

		},
		created() {
			
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
		margin-top: 20rpx;
		overflow: hidden;
		position: relative;
	}
	
	.order_info_sn {
		float: left;
		font-size: 28rpx;
		width: 250rpx;
		height: 140rpx;
		/*background: green;*/
	}
	
	.order_info_sn i {
		display: inline-block;
		line-height: 46rpx;
		background: #FECE00;
		padding: 0 10rpx;
		border-radius: 10rpx;
		color: #FFFFFF;
		font-size: 30rpx;
	}
	
	.order_info_sn em {
		margin-top: 20rpx;
	}
	
	.order_info_ads {
		width: 460rpx;
		height: 140rpx;
		font-size: 28rpx;
		float: right;
	}
	
	.order_info_ads i {
		display: inline-block;
		line-height: 46rpx;
		background: #FECE00;
		padding: 0 10rpx;
		border-radius: 10rpx;
		color: #FFFFFF;
		font-size: 30rpx;
	}
	
	.order_info_ads em {
		margin-top: 20rpx;
	}
	
	.order_info_glist {
		overflow: hidden;
		clear: both;
		margin-top: 20rpx;
	}
	
	.order_info_glist ul li {
		color: #111111;
		font-size: 28rpx;
		line-height: 46rpx;
	}
	
	.order_info_glist ul li span {
		float: left;
		width: 250rpx;
	}
	
	.order_info_glist ul li em {
		float: right;
		width: 460rpx;
	}
	
	.order_info_glist ul li em i {
		float: left;
	}
	
	.order_info_glist_total {
		text-align: right;
		font-size: 28rpx;
	}
	
	.order_info_btn {
		margin-top: 20rpx;
	}
	
	.order_info_btn i {
		font-size: 28rpx;
		float: right;
		background: #FECE00;
		color: #FFFFFF;
		padding: 5rpx 12rpx;
		margin-left: 10rpx;
		border-radius: 10rpx;
	}
	
	.order_info_btn i.delete {
		background: red;
	}
	
	.order_info_status {
		position: absolute;
		bottom: 20rpx;
		left: 20rpx;
		font-size: 28rpx;
		line-height: 42rpx;
		padding: 5rpx 12rpx;
		background: #F1F1F1;
		border-radius: 10rpx;
	}
</style>