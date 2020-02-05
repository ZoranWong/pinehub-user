<!--suppress ALL -->
<template>
	<div id="order_payment">
        <CustomHeader :title="title" :needReturn="true" />
        <div class="payment_window" :style="{'height' : (screenHeight - statusBarHeight - navHeight) + 'px'}">
            <div id="pay_shop_info" @click="selectPoint">
                <img class="locationImg" src="../../../../../static/icons/location.png" alt="">
                <div class="pay_shop_info" v-if="address.id"  >
                    <div class="pay_shop_info_name">
                        <h4>
                            {{address['consignee_name']}}
                            <span>{{address['consignee_mobile_phone']}}</span>
                        </h4>
                    </div>
                    <div class="pay_shop_info_address">
                        {{address.rangeAddress}}{{address['detail_address']}}
                    </div>
                </div>
                <div class="pay_shop_info" v-else>
                    请选择收货地址
                </div>
                <i class="iconfont arrow">&#xe6a3;</i>
            </div>
            <div id="pay_pick_up_info">
                <img class="locationImg" src="../../../../../static/icons/time.png" alt="">
                <div class="order_info">
                    <TimeSelector ref="timeSelector" />
                </div>
                <i class="iconfont arrow">&#xe6a3;</i>
            </div>
            <ul id="good_list">
                <li v-for="(good,index) in goodInShoppingCart" :key="index">
                    <div class="top">
                        <img :src="good.image" alt="">
                        <div id="good_info">
                            <h3>{{good['name']}}</h3>
                            <em v-if="good['spec_desp']">{{good['spec_desp']}}</em>
                            <div id="good_info_price">
                                <h3>{{good['price_format']}}</h3>
                                <em>X {{good['buy_num']}}</em>
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <input type="text" placeholder="请填写备注" @blur="(e) => saveRemark(e,good)" />
                    </div>
                </li>
            </ul>
            <ul id="total">
                <li>
                    <h3>商品总价</h3>
                    <span>{{actOrderInfo['total_fee_format'] || 0}}</span>
                </li>
                <li>
                    <h3>优惠金额</h3>
                    <span>{{actOrderInfo['total_preferential_fee_format'] || 0}}</span>
                </li>
                <li @click="jump('couponCenter')">
                    <h3>优惠券</h3>
                    <em>{{actAvailableCoupons.length - actCouponIds.length}}张可用</em>
                    <span class="use_coupon" v-if="actAvailableCoupons.length > 0">
                    {{actCouponIds.length || 0}}张已使用
                    <i class="iconfont">&#xe6a3;</i>
                </span>
                </li>
                <li>
                    <h4>实付款</h4>
                    <h5>{{actOrderInfo['settlement_total_fee_format'] || 0}}</h5>
                </li>
            </ul>
        </div>
        <div id="do_payment">
            <span>
                金额 {{actOrderInfo['settlement_total_fee_format'] || 0}}
            </span>
            <h4 @click="createOrder">去支付</h4>
        </div>
	</div>
</template>
<script>
	import CustomHeader from '../../../../components/CustomHeader';
    import TimeSelector from '../../../../components/TimeSelector';
	import {formatMoney,getDate} from '../../../../utils';
    import _ from 'underscore'
	export default {
		components: {
			CustomHeader,TimeSelector
		},
		data() {
			return {
				title: '支付',
				tomorrowStr: '',
                type: '',
                actId: '',
                time: '',
                screenHeight: 0
			};
		},
		watch: {

		},
		computed: {
			goodInShoppingCart () {
				if (this.type === 'mall') {
					return this.model.user.store.goodInShoppingCart
                } else if (this.type === 'breakfast')  {
					return this.model.newEvents.shoppingCarts.goodInShoppingCart
                } else if (this.type === 'activity') {
                    return this.model.activity.goodInShoppingCart
                }

            },
			actOrderInfo () {
				return this.model.activity.orderInfo
            },
			actAvailableCoupons () {
                return this.model.activity.availableCoupons
            },
            actCouponIds () {
				return this.model.activity.couponIds
            },
            address () {
                return this.model.activity.address
            },
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
		},
		methods: {
            saveRemark (e, product) {
                product.remark = e.target.value
            },
			selectPoint () {
                this.$command('REDIRECT_TO', 'user.address', 'push' , {
                	query: {
                		needReturn: true,
                        type: 'activity'
                    }
                });
            },
			createOrder(){
                let carts = [];
                if (!this.address.id) {
                    wx.showToast({
                        title: '请先选择收货地址',
                        icon: 'none'
                    });
                    return;
                }
                if (!this.$refs.timeSelector.date || !this.$refs.timeSelector.time) {
                    wx.showToast({
                        title: '请选择送货时间',
                        icon: 'none'
                    });
                    return;
                }
                let hasRemark = true
                _.map(this.goodInShoppingCart, (product)=>{
                    if (!product.remark) {
                        hasRemark = false;
                    }
                })
                if (!hasRemark) {
                    wx.showToast({
                        title: `请填写商品备注`,
                        icon: 'none'
                    });
                    return
                };
                carts = this.goodInShoppingCart;
				this.$command('CREATE_ACTIVITY_PAY_ORDER', this.actId, this.address.id, this.actCouponIds,this.$refs.timeSelector.date, this.$refs.timeSelector.time, carts);

            },
			jump (router) {
				if (this.actAvailableCoupons.length === 0) return;
				this.$command('REDIRECT_TO', router, 'replace',{
					query: {needReturn: true, type: this.type, actId: this.actId}
                });
			}
		},
		created() {

		},
		mounted() {
			let type = this.$route.query.type;
			let id = this.$route.query.id;
			let actId = this.$route.query.actId || '';
            let rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
            let screenWitdh = wx.getSystemInfoSync().windowHeight;
            this.screenHeight = (rpxRate * screenWitdh)/ 2;
			this.type = type;
			this.actId = actId;
			if (id) {
				this.$command('ORDER_COUPON_IDS', id)
            }
            this.$command('CALCULATE_ACTIVITY_PRICE_COMMAND',type,{
				coupon_records: this.actCouponIds,
                carts: [],
                remark: '',
                activity_id: actId
            });
            this.$command('ACTIVITY_AVAILABLE_COUPONS', actId);
            this.$command('LOAD_DEFAULT_USER_ADDRESS')
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #f2f2f2;
        overflow: hidden;
	}

    .payment_window{
        overflow: auto;
    }

    #pay_shop_info,#pay_pick_up_info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0 40rpx;
        height: 180rpx;
    }

    .locationImg{
        width: 66rpx;
        height: 66rpx;
    }

    #pay_shop_info {
        margin-top: 20rpx;
    }

    #pay_pick_up_info {
        margin-bottom: 20rpx;
    }

    #pay_shop_info .location{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_shop_info .pay_shop_info{
        width: 507rpx;
        font-size: 28rpx;
        color: #111111;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name h4 {
        font-weight: normal;
        margin: 0;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name span{
        color: #757575;
        margin-left: 23rpx;
    }

    #pay_shop_info .arrow{
        color: #757575;
        font-size: 22rpx;
    }

    #pay_pick_up_info{
        justify-content: space-between;
        border-top: 2rpx solid #f2f2f2;
        overflow: hidden;
    }

    #pay_pick_up_info .arrow{
        font-size: 22rpx;
        color: #757575;
    }

    #pay_pick_up_info .location{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_pick_up_info .order_info{
        width: 507rpx;
        font-size: 28rpx;
        color:#111;
    }

    #pay_pick_up_info .order_info h4{
        margin: 0;
    }

    #pay_pick_up_info .order_info span{
        color: #757575;
        margin-left: 23rpx;
    }

    #good_list{
        padding: 0 20rpx;
        border-bottom: 2px solid #f2f2f2;
        background: #fff;
    }

    #good_list li{
        padding: 10rpx;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        border-bottom: 2rpx solid #f2f2f2;
        padding-bottom: 20rpx;
        box-sizing: border-box;
    }

    #good_list li:last-child{
        border: none;
    }

    #good_list li .top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #good_list li .bottom {
        width: 100%;
        box-sizing: border-box;
    }
    #good_list li .bottom input{
        width: 100%;
        border: 1rpx solid #f2f2f2;
        margin-top: 15rpx;
        font-size: 28rpx;
        box-sizing: border-box;
        padding: 0 20rpx;
    }

    #good_list li img{
        width: 180rpx;
        height: 180rpx;
    }

    #good_list li #good_info{
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

    #good_list li #good_info h3{
        font-size: 28rpx;
        color: #111111;
        margin: 10rpx 0 20rpx 0;
    }

    #good_list li #good_info em{
        font-size: 24rpx;
        color: #757575;
    }

    #good_list li #good_info #good_info_price{
        width: 100%;
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #good_list li #good_info #good_info_price h3{
        margin: 0;
        font-size: 28rpx;
        color: #FFCC00;
    }

    #good_list li #good_info #good_info_price em{
        font-size: 24rpx;
        color: #757575;
    }

    #order_payment #total {
        background: #fff;
        padding: 0 20rpx;
        box-sizing: border-box;
        width: 100%;
        margin-top: 20rpx;
        margin-bottom: 120rpx;
    }

    #order_payment #total li {
        width: 100%;
        box-sizing: border-box;
        height: 80rpx;
        border-bottom: 2rpx solid #f2f2f2;
        padding: 0 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }

    #order_payment #total li:last-child{
        border : none;
    }

    #order_payment #total li h3{
        font-size: 28rpx;
        color: #111;
        font-weight: 200;
    }

    #order_payment #total li h4{
        font-size: 32rpx;
        color: #111111;
    }

    #order_payment #total li h5{
        font-size: 32rpx;
        color: #ffcc00;
    }

    #order_payment #total li span {
        font-size: 28rpx;
        color: #757575;
    }

    #order_payment #total li .use_coupon{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 28rpx;
    }

    #order_payment #total li .use_coupon i{
        margin-left: 20rpx;
    }

    #order_payment #total li em {
        position: absolute;
        left: 120rpx;
        font-size: 22rpx;
        color: #fff;
        padding: 5rpx 20rpx;
        background: #ffcc00;
        border-radius: 3rpx;
    }

    #order_payment #do_payment{
        box-sizing: border-box;
        padding: 0 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 98rpx;
        width: 100%;
        background: #ffcc00;
        position: fixed;
        bottom: 0;
        z-index: 999999;
    }

    #order_payment #do_payment span{
        font-size: 32rpx;
        color: #111;
    }

    #order_payment #do_payment h4{
        font-size: 32rpx;
        color: #111111;
    }


</style>
