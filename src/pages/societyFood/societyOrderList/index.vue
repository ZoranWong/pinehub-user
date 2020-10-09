<!--suppress ALL -->
<template>
	<div id="my_groupon">
        <CustomHeader :title="title" :needReturn="true" :backColor="'#fff'" :backUrl="true" @back="back"> </CustomHeader>
        <div id="tab_select" >
            <view class="page-section-spacing">
                <scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" enable-back-to-top="true" :style="{width: '900rpx' }">
                    <view :id="tab.key" class="scroll-view-item_H" v-for="tab in tabs" :class="{tab_select_now:statusType === tab.key}" :key="tab.key" @click="selectTab(tab.key,tab.name)">{{tab.name}}</view>
                </scroll-view>
            </view>
        </div>
        <div id="tab_content" :style="{'height': mainHeight + 'px'}">
            <div class="empty_img_groupon" v-if="ordersList.length==0">
                <img src="../../../../static/images/empty/empty_order.jpg" alt="" id="empty">
                <span>暂无订单哦～</span>
            </div>
            <scroll-view class="orders-wrapper" @scroll = "onScroll" :lower-threshold="10" :scroll-y="true">
                <div class="order_info" :id = "order.id" v-for="(order, index) in ordersList" :key="index">
                    <div class="order_info_sn" @click="orderDetail(order.id)">
                        <div class="left">
                            <img src="../../../../static/icons/orderMenu.png" class="orderMenu" alt="">
                            <em>订单编号:{{order.orderNo}}</em>
                            <img src="../../../../static/icons/rightArrow.png" class="arrow" alt="">
                        </div>
                        <span class="order_info_status">{{order.state_desc}}</span>
                    </div>
                    <ul class="order_info_glist" @click="orderDetail(order.id)">
                        <li v-for="(item, idx) in order.order_items" :key="idx">
                            <img :src="item.thumbnail" alt="">
                            <div id="good_info">
                                <h3>{{item.name}}</h3>
                                <em v-if="item.specValue">{{item.specValue}}</em>
                                <div id="good_info_price">
                                    <h3>￥{{item.settlement_total_fee}}</h3>
                                    <em>X {{item.quantity}}</em>
                                </div>
                            </div>
                        </li>
                        <li id="total">共{{order.order_items.length || 0}}件商品 预付款:￥<span>{{order.settlement_total_fee}}</span></li>
                    </ul>
                    <div class="order_info_btn">
                        <button form-type="submit" v-if="order.payment_state!=4 && statusType!=4" @click="btnClick('pay', order)" class="yellow">去支付</button>
                    </div>
                </div>
            </scroll-view>
        </div>
	</div>
</template>
<script>
    import CustomHeader from "../../../components/CustomHeader";
    import SocietyOrders from './SocietyOrders';
	export default {
		components: {
            CustomHeader,
            SocietyOrders
		},
		data() {
			return {
                title: '社会餐订单',
                statusType: 4,
                currentName:'全部订单',
                ordersList:[],
                tabs: [
                    {name: '待支付', key: 0},
                    {name: '待配送', key: 1},
                    {name: '待自提', key: 2},
                    {name: '已完成', key: 3},
                    {name: '已取消', key: 4}
                ],
                screenHeight: 0,
                screenWitdh: 0,
                statusDesc: '待配送',
            };
		},
		computed: {
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
            headerHeight() {
                return this.statusBarHeight + this.navHeight;
            },
            mainHeight() {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight - this.btnHeight;
            },
            btnHeight() {
                let systemInfo = wx.getSystemInfoSync();
                return 88 * systemInfo.windowWidth / 750;
            }
		},
		methods: {
            orderDetail (id) {
                this.$command('REDIRECT_TO', 'societyFood.societyOrderDetail', 'push',{query: {id: id}});
            },
            btnClick (type, order) {
                this.$command('ORDER_STATUS_UPDATE', type, order);
            },
            selectTab (statusType) {
                this.statusType = statusType;
                let param={
                    status:statusType
                }
                this.$command('SF_MY_LIST',param,this);
            },
            back () {
                this.$command('REDIRECT_TO', '', 'back')
            },
            onScroll (e) {
                let minTop = e.target.scrollTop - this.screenHeight;
                let maxTop = e.target.scrollTop + this.screenHeight * 2;
                let count = 0;
                this.orders.map((order) => {
                    if (this.setOrderItemVisible(order, minTop, maxTop)) {
                        count ++;
                    }
                });
            },
            setOrderItemVisible (order, minTop, maxTop) {
                return order.top >= minTop && order.top < maxTop;
            }
		},
        created () {
            this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
            this.screenWitdh = wx.getSystemInfoSync().windowHeight;
            this.screenHeight = (this.rpxRate * this.screenWitdh);
        },
        mounted() {
		   this.selectTab(0);
        }
    }
</script>

<style scoped>
	page {
		height: 100%;
        overflow: hidden;
	}

    #tab_select {
        overflow: auto;
        width: 750rpx;
        height: 88rpx;
        z-index: 999;
        background: #fff;
    }

    .scroll-view_H .scroll-view-item_H{
        width: 150rpx;
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
        width: 100%;
        position: relative;
        background: #f2f2f2;
        overflow: auto;
    }

    .empty_img_groupon{
        width: 100%;
        height: 700rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #f2f2f2;
        overflow: hidden;
        border-top: 20rpx solid #f2f2f2;
    }
    .empty_img_groupon img{
        width: 350rpx;
        height: 240rpx;
    }

    .empty_img_groupon span{
        color: #999;
        font-size: 32rpx;
        margin-bottom: 100rpx;
    }

    .order_container{
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx;
    }

    .orders-wrapper {
        box-sizing: border-box;
        overflow-y: hidden;
        height: 100%;
        background: #f2f2f2;
        padding: 20rpx;
    }
    .order_info {
        background: #FFFFFF;
        box-sizing: border-box;
        width: 100%;
        padding: 0 20rpx;
        overflow: hidden;
        position: relative;
        margin-top: 20rpx;
        border-radius: 25rpx;
    }

    .order_info_sn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100% ;
        height: 108rpx;
        padding: 0 20rpx;
        box-sizing: border-box;
    }

    .order_info_sn .left{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .order_info_sn .left .orderMenu{
        width: 30rpx;
        height: 36rpx;
        margin-right: 20rpx;
    }

    .order_info .left .arrow{
        width: 12rpx;
        height: 20rpx;
        margin-left: 30rpx;
    }

    .order_info_sn .left .orderIcon {
        font-size: 34rpx;
        padding-right: 20rpx;
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
    }

    .order_info_sn .left .detailIcon {
        font-size: 20rpx;
        margin-left: 30rpx;
        color: #757575;
    }

    .order_info_sn .left em {
        font-size: 32rpx;
        color: #111111;
        white-space: nowrap;
    }

    .order_info_status {
        font-weight: 400;
        color: #333;
        font-size: 28rpx;
    }

    .order_info_ads {
        font-size: 28rpx;
        line-height: 40rpx;
        font-weight: 400;
        margin-bottom: 10rpx;
    }

    .order_info_ads i {
        display: inline-block;
        font-size: 30rpx;
        padding-right: 20rpx;
    }

    .order_info_ads em {
        display: inline-block;
        margin-top: 20rpx;
    }

    .order_info_glist {
        padding: 30rpx 20rpx;
        box-sizing: border-box;
        border-bottom: 1rpx solid #f2f2f2;
        border-top: 1rpx solid #f2f2f2;
        background: #fff;
    }

    .code_scan {
        width: 100%;
        box-sizing: border-box;
        padding: 30rpx 20rpx;
        font-size: 32rpx;
        color: #111111;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid #f2f2f2;
        border-top: 1rpx solid #f2f2f2;
    }

    .code_scan .total{
        font-size: 24rpx ;
    }

    .order_info_glist li {
        padding: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .order_info_glist li img {
        width: 180rpx;
        height: 180rpx;
    }

    .order_info_glist li #good_info {
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

    .order_info_glist li #good_info h3{
        font-size: 28rpx;
        color: #111111;
        margin: 10rpx 0 20rpx 0;
    }

    .order_info_glist li #good_info em{
        font-size: 24rpx;
        color: #757575;
    }

    .order_info_glist li #good_info #good_info_price{
        width: 100%;
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .order_info_glist li #good_info #good_info_price h3{
        margin: 0;
    }

    .order_info_glist #total{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 24rpx;
        color: #111111;
        padding: 0 10rpx;
        box-sizing: border-box;
    }

    .order_info_glist #total span{
        font-size: 32rpx;
        color: #111111;
    }

    .order_info_btn {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 108rpx;
    }

    .order_info_btn form {
        width: 100%;
        line-height: 36rpx;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: row;
    }

    .order_info_btn button {
        display: inline-block;
        height: 70rpx;
        line-height: 70rpx;
        font-size: 28rpx;
        background: #fff;
        border: 1rpx solid #757575;
        color: #757575;
        margin-right: 20rpx;
        border-radius: 15rpx;
    }

    .order_info_btn .yellow{
        color: #111111;
        background: #ffcc00;
        border-color: #ffcc00;
    }
</style>
