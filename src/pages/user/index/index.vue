<!--suppress ALL -->
<template>
	<div class="body">
		<tickets></tickets>
		<div v-show="!registered" id="toast_area">
			<div id="toast">
				<div id="toast_title">
					用户授权登陆
				</div>
				<div id="toast_content">
					<div id="toast_content_info">
						<div id="input_change_info">
							尊敬的快乐松用户，我们需要获取您的用户信息为您建立账户，请允许授权我们获取您的信息！
						</div>
						<button id="input_change_btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
                            允许授权
                        </button>
						<div id="input_change_tips">
							注：小程序获取用户信息后才可正常使用
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="index_header">
			<div id="index_logo"></div>
			<div id="bear">
				<img :src="headerAnimate" />
			</div>
		</div>
		<div v-if="!isMember" class="bgff user-mobile-box">
			<button class="user-mobile-get-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
                手机号授权
            </button>
			<em class="tips">
                我们需要您的手机号来创建账号，累计积分
            </em>
		</div>
		<div v-else class="bgff user-score-box">
			<div class="score">{{userScore}}<i>积分</i></div>
			<em class="tips">
                积分功能即将上线，敬请期待！
            </em>
		</div>
		<div id="index_menu">
			<dl @click="redirectTo('storeMarket')">
				<dd>
					<img src="../../../../static/images/icon/todaysorder.png" />
				</dd>
				<dt>邻里优鲜</dt>
			</dl>
			<dl @click="redirectTo('bookingMall')">
				<dd>
					<img src="../../../../static/images/icon/prearrangedmall.png" />
				</dd>
				<dt>预定商城</dt>
			</dl>
			<div @click="redirectTo('newEvents', {query: {activity_id: activityId}})" class="booking">
				<img src="../../../../static/images/icon/booking.png" />
			</div>
		</div>
		<div id="footNav_height"></div>
		<footer-nav :navName="navName"></footer-nav>
	</div>
</template>

<script>
	import FooterNav from '@/components/FooterNav';
	import Tickets from './Tickets';
	export default {
		components: {
			'footer-nav': FooterNav,
			'tickets': Tickets
		},
		data() {
			return {
				navName: 'index',
				inited: false
			};
		},
		computed: {
			headerAnimate() {
				return this.$imageUrl('bear01.gif');
			},
			hasToken() {
				console.log('======== change token ========', this.$store.getters['model.account/token']);
				return this.$store.getters['model.account/token'];
			},
			registered() {
				return this.$store.getters['model.account/registered'];
			},
			isAuth() {
				return this.$store.getters['model.account/isAuth'];
			},
			isMember() {
				return this.$store.getters['model.account/isMember'];
			},
			userScore() {
				return this.$store.getters['model.account/userScore'];
			},
			isLogin() {
				return this.$store.getters['model.account/token'];
			},
			hasLoadedActivity() {
				return this.$store.getters['model.activity/id'] !== null;
			},
			activityId() {
				return this.$store.getters['model.activity/id'];
			},
			accessToken() {
				return this.$store.getters['model.app/accessToken'];
			}
		},
		watch: {
			accessToken (value) {
				if (value) {
					if(!this.isLogin) {
						this.$command('SIGN_IN', this.accessToken);
					}
				}
			},
			hasToken (value) {
				if(this.hasToken) {
					console.log('load account', this.hasLoadedActivity);
					if(!this.hasLoadedActivity) {
						this.$command('LOAD_ACCOUNT', false);
						this.$command('GET_ACTIVITY_INFO');
					}
				}
			},
			registered (value) {
				if (this.registered) {
					this.loadTickets();
				}
			}
		},
		mounted() {
			this.initAccount();
		},
		onShow() {
			if(this.$route.query['needRefresh']) {
				this.initAccount();
			}
		},
		methods: {
			redirectTo(router, options = {}) {
				this.$command('REDIRECT_TO', router, 'push', options);
			},
			getPhoneNumber(e) {
				this.$command('SET_USER_MOBILE', e);
			},
			getUserInfo(e) {
				this.$command('USER_REGISTER', e);
			},
			async initAccount() {
				console.log('-------------- init account ----------------');
				await this.$store.dispatch('model.account/resetFromCache', {
					initAccount: async() => {
						if (!this.accessToken) {
							await this.$command('APP_ACCESSS');
						}else{
							this.$command('SIGN_IN', this.accessToken);
						}
					}
				});
			},
			async loadTickets() {
				await this.$command('LOAD_TICKETS');
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
		background: url(../../../../static/images/icon/logo.png) no-repeat top center;
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

	.user-info-box,
	.user-mobile-box,
	.user-score-box {
		height: 300rpx;
		width: 670rpx;
		margin: 0 auto;
		margin-top: -90rpx;
		border-radius: 15rpx;
		overflow: hidden;
		text-align: center;
	}

	.user-info-get-btn,
	.user-mobile-get-btn {
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

	.score {
		position: relative;
		display: inline-block;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 90rpx auto 0;
		font-size: 128rpx;
		font-weight: 500;
	}

	.user-score-box .score i {
		position: absolute;
		top: 0;
		right: -68rpx;
		font-size: 32rpx;
		font-weight: 200;
		line-height: 32rpx;
	}

	.tips {
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

	#toast_area {
		position: fixed;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .3);
		z-index: 1000;
	}

	#toast {
		position: absolute;
		background: #FFFFFF;
		width: 620rpx;
		border-radius: 10rpx;
		top: 338rpx;
		left: 65rpx;
	}

	#toast_title {
		background: #FECE00;
		text-align: center;
		line-height: 96rpx;
		border-radius: 10rpx 10rpx 0 0;
		font-size: 34rpx;
		font-weight: 400;
	}

	#toast_content {}

	#toast_content_info {
		padding: 20rpx 40rpx;
	}

	#input_change_info {
		font-size: 32rpx;
		font-weight: 300;
		color: #111111;
		margin-bottom: 20rpx;
	}

	#input_change_btn {
		background: #FECE00;
		line-height: 78rpx;
		text-align: center;
		font-size: 34rpx;
		font-weight: 400;
		border-radius: 10rpx;
	}

	#input_change_tips {
		font-size: 22rpx;
		font-weight: 300;
		color: #828282;
		text-align: center;
		line-height: 68rpx;
	}
</style>
