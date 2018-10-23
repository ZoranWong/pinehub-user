<template>
	<div id="myorder">
		<mp-title :title="title"></mp-title>
		<div id="window_fixed">
			<div id="myorder_select">
				<div class="myorder_select_info">
					<em>日期</em>
					<picker mode="date" :start="startTime" class="input" @change="getSelectDate">{{selectDate}}</picker>
				</div>
				<div class="myorder_select_info">
					<em>类型</em>
				</div>
			</div>
			<div id="tab_select">
				<ul>
					<li v-for="(tab,index) in tabs" :class="{tab_select_now:cur == index}" :style="{width:tabNumWidth}" :key="index"
					 @click="tabSelect(index)"><span>{{tab.name}}</span></li>
				</ul>
			</div>
		</div>
		<div id="tab_content">
			<div class="tab_content_item">
				<order></order>
			</div>
		</div>
	</div>
</template>

<script>
	import Order from './Order';
	import MpTitle from '@/components/MpTitle';
	export default {
		components: {
			"mp-title": MpTitle,
			"order": Order
		},
		data() {
			return {
				title: "订单汇总",
				navName: "my",
				tabs: [{
					name: "生产中"
				}, {
					name: "配送中"
				}, {
					name: "已完成"
				}],
				cur: 0,
				startTime: (new Date()).format('yyyy-MM-dd'),
				selectDate: (new Date()).format('yyyy 年 MM 月 dd 日')
			};
		},
		computed: {
			tabNumWidth() {
				let num = this.tabs.length
				num = (num == 'undefined') ? 1 : num;
				return Math.floor((100 / num) * 100) / 100 + '%';
			}

		},
		methods: {
			tabSelect(num) {
				this.cur = num;
			},
			getSelectDate(e) {
				//				console.log(e.target.value);
				this.selectDate = (new Date(e.target.value)).format('yyyy 年 MM 月 dd 日');
			}
		},
		created() {}
	}
</script>

<style scoped>
	#myorder {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #fafafa;
	}

	#window_fixed {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		overflow: hidden;
		width: 750rpx;
		height: 216rpx;
		background: #FFFFFF;
	}

	#myorder_select {
		margin: 20rpx 20rpx 0;
	}

	.myorder_select_info {
		overflow: hidden;
		margin-bottom: 10rpx;
	}

	.myorder_select_info em {
		display: inline-block;
		float: left;
		font-size: 32rpx;
		font-weight: normal;
	}

	.input {
		float: left;
		padding: 0 15rpx;
		margin: 0 20rpx;
		border: 1rpx solid #f0f0f0;
		border-radius: 10rpx;
		font-size: 28rpx;
	}

	#tab_select {
		overflow: hidden;
		width: 750rpx;
		height: 74rpx;

	}

	#tab_select ul li {
		height: 74rpx;
		line-height: 74rpx;
		float: left;
		background: #FFFFFF;
		text-align: center;
		font-size: 32rpx;
		font-weight: 300;
	}

	#tab_select ul li.tab_select_now {
		color: #FECE00;
	}

	#tab_select ul li.tab_select_now span {
		display: inline-block;
		width: 68%;
		line-height: 64rpx;
		border-bottom: 5rpx solid #FECE00;
	}

	#tab_content {
		padding-top: 220rpx;
	}

	.tab_content_item {}

	.tab_content_now {
		display: block;
	}
</style>