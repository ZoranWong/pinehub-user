<!--suppress ALL -->
<template>
	<div id="userOrders" class="body" :style="{'overflow': totalNum === 0 ? 'hidden': 'auto'}">
        <CustomHeader :title="title" :needReturn="true" />

        <div id="tab_select" :style="{'top': (statusBarHeight + navHeight) + 'px'}" >
            <view class="page-section-spacing">
                <scroll-view
                    class="scroll-view_H"
                    scroll-x="true"
                    bindscroll="scroll"
                    enable-back-to-top="true"
                    :scroll-into-view="scrollTo"
                    :style="{width: '1826rpx' }">
                    <view :id="tab.key" class="scroll-view-item_H" v-for="tab in tabs"
                          :class="{tab_select_now:statusType === tab.key}"
                          :key="tab.key"
                          @click="tabSelect(tab)">{{tab.name}}</view>
                </scroll-view>
            </view>

		</div>
		<div id="tab_content">
            <div class="empty_img" v-if="totalNum === 0">
                <img src="../../../../static/images/empty/empty_order.jpg" alt="" id="empty">
                <span>暂无订单哦～</span>
            </div>
			<orders :rpxRate="rpxRate" :screenHeight="screenHeight - 182" :load-orders="loadOrders" :status="statusType" :orders="orders" :next="next" :navHeight="navHeight" :statusBarHeight="statusBarHeight"></orders>
		</div>
<!--		<div id="footNavHeight"></div>-->
<!--		<footer-nav :navName="navName"></footer-nav>-->
	</div>
</template>
<script>
	import UserOrders from './UserOrders';
	import CustomHeader from '../../../components/CustomHeader';

	import FooterNav from '@/components/FooterNav';
	export default {
		components: {
			CustomHeader,
			'orders': UserOrders,
			'footer-nav': FooterNav
		},
		data () {
			return {
				title: '我的订单',
				navName: 'my',
				tabs: [
				    {name: '全部', key: ''},
				    {name: '待付款', key: 'WAIT_TO_PAY'},
				    {name: '已支付', key: 'ORDER_PAY_COMPLETED'},
				    {name: '制作中', key: 'ORDER_WAIT_MANUFACTURE'},
				    {name: '配送中', key: 'ORDER_CUSTOMER_VERIFY'},
				    {name: '待自提', key: 'WAIT_TO_PICK'},
                    {name: '已完成', key: 'ORDER_COMPLETED'},
                    {name: '处理中', key: 'ORDER_HANDLING'},
                    {name: '已退款', key: 'ORDER_REFUNDED'},
                    {name: '已取消', key: 'ORDER_CANCELED'},
                    {name: '订单异常', key: 'ORDER_EXCEPTION'}
                ],
				statusType: '',
				screenHeight: 0,
				rpxRate: 1,
				screenWitdh: 0,
                scrollTo: ''
			};
		},
		watch: {
			test (nv, ov) {
				if (nv && nv !== ov) {}
			}
		},
		computed: {
			tabNumWidth () {
				let num = this.tabs.length
				num = (typeof num === 'undefined') ? 1 : num;
				return Math.floor((100 / num) * 100) / 100 + '%';
			},
			orders () {
                return this.model.user.orders.list;
			},
			totalNum () {
				return this.$store.getters['model.user.orders/totalNum'];
			},
			currentPage () {
				let page = this.$store.getters['model.user.orders/currentPage'];
				return page;
			},
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			}
		},
		methods: {
			loadOrders (status) {
				this.$store.dispatch('model.user.orders/reset');
				this.$command('LOAD_USER_ORDERS', status, 1);
			},
			tabSelect (tab) {
				this.statusType = tab.key
                this.scrollTo = tab.key;
				this.$command('CLEAR_MODEL', 'model.user.orders');
                this.$forceUpdate();
                console.log('----------- order list status change -----------', this.statusType);
				this.loadOrders(this.statusType);
			},
			async next () {
				await this.$command('LOAD_USER_ORDERS', this.statusType, this.currentPage + 1, this.pageCount);
				return true;
			}
		},
		created () {
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);
		},
		onShow () {
			let paramsStatus = typeof this.$route.query.status !== 'undefined' ? this.$route.query.status : '';
			console.log('----------- order list status init -----------', paramsStatus)
			this.statusType = paramsStatus;
			this.scrollTo = paramsStatus;
			this.loadOrders(this.statusType);
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #f2f2f2;
        overflow: hidden;
	}

	#footNavHeight {
		height: 109rpx;
	}

	#userOrders {
		position: relative;

	}

	#tab_select {
		overflow: auto;
		width: 750rpx;
		height: 88rpx;
		position: fixed;
		left: 0;
		z-index: 999;
        background: #fff;
	}

    .scroll-view_H .scroll-view-item_H{
        width: 166rpx;
        display: inline-block;
        height: 88rpx;
        background: #FFFFFF;
        text-align: center;
        line-height: 82rpx;
        font-size: 30rpx;
        font-weight: 800;
        color: #757575;
    }

    #tab_select .tab_select_now{
        position: relative;
        color: #FFCC00;
    }

	#tab_select .tab_select_now:after {
        content:  '';
        position: absolute;
        width:30rpx;
        height:6rpx;
        background:rgba(255,204,0,1);
        border-radius:3px;
        bottom: 14rpx;
        left: 66rpx;
	}

	#tab_content {
		padding-top: 74rpx;
		position: relative;
	}

	#null_ico {
		width: 390rpx;
		height: 355rpx;
		position: absolute;
		top: 400%;
		margin-top: -178rpx;
		left: 50%;
		margin-left: -185rpx;
	}

	.tab_content_item {
		display: none;
	}

	.tab_content_now {
		display: block;
	}
    .empty_img{
        width: 100%;
        height: 700px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #f2f2f2;
        overflow: hidden;
        border-top: 20rpx solid #f2f2f2;
    }
    .empty_img img{
        width: 350rpx;
        height: 240rpx;
    }

    .empty_img span{
        color: #999;
        font-size: 32rpx;
        margin-bottom: 100rpx;
    }
</style>
