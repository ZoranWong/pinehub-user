<!--suppress ALL -->
<template>
	<div id="orderpay">
		<mp-title :title="title"></mp-title>
		<div id="orderpay_success">
			<div id="success_ico"></div>
			<em>支付成功</em>
			<i>您可以在我的订单中随时查看订单情况</i>
		</div>
		<div class="notice" v-if="siteUserOrder">
			<em>请您于:</em>
			<span>{{getFoodsTime}}(明天)7:00-9:00前往指定取货点，凭订单号后四位取货</span>
		</div>
		<div class="btns">
			<button class="btn orders-btn" size="mini" @click="orders">查看订单</button>
			<button class="btn buy-btn" size="mini" @click="index">返回首页</button>
		</div>
		<div class="tips" v-if="siteUserOrder">
			<em><i>温馨提示</i></em>
			<ul>
				<li>1.自提时如超时未取，则视为自动放弃！</li>
				<li>2.食品现制现售，暂不支持自主退货服务哦！</li>
			</ul>
		</div>
		<div id="active_banner" v-if="ticket">
			<img :src="imgSrc" @click="goUrl()" />
		</div>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	export default {
		components: {
			'mp-title': MpTitle
		},
		data() {
			return {
				title: '支付成功',
				siteUserOrder: false,
				ticket: true,
				ticketInfo: null,
				imgSrc: null,
				getFoodsTime: null
			};
		},
		computed: {

		},
		methods: {
			orders() {
				this.$command('REDIRECT_TO', 'user.orders', 'replace');
			},
			index() {
				this.$command('REDIRECT_TO', 'index', 'replace');
			},
			async getOrderInfo() {
				// let id = await this.mp.storage.get('payOrderId');
				// let id = '978';
				let id = this.$route.query['order_id'];
				// console.log(id);
				let res = await this.http.orders.getOrder(id);
				console.log('B----', res);
				if (res.data.type != 0 && res.data.pick_up_method == 2) {
					this.setGetFoodsTime(res.data.paid_at);
					this.siteUserOrder = true;
				}
			},
			async getTicket() {
				console.log(456);
				// let id = await this.mp.storage.get('payOrderId');
				// let id = '978';
				let id = this.$route.query['order_id'];
				let res = await this.http.orders.getTicketByOrder(id);
				console.log('a', res);
				if (res.data.banner_url != undefined) {
					this.ticketShow = true;
					this.ticketInfo = res.data.ticket.data;
					this.imgSrc = res.data.banner_url;
				}
			},
			async goUrl() {
				console.log(this.ticketInfo);
				this.$command('REDIRECT_TO', 'user.ticket', 'push', {
					query: {
						ticketInfo: JSON.stringify(this.ticketInfo)
					}
				});
			},
			setGetFoodsTime(timestamp) {
				this.getFoodsTime = (new Date((new Date(timestamp)).getTime() + (24 * 60 * 60 * 1000))).format('yyyy-MM-dd');
			}
		},
		mounted() {
			this.getOrderInfo();
			this.getTicket();
		},
		created() {
			console.log('A------', (new Date((new Date('2019-01-24')).getTime() + (24 * 60 * 60 * 1000))).format('yyyy-MM-dd'));
		}
	}
</script>

<style scoped>
	#orderpay {
		background: #f1f2f3;
		position: absolute;
		height: 100%;
		width: 100%;
	}

	#orderpay_success {
		font-size: 32rpx;
		font-weight: 300;
		color: #111111;
		margin-top: 130rpx;
	}

	#success_ico {
		display: block;
		width: 148rpx;
		height: 148rpx;
		margin: 0 auto;
		padding: 5rpx;
		background: url(../../../../static/images/icon/feedBackSuccess.png) no-repeat center center;
		background-size: 100%;
	}

	#orderpay_success em {
		text-align: center;
		font-size: 30rpx;
		font-weight: 400;
		margin-top: 30rpx;
	}

	#orderpay_success i {
		font-size: 30rpx;
		margin: 20rpx auto 20rpx;
		text-align: center;
		line-height: 36rpx;
	}

	.notice {
		margin: 0 140rpx;
		line-height: 34rpx;
		color: #333;
	}


	.notice em {
		font-size: 24rpx;
	}

	.notice span {
		font-size: 22rpx;
	}

	.btns {
		width: 520rpx;
		margin: 120rpx auto 0;
	}

	.btn {
		font-size: 32rpx;
		font-weight: 200;
		text-align: center;
		color: #111111;
		line-height: 56rpx;
		margin: 15rpx;
		height: 56rpx;
		width: 230rpx;
	}

	.btn.orders-btn {
		background: #FFFFFF;
	}

	.btn.buy-btn {
		background: #FECE00;
	}

	.tips {
		margin: 0 60rpx;
		font-weight: normal;
		color: #686868;
	}

	.tips em {
		border-bottom: 2rpx solid #ddd;
		text-align: center;
		line-height: 60rpx;
		margin-bottom: 30rpx;
	}

	.tips em i {
		background: #F1F2F3;
		margin: 0 auto -30rpx;
		display: block;
		width: 36%;
		font-size: 28rpx;
	}

	.tips ul {
		display: block;
		font-size: 20rpx;
		line-height: 32rpx;
		margin: 10rpx 80rpx 0;
	}

	#active_banner {
		margin-top: 40rpx;
	}

	#active_banner img {
		width: 670rpx;
		height: 198rpx;
		margin: 0 auto;
		display: block;
		border-radius: 10rpx;
	}
</style>
