<template>
	<div id="status">
		<mp-toast :merchandise="merchandise" :display="display" @close="closeStockPanel" @modifyStock="modifyStock"></mp-toast>
		<mp-title :title="title"></mp-title>
		<div id="tab_select">
			<ul>
				<li v-for="(tab, index) in tabs" :class="{tab_select_now:cur == index}" :style="{width:tabNumWidth}" :key="index" @click="tabSelect(index)">
					<span>{{tab.name}}</span>
				</li>
			</ul>
		</div>
		<div id="tab_content">
			<div class="tab_content_item store-orders" v-if="cur === 0">
				<store @showToast="showToastFunction" :onloadCategory="onloadCategory" :changeCategory="changeCategory"></store>
			</div>
			<div class="tab_content_item purchase-orders" v-if="cur === 1">
				<sales :salesInfo="salesInfo" :sellTop="sellTop" :merchandiseTop="merchandiseTop" :statics="statics" :mySalesEChart="mySalesEChart" :onloadSales="onloadSales" :onloadSalesEChart="onloadSalesEChart"></sales>
			</div>
			<div class="tab_content_item sales-orders" v-if="cur === 2">
				<purchase :onloadPurchase="onloadPurchase"></purchase>
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
	import MySalesEChartCommand from '@/commands/MySalesEChartCommand';
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
					name: "进货统计"
				}, {
					name: "销售统计"
				}, {
					name: "库存统计"
				}],
				cur: 0,
				merchandise: {},
				display: false,
				mySalesEChart: {}
			};
		},
		computed: {
			tabNumWidth() {
				let num = this.tabs.length
				num = (num == 'undefined') ? 1 : num;
				return Math.floor((100 / num) * 100) / 100 + '%';
			},
			categoryIndex() {
				return this.$store.getters['model.my.store.category.merchandises/currentCategoryIndex'];
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
			},
			categoryId() {
				return this.$store.getters['model.my.store.categories/categoryId'](this.categoryIndex);
			}
		},
		watch: {
			categoryId() {
				this.$command(MyStoreChangeCategoryCommand.commandName(), this.categoryIndex, this.categoryId);
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
			modifyStock(index, id, primaryStockNum, modifyStockNum, reason, comment) {
				this.$command(MyStoreModifyStockCommand.commandName(), index, id, primaryStockNum, modifyStockNum, reason, comment);
			},
			onloadPurchase(status) {
				//库存统计
				this.$command(MyStoreStatusPurchaseCommand.commandName(), status);
			},
			onloadSales(status) {
				this.$command(MyStoreStatusSalesCommand.commandName(), status);
			},
			onloadCategory() {
				//获取店铺产品分类
				this.$command(MyStoreCategoriesCommand.commandName());
			},
			onloadSalesEChart(status) {
				this.$command(MySalesEChartCommand.commandName(), status);
			},
			changeCategory(index, categoryId) {
				this.$command(MyStoreChangeCategoryCommand.commandName(), index, categoryId);
			},
			async loadMerchandises() {
				//this.$command(MyStoreStatusPurchaseCommand.commandName(), 'week');
				//this.$command(MyStoreStatusSalesCommand.commandName(), 'hour');
				try {
					await this.$command(MyStoreCategoriesCommand.commandName());
					console.log('这地方没出错');
				} catch(e) {
					console.log('抛出异常', e)
					throw(e);
					return false;
				}

			}
		},
		mounted() {
			this.loadMerchandises();
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