<!--suppress ALL -->
<template>
    <div id="groupon_shop_details">
        <div class="tranHeader" @click="back" :style="{'top': (statusBarHeight ) + 'px'}">
            <span class="circle" ><i class="iconfont">&#xe679;</i></span>
        </div>
        <div class="backImg" :style="{'height': mainHeight * 0.223 + 'px'}">
            <img src="../grouponDetails/img/back.jpeg" mode="widthFix" class="backImage" alt="">
            <div class="shop_info">
                <img src="../grouponDetails/img/back.jpeg" alt="" class="avater">
                <div class="shop_info_content">
                    <h4>{{shopInfo.name}}</h4>
                    <div class="shop_info_details">
                        <img src="./image/1.png" alt="">
                        <span>{{shopInfo['keeper_name']}}</span>
                        <i></i>
                        <img src="./image/2.png" alt="">
                        <span>{{shopInfo['address']}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="groupon_banner">
            <div>
                <h4>{{shopInfo['click_counts']}}</h4>
                <span>浏览人数</span>
            </div>
            <div>
                <h4>{{shopInfo['place_order_counts']}}</h4>
                <span>参团人数</span>
            </div>
        </div>
        <ul class="groupon_list">
            <li class="groupon_list_item" v-for="(item,itemIndex) in shopGrouponList" :key="itemIndex" >
                <div class="groupon_shop_info" >
                    <i></i>
                    <span>{{item['create_time']}}</span>
                    <h4>有{{item['click_count']}}人看过{{item['place_order_count']}}人已参团</h4>
                </div>
                <div class="groupon_info" @click="redirectTo('user.groupon.details', {
                    query: {
                         id: item['shop_shopping_group_id']
                    }
                })">
                    <img src="../images/arrow.png" class="arrow" alt="">
                    <div class="groupon_info_title">
                        <h3 class="groupon_name">{{item['display_name']}}</h3>
                        <h4 class="groupon_status">
                            <span class="groupon_status_text">{{item['state_desc']}}</span>
                            <img class="groupon_status_arrow" src="../../../../../static/icons/rightArrow.png" alt="">
                        </h4>
                    </div>
                    <div class="groupon_products" >
                        <img v-for="(product,pIndex) in item['display_products']" :key="pIndex" class="groupon_product_image" :src="product.image" alt="">
                    </div>
                    <ul class="groupon_purchased_info">
                        <li class="groupon_purchased_info_item" v-for="(user, uIndex) in item['latest_orders']" :key="uIndex">
                            <div class="left">
                                1.
                                <img class="user_ava" :src="user['user_avatar']" alt="">
                                {{user['user_nickname']}}
                                <span class="groupon_purchased_time">{{user['paid_time']}}</span>
                            </div>
                            <h4 class="user_purchased_products" v-if="user['items'].length">
                                {{user['items'][0].name}}...
                            </h4>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>

    </div>
</template>
<script>

    export default {
        components: {

        },
        data () {
            return {
                title: ''
            };
        },

        computed: {
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            mainHeight () {
                let systemInfo = wx.getSystemInfoSync();
                return systemInfo.windowHeight;
            },
            grouponList () {
                return this.model.groupon.grouponList
            },
            shopInfo () {
                console.log(this.model.groupon.shopInfo, 'shopInfo');
                return this.model.groupon.shopInfo
            },
            shopGrouponList () {
                console.log(this.model.groupon.shopGrouponList, 'shopGrouponList');
                return this.model.groupon.shopGrouponList
            }
        },
        methods: {
            back () {
                this.$command('REDIRECT_TO', '', 'back')
            },
            redirectTo (router, options = {}) {
                this.$command('REDIRECT_TO', router, 'push', options);
            }
        },
        created () {

        },
        mounted () {
            this.$command('LOAD_SHOP_DETAILS', this.$route.query.id)
        }
    }
</script>

<style>
    page {
        height: 100%;
        background: #f2f2f2;
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

    .backImg{
        width: 100%;
        height: 22.3%;
        overflow: hidden;
        position: relative;
    }

    .backImg .backImage{
        width: 100%;
        height: 298rpx;
        -webkit-filter: blur(20px);
        -moz-filter: blur(20px);
        -ms-filter: blur(20px);
        filter: blur(20px);
        transform: translateY(-226rpx);
    }

    .groupon_banner{
        width: 710rpx;
        margin-left: 20rpx;
        height: 150rpx;
        box-sizing: border-box;
        transform: translateY(-50rpx);
        margin-bottom: -20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        border-radius: 25rpx;
    }

    .groupon_banner div{
        width: 50%;
        height: 100rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .groupon_banner div:first-child{
        border-right: 2rpx dashed #e6e6e6;
    }

    .groupon_banner div h4{
        font-size: 36rpx;
        color: #333;
        font-weight: bold;
        margin: 0;
    }

    .groupon_banner div span{
        font-size: 22rpx;
        color: #757575;
    }


    .shop_info{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 80rpx;
        position: absolute;
        left: 40rpx;
        bottom: 70rpx;
    }

    .shop_info .avater{
        width: 80rpx;
        height: 80rpx;
        border-radius: 10rpx;
        margin-right: 20rpx;
    }

    .shop_info .shop_info_content{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
    }

    .shop_info .shop_info_content h4{
        font-size: 28rpx;
        color: #111;
    }

    .shop_info .shop_info_details{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 16rpx;
        padding: 4rpx 10rpx;
        box-sizing: border-box;
        color: #fff;
        border-radius: 10rpx;
        background: rgba(17,17,17,0.3);
    }

    .shop_info .shop_info_details img{
        width: 22rpx;
        height: 22rpx;
        margin-right: 10rpx;
    }

    .shop_info .shop_info_details span{
        color: #fff;
        font-size: 22rpx;
    }

    .shop_info .shop_info_details i{
        width: 2rpx;
        height: 14rpx;
        background: #fff;
        margin: 0 10rpx;
    }

    .groupon_list{
        width: 100%;
        box-sizing: border-box;
        padding: 0 20rpx;
    }





    .groupon_list_item{
        margin-bottom: 50rpx;
    }

    .groupon_shop_info{
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .groupon_shop_info i{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 20rpx;
        height: 20rpx;
        background: #E6E6E6;
        position: relative;
    }

    .groupon_shop_info i:after{
        content: '';
        width: 8rpx;
        height: 8rpx;
        background: #fff;
    }

    .groupon_shop_info span{
        margin: 0 20rpx;
        font-size: 22rpx;
        color: #b3b3b3;
    }

    .groupon_shop_info h4{
        font-size: 22rpx;
        color: #808080;
        font-weight: normal;
    }




    .groupon_list_item{
        margin-bottom: 50rpx;
    }

    .groupon_info{
        width: 100%;
        background: #fff;
        border-radius: 25rpx;
        position: relative;
        padding: 30rpx;
        box-sizing: border-box;
        margin-top: 20rpx;
        position: relative;
    }

    .groupon_info .arrow{
        width: 20rpx;
        height: 10rpx;
        position: absolute;
        left: 40rpx;
        top: -10rpx
    }

    .groupon_info_title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30rpx;
    }

    .groupon_name{
        font-size: 30rpx;
        color: #111;
        font-weight: bold;
    }

    .groupon_status{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .groupon_status_text{
        font-size: 28rpx;
        color: #333;
    }

    .groupon_status_arrow{
        width: 11rpx;
        height: 22rpx;
        margin-left: 20rpx;
    }


    .groupon_products{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .groupon_product_image{
        width: 210rpx;
        height: 210rpx;
        border-radius: 10rpx;
        border: 1rpx solid #F2F2F2;
    }

    .groupon_purchased_info{
        margin-top: 10rpx;
    }

    .groupon_purchased_info_item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 26rpx;
    }

    .groupon_purchased_info_item:first-child{
        margin-top: 26rpx;
    }

    .groupon_purchased_info_item .left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 24rpx;
        color: #111;
    }

    .groupon_purchased_info_item .left .user_ava{
        width: 34rpx;
        height: 34rpx;
        border-radius: 50%;
        margin: 0 10rpx;
    }

    .groupon_purchased_info_item .groupon_purchased_time{
        font-size: 22rpx;
        color: #999;
        margin-left: 10rpx;
    }

    .groupon_purchased_info .user_purchased_products{
        font-size: 24rpx;
        color: #111;
        font-weight: normal;
    }

</style>
