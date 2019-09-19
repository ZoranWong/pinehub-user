<!--suppress ALL -->
<template>
	<div class="record">
		<mp-title :title="title"></mp-title>
		<div class="title">{{shopInfo.name}}</div>
		<div id="selectSearchInfo">
			<em>{{collectionRecordsDate}}</em>
			<i @click="jump('merchant.searchCollectionRecords')"></i>
			<em class="diy_search" @click="jump('merchant.searchCollectionRecords')">自定义查询</em>
		</div>
		<div class="flex total">
			<div>
				<span>收款笔数</span>
				<span class="bold">{{totalNum}}</span>
			</div>
			<div class="text_right">
				<span>合计</span>
				<span class="bold">￥{{totalAmount}}</span>
			</div>
		</div>

		<scroll-view class="orders-wrapper" style="height:900rpx" scroll-y="true">
			<div class="list">
				<ul>
					<li v-for="(item,index) in payInfoList" :key="index" class="clearfix">
						<img class="head_portrait" :src="item.customer.avatar" />
						<div class="record_info">
							<span class="user_name">{{item.customer.nickname ? item.customer.nickname : '匿名支付'}}</span>
							<span>{{item.payTypeStr}}支付</span>
							<span>{{item.paidTime}}  支付完成</span>
						</div>
						<div class="money">
							￥{{item.totalAmount}}
						</div>
					</li>
				</ul>
			</div>
		</scroll-view>
	</div>
</template>

<script>
	import MpTitle from '@/components/MpTitle';
	import { SITE_USER_ORDER, SHOPPING_MALL_ORDER, NOT_NEED_PICK_UP_METHOD } from '@/utils/OrderDict';
	export default {
		components: {
			'mp-title': MpTitle
		},
		data() {
			return {
				title: '收款记录',
				collectionRecordsDate: (new Date()).format('yyyy-MM-dd'),
				type: NOT_NEED_PICK_UP_METHOD
			};
		},
		computed: {
			shopInfo() {
				return this.$store.getters['model.account/shopInfo'];
			},
			payInfoList() {
				return this.$store.getters['model.store.orders/list'];
			},
			totalNum() {
				return this.$store.getters['model.store.orders/totalNum'];
			},
			totalAmount() {
				return this.$store.getters['model.store.orders/totalAmount'];
			}
		},
		methods: {
			loadOrders(collectionRecordsDate, type, payType, page = 1, limit = 15) {
				let storeId = this.shopInfo.id;
				this.$command('LOAD_STORE_ORDERS', storeId, collectionRecordsDate, type, payType, page, limit);
			},
			jump(router) {
				this.$command('REDIRECT_TO', router, 'replace');
			}
		},
		mounted() {
		    if(this.$route && this.$route.query){
                let payType = this.$route.query['payType'];
                let paidDate = this.$route.query['paidDate'];

                if(payType != undefined && paidDate != undefined) {
                    paidDate = JSON.parse(paidDate)
                    this.collectionRecordsDate = paidDate[0] + '-' + paidDate[1];
                    this.loadOrders(paidDate, this.type, payType);
                } else {
                    this.loadOrders(this.collectionRecordsDate, this.type, payType = 0);
                }

            }
		},
		created() {}
	}
</script>

<style scoped>
	.record {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		background-color: #f2f2f2;
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 22rpx;
	}

	.title {
		text-align: center;
		color: #666;
		margin-bottom: 20rpx;
		font-size: 28rpx;
	}

	#selectSearchInfo {
		background: #FFFFFF;
		width: 710rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		font-size: 22rpx;
		font-weight: normal;
		margin-bottom: 20rpx;
		box-shadow: 0rpx 4rpx 10rpx rgba(204, 202, 202, .6);
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	#selectSearchInfo em {
		display: inline-block;
		color: #757575;
	}

	.diy_search {
		float: right;
	}

	#selectSearchInfo i {
		display: inline-block;
		float: right;
		background: url(../../../../static/images/icon/ico_puechase_2.png) no-repeat center center;
		background-size: 40rpx 42rpx;
		width: 40rpx;
		height: 42rpx;
		margin: 12rpx 0 0 12rpx;
	}

	.total {
		background: #fff;
		border-radius: 10rpx;
		padding: 56rpx 20rpx;
		box-sizing: border-box;
		margin-bottom: 10rpx;
		box-shadow: 0rpx 4rpx 10rpx rgba(204, 202, 202, .6);
	}

	.total span {
		display: block;
		color: #666;
		font-size: 22rpx;
	}

	.text_right span {
		text-align: right;
	}

	.flex {
		display: flex;
		justify-content: space-between;
	}

	span.bold {
		color: #000;
		font-size: 18px;
	}

	.list {}

	.list li {
		padding: 36rpx 20rpx 12rpx;
		width: 675rpx;
		box-shadow: 0rpx 4rpx 10rpx rgba(204, 202, 202, .6);
		background: #fff;
		border-radius: 10rpx;
		margin-bottom: 4rpx;
	}

	.list .clearfix::after {
		clear: both;
		display: table;
		content: "";
	}

	.head_portrait {
		background: #f2f2f2;
		border-radius: 10rpx;
		width: 88rpx;
		height: 88rpx;
		float: left;
		margin-right: 30rpx;
	}

	.record_info {
		float: left;
	}

	.record_info span {
		display: block;
		color: #666;
		line-height: 22rpx;
		margin-bottom: 20rpx;
	}

	span.user_name {
		color: #000;
		line-height: 22rpx;
		margin-bottom: 30rpx;
	}

	.record_info em {
		color: #FFCC00;
		display: inline-block;
	}

	.record_info i {
		display: inline-block;
		margin: 0 10rpx;
		color: #999;
	}

	.money {
		float: right;
		color: #000;
		font-size: 28rpx;
	}
</style>
