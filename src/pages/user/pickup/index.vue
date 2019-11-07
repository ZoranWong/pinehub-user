<!--suppress ALL -->
<template>
    <div id="pickup">

        <CustomHeader :title="title" :needReturn="false" />

        <div id="pickup_container">
            <div id="pickup_header" :style="{'backgroundImage':'url(' + background + ')'}">
                <span @click="changeBackground('left')">自提点自提</span>
                <span @click="changeBackground('right')">早餐自提</span>
            </div>
        </div>
        <ul id="pickup_info" v-if="orders.length">
            <swiper
                v-if="position === 'left'"
                class="swiper"
                @change="bannerChange"
                :circular="true">
                <block v-for="(item, index) in shop_order" :key="index">
                    <swiper-item class="swiperItem" :item-id="item.id">
                        <h3>请您前往【{{item.shop ? item.shop.name : '自提点'}}】进行自提</h3>
                        <canvas style="width: 200px; height: 200px;margin: 50rpx 0" :canvas-id="'qrcode_'+item['id']+'_'+drawTime"></canvas>
                        <div class="order_info">
                            <span>订单编号: {{item['order_no']}}</span>
                            <span>取货时间: {{item['pick_date']}}  {{item.shop ? item.shop['business_hours_start'] + '-' + item.shop['business_hours_end'] : ''}}</span>
                        </div>
                    </swiper-item>
                </block>
            </swiper>
            <swiper
                v-else
                class="swiper"
                @change="bannerChange"
                :circular="true">
                <block v-for="(item, index) in breakfast_order" :key="index">
                    <swiper-item class="swiperItem" :id="'id'+item.id">
                        <h3>请您前往【{{item.shop ? item.shop.name : '自提点'}}】进行自提</h3>
                        <div class="pickupNum">
                            <span>提货码</span>
                            <h2>{{item['subOrderNo']}}</h2>
                        </div>
                        <div class="order_info">
                            <span>订单编号: {{item['order_no'] || '暂无'}}</span>
                            <span>取货时间: {{item['pick_date']}}  {{item.shop ? item.shop['business_hours_start'] + '-' + item.shop['business_hours_end'] : ''}}</span>
                        </div>
                    </swiper-item>
                </block>
            </swiper>
        </ul>
        <ul id="empty_pickup_info" v-else>
            <li>暂无可自提的单  赶紧去下单吧</li>
        </ul>
        <div class="total_amount" v-if="orders.length">
            <span>{{current}}/{{total}}</span>
        </div>
        <FooterNav :navName="navName" />
    </div>
</template>

<script>
	import CustomHeader from '../../../components/CustomHeader';

	import FooterNav from '@/components/FooterNav';
	import _ from 'underscore'
	let bg1 = require('./img/aaa.jpg');
	let bg2 = require('./img/bbb.jpg');
	import {drawQrcode} from '../../../utils/qrcode_index';

	export default {
        components: {
			CustomHeader,
			FooterNav
        },
        data () {
            return {
                title: '取货',
				navName:'pickup',
				background: bg1,
                position: 'left',
                current: 1,
                currentOrderId: null,
                orders: [],
				qrcode :null,
                drawTime: null,
				shop_order: [],
				breakfast_order: [],
				total: 0
            };
        },
        watch: {
			currentOrderId: function(value) {
				if(value)
					this.Qrcode(value);
            },
			drawTime(value){
				if(value && this.currentOrderId){
					this.Qrcode(this.currentOrderId);
				}
			},
			position (value) {
				this.total = value == 'left' ? this.shop_order.length : this.breakfast_order.length;
			}
        },
        computed: {
			pickupOrders () {
				this.drawTime = (new Date).getTime();
				this.orders = this.model.user.pickup.pickupOrders;
				this.shop_order = [];
				this.breakfast_order = [];
				_.map(this.orders, (order)=>{
					if (order.channel.slug === 'BREAKFAST_CAR') {
						this.breakfast_order.push(order)
                    } else {
						this.shop_order.push(order)
                    }
                });
				this.total = this.position == 'left' ? this.shop_order.length : this.breakfast_order.length;
				if(this.position === 'left' && !this.currentOrderId && this.orders && this.orders.length) {
					this.currentOrderId = this.orders[0]['id'];
					this.drawTime = (new Date).getTime();
				}
				return this.model.user.pickup.pickupOrders
            }
        },
        methods: {
			changeBackground(position){
				this.position = position;
				this.current = 1;
				this.background = position === 'left'? bg1 : bg2;
				if(position === 'left'){
					this.currentOrderId = this.orders[0]['id']
					this.drawTime = (new Date).getTime();
                } else {
					this.currentOrderId = null
                }
			},
			bannerChange (e) {
				this.current = e.mp.detail.current + 1;
				this.currentOrderId = e.mp.detail.currentItemId;
			},
            Qrcode (id) {
				let time = (new Date()).getTime();
				drawQrcode({
					width: 200,
					height: 200,
					canvasId: `qrcode_${id}_${this.drawTime}`,
					text: `{"order_id": ${id}, "time": ${time}}`
				})
            }
        },
        mounted () {
			this.qrcode = drawQrcode({
				width: 200,
				height: 200,
				canvasId: 'myQrcode',
				text: `{"order_id": 0}`
			})
			if (this.$route.query.order) {
				let order = JSON.parse(this.$route.query.order)
				order['order_no'] = order.code
				this.orders.push(order)
            } else {
				this.$command('LOAD_USER_ORDERS', 'WAIT_TO_PICK', 1, 100, 'pickup');
            }
        },
        beforeMount () {
			this.currentOrderId = null;
			this.model.user.pickup.dispatch('savePickupOrders', {
				orders: []
            })
		}
	}
</script>

<style>
    page {
        height: 100%;
        background:linear-gradient(270deg,rgba(255,204,0,1),rgba(253,224,104,1));
    }

    .swiper{
        height: 700rpx;
        overflow: hidden;
    }

    #pickup{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    #pickup_container{
        width: 710rpx;
        box-sizing: border-box;
        background: #fff;
        margin-top: 20rpx;
    }

    #pickup_header {
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: 100%;
        background-position: center -10rpx;
    }

    #pickup_header span {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111111;
    }

    #pickup_info{
        width: 710rpx;
        box-sizing: border-box;
        padding-top: 50rpx;
        background: #fff;
        overflow: hidden;
    }

    #empty_pickup_info{
        width: 710rpx;
        height: 400rpx;
        font-size: 32rpx;
        box-sizing: border-box;
        padding-top: 50rpx;
        background: #fff;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #pickup_info h3{
        font-size: 32rpx;
        color: #111111;
    }

    .pickupNum{
        width: 400rpx;
        height: 400rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 50rpx 0;
    }

    .pickupNum span {
        font-size: 32rpx;
        color: #111111;
    }

    .pickupNum h2{
        font-size: 150rpx;
        color: #111111;
        margin-top: 50rpx;
    }

    .swiperItem{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #pickup_info .order_info{
        width: 100%;
        box-sizing: border-box;
        height: 160rpx;
        display: flex;
        box-sizing: border-box;
        padding: 26rpx 0;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        border-top: 2rpx solid #f2f2f2;
    }

    #pickup_info .order_info span {
        font-size: 28rpx;
        color: #111;
        display: inline-block;
        margin-left: 40rpx;
        margin-top: 10rpx;
    }

    .total_amount{
        width: 100%;
        margin-top: 30rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .total_amount span{
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0 28rpx;
        background: linear-gradient(to right, #FDE068, #FFCC00);
        font-size: 28rpx;
        color: #111111;
        border: 2rpx solid #fff;
        border-radius: 18rpx;
    }


</style>
