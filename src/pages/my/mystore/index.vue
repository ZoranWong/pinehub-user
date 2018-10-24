<template>
	<div id="mystore">
		<mp-title :title="title"></mp-title>
		<div id="mystore_buyinfo">
			<ul>
				<li>
					<i class="my_store_ico ico_week_buy" />
					<div class="info_list">
						<em>{{storeInfo.week_buy_num}}</em>
						<i>本周用户购买数</i>
					</div>
				</li>
				<li>
					<i class="my_store_ico ico_week_sell" />
					<div class="info_list">
						<em>{{storeInfo.week_sell_amount}}</em>
						<i>本周销售额</i>
					</div>
				</li>
				<li>
					<i class="my_store_ico ico_today_buy" />
					<div class="info_list">
						<em>{{storeInfo.today_buy_num}}</em>
						<i>今日购买数</i>
					</div>
				</li>
				<li>
					<i class="my_store_ico  ico_today_sell" />
					<div class="info_list">
						<em>{{storeInfo.today_sell_amount}}</em>
						<i>今日营业额</i>
					</div>
				</li>
			</ul>
		</div>
		<div id="mystore_charts">
			<!-- <wx-charts :options='wxOptions'></wx-charts> -->
		</div>
		<div id="mystore_menu">
			<ul>
				<li>
					<i class="my_store_menu_ico ico_1"></i>
					<em>进货</em>
				</li>
				<li>
					<i class="my_store_menu_ico ico_2"></i>
					<em>需配送订单</em>
				</li>
				<li @click="jump('mystorestatus')">
					<i class="my_store_menu_ico ico_3"></i>
					<em>店铺状态</em>
				</li>
				<li @click="scanCode">
					<i class="my_store_menu_ico ico_4"></i>
					<em>物流进货扫码</em>
				</li>
				<li>
					<i class="my_store_menu_ico ico_5"></i>
					<em>自提订单</em>
				</li>
				<li>
					<i class="my_store_menu_ico ico_6"></i>
					<em>订单汇总</em>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	import WxCharts from '@/components/WxCharts';
	const data = [
		[680, 980, 440, 551, 680, 619, 680, 980, 440, 551, 680, 619, 680, 980, 440, 551, 680, 619, 680, 980, 440, 551, 680,
			619
		],
		[934, 934, 934, 934, 934, 932, 901],
		[910, 445, 143, 643, 551, 680, 619, 680, 980, 440, 551, 680, 619, 680, 980, 440, 551, 680, 619, 680, 980, 440, 551,
			680, 619, 680, 980, 440, 551, 680, 619
		]
	]
	const day = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
	const week = ['一', '二', '三', '四', '五', '六', '日'];
	const mouth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
		29, 30, 31
	];
	const dateData = [day, week, mouth];
	let i = 0
	export default {
		components: {
			"mp-title": MpTitle,
			'wx-charts': WxCharts
		},
		data() {
			return {
				title: "我的店铺",
				wxOptions: this.getOptions(0)
			};
		},
		computed: {
			storeInfo() {
				return this.$store.getters['model.my.store/storeInfo'];
			}
		},
		methods: {
			jump(router) {
				this.$command('router', router, 'push');
			},
			scanCode() {
				console.log(121212)
				this.$command('scan');
			},
			getOptions(i, refresh = false) {
				let option = {
					refresh: refresh,
					xAxis: {
						type: 'category',
						data: dateData[i],
						axisLabel: {
							show: true,
							textStyle: {
								color: '#111111'
							}
						}
					},
					yAxis: {
						type: 'value',
						axisLine: {
							show: false
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: '#111111'
							}
						}
					},
					grid: {
						x: 40,
						y: 20,
						x2: 20,
						y2: 20,
						borderWidth: 1
					},
					series: [{
						data: data[i],
						type: 'line',
						itemStyle: {
							normal: {
								color: '#FECE00',
								lineStyle: {
									width: 3, //折线宽度
									color: '#FECE00'
								}
							}
						},
						areaStyle: {},
						smooth: true
					}]
				}
				return option;
			}
		},
		mounted() {
			this.$command('MYSTOREINFO');
		},
		created() {}
	}
</script>

<style scoped>
	#mystore {
		background: #fafafa;
		position: absolute;
		height: 100%;
		width: 100%;
		overflow-y: auto;
	}

	#mystore_buyinfo {
		margin: 15rpx;
		clear: both;
		overflow: hidden;
	}

	#mystore_buyinfo ul li {
		width: 330rpx;
		height: 140rpx;
		margin: 15rpx;
		float: left;
		background: #fff;
		border-radius: 10rpx;
		font-weight: 300;
		position: relative;
		box-shadow: 0rpx 4rpx 10rpx rgba(204, 202, 202, .6);
	}

	.my_store_ico {
		display: inline-block;
		width: 60rpx;
		height: 60rpx;
		background-size: 90%;
		background-repeat: no-repeat;
		background-position: center center;
		position: absolute;
		top: 40rpx;
		left: 40rpx;
	}

	.my_store_ico.ico_week_buy {
		background-image: url(../../../../static/images/my_store_week_buy.png);
	}

	.my_store_ico.ico_week_sell {
		background-image: url(../../../../static/images/my_store_week_sell.png);
	}

	.my_store_ico.ico_today_buy {
		background-image: url(../../../../static/images/my_store_today_buy.png);
	}

	.my_store_ico.ico_today_sell {
		background-image: url(../../../../static/images/my_store_today_total.png);
	}

	.info_list {
		position: absolute;
		top: 35rpx;
		left: 120rpx;
		clear: both;
	}

	.info_list em {
		font-size: 30rpx;
		font-weight: 400;
		line-height: 34rpx;
	}

	.info_list i {
		font-size: 24rpx;
		line-height: 22rpx;
		color: #bbbbbb;
		margin-top: 10rpx;
	}

	#mystore_charts {
		margin: 0 30rpx;
		background: #FFFFFF;
	}

	#mystore_menu {
		margin: 15rpx;
		/*background: #FFF6BD;*/
		overflow: hidden;
	}

	#mystore_menu ul li {
		margin: 15rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		width: 210rpx;
		height: 170rpx;
		float: left;
		box-shadow: 0rpx 4rpx 10rpx rgba(204, 202, 202, .6);
	}

	#mystore_menu ul li em {
		font-size: 28rpx;
		font-weight: 300;
		text-align: center;
		color: #828282;
	}

	.my_store_menu_ico {
		display: block;
		width: 60rpx;
		height: 60rpx;
		background-size: 90%;
		background-repeat: no-repeat;
		background-position: center center;
		margin: 30rpx auto 15rpx;
	}

	.ico_1 {
		background-image: url(../../../../static/images/my_store_m1.png);
	}

	.ico_2 {
		background-image: url(../../../../static/images/my_store_m2.png);
	}

	.ico_3 {
		background-image: url(../../../../static/images/my_store_m3.png);
	}

	.ico_4 {
		background-image: url(../../../../static/images/my_store_m4.png);
	}

	.ico_5 {
		background-image: url(../../../../static/images/my_store_m5.png);
	}

	.ico_6 {
		background-image: url(../../../../static/images/my_store_m6.png);
	}
</style>
