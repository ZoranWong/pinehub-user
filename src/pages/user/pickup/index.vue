<!--suppress ALL -->
<template>
    <div id="pickup">
        <mp-title :title="title"></mp-title>
        <div id="pickup_container">
            <div id="pickup_header" :style="{'backgroundImage':'url(' + background + ')'}">
                <span @click="changeBackground('left')">自提点自提</span>
                <span @click="changeBackground('right')">早餐自提</span>
            </div>
        </div>
        <ul id="pickup_info">
            <li v-for="item in orders">
                <h3>请您前往【{{item.address}}】进行自提</h3>
                <img :src="item.code" alt="">
                <div class="order_info">
                    <span>订单编号: {{item['order_num']}}</span>
                    <span>取货时间: {{item['pickup_time']}}</span>
                </div>
            </li>
        </ul>
        <FooterNav />
    </div>
</template>

<script>
    import MpTitle from '@/components/MpTitle';
	import FooterNav from '@/components/FooterNav';
	let bg1 = require('../../../../static/selfPoints/bg2.jpg');
	let bg2 = require('../../../../static/selfPoints/bg1.jpg');
    export default {
        components: {
            'mp-title': MpTitle,
			FooterNav
        },
        data () {
            return {
                title: '取货',
				background: bg1,
                orders: [
                    {
                    	address:'青松集团店',
                        code:'',
                        order_num:'45121542012532121',
                        pickup_time:'2019-07-13  9:30-19:30'
                    }
                ]
            };
        },
        computed: {},
        methods: {
			changeBackground(position){
				this.background = position === 'left'? bg1 : bg2
			},
        },
        created () {}
    }
</script>

<style>
    page {
        height: 100%;
        background:linear-gradient(270deg,rgba(255,204,0,1),rgba(253,224,104,1));
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
        padding: 50rpx 40rpx 0 40rpx;
        background: #fff;
    }

    #pickup_info li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #pickup_info li h3{
        font-size: 32rpx;
        color: #111111;
    }

    #pickup_info li img {
        width: 400rpx;
        height: 400rpx;
        margin: 50rpx 0;
    }

    #pickup_info li .order_info{
        width: 100%;
        height: 160rpx;
        display: flex;
        box-sizing: border-box;
        padding: 40rpx 0;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        border-top: 2rpx solid #f2f2f2;
    }

    #pickup_info li .order_info span {
        font-size: 28rpx;
        color: #111;
    }


</style>
