<!--suppress ALL -->
<template>
    <div>
        <CustomHeader :title="title" :needReturn="true" />
        <div id="userOrders" class="body"  :style="{height: screenHeight - (navHeight + statusBarHeight) - 200 + 'rpx'}">
            <div id="shop_detail_header">
                <h3>
                    {{orderDetail['state_desc']}}
                    <span>期待您的再次光临哦~</span>
                </h3>
                <img src="../../../../static/images/background/1.png"></img>
            </div>
            <div id="shop_info" v-if="orderDetail['shop']">
                <i class="iconfont location">&#xe80b;</i>
                <div class="shop_info">
                    <div class="shop_info_name">
                        <h4>
                            {{orderDetail['shop']['name']}}
                            <span>{{orderDetail['shop']['keeper_mobile']}}</span>
                        </h4>
                    </div>
                    <div class="shop_info_address">
                        {{orderDetail['shop']['address']}}
                    </div>
                </div>
                <i class="iconfont arrow">&#xe6a3;</i>
            </div>
            <div id="pick_up_info">
                <i class="iconfont location">&#xe65e;</i>
                <div class="order_info">
                    <div class="order_info_name">
                        <h4>
                            预约取货日期
                            <span>{{orderDetail['plan_pickup_date']}}</span>
                        </h4>
                        <h4>
                            预约取货时间
                            <span>{{orderDetail['plan_pickup_time']}}</span>
                        </h4>
                    </div>
                </div>
            </div>
            <div id="order_details">
                <ul id="good_list">
                    <li v-for="(good,index) in orderDetail['order_items']" :key="index">
                        <img :src="good.thumbnail" alt="">
                        <div id="good_info">
                            <h3>{{good['product_name']}}</h3>
                            <em v-if="good.spec">{{good.spec}}</em>
                            <div id="good_info_price">
                                <h3>￥ {{good.price}}</h3>
                                <em>X {{good.quantity}}</em>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul id="order_amount">
                    <li>
                        <span>商品总价</span>
                        <span>￥{{orderDetail['total_fee']}}</span>
                    </li>
                    <li>
                        <span>优惠金额</span>
                        <span>-￥{{orderDetail['total_preferential_fee']}}</span>
                    </li>
                    <li>
                        <span>优惠券</span>
                        <span>已用{{orderDetail['coupon_records_count']}}张</span>
                    </li>
                </ul>
                <div id="order_price">
                    <h4>实付款</h4>
                    <span>￥{{orderDetail['settlement_total_fee']}}</span>
                </div>
            </div>
            <div id="order_info">
                <h3>订单信息</h3>
                <div>
                    <span> 订单编号：{{orderDetail['order_no']}}</span>
                    <em @click="cpoy(orderDetail['order_no'])">复制</em>
                </div>
                <div>
                    <span>创建时间：{{orderDetail['created_at']}} </span>
                    <span> {{orderDetail['state_desc']}}</span>
                </div>

                <div>
                   付款时间：{{orderDetail['paid_at'] || '暂无'}}
                </div>
                <div>支付方式：{{orderDetail['payment_type'] === 'BANANCE' ? '余额支付':'微信支付'}}  </div>

                <div>实际取货时间：{{orderDetail['verified_at'] || '暂无'}}  </div>
            </div>
            <div id="order_total_price">
                <span>预付款 ￥{{orderDetail['settlement_total_fee']}}</span>
                <h3 v-if="orderDetail['state_desc'] === '待自提'" @click="btnClick('pickup', orderDetail)" >去取货</h3>
                <h3 v-if="orderDetail['state_desc'] === '待付款'" @click="btnClick('pay', orderDetail)" >去支付</h3>
            </div>
        </div>
    </div>

</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';


	export default {
        components: {
			CustomHeader,
        },
        data () {
            return {
                title: '订单详情',
                navName: 'orderDetails',
				screenWitdh: 0,
				screenHeight: 0
            };
        },
        watch: {},
        computed: {
			orderDetail () {
				return this.model.user.order.detail.orderDetail
            },
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			}
        },
        methods: {
			cpoy (text) {
				wx.setClipboardData({
					data: text,
					success: function (res) {
						wx.getClipboardData({
							success: function (res) {
								wx.showToast({
									title: '复制成功'
								})
							}
						})
					}
				})
            },
			btnClick (type, order) {
				this.$command('ORDER_STATUS_UPDATE', type, order);
            }
        },
        created () {

        },
        mounted () {
            let id = this.$route.query.id;
			this.$command('ORDER_DETAIL', id);
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);
        }
    }
</script>

<style>
    page {
        height: 100%;
        background: #f2f2f2;
    }

    #userOrders {
        position: relative;
        overflow: auto;
    }

    #shop_detail_header {
      height: 80rpx;
      padding: 50rpx 80rpx;
      color: #111111;
      background: linear-gradient(to right,#FDE068,#FFCC00);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    #shop_detail_header img{
      width: 178rpx;
      height: 124rpx;
    }

    #shop_detail_header h3{
      font-size: 32rpx;
      margin-bottom: 10rpx;
    }

    #shop_detail_header span{
      display: block;
      font-size: 28rpx;
      margin-top: 10rpx;
    }

    #shop_info,#pick_up_info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      padding: 0 40rpx;
      height: 180rpx;
    }

    #shop_info .location{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #shop_info .shop_info{
        width: 507rpx;
        font-size: 28rpx;
        color: #111111;
    }

    #shop_info .shop_info .shop_info_name{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #shop_info .shop_info .shop_info_name h4 {
        font-weight: normal;
        margin: 0;
    }

    #shop_info .shop_info .shop_info_name span{
        color: #757575;
        margin-left: 23rpx;
    }

    #shop_info .arrow{
        color: #757575;
        font-size: 22rpx;
    }

    #pick_up_info{
        justify-content: flex-start;
        border-top: 2rpx solid #f2f2f2;
    }

    #pick_up_info .location{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pick_up_info .order_info{
        font-size: 28rpx;
        color:#111;
        margin-left: 40rpx;
    }

    #pick_up_info .order_info h4{
        margin: 0;
    }

    #pick_up_info .order_info span{
        color: #757575;
        margin-left: 23rpx;
    }

    #order_details{
        margin-top: 20rpx;
        background: #fff;
    }

    #order_details #good_list{
        padding: 0 20rpx;
        border-bottom: 2px solid #f2f2f2;
    }

    #order_details #good_list li{
        padding: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2rpx solid #f2f2f2;
        padding-bottom: 20rpx;
    }

    #order_details #good_list li:last-child{
        border-bottom: 0;
    }

    #order_details #good_list li img{
        width: 180rpx;
        height: 180rpx;
    }

    #order_details #good_list li #good_info{
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        flex-direction: column;
    }

    #order_details #good_list li #good_info h3{
        font-size: 28rpx;
        color: #111111;
        margin: 10rpx 0 20rpx 0;
    }

    #order_details #good_list li #good_info em{
        font-size: 24rpx;
        color: #757575;
    }

    #order_details #good_list li #good_info #good_info_price{
        width: 100%;
        margin-top: 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #order_details #good_list li #good_info #good_info_price h3{
        margin: 0;
    }

    #order_details #order_amount{
        padding: 15rpx 40rpx;
        background: #fff;
    }

    #order_details #order_amount li{
        padding: 15rpx 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #order_details #order_amount li span{
        font-size: 28rpx;
        color: #757575;
    }

    #order_details #order_price{
        background: #fff;
        padding: 0 40rpx;
        height: 80rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 2px solid #f2f2f2;
        font-size: 32rpx;
    }

    #order_details #order_price h4{
        color: #111;
    }

    #order_details #order_price span{
        color: #FFCC00;
    }

    #order_info{
      margin: 20rpx 0;
      height: 450rpx;
      background: #fff;
      padding: 30rpx 40rpx;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }

    #order_info h3{
        font-size: 32rpx;
        color: #111111;
        font-weight: normal;
    }

    #order_info div{
        width: 100%;
        font-size: 28rpx;
        color: #757575;
        margin-top: 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #order_info em{
        font-size: 28rpx;
        color: #ffcc00;
    }

    #order_total_price{
      width: 670rpx;
      height: 98rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40rpx;
      background: #ffcc00;
      position: fixed;
      bottom: 0;
    }
</style>
