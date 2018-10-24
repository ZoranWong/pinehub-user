<template>
	<div id="sales">
		<div id="select_date">
			<picker :range="selectDate" :value="nowSelectDate" id="select_date_ranges" @change="selectDateNow">{{selectDate[nowSelectDate]}}</picker>
			<i id="select_date_arrow"></i>
		</div>
		<div id="sales_charts">
			<wx-charts :options='wxOptions'></wx-charts>
		</div>
		<div id="sales_total">
			<div class="sales_total_style sales_total_all">销售总额<em>8000.00</em></div>
			<div class="sales_total_style sales_total_booking">预订产品<em>6000.00</em></div>
			<div class="sales_total_style sales_total_site">站点产品<em>2000.00</em></div>
			<div class="sales_total_style sales_total_index">销售指数<em>500</em></div>
			<div class="sales_total_style sales_total_singlenum">销售单品数量<em>900</em></div>
			<div class="sales_total_style sales_total_num">销售笔数<em>600</em></div>
		</div>
		<div class="sales_rank">
			<div class="sales_rank_title">销售额排行/客户</div>
			<div class="sales_rank_ul">
				<ul>
					<li v-for="item in sellTop" :key="index+1"><i>{{index+1}}.</i>{{item.customer_nickname}}<em>￥{{item.total_amount}}</em></li>
				</ul>
			</div>
		</div>
		<div class="sales_rank">
			<div class="sales_rank_title">销售额排行/商品</div>
			<div class="sales_rank_ul">
				<ul>
					<li v-for="item in merchandiseTop" :key="index+1"><i>{{index+1}}.</i>{{item.name}}<em>￥{{item.total_amount}}</em></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
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
			'wx-charts': WxCharts
		},
		name: 'Sales',
		props: {
			salesInfo: {
				default: "",
				type: Function
			},
			sellTop: {
				default: "",
				type: Function
			},
			merchandiseTop: {
				default: "",
				type: Function
			},
			statics: {
				default: "",
				type: Function
			},
			onloadSales: {
				default: "",
				type: Function
			}
		},
		data() {
			return {
				wxOptions: this.getOptions(0),
				nowSelectDate: 0,
				selectDate: ["今日", "本周", "本月"]
			};
		},
		mounted() {},
		methods: {
			selectDateNow(e) {
				let num = e.target.value;
				this.nowSelectDate = num;
				this.wxOptions = this.getOptions(num, true);
				if (num == 0) {
					this.onloadSales('hour');
				} else if (num == 1) {
					this.onloadSales('week');
				} else {
					this.onloadSales('month');
				}
			},
			getOptions: function(i, refresh = false) {
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
				return option
			}
		},
		created() {

		}
	}
</script>

<style scoped>
	#select_date {
		margin: 20rpx;
		padding: 6rpx 20rpx;
		line-height: 52rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
		position: relative;
	}

	#select_date_ranges {
		font-size: 28rpx;
		font-weight: 300;
	}

	#select_date_arrow {
		position: absolute;
		right: 20rpx;
		top: 22rpx;
		height: 20rpx;
		width: 20rpx;
		background: url(../../../../../static/images/select_arrow.png) no-repeat center center;
		background-size: 90%;
	}

	#sales_charts {
		background: #FFFFFF;
		padding: 20rpx;
		margin: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
	}

	#sales_total {
		background: #FFFFFF;
		padding: 10rpx 20rpx 0;
		margin: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
	}

	.sales_total_style {
		color: #111111;
		font-weight: 300;
	}

	.sales_total_style em {
		display: inline-block;
		float: right;
		color: #828282;
	}

	.sales_total_all {
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}

	.sales_total_booking {
		font-size: 22rpx;
		margin-bottom: 10rpx;
	}

	.sales_total_site {
		font-size: 22rpx;
		border-bottom: 1rpx solid #F0F0F0;
		padding-bottom: 10rpx;
	}

	.sales_total_index {
		font-size: 28rpx;
		border-bottom: 1rpx solid #F0F0F0;
		line-height: 66rpx;
	}

	.sales_total_singlenum {
		font-size: 28rpx;
		border-bottom: 1rpx solid #F0F0F0;
		line-height: 66rpx;
	}

	.sales_total_num {
		font-size: 28rpx;
		line-height: 66rpx;
	}

	.sales_rank {
		margin: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
	}

	.sales_rank_title {
		background: #FECE00;
		color: #111111;
		font-size: 28rpx;
		font-weight: 400;
		line-height: 66rpx;
		text-indent: 20rpx;
		border-radius: 10rpx 10rpx 0 0;
	}

	.sales_rank_ul {
		background: #FFFFFF;
		padding: 10rpx 20rpx 10rpx 20rpx;
		font-size: 28rpx;
		font-weight: 300;
		border-radius: 0 0 10rpx 10rpx;
	}

	.sales_rank_ul ul li {
		line-height: 62rpx;
		border-bottom: 1rpx solid #F0F0F0;
	}

	.sales_rank_ul ul li:last-child {
		border-bottom: none;
	}

	.sales_rank_ul ul li i {
		display: inline-block;
		padding-right: 10rpx;
	}

	.sales_rank_ul ul li em {
		display: inline-block;
		float: right;
		color: #828282;
	}
</style>
