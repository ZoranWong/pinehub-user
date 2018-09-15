<template>
	<div id="index">
		<div id="index_header">
			<div id="index_logo"></div>
		</div>
		<div id="index_mobile">
			<span id="index_getmobile">
		  		手机号授权
		  	</span>
			<em id="index_tips">
		  		我们需要您的手机号来创建账号，累计积分
		  	</em>
		</div>
		<div id="index_menu">
			<dl>
				<dd>
					<img src="../../../static/images/todaysorder.png" />
				</dd>
				<dt>当日下单</dt>
			</dl>
			<dl>
				<dd>
					<img src="../../../static/images/prearrangedmall.png" />
				</dd>
				<dt>预定商城</dt>
			</dl>
      <dl>
        <dd>
          <img src="" />
        </dd>
        <dt>新品预定</dt>
      </dl>
		</div>
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
				navName: "index"
			};
		},
		created() {}
	}
</script>

<style scoped>
	#index {
		background: #fafafa;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	
	#index_header {
		height: 402rpx;
		width: 1228rpx;
		/*margin: -1200rpx auto 0;*/
		margin-left: -239rpx;
		background: #fece00;
		border-radius: 0 0 100% 100%;
		overflow: hidden;
	}
	
	#index_logo {
		background: url(../../../static/images/logo.png) no-repeat top center;
		background-size: 100%;
		/*background: #666;*/
		width: 342rpx;
		height: 116rpx;
		margin: 94rpx auto 0;
	}
	/*#index_face{
		width: 200rpx;
		height: 200rpx;
		border-radius: 100%;
		background: #FFFFFF;
		margin: 60rpx auto 0;
		overflow: hidden;
	}*/
	
	#index_mobile {
		background: #fff;
		height: 300rpx;
		width: 670rpx;
		margin: 0 auto;
		margin-top: -90rpx;
		border-radius: 15rpx;
		overflow: hidden;
	}
	
	#index_getmobile {
		height: 80rpx;
		width: 320rpx;
		text-align: center;
		line-height: 80rpx;
		background: #FECE00;
		display: block;
		margin: 90rpx auto 0;
		font-size: 32rpx;
		font-weight: 200;
		border-radius: 80rpx;
		box-shadow: 0 10rpx 10rpx #fff6bd;
	}
	
	#index_tips {
		text-align: center;
		font-size: 26rpx;
		font-weight: 200;
		margin-top: 46rpx;
		color: #525252;
	}
	
	#index_menu {
		padding: 30rpx 40rpx 0;
	}
	
	#index_menu dl {
		width: 320rpx;
		height: 198rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 0 10rpx 10rpx #f1f1f1;
		float: left;
	}
	
	#index_menu dl:nth-child(2) {
		margin-left: 30rpx;
	}
	#index_menu dl:nth-child(3) {
    width: 669rpx;
    height:198rpx; 
    margin-top: 20rpx;
  }
	#index_menu dl dd {
		padding-top: 40rpx;
	}
	
	#index_menu dl dd img {
		display: block;
		width: 76rpx;
		height: 76rpx;
		margin: 0 auto;
	}
	
	#index_menu dl dt {
		font-size: 30rpx;
		font-weight: 400;
		color: #111111;
		text-align: center;
		margin-top: 15rpx;
	}
	
	#footNav {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 108rpx;
		width: 750rpx;
		z-index: 999;
		background: #FFFFFF;
		border-top: 1rpx solid #eeeeee;
	}
	
	#footNav ul li {
		width: 25%;
		float: left;
	}
	
	#footNav ul li img {
		display: block;
		width: 50rpx;
		height: 50rpx;
		margin: 13rpx auto 10rpx;
	}
	
	#footNav ul li i {
		text-align: center;
		color: #111111;
		font-size: 24rpx;
		font-weight: 200;
		line-height: 24rpx;
	}
</style>

