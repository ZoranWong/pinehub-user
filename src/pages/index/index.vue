<template>
	<div class="body">
		<div id="index_header">
			<div id="index_logo"></div>
			<div id="bear">
				<img :src="headerAnimate" />
			</div>
		</div>
		<div v-if="!isAuth" id="index_mobile" class="bgff">
			<button id="index_getmobile" open-type="getUserInfo" @getuserinfo="getUserInfo">
				获取用户信息
			</button>
			<em id="index_tips">
				我们需要获取您的小程序用户信息来创建用户信息
			</em>
		</div>
		<div v-else-if="!isMember" id="index_mobile" class="bgff">
			<button id="index_getmobile" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				手机号授权
			</button>
			<em id="index_tips">
				我们需要您的手机号来创建账号，累计积分
			</em>
		</div>
		<div v-else id="index_mobile" class="bgff">
			<div id="index_getscore">{{userScore}}<i>积分</i></div>
			<em id="index_tips">
				积分功能即将上线，敬请期待！
			</em>
		</div>
		<div id="index_menu">
			<dl @click="jump('todayOrder')">
				<dd>
					<img src="../../../static/images/icon/todaysorder.png" />
				</dd>
				<dt>当日下单</dt>
			</dl>
			<dl @click="jump('reserveShop')">
				<dd>
					<img src="../../../static/images/icon/prearrangedmall.png" />
				</dd>
				<dt>预定商城</dt>
			</dl>
			<div @click="jump('activity')" class="booking">
				<img src="../../../static/images/icon/booking.png" />
			</div>
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
				navName: "index"
			};
		},
		computed: {
			headerAnimate() {
				return this.$imageUrl('bear01.gif');
			},
			isAuth() {
				console.log('BTN-isAuth', this.$store.getters['model.account/isAuth']);
				return this.$store.getters['model.account/isAuth'];
			},
			isMember() {
				console.log('BTN-isMember', this.$store.getters['model.account/isMember']);
				return this.$store.getters['model.account/isMember'];
			},
			userScore() {
				return this.$store.getters['model.account/userScore'];
			}
		},
		created() {
			console.log('徐钰');
			this.$command('GET_ACCOUNT');
			this.$command('GET_ACTIVITY_INFO');
		},
		methods: {
			jump(router) {
				this.$command('router', router, 'push');
			},
			getPhoneNumber(e) {
				this.$command('SET_MOBILE', e);
			},
			getUserInfo(e) {
				this.$command('SET_USERINFO', e);
			}
		}

	}
</script>

<style scoped>
	#footNav_height {
		height: 109rpx;
	}
	
	.body {
		overflow: hidden;
		width: 750rpx;
	}
	
	#index_header {
		background: #FFD000;
		height: 402rpx;
		width: 1228rpx;
		margin-left: -239rpx;
		border-radius: 0 0 100% 100%;
		overflow: hidden;
	}
	
	#index_logo {
		background: url(../../../static/images/icon/logo.png) no-repeat top center;
		background-size: 100%;
		width: 218rpx;
		height: 92rpx;
		margin: 40rpx auto 0;
	}
	
	#bear {
		position: absolute;
		width: 429rpx;
		height: 280rpx;
		top: 122rpx;
		left: 168rpx;
	}
	
	#bear img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	#index_mobile {
		height: 300rpx;
		width: 670rpx;
		margin: 0 auto;
		margin-top: -90rpx;
		border-radius: 15rpx;
		overflow: hidden;
		text-align: center;
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
		border: 0;
		border-radius: 80rpx;
		box-shadow: 0 10rpx 10rpx #fff6bd;
	}
	
	#index_getscore {
		position: relative;
		display: inline-block;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 90rpx auto 0;
		font-size: 128rpx;
		font-weight: 500;
	}
	
	#index_getscore i {
		position: absolute;
		top: 0;
		right: -68rpx;
		font-size: 32rpx;
		font-weight: 200;
		line-height: 32rpx;
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
	
	#index_menu .booking {
		width: 669rpx;
		height: 198rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0 10rpx 10rpx rgba(204, 202, 202, 0.3);
		float: left;
		background: #FFFFFF;
	}
	
	#index_menu .booking img {
		width: 609rpx;
		height: 135rpx;
		margin: 31rpx auto;
		display: block;
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