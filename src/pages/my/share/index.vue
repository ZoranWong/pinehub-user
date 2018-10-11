<template>
	<div id="myshare">
		<mp-title :title="title"></mp-title>
		<div id="mystore_header">
			<div id="mystore_userinfo">
				<img id="bear" src="../../../../static/images/bearmoney.gif" />

				<div id="mystore_userinfo_otherinfo">
					<ul>
						<li>
							<em>0</em>
							<i>成功邀请</i>
						</li>
						<li class="my_card">
							<s class="my_card_new"></s>
							<em>6</em>
							<i>已获奖励</i>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div id="myshare_info">
			<em>邀请规则</em>
			<ul>
				<li>1.好友30日内注册成功，且完成一单购买，推荐人即可得5元现金优惠奖励。</li>
				<li>2.每月推荐超过30个新人，且完成一单购买，当月即可获得内侧用户资格（新品发售优先品尝，快乐松线下活动免费参与）。</li>
			</ul>
			<i>马上邀请</i>
		</div>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	export default {
		components: {
			"mp-title": MpTitle
		},
		data() {
			return {
				title: "邀请享奖励"
			};
		},
		computed: {},
		methods: {},
		created() {}
	}
</script>

<style>
	page {
		height: 100%;
	}
	
	#myshare {
		background: #fafafa;
		position: relative;
		height: 100%;
		width: 100%;
	}
	
	#mystore_header {
		position: relative;
		height: 402rpx;
		width: 800rpx;
		/*margin: -1200rpx auto 0;*/
		margin-left: -25rpx;
		background: #fece00;
		border-radius: 0 0 100% 100%;
		/*overflow: hidden;*/
	}
	
	#mystore_userinfo {
		width: 680rpx;
		height: 200rpx;
		background: #FFFFFF;
		position: absolute;
		top: 236rpx;
		left: 60rpx;
		border-radius: 20rpx;
		box-shadow: 0rpx 8rpx 8rpx rgba(204, 202, 202, .6);
	}
	
	#bear {
		position: absolute;
		width: 492rpx;
		height: 280rpx;
		top: -236rpx;
		left: 102rpx;
	}
	
	#mystore_userinfo_otherinfo {
		position: absolute;
		bottom: 56rpx;
		width: 630rpx;
		left: 26rpx;
	}
	
	#mystore_userinfo_otherinfo ul {
		display: block;
		display: flex;
		flex-wrap: wrap;
	}
	
	#mystore_userinfo_otherinfo ul li {
		flex-grow: 2;
		width: 90rpx;
		float: left;
		text-align: center;
		font-size: 32rpx;
		font-weight: 300;
	}
	
	#mystore_userinfo_otherinfo ul li:nth-child(2) {
		border-left: 1rpx solid #EEEEEE;
	}
	
	.my_card {
		position: relative;
	}
	
	.my_card_new {
		position: absolute;
		width: 14rpx;
		height: 14rpx;
		background: #FECE00;
		border-radius: 50%;
		top: 3rpx;
		right: 64rpx;
	}
	
	#myshare_info {
		width: 680rpx;
		margin: 70rpx auto 40rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		font-weight: 300;
		color: #111111;
		padding: 20rpx;
		box-shadow: 0rpx 8rpx 8rpx rgba(204, 202, 202, .6);
	}
	
	#myshare_info em {
		text-align: center;
		font-weight: 400;
		margin-bottom: 20rpx;
	}
	
	#myshare_info ul li {
		font-size: 30rpx;
		line-height: 42rpx;
		color: #828282;
		margin-bottom: 10rpx;
	}
	
	#myshare_info i {
		display: block;
		background: #FECE00;
		width: 360rpx;
		text-align: center;
		line-height: 64rpx;
		height: 64rpx;
		margin: 30rpx auto 10rpx;
		border-radius: 32rpx;
		font-size: 34rpx;
	}
</style>