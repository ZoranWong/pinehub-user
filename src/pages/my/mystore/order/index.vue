<template>
	<div id="myorder">
		<mp-title :title="title"></mp-title>
		<div id="tab_select">
			<ul>
				<li v-for="(tab,index) in tabs" :class="{tab_select_now:cur == index}" :style="{width:tabNumWidth}" :key="index" @click="tabSelect(index)"><span>{{tab.name}}</span></li>
			</ul>
		</div>
		<div id="tab_content">
			<div class="tab_content_item" v-if="cur === 0">
				<order></order>
			</div>
			<div class="tab_content_item" v-else-if="cur === 1">
				2
				Sales statistics
			</div>
			<div class="tab_content_item" v-else-if="cur === 2">
				3
			</div>
		</div>
		<div id="footNav_height"></div>
		<footer-nav :navName="navName"></footer-nav>
	</div>
</template>

<script>
	import Order from './Order';
	import MpTitle from '@/components/MpTitle';
	import FooterNav from '@/components/FooterNav';
	export default {
		components: {
			"mp-title": MpTitle,
			"order": Order,
			'footer-nav': FooterNav
		},
		data() {
			return {
				title: "店铺状态",
				navName: "order",
				tabs: [{
					name: "销售统计"
				}, {
					name: "进货统计"
				}, {
					name: "库存统计"
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
		created() {
		}
	}
</script>

<style scoped>
	page {
		height: 100%;
		background: #fafafa;
	}
	
	#footNav_height {
		height: 109rpx;
	}
	
	#myorder {
		position: relative;
	}
	
	#tab_select {
		overflow: hidden;
		width: 750rpx;
		height: 74rpx;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
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
		padding-top: 74rpx;
	}
	
	.tab_content_item {
	}
	
	.tab_content_now {
		display: block;
	}
</style>