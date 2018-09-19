<template>
	<div id="mystore">
		<div id="mystore_header">
			<div id="mystore_userinfo">
				<div id="mystore_userinfo_face-lv">
					<img id="mystore_userinfo_face" src="../../../../static/images/index_now.png" />
					<div id="mystore_userinfo_lv">
						LV:10
					</div>
				</div>
				<div id="mystore_userinfo_name-nickname">
					<div id="mystore_userinfo_name">
						没有昵称可以起
					</div>
					<div id="mystore_userinfo_nickname">
						ID:1234567890
					</div>
				</div>
				<div id="mystore_userinfo_otherinfo">
					<ul>
						<li>
							<img src="../../../../static/images/index_now.png" />
							<i>余额</i>
						</li>
						<li>
							<img src="../../../../static/images/index_now.png" />
							<i>卡券</i>
						</li>
						<li>
							<img src="../../../../static/images/index_now.png" />
							<i>积分</i>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div id="mystore_shop">
			<img src="../../../../static/images/index_now.png" />
			<span>我的店铺</span>
		</div>
		<div id="mystore_menu">
			<ul>
				<li>
					<img src="../../../../static/images/index_now.png" />
					<span>我的充值</span>
					<i></i>
				</li>
				<li>
					<img src="../../../../static/images/index_now.png" />
					<span>个人订单</span>
					<i></i>
				</li>
				<li>
					<img src="../../../../static/images/index_now.png" />
					<span>邀请享奖励</span>
					<i></i>
				</li>
				<li>
					<img src="../../../../static/images/index_now.png" />
					<span>我的收入</span>
					<i></i>
				</li>
				<li>
					<img src="../../../../static/images/index_now.png" />
					<span>联系客服</span>
					<i></i>
				</li>
			</ul>
		</div>
		<div id="footNav_height"></div>
		<footer-nav :navName="navName"></footer-nav>
	</div>
</template>

<script>
	import FooterNav from '@/components/FooterNav';

	export default {
		components: {
			'footer-nav': FooterNav
		},
		data() {
			return {
				navName: "my"
			};
		},
		created() {}
	}
</script>

<style>
	page {
		height: 100%;
	}
	
	#footNav_height {
		height: 109rpx;
	}
	
	#mystore {
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
		height: 300rpx;
		background: #fcfcfc;
		position: absolute;
		top: 180rpx;
		left: 60rpx;
		border-radius: 20rpx;
	}
	
	#mystore_userinfo_face-lv {
		width: 180rpx;
		position: absolute;
		left: 45rpx;
		top: -90rpx;
	}
	
	#mystore_userinfo_face {
		display: block;
		height: 180rpx;
		width: 180rpx;
		border-radius: 100%;
		background: #FFFFFF;
	}
	
	#mystore_userinfo_lv {
		text-align-last: center;
		background: #FECE00;
		color: #FFFFFF;
		line-height: 42rpx;
		font-size: 24rpx;
		font-weight: 300;
		border-radius: 10rpx;
		margin-top: 10rpx;
	}
	
	#mystore_userinfo_name-nickname {
		margin-left: 225rpx;
		padding-left: 45rpx;
		padding-right: 45rpx;
	}
	
	#mystore_userinfo_name {
		display: inline-block;
		background: #FECE00;
		color: #FFFFFF;
		padding: 0 10rpx;
		line-height: 42rpx;
		font-size: 24rpx;
		font-weight: 400;
		border-radius: 5rpx;
	}
	
	#mystore_userinfo_nickname {
		background: #FCFCFC;
		color: #000000;
		padding: 0 10rpx;
		line-height: 42rpx;
		font-size: 24rpx;
		font-weight: 400;
		border-radius: 5rpx;
		margin-top: 10rpx;
	}
	
	#mystore_userinfo_otherinfo {
		position: absolute;
		bottom: 0;
		width: 590rpx;
		left: 45rpx;
	}
	
	#mystore_userinfo_otherinfo ul {
		display: block;
		display: flex;
		flex-wrap: wrap;
	}
	
	#mystore_userinfo_otherinfo ul li {
		flex-grow: 3;
		width: 90rpx;
		float: left;
	}
	
	#mystore_userinfo_otherinfo ul li img {
		display: block;
		width: 90rpx;
		height: 90rpx;
		margin: 0 auto;
	}
	
	#mystore_userinfo_otherinfo ul li i {
		text-align: center;
		line-height: 42rpx;
		font-size: 24rpx;
		font-weight: 400;
		margin-top: 15rpx;
	}
	
	#mystore_shop {
		width: 680rpx;
		height: 130rpx;
		line-height: 130rpx;
		background: #FFFFFF;
		margin: 115rpx auto 0;
		overflow: hidden;
		border-radius: 20rpx;
		overflow: hidden;
		text-align: center;
	}
	
	#mystore_shop img {
		display: inline-block;
		height: 70rpx;
		width: 70rpx;
		margin: 30rpx;
		float: left;
	}
	
	#mystore_shop span {
		line-height: 130rpx;
		float: left;
		font-size: 34rpx;
		font-weight: 400;
		color: #111111;
	}
	
	#mystore_menu {
		margin-top: 20rpx;
	}
	
	#mystore_menu ul li {
		padding: 0 45rpx;
		border-bottom: 1rpx solid #EEEEEE;
		height: 88rpx;
		line-height: 87rpx;
		background: #FFFFFF;
	}
	
	#mystore_menu ul li img {
		display: block;
		height: 48rpx;
		width: 48rpx;
		float: left;
		padding: 20rpx 0;
	}
	
	#mystore_menu ul li span {
		float: left;
		margin-left: 20rpx;
		font-size: 32rpx;
		font-weight: 400;
		color: #111111;
	}
	
	#mystore_menu ul li i {
		width: 40rpx;
		height: 40rpx;
		display: block;
		background: url(../../../../static/images/menumore.png) no-repeat center center;
		background-size: 80%;
		padding: 22rpx 0;
		float: right;
	}
</style>