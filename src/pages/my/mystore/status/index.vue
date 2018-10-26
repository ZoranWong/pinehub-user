<template>
	<div id="status">
		<mp-toast :merchandise="merchandise" :display="display" @close="closeStockPanel" @modifyStock="modifyStock"></mp-toast>
		<mp-title :title="title"></mp-title>
		<div id="tab_select">
			<ul>
				<li v-for="(tab, index) in tabs" :class="{tab_select_now:cur == index}" :style="{width:tabNumWidth}" :key="index"
				 @click="tabSelect(index)">
					<span>{{tab.name}}</span>
				</li>
			</ul>
		</div>
		<div id="tab_content">
			<div class="tab_content_item store-orders" v-if="cur === 0">
				<store @showToast="showToastFunction" :onloadCategory="onloadCategory" :changeCategory="changeCategory"></store>
			</div>
			<div class="tab_content_item purchase-orders" v-if="cur === 1">
				<purchase :purchaseList="purchaseList" :purchaseTotal="purchaseTotal" :onloadPurchase="onloadPurchase"></purchase>
			</div>
			<div class="tab_content_item sales-orders" v-if="cur === 2">
				<sales :salesInfo="salesInfo" :sellTop="sellTop" :merchandiseTop="merchandiseTop" :statics="statics" :onloadSales="onloadSales"></sales>
			</div>
		</div>
		<div id="footNav_height"></div>
		<footer-nav :navName="navName"></footer-nav>
	</div>
</template>

<script>
	import Toast from './Toast';
	import Sales from './Sales';
	import Purchase from './Purchase';
	import StoreToast from './StoreToast';
	import MpTitle from '@/components/MpTitle';
	import FooterNav from '@/components/FooterNav';
	import MyStoreStatusPurchaseCommand from '@/commands/MyStoreStatusPurchaseCommand';
	import MyStoreStatusSalesCommand from '@/commands/MyStoreStatusSalesCommand';
	import MyStoreCategoriesCommand from '@/commands/MyStoreCategoriesCommand';
	import MyStoreChangeCategoryCommand from '@/commands/MyStoreChangeCategoryCommand';
	import MyStoreModifyStockCommand from '@/commands/MyStoreModifyStockCommand';
	export default {
		components: {
			"mp-title": MpTitle,
			"sales": Sales,
			"purchase": Purchase,
			"store": StoreToast,
			"mp-toast": Toast,
			'footer-nav': FooterNav
		},
		data() {
			return {
				title: "店铺状态",
				navName: "my",
				tabs: [{
					name: "库存统计"
				}, {
					name: "进货统计"
				}, {
					name: "销售统计"
				}],
				cur: 0,
				merchandise: {},
				display: false
			};
		},
		computed: {
			tabNumWidth() {
				let num = this.tabs.length
				num = (num == 'undefined') ? 1 : num;
				return Math.floor((100 / num) * 100) / 100 + '%';
			},
			purchaseTotal() {
				return this.$store.getters['model.my.store.status.purchase/purchaseTotal'];
			},
			purchaseList() {
				return this.$store.getters['model.my.store.status.purchase/purchaseList'];
			},
			salesInfo() {
				return this.$store.getters['model.my.store.status.sales/salesInfo'];
			},
			sellTop() {
				return this.$store.getters['model.my.store.status.sales/sellTop'];
			},
			merchandiseTop() {
				return this.$store.getters['model.my.store.status.sales/merchandiseTop'];
			},
			statics() {
				return this.$store.getters['model.my.store.status.sales/statics'];
			}
		},
		methods: {
			tabSelect(num) {
				this.cur = num;
				console.log(num);
				console.log(this);
			},
			showToastFunction(merchandise) {
				this.display = true;
				this.merchandise = merchandise;
			},
			closeStockPanel() {
				this.display = false;
			},
			modifyStock(id, primaryStockNum, modifyStockNum, reason, comment) {
				console.log('modifyStock--------@@@OK');
				this.$command(MyStoreModifyStockCommand.commandName(), id, primaryStockNum, modifyStockNum, reason, comment);
			},
			onloadPurchase(status) {
				this.$command(MyStoreStatusPurchaseCommand.commandName(), status);
			},
			onloadSales(status) {
				this.$command(MyStoreStatusSalesCommand.commandName(), status);
			},
			onloadSales(storeId) {
				this.$command(MyStoreCategoriesCommand.commandName(), storeId);
			},
			changeCategory(index, categoryId) {
				this.$command(MyStoreChangeCategoryCommand.commandName(), index, categoryId);
				console.log('KKKKK-------', index, categoryId);
			}
		},
		created() {
			this.$command(MyStoreStatusPurchaseCommand.commandName(), 'week');
			this.$command(MyStoreStatusSalesCommand.commandName(), 'week');
			this.$command(MyStoreCategoriesCommand.commandName(), '1');
			this.$command(MyStoreChangeCategoryCommand.commandName(), '1', '1');
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #fafafa;
	}

	#footNav_height {
		height: 109rpx;
	}

	#status {
		position: relative;
		width: 100%;
		height: 100%;
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

	.tab_content_item {}

	.tab_content_now {
		display: block;
	}
</style>
