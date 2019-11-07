<!--suppress ALL -->
<template>
	<div id="order_payment">
        <CustomHeader :title="title" :needReturn="true" />

        <div id="pay_shop_info">
            <i class="iconfont location">&#xe80b;</i>
            <div class="pay_shop_info">
                <div class="pay_shop_info_name" @click="selectPoint">
                    <h4>
                        {{selectedPoint.name}}
                        <span>{{selectedPoint.mobile}}</span>
                    </h4>
                </div>
                <div class="pay_shop_info_address">
                    {{selectedPoint.address}}
                </div>
            </div>
            <i class="iconfont arrow">&#xe6a3;</i>
        </div>
        <div id="pay_pick_up_info">
            <i class="iconfont location">&#xe80b;</i>
            <div class="order_info">
                <div class="order_info_name">
                    <h4>
                        预约取货日期
                        <span>{{tomorrowStr}}</span>
                    </h4>
                    <h4>
                        预约取货时间
                        <span>{{selectedPoint['start_at']}} - {{selectedPoint['end_at']}}</span>
                    </h4>
                </div>
            </div>
        </div>
        <ul id="good_list">
            <li v-for="(good,index) in goodInShoppingCart" :key="index">
                <img :src="good.image" alt="">
                <div id="good_info">
                    <h3>{{good['name']}}</h3>
                    <em v-if="good['spec_desp']">{{good['spec_desp']}}</em>
                    <div id="good_info_price">
                        <h3>{{good['price_format']}}</h3>
                        <em>X {{good['buy_num']}}</em>
                    </div>
                </div>
            </li>
        </ul>
        <ul id="total">
            <li>
                <h3>商品总价</h3>
                <span>{{orderInfo['total_fee_format'] || 0}}</span>
            </li>
            <li>
                <h3>优惠金额</h3>
                <span>{{orderInfo['total_preferential_fee_format'] || 0}}</span>
            </li>
            <li @click="jump('couponCenter')">
                <h3>优惠券</h3>
                <em>剩余{{availableCoupons.length}}张</em>
                <span class="use_coupon" v-if="availableCoupons.length > 0">
                    0张已使用
                    <i class="iconfont">&#xe6a3;</i>
                </span>
            </li>
            <li>
                <h4>实付款</h4>
                <h5>{{orderInfo['settlement_total_fee_format'] || 0}}</h5>
            </li>
        </ul>
        <div id="do_payment">
            <span>
                预付款 {{orderInfo['settlement_total_fee_format'] || 0}}
            </span>
            <h4 @click="createOrder">去支付</h4>
        </div>
	</div>
</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';

	import {formatMoney} from '../../../utils';

	export default {
		components: {
			CustomHeader
		},
		data() {
			return {
				title: '支付',
                pointInfo:{},
				tomorrowStr: '',
                type: ''
			};
		},
		watch: {

		},
		computed: {
			selectedPoint () {
				return this.model.user.map.selectedMapPoint
            },
			goodInShoppingCart () {
				if (this.type === 'mall') {
					return this.model.user.store.goodInShoppingCart
                } else {
					return this.model.newEvents.shoppingCarts.goodInShoppingCart
                }

            },
			orderInfo () {
				return this.model.user.order.payment.orderInfo
            },
			availableCoupons () {
				return this.model.user.tickets.availableCoupons
            }
		},
		methods: {
			selectPoint () {
                this.$command('REDIRECT_TO', 'storesMap', 'replace' , {
                	query: {
                		type: this.type
                    }
                });
            },
			createOrder(){
				this.$command('CREATE_PAY_ORDER',{
					shop_id: this.selectedPoint.id,
					coupon_records: [],
                },this.type);
				this.$command('REDIRECT_TO', 'selectPay', 'replace',{
					query: {type: this.type}
                })
            },
            getDate () {
				var tomorrow = new Date();
				tomorrow.setTime(tomorrow.getTime() + 24*60*60*1000);
				var tomorrowStr = tomorrow.getFullYear()+"-"+(tomorrow.getMonth()+1)+"-"+tomorrow.getDate();
				this.tomorrowStr = tomorrowStr
			},
			jump (router) {
				this.$command('REDIRECT_TO', router, 'replace',{
					query: {needReturn: true}
                });
			}
		},
		created() {

		},
		mounted() {
            this.getDate();
			let type = this.$route.query.type;
			this.type = type;
			this.$command('CALCULATE_PRICE_COMMAND',type,{});
			this.$command('AVAILABLE_COUPONS', type)
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #f2f2f2;
	}

    #pay_shop_info,#pay_pick_up_info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0 40rpx;
        height: 180rpx;
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
        justify-content: flex-start;
        border-top: 2rpx solid #f2f2f2;
    }

    #pay_pick_up_info .location{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_pick_up_info .order_info{
        font-size: 28rpx;
        color:#111;
        margin-left: 40rpx;
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
        align-items: center;
        border-bottom: 2rpx solid #f2f2f2;
        padding-bottom: 20rpx;
    }

    #good_list li:last-child{
        border: none;
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
