<!--suppress ALL -->
<template>
    <scroll-view class="orders-wrapper" @scroll = "onScroll" :lower-threshold="10" :style ="{height: screenHeight + 'rpx'}" :scroll-y="true" :scroll-into-view="status" @scrolltolower="scrolltolower">
        <div class="order_info" :id = "'order-item-' + order.id" v-for="(order, index) in orders" :key="index" v-if ="order.show"  :top = "orderItemTop(order, index)">
            <div class="order_info_sn">
                <i>订单编号</i><em>{{order.code}}</em>
                <span class="order_info_status">{{order.status}}</span>
            </div>
            <div v-if = "order.type === OFF_LINE_PAYMENT_ORDER">
                线下扫码支付
            </div>
            <div class="order_info_glist" v-else>
                <dl v-for="(item, idx) in order.orderItems" :key="idx">
                    <dd><img :src="item.mainImage" /></dd>
                    <dt>
                        <em>{{item.name}}</em>
                        <span>单价 ￥{{item.sellPrice}} 数量 {{item.quality}} 份</span>
                        <span>总价 ￥{{item.totalAmount}}</span>
                    </dt>
                </dl>
            </div>
            <div class="order_info_ads" v-if = "order.type !== OFF_LINE_PAYMENT_ORDER">
                <i v-if = "order.pickUpMethod === USER_SELF_PICK_UP">自提地址</i>
                <i v-else>配送地址</i>
                <em>{{order.receiverAddress}}</em>
            </div>
            <div class="order_info_glist_total">
                <div class="order_info_glist_date">
                    {{order.createdAt}}
                </div>
                <em v-if = "order.type !== OFF_LINE_PAYMENT_ORDER">共{{order.quantity}}件商品</em>实付<i>￥{{order.paymentAmount}}</i>
            </div>
            <div class="order_info_btn" v-if="order.btnStatus === 1">
                <i @click="btnClick('pay', order.id)">立即支付</i>
                <i @click="btnClick('cancel', order.id)" class="cancel">取消订单</i>
            </div>
            <div class="order_info_btn" v-if="order.btnStatus === 2">
                <i @click="btnClick('verification', order.id)">确认核销</i>
            </div>
            <div class="order_info_btn" v-if="order.btnStatus === 3">
                <i @click="btnClick('received', order.id)">确认收货</i>
            </div>
            <i class="order_info_circle" v-if="order.btnStatus !== 0"></i>
            <i class="order_info_circle right_circle" v-if="order.btnStatus!==0"></i>
        </div>
    </scroll-view>
</template>

<script>
    import { USER_SELF_PICK_UP, OFF_LINE_PAYMENT_ORDER} from '@/utils/OrderDict';
    export default {
        name: 'UserOrders',
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
            showTop: 0,
           rpxRate: 1
        },
        data () {
            return {
                isLoading: false,
                USER_SELF_PICK_UP: USER_SELF_PICK_UP,
                OFF_LINE_PAYMENT_ORDER: OFF_LINE_PAYMENT_ORDER
            };
        },
        // 算术方法
        computed: {
            isLoadedAll () {
                return this.$store.getters['model.user.orders/isLoadedAll'];
            }
        },
        methods: {
            isOffLineOrder (order) {
                return order.type === OFF_LINE_PAYMENT_ORDER;
            },
            btnClick (type, id) {
                this.$command('ORDER_STATUS_UPDATE', type, id);
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
    }
    .order_info {
        background: #FFFFFF;
        border-radius: 10rpx;
        font-size: 34rpx;
        font-weight: 300;
        padding: 5rpx 20rpx 20rpx;
        margin: 20rpx;
        overflow: hidden;
        position: relative;
        box-shadow: 0rpx 9rpx 20rpx rgba(204, 202, 202, .6);
    }

    .order_info_sn {
        font-size: 32rpx;
        line-height: 68rpx;
        border-bottom: 1rpx solid #f3f3f3;
        overflow: hidden;
        font-weight: 300;
        margin-bottom: 20rpx;
        /*background: green;*/
    }

    .order_info_sn i {
        display: inline-block;
        color: #111111;
        font-size: 34rpx;
        padding-right: 20rpx;
    }

    .order_info_sn em {
        display: inline-block;
    }

    .order_info_status {
        font-weight: 400;
        color: #FFC000;
        float: right;
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
        overflow: hidden;
        clear: both;
        margin-top: 20rpx;
    }

    .order_info_glist dl {
        overflow: hidden;
        margin-bottom: 20rpx;
    }

    .order_info_glist dl:last-child {
        margin-bottom: 0;
    }

    .order_info_glist dl dd {
        display: inline-block;
        width: 140rpx;
        height: 140rpx;
        margin-right: 20rpx;
        float: left;
    }

    .order_info_glist dl dd img {
        display: block;
        width: 140rpx;
        height: 140rpx;
        background: #FAFAFA;
    }

    .order_info_glist dl dt {
        display: inline-block;
        width: 500rpx;
        height: 120rpx;
        float: left;
    }

    .order_info_glist dl dt em {
        font-size: 36rpx;
        font-weight: 300;
        line-height: 70rpx;
        color: #525252;
    }

    .order_info_glist dl dt span {
        display: block;
        font-size: 28rpx;
        font-weight: 300;
        color: #828282;
        line-height: 35rpx;
    }

    .order_info_glist_total {
        text-align: right;
        font-size: 28rpx;
        line-height: 46rpx;
    }

    .order_info_glist_total i {
        display: inline-block;
        color: #FECE00;
        padding-right: 10rpx;
    }

    .order_info_glist_total em {
        display: inline-block;
        padding-right: 10rpx;
    }

    .order_info_glist_date {
        display: inline-block;
        float: left;
    }

    .order_info_btn {
        margin-top: 20rpx;
        padding-top: 20rpx;
        border-top: 1rpx dashed #f3f3f3;
    }

    .order_info_btn i {
        font-size: 28rpx;
        float: right;
        background: #FECE00;
        border: 1rpx solid #FECE00;
        color: #111111;
        padding: 8rpx 15rpx;
        margin-left: 20rpx;
        border-radius: 10rpx;
    }

    .order_info_btn i.cancel {
        background: #FFFFFF;
        border: 1rpx solid #CCCCCC;
        color: #525252;
    }

    .order_info_circle {
        position: absolute;
        background: #FAFAFA;
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
        bottom: 72rpx;
        right: -25rpx;
        z-index: 1;
    }

    .order_info_circle.right_circle {
        left: -25rpx;
    }
</style>
