<!--suppress ALL -->
<template>
	<div id="groupon_details">
        <div class="tranHeader" @click="back" :style="{'top': (statusBarHeight ) + 'px'}">
            <span class="circle" ><i class="iconfont">&#xe679;</i></span>
        </div>
        <div class="backImg" :style="{'height': mainHeight * 0.223 + 'px'}">
            <img src="./img/background.jpeg" mode="widthFix" alt="">
        </div>

<!--        <SwiperNotice />-->

        <div class="detail_header">
            <img src="./img/background.jpeg" alt="" class="image">

            <h3>青松合伙人琥珀五环城店</h3>
            <div class="shop_info">
                <img src="../images/name.png" alt="">
                <span>涂鸿宇</span>
                <i></i>
                <img src="../images/place.png" alt="">
                <span>合肥市蜀山区琥珀五环城25栋802</span>
            </div>

            <div class="price_info">
                <span class="discount">6折起</span>
                <span class="gift">满200元赠送红糖馒头</span>
            </div>

            <div class="contact">
                <img src="../images/Contact_head.png" alt="">
                <img src="../images/Share_spell_group.png" alt="">
            </div>

            <div class="notice">
                公告：青松主食超值团购，参团即可享受优惠
            </div>

        </div>


        <div class="details">
            <div class="top">
                <h3>青松功夫缤纷蛋糕大血拼</h3>
                <img src="../images/more_shoppinggroup.png" alt="">
            </div>

            <div class="bottom">
                <div class="left">
                    <span>4小时前发布</span>
                    <i></i>
                    <span>距结束</span>
                    <div class="time">
                        <em>{{hour}}</em> :
                        <em>{{minute}}</em> :
                        <em class="red">{{second}}</em>
                    </div>
                </div>
                <h4>
                    <span>5人</span>已参团
                </h4>
            </div>
        </div>


	</div>
</template>
<script>
    import _ from 'underscore';
    import SwiperNotice from "../components/SwiperNotice";
	export default {
		components: {
            SwiperNotice
		},
		data() {
			return {
                hour: '05',
                minute: '18',
                second: '05'
			};
		},
		watch: {

		},
		computed: {
            statusBarHeight () {
                console.log(this.model.global.barHeight.statusBarHeight, '=========<<<>>>>');
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
            buttonPosition () {
                return this.statusBarHeight + (this.navHeight / 2) + 'px'
            },
            mainHeight() {
                let systemInfo = wx.getSystemInfoSync();
                return systemInfo.windowHeight;
            },
		},
		methods: {
            back() {
                this.$command('REDIRECT_TO', '', 'back')
            }
		},
		created() {

		},
		mounted() {
            this.$command('GET_BAR_HEIGHT')
		}
	}
</script>

<style>
	page {
		height: 100%;
        overflow: hidden;
	}

    .swiperNotices{
        width: 410rpx;
        height: 100rpx;
    }

    .backImg{
        width: 100%;
        height: 22.3%;
        overflow: hidden;
    }

    .backImg img{
        width: 100%;
        height: 298rpx;
        -webkit-filter: blur(20px);
        -moz-filter: blur(20px);
        -ms-filter: blur(20px);
        filter: blur(20px);
        transform: translateY(-226rpx);
    }




    .tranHeader{
        position: fixed;
        left: 20rpx;
        top: 100rpx;
        z-index: 10000;
    }

    .tranHeader .circle{
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        background: rgba(17,17,17,0.2);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tranHeader .circle .iconfont{
        color: #fff;
    }

    .detail_header{
        width: 710rpx;
        box-shadow:0px 0px 20rpx 0px rgba(204,204,204,0.6);
        border-radius:25rpx;
        box-sizing: border-box;
        padding: 30rpx;
        margin-left: 20rpx;
        position: relative;
        transform: translateY(-90rpx);
        background: #fff;
        margin-bottom: -70rpx;
    }

    .detail_header .image{
        width: 108rpx;
        height: 108rpx;
        position: absolute;
        top: -50rpx;
        right: 30rpx;
        border-radius: 10rpx;
    }

    .detail_header h3{
        font-size: 40rpx;
        color: #111;
        font-weight: bold;
        margin-bottom: 16rpx;
    }

    .detail_header .shop_info{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 16rpx;
    }
    .detail_header .shop_info img{
        width: 22rpx;
        height: 22rpx;
        margin-right: 10rpx;
    }

    .detail_header .shop_info span{
        color: #111;
        font-size: 22rpx;
    }
    .detail_header .shop_info i{
        width: 2rpx;
        height: 14rpx;
        background: #e6e6e6;
        margin: 0 10rpx;
    }

    .detail_header .price_info{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 30rpx;
    }
    .detail_header .price_info span{
        font-size: 20rpx;
        padding: 4rpx 8rpx;
        border: 2rpx solid rgba(255,70,60,1);
        border-radius: 5rpx;
    }
    .detail_header .price_info .discount{
        color: #FF463C;
        border-color: #FF463C;
        margin-right: 10rpx;
    }
    .detail_header .price_info .gift{
        color: #CA9938;
        border-color: rgba(202,153,56,1);
    }

    .detail_header .contact{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 16rpx;
    }

    .detail_header .contact img{
        width: 168rpx;
        height: 50rpx;
        margin-right: 20rpx;
    }

    .detail_header .notice{
        font-size: 22rpx;
        color: #757575;
    }

    .details{
        width: 100%;
        height: 150rpx;
        box-sizing: border-box;
        padding: 24rpx 50rpx;
        border-bottom: 2rpx solid #F2F2F2;
    }

    .details .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15rpx;
    }
    .details .top h3{
        font-size: 32rpx;
        color: #111;
        font-weight: bold;
    }
    .details .top img{
        width: 150rpx;
        height: 50rpx;
    }

    .details .bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .details .bottom .left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .details .bottom .left span{
        font-size: 28rpx;
        color: #4C4C4C;
    }
    .details .bottom .left i{
        width: 3rpx;
        height: 28rpx;
        background: #E6E6E6;
        margin: 0 10rpx;
    }
    .details .bottom .left .time{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 20rpx;
        font-size: 20rpx;
        color: #333;
    }
    .details .bottom .left .time em{
        width: 32rpx;
        height: 32rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: #333;
        font-style: normal;
        border-radius: 3rpx;
        margin: 0 2rpx;
    }
    .details .bottom .left .time .red{
        background: #FF442E;
    }
    .details .bottom h4{
        font-weight: normal;
        font-size: 24rpx;
        color: #4C4C4C;
    }

    .details .bottom h4 span{
        color: #FF442E;
    }



</style>
