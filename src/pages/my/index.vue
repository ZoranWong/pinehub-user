<template>
	<div id="myorder">
		<mp-title :title="title"></mp-title>
		<div id="tab_select">
			<ul>
				<li v-for="(tab,index) in tabs" :class="{tab_select_now:cur == index}" :style="{width:tabNumWidth}" :key="index" @click="tabSelect(index)">{{tab.name}}</li>
			</ul>
		</div>
		<div id="tab_content">
			<div v-for="(tab,index) in tabs" :class="{tab_content_now:cur == index}" :key="index" class="tab_content_item">
				<my-order></my-order>
			</div>
		</div>
	</div>
</template>

<script>
	import MyOrder from '@/components/MyOrder';
	import MpTitle from '@/components/MpTitle';
	export default {
		components: {
			"mp-title": MpTitle,
			"my-order": MyOrder
		},
		data() {
			return {
				title: "我的订单",
				tabs: [{
					name: "全部"
				}, {
					name: "未核销"
				}, {
					name: "已核销"
				}],
				cur: 0
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
				console.log(num);
			}
		},
		created() {}
	}
</script>

<style>
	page {
		height: 100%;
	}
	
	#myorder {
		background: #fafafa;
		position: relative;
		height: 100%;
		width: 100%;
	}
	
	#tab_select {
		overflow: hidden;
		width: 750rpx;
		height: 68rpx;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}
	
	#tab_select ul li {
		height: 68rpx;
		line-height: 68rpx;
		float: left;
		background: #FFFFFF;
		text-align: center;
		font-size: 32rpx;
		font-weight: 300;
	}
	
	#tab_select ul li.tab_select_now {
		background: #FECE00;
		color: #FFFFFF;
	}
	
	#tab_content {
		padding-top: 68rpx;
	}
	
	.tab_content_item {
		display: none;
	}
	
	.tab_content_now {
		display: block;
	}
</style>