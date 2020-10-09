<!--suppress ALL -->
<template>
    <scroll-view class="orders-wrapper" @scroll = "onScroll" :lower-threshold="10" :style ="{height: mainHeight - 30 + 'px'}" :scroll-y="true" :scroll-into-view="status" @scrolltolower="scrolltolower">
        <div class="order_info" :id = "'order-item-' + order.id" v-for="(order, index) in orders" :key="index" v-if ="order.show" :top = "orderItemTop(order, index)">
            <div class="order_info_sn" @click="orderDetail(order.id)">
                <div class="left">
                    <img src="../../../../static/icons/orderMenu.png" class="orderMenu" alt="">
                    <em>订单编号:{{order.code}}</em>
                    <img src="../../../../static/icons/rightArrow.png" class="arrow" alt="">
                </div>
                <span class="order_info_status">{{order.state_desc}}</span>
            </div>
            <ul class="order_info_glist" @click="orderDetail(order.id)">
                <li v-for="(item, idx) in order.orderItems" :key="idx">
                    <img :src="item.mainImage" alt="">
                    <div id="good_info">
                        <h3>{{item.name}}</h3>
                        <em v-if="item['specDesp']">{{item['specDesp']}}</em>
                        <div id="good_info_price">
                            <h3>￥{{item.sellPrice}}</h3>
                            <em>X {{item.quantity}}</em>
                        </div>
                    </div>
                </li>
                <li id="total">共{{order.orderItems.length || 0}}件商品 预付款:￥<span>{{order['settlement_total_fee']}}</span></li>
            </ul>
            <div class="order_info_btn">
                <button form-type="submit" v-if="order['can_cancel']" @click="btnClick('cancel', order)" class="white">取消订单</button>
                <button form-type="submit" @click="btnClick('onemore', order)" class="white" v-else>再来一单</button>
                <button form-type="submit" v-if="order['can_pay']" @click="btnClick('pay', order)" class="yellow">去支付</button>
            </div>
        </div>
    </scroll-view>
</template>

<script>
    export default {
        name: 'SocietyOrders',
        props: {
            status: {
                default: 'all',
                type: String
            },
            loadOrders: {
                default: '',
                type: Function
            },
            next: {
                default: null,
                type: Function
            },
            orders: {
                default: '',
                type: Function
            },
            screenHeight: {
                default: 0,
                type: Number
            },
            navHeight: {
				default: null,
				type: Number
            },
            statusBarHeight: {
            	default: null,
				type: Number
            },
     rpxRate: 1
        },
        data () {
            return {
                isLoading: false
            };
        },
        // 算术方法
        computed: {
            isLoadedAll () {
                return this.$store.getters['model.user.orders/isLoadedAll'];
            },
            headerHeight () {
                return this.statusBarHeight + this.navHeight;
            },
            mainHeight () {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight;
            }
        },
        methods: {
            async uploadFormId (e) {
                let formId = e.mp.detail.formId;
                if (formId !== "the formId is a mock one"){
                    await this.http.account.saveFormId(formId);
                } else {
                    console.log('form id 不合法')
                }
            },
            orderDetail (id) {
                this.$command('REDIRECT_TO', 'user.order.detail', 'push',{
                    query: {
                        id: id
                    }
                });
            },

            btnClick (type, order) {
                console.log(order, '......................');
                this.$command('ORDER_STATUS_UPDATE', type, order);
            },
            orderItemTop (order, index) {
                const query = wx.createSelectorQuery()
                query.select(`#order-item-${index}`).boundingClientRect()
                query.selectViewport().scrollOffset()
                query.exec((res) => {
                    if (res[0]) {
                        order.top = res[0].top * this.rpxRate;
                        order.show = true;
                    }
                })
            },
            async scrolltolower () {
                if (!this.isLoading && !this.isLoadedAll) {
                    this.isLoading = true;
                    let result = await this.next();
                    if(result) {
                        this.isLoading = false;
                    }
                }
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
        watch: {
            status (n, v) {
                this.flag = true
                this.status = n
                if (n && !v) {
                    this.loadOrders(this.status);
                }
            }
        },
        mounted () {
			this.loadOrders(this.status);
        }
    }
</script>

<style scoped>
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
