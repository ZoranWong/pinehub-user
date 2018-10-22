<template>
	<div id="myorder">
		<mp-title :title="title"></mp-title>
		
		<div id="tab_select">
			<ul>
				<li :test="test" v-for="(tab,index) in tabs" :class="{tab_select_now:cur == index}" :style="{width:tabNumWidth}" :key="index" @click="tabSelect(index)"><span>{{tab.name}}</span></li>
			</ul>
		</div>
		
		<ul>
			<li v-for="(item,index) in myOrdersList" :key="index">
				{{item.code}} + {{item.type}} + {{item.created_at}}
			</li>
		</ul>
		{{totalNum}}
		<div id="tab_content">
			<my-order :loadOrders="loadOrders" :status="statusType"></my-order>
			<!--<div v-for="(tab,index) in tabs" :class="{tab_content_now:cur == index}" :key="index" class="tab_content_item">
				<my-order></my-order>
			</div>-->
		</div>
		<span>{{x}}</span>
		<div id="footNav_height"></div>
		<footer-nav :navName="navName"></footer-nav>
	</div>
</template>

<script>
	import MyOrder from './MyOrder';
	import MpTitle from '@/components/MpTitle';
	import FooterNav from '@/components/FooterNav';
	export default {
		components: {
			"mp-title": MpTitle,
			"my-order": MyOrder,
			'footer-nav': FooterNav
		},
		data() {
			return {
				title: "我的订单",
				navName: "order",
				nowCom: "",
				tabs: [{
					name: "全部"
				}, {
					name: "未完成"
				}, {
					name: "已完成"
				}],
				cur: 0,
				statusType: "all"
			};
		},
		watch: {
			test(nv, ov) {
				console.log('nvno', nv, ov);
				if(nv && nv !== ov) {

				}
			}
		},
		computed: {
			tabNumWidth() {
				let num = this.tabs.length
				num = (num == 'undefined') ? 1 : num;
				return Math.floor((100 / num) * 100) / 100 + '%';
			},
			myOrdersList() {
				return this.$store.getters['model.my.orders/lists'];
			},
			totalNum(){
				return this.$store.getters['model.my.orders/totalNum'];
			},
			x(){
				return this.$store.getters['model.my.orders/x'];
			}
		},
		methods: {
			loadOrders(status) {
				this.$command('my-orders', "status", status);
			},
			tabSelect(num) {
				this.cur = num;
				switch(num) {
					case 0:
						this.statusType = "all";
						break;
					case 1:
						this.statusType = "sunccess";
						break;
					case 2:
						this.statusType = "completed";
						break;
					default:
						this.statusType = "all";
						break;
				}
				console.log(num);
			}
		},
		mounted() {
			// this.$command('my-orders');
//			this.$store.dispatch('model.my.orders/getorder', {a: 0,b: 1, c: 9});
			// console.log('anycall',this.$store.getters['model.my.orders/allOrder']);
		},
		created() {
			this.nowCom = "card";
			this.loadOrders("all");
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
		display: none;
	}
	
	.tab_content_now {
		display: block;
	}
</style>