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

        <div class="rich_text">
            哈哈哈哈哈哈哈
        </div>

        <div class="middle">
            <GrouponClassification
                :top="toTop"
                @forbidScroll="forbidScroll"
                :headerHeight="headerHeight"
            />
            <ul class="products">
                <li v-for="product in products" :key="product">
                    <Product />
                </li>
            </ul>

        </div>

        <div class="groupon_participants">
            <h3 class="header">
                参团情况
                <span>(5人已参团)</span>
            </h3>
            <ul class="groupon_participants_list">
                <li class="groupon_participants_item" v-for="items in 3">
                    <span class="number">{{items}}.</span>
                    <div class="right">
                        <div class="top">
                            <div class="left">
                                <img src="./img/background.jpeg" alt="">
                                <div class="names">
                                    <h4>豆豆掉了</h4>
                                    <span>2分钟前</span>
                                </div>
                            </div>
                            <div class="price">
                                <i>¥</i>
                                <h4>19</h4>
                            </div>
                        </div>
                        <div class="bottom">
                            <span>博士馒头（荞麦味）x1、玉米刀切馒头x1、白面刀切馒头x2
                            燕麦馒头x1、鲜肉包x3</span>
                            <img src="../../../../../static/icons/newArrow.jpg" alt="">
                        </div>
                    </div>
                </li>
            </ul>
        </div>

	</div>
</template>
<script>
    import _ from 'underscore';
    import SwiperNotice from "../components/SwiperNotice";
    import GrouponClassification from "./components/GrouponClassification";
    import Product from "./components/Product";
	export default {
		components: {
            SwiperNotice,GrouponClassification,Product
		},
		data() {
			return {
                hour: '05',
                minute: '18',
                second: '05',
                toTop: 0,
                isForbid: false,
                products: [
                    1,2,3
                ]
			};
		},
		watch: {

		},
		computed: {
            statusBarHeight () {
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
            headerHeight () {
                return this.statusBarHeight + this.navHeight;
            },
		},
		methods: {
            back() {
                this.$command('REDIRECT_TO', '', 'back')
            },
            forbidScroll (isForbid) {
                this.isForbid = isForbid
            },
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
        overflow: auto;
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

    .rich_text{
        width: 100%;
        height: 998rpx;
        box-sizing: border-box;
        padding: 20rpx;
    }

    .middle{
        width: 100%;
        background: red;
        background: #fff;
        box-sizing: border-box;
        position: relative;
        border-bottom: 2rpx solid #F2F2F2;
        border-top: 2rpx solid #F2F2F2;
    }

    .middle .allCates{
        position: absolute;
        top: 0;
        z-index: 9998;
        background: rgba(17,17,17,0.5);
        height: 100vh;
    }

    .middle .allCates .cates{

    }

    .middle .middleImage{
        width: 132px;
        height: 30px;
    }

    .products{
        padding: 0 20rpx;
    }

    .groupon_participants{
        margin-top: 10rpx;
        width: 100%;
        box-sizing: border-box;
        padding: 30rpx 40rpx;
    }

    .groupon_participants .header{
        font-size: 30rpx;
        color: #111;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        margin-bottom: 20rpx;
    }

    .groupon_participants .header span{
        font-size: 24rpx;
        color: #999;
        font-weight: normal;
        margin-left: 10rpx;
    }

    .groupon_participants_item{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 30rpx;
    }

    .groupon_participants_item .number{
        font-size: 28rpx;
        color: #111;
        margin-top: 15rpx;
    }

    .groupon_participants_item .right{
        border-bottom: 2rpx solid #F2F2F2;
        margin-left: 15rpx;
    }

    .groupon_participants_item .right .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .groupon_participants_item .right .top .left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .groupon_participants_item .right .top .left img{
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
        margin-right: 15rpx;
    }

    .groupon_participants_item .right .top .left .names{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
    }

    .groupon_participants_item .right .top .left .names h4{
        font-size: 28rpx;
        color: #111;
        font-weight: normal;
    }

    .groupon_participants_item .right .top .left .names span{
        font-size: 20rpx;
        color: #999;
    }

    .groupon_participants_item .right .top .price{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .groupon_participants_item .right .top .price i{
        font-size: 24rpx;
        font-weight: bold;
        color: #999;
        margin-right: 5rpx;
    }

    .groupon_participants_item .right .top .price h4{
        font-size: 32rpx;
        font-weight: bold;
        color: #999;
    }

    .groupon_participants_item .right .bottom{
        width: 100%;
        box-sizing: border-box;
        padding: 16rpx 30rpx;
        background:#F5F5F5;
        position: relative;
        margin-top: 30rpx;
    }

    .groupon_participants_item .right .bottom span{
        font-size: 22rpx;
        color: #111;
        line-height: 30rpx;
    }

    .groupon_participants_item .right .bottom img{
        position: absolute;
        top: -10rpx;
        left: 30rpx;
        width: 20rpx;
        height: 10rpx;
    }

</style>
