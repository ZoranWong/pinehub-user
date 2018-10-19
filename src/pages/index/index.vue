<template>
	<div class="body">
		<div id="index_header" class="theme-color">
			<div id="index_logo"></div>
		</div>
		<div id="index_mobile" class="bgff">
			<span id="index_getmobile" class="theme-color box-shadow-small">
		  		手机号授权
		  	</span>
			<em id="index_tips" class="color52">
		  		我们需要您的手机号来创建账号，累计积分
		  	</em>
		</div>
		<div id="index_menu" >
			<dl @click="jump('todayOrder')" class="bgff">
				<dd>
					<img src="../../../static/images/todaysorder.png" />
				</dd>
				<dt>当日下单</dt>
			</dl>
			<dl @click="jump('reserveShop')"  class="bgff">
				<dd>
					<img src="../../../static/images/prearrangedmall.png" />
				</dd>
				<dt>预定商城</dt>
			</dl>
		    <dl @click="jump('activity')"  class="bgff">
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
			'footer-nav': FooterNav,
			
		},
		data() {
			return {
				navName: "index"
			};
		},
		created() {},
		methods : {
			jump(router){
				this.$command('router', router, 'push');
			}
		}
		
	}
</script>

<style scoped>
	#index_header {
		height: 402rpx;
		width: 1228rpx;
		margin-left: -239rpx;
		border-radius: 0 0 100% 100%;
		overflow: hidden;
	}	
	#index_logo {
		background: url(../../../static/images/logo.png) no-repeat top center;
		background-size: 100%;
		width: 342rpx;
		height: 116rpx;
		margin: 94rpx auto 0;
	}
	#index_mobile {
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
		display: block;
		margin: 90rpx auto 0;
		font-size: 32rpx;
		font-weight: 200;
		border-radius: 80rpx;
		box-shadow: 0 10rpx 10rpx rgba(254, 206, 0, 0.3);
	}
	
	#index_tips {
		text-align: center;
		font-size: 26rpx;
		font-weight: 200;
		margin-top: 46rpx;
	}
	
	#index_menu {
		padding: 30rpx 40rpx 0;
	}
	
	#index_menu dl {
		width: 320rpx;
		height: 198rpx;
		border-radius: 10rpx;
		box-shadow: 0 10rpx 10rpx rgba(204, 202, 202, 0.3);
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
</style>

