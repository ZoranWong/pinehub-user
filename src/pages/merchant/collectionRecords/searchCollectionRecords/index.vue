<!--suppress ALL -->
<template>
	<div class="record">
		<mp-title :title="title"></mp-title>
		<div class="title">查询时间不超过31天</div>
		<div class="box_window">
			<em>指定平台</em>
			<picker class="diy_search" :range="payTypes" :value="index" range-key="name" @change="selectPayType">{{payTypes[payTypeStrIndex]['name']}}<i></i></picker>
		</div>
		<div class="box_window">
			<em>开始时间</em>
			<picker class="diy_search" mode="date" start="" @change="getSelectDateStart">{{selectDateStart}}<i></i></picker>
		</div>
		<div class="box_window">
			<em>截止时间</em>
			<picker class="diy_search" mode="date" start="" @change="getSelectDateEnd">{{selectDateEnd}}<i></i></picker>
		</div>
		<div class="box_window" id="search" @click="submit">
			查询
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
				title: '自定义查询',
				payTypes: [{
					id: 0,
					name: '全部'
				}, {
					id: 1,
					name: '支付宝'
				}, {
					id: 2,
					name: '微信'
				}],
				payTypeStrIndex: 0,
				selectDateStart: (new Date()).format('yyyy-MM-dd'),
				selectDateEnd: (new Date()).format('yyyy-MM-dd'),
			};
		},
		methods: {
			selectPayType(e) {
				this.payTypeStrIndex = e.target.value;
			},
			getSelectDateStart(e) {
				let utn = e.target.value;
				this.selectDateStart = (new Date(utn)).format('yyyy-MM-dd');
			},
			getSelectDateEnd(e) {
				let utn = e.target.value;
				this.selectDateEnd = (new Date(utn)).format('yyyy-MM-dd');
			},
			getResult(paidDate, payType) {
				this.mp.router.push('merchant.collectionRecords', {
					query: {
						paidDate,
						payType
					}
				});
			},
			submit() {
				let paidDate = JSON.stringify([this.selectDateStart + " 00:00:00", this.selectDateEnd + " 23:59:59"]);
				let payType = this.payTypeStrIndex;
				this.getResult(paidDate, payType)
			}
		}
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

	.box_window {
		background: #FFFFFF;
		width: 710rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		font-weight: normal;
		color: #111111;
		border-radius: 10rpx;
		box-shadow: 0rpx 4rpx 10rpx rgba(204, 202, 202, .6);
		overflow: hidden;
		position: relative;
	}

	.box_window em {
		padding-left: 20rpx;
		display: inline-block;
	}

	#search {
		text-align: center;
		margin-top: 20rpx;
	}

	.diy_search {
		position: absolute;
		top: 0;
		right: 20rpx;
		color: #757575;
		padding-right: 24rpx;
	}

	.diy_search.date {
		right: 210rpx;
	}

	.diy_search i {
		background: url(../../../../../static/images/icon/my_ico_menu_more.png) no-repeat center center;
		background-size: 12rpx 22rpx;
		width: 12rpx;
		height: 22rpx;
		position: absolute;
		top: 30rpx;
		right: 0;
	}
</style>
