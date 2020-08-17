<!--suppress CssInvalidPropertyValue -->
<template>
    <div class="fast-foot-list">
        <div id="status_bar" :style="{'height': statusBarHeight + 'px'}" ></div>
        <div id="nav_bar" :style="{'height': navHeight + 'px'}" >
           <div class="back-icon" @click="backPage"><img src="../img/back.png" alt=""></div>
        </div>
        <div class="fast-foot-title" :style="{'marginTop': '-'+imgHeight + 'px'}">
            <img src="../img/headImg.jpg" alt="">
        </div>
        <div class="shop-info-show" :style="{'top': topHeight+ 'px'}">
            <div class="shop-one">
                <div class="content-word">吉事多便利店（置地广场店）</div>
                <div class="head-img"><img src="../img/headImg.jpg" alt=""></div>
            </div>
            <div class="shop-two">
                <div class="position-img"><img src="../../../../static/icons/addresses.png" alt=""></div>
                <div class="content-word">政务区置地广场吉事多便利店</div>
            </div>
            <div class="shop-three">
                <div class="content-word">公告：今日到店自提，免费送饮料一瓶（口味任意选择）</div>
            </div>
            <div class="shop-four">
                <button style="margin-left: 15pt">
                    <img src="../img/headImg.jpg" alt="">
                    <label>联系门店</label>
                </button>
                <button style="margin-left: 10pt">
                    <img src="../img/headImg.jpg" alt="">
                    <label>分享好友</label>
                </button>
            </div>
            <div class="shop-five">
                <div class="content-word">送餐上门</div>
                <div class="content-word" style="margin-left: 10pt">预定自提</div>
            </div>
            <div class="shop-six">
                <div class="content-word">立即订餐方便快捷，预定明日更优惠</div>
            </div>
        </div>
        <div class="product-list" :style="{'marginTop': (topHeight+59) + 'px'}">
            <div class="change-btn">
                <view :class="{'selectTab':status === '1'}" @click="selectProject('1')">立即点餐</view>
                <view :class="{'selectTab':status === '2'}" @click="selectProject('2')">明日预定</view>
                <view class="more-product" @click="searchMoreProduct">查看更多<img src="../../../../static/icons/rightArrow.png" class="rightArrow_imp" alt=""></view>
            </div>
            <div class="product-info-show">
                <view class="product-list-detail" v-for="(item,index) in productList" :key="index">
                    <view class="product-img"><img :src="item.url"></view>
                    <view class="product-info">
                        <view class="pro-name">{{item.name}}</view>
                        <view class="pro-merit">{{item.merit}}</view>
                        <view class="pro-sales">销量 {{item.sales}}</view>
                        <view class="pro-price">
                            <view class="left">
                                <span style="color: #FC3C2F;margin-right: 5px;font-size: 16px">¥39.8</span>
                                <span style="color: #999999;text-decoration:line-through;font-size: 12px">¥45</span>
                            </view>
                            <view class="right">
                                <img src="../../../../static/icons/minus.png" style="border-color: #ffcc00" alt="" @click.stop="addToShoppingCart()">
                                <view style="height: auto;width: 30px;text-align: center;font-size: 16px;color: #333333">1</view>
                                <img src="../../../../static/icons/add.png" alt="" @click.stop="addToShoppingCart()">
                            </view>
                        </view>
                    </view>
                </view>
            </div>
            <div class="order-food-info">
                <label style="color: #111111;font-size: 15pt">订餐情况</label>
                <label style="color: #999999;font-size: 12pt">（5人已订餐）</label>
            </div>
            <div class="order-info-content" v-for="(item,index) in orderInfoList" :key="index">
                <view class="content-title">
                    <view class="customer-info">
                        <view>5.</view>
                        <view class="head-img"><img :src="item.url" alt=""></view>
                        <view>
                            <view style="color: #111111;font-size: 14pt">{{item.name}}</view>
                            <view style="color: #999999;font-size: 10pt">{{item.time}}</view>
                        </view>
                    </view>
                    <view style="float: right;color: #999999;font-size: 14pt;margin-right: 15pt;height: inherit;line-height: 34pt">¥ {{item.price}}</view>
                </view>
                <view class="content-order">红烧牛肉饭 x1、笋干烧肉饭 x2、辣子鸡丁饭 x1、土豆牛肉 饭 x1、毛豆烧肉饭 x3</view>
            </div>
            <div class="click-search-more">点击查看更多…</div>
        </div>
        <div class="order-settlement">
            <view class="order-pay-info">
                <i-badge count="3" overflow-count="99">
                    <view class="demo-badge"><img src="../img/book.png"/></view>
                </i-badge>
                <view>
                    <view style="color: #111111;font-size: 17pt;font-weight: 700">¥102.1</view>
                    <view style="color: #999999;font-size: 11pt">满10元起订</view>
                </view>
            </view>
            <button>去结算</button>
        </div>
    </div>
</template>

<script>
    import Public from "../js/Public";
    export default {
        mixins:[Public],
        data() {
            return {
                status:"1",
                productList:[
                    {url:require('../img/productImg.jpg'), name:"巧克力慕斯蛋糕", merit:"料足味佳健康又实惠", sales:186},
                    {url:require('../img/productImg.jpg'), name:"巧克力慕斯蛋糕", merit:"料足味佳健康又实惠", sales:186},
                    {url:require('../img/productImg.jpg'), name:"巧克力慕斯蛋糕", merit:"料足味佳健康又实惠", sales:186}
                ],
                orderInfoList:[
                    {url:require('../img/headImg.jpg'), name:"德玛西亚", time:"2分钟前", price:186},
                    {url:require('../img/headImg.jpg'), name:"战争学院", time:"2分钟前", price:186},
                    {url:require('../img/headImg.jpg'), name:"德莱厄斯", time:"2分钟前", price:186}
                ]
            };
        },
        methods:{
            backPage:function () {
                this.$command('REDIRECT_TO', '', 'back')
            },
            selectProject:function (status) {
                this.status=status;
            },
            //查看更多
            searchMoreProduct:function () {
                
            },
            addToShoppingCart:function () {
                
            }
        }
    }
</script>

<style scoped>
    .fast-foot-title{
        width: 100%;
        height: 149pt;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }
    .fast-foot-title img{
        width: 100%;
        height: 100%;
        filter: blur(10rpx);
    }
    #nav_bar{
        width: 100%;
        display: table;
        padding-top: 14rpx;
    }
    .back-icon{
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        background: rgba(17,17,17,0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 100;
        float: left;
    }
    .back-icon ._img{
        width: 32rpx;
        height: 32rpx;
    }
    .shop-info-show{
        width:96%;
        height:192pt;
        left: 2%;
        top:89pt;
        background:rgba(255,255,255,1);
        box-shadow:0 0 10px 0 rgba(204,204,204,0.6);
        border-radius:12.5px;
        position: absolute;
    }
    .shop-info-show>._div{
        width: 100%;
    }
    .shop-one{
        height: 45px;
    }
    .shop-one .content-word{
        font-size:20px;
        font-family:PingFang-SC-Heavy,PingFang-SC;
        font-weight:Heavy;
        color:rgba(17,17,17,1);
        padding-top: 15pt;
        padding-left: 15pt;
        float: left;
    }
    .shop-one .head-img{
        width:54px;
        height:54px;
        float: right;
        padding-right: 15px;
        margin-top: -10px;
    }
    .shop-one .head-img ._img{
        width:100%;
        height:100%;
        border-radius: 7px;
    }
    .shop-two{
        height: 30px;
        justify-content: left;
        align-items: center;
        display: flex;
        padding-left: 15pt;
    }
    .shop-two .content-word{
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:Medium;
        color:#333333;
    }
    .shop-two .position-img{
        width:12px;
        height:12px;
        background: -webkit-linear-gradient(top,#FDE068,#FFCC00);
        justify-content: center;
        align-items: center;
        display: flex;
        margin-right: 10px;
    }
    .shop-two .position-img ._img{
        width: 100%;
        height: 100%;
    }
    .shop-three .content-word{
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:Medium;
        color:#999999;
        margin-left: 15pt;
        justify-content: left;
        align-items: center;
        display: flex;
    }
    .shop-four{
        width: 100%;
        height: 25pt;
        justify-content: left;
        align-items: center;
        display: flex;
        margin-top: 15pt;
    }
    .shop-four button{
        background: -webkit-linear-gradient(top,#FEE7B5,#F2D18D);
        width: 84pt;
        height: 25pt;
        margin-right: unset;
        margin-left: unset;
        line-height: 25pt;
        padding-left: 0;
        border-radius: 5pt;
    }
    .shop-four button label{
        font-size:15px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        color:#563C21;
    }
    .shop-four button ._img{
        height: inherit;
        width: 25px;
        border-radius: 5pt;
        float: left;
    }
    .shop-five{
        height: 16pt;
        justify-content: left;
        align-items: center;
        display: flex;
        padding-left: 15pt;
        margin-top: 8pt;
    }
    .shop-five .content-word{
        font-size: 12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:Medium;
        color:#F15850;
        width: 54pt;
        height: 16pt;
        text-align: center;
        line-height: 16pt;
        border-radius:6px;
        border:0.5pt solid rgba(241,88,80,0.5);
    }
    .shop-six{
        height: 17pt;
        justify-content: left;
        align-items: center;
        display: flex;
        padding-left: 15pt;
        margin-top: 8pt;
    }
    .shop-six .content-word{
        font-size: 13px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:Medium;
        color:#333333;
    }
    .product-list{
        width: 100%;
        height: auto;
    }
    .change-btn{
        width: 100%;
        height: 44px;
        display: flex;
    }
    .change-btn view{
        width: 33.3%;
        height: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        color: #757575;
        font-size: 14pt;
    }
    .selectTab{
        position: relative;
        color: #111111 !important;
    }
    .selectTab:after {
        content:  '';
        position: absolute;
        width:25pt;
        height:3pt;
        background:rgba(255,204,0,1);
        border-radius:1.5pt;
        bottom: 0;
    }
    .more-product{
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .more-product ._img{
        width: 4pt;
        height: 7pt;
        margin-left: 5pt;
    }
    .product-info-show{
        width: 100%;
        height: auto;
    }
    .product-list-detail{
        width: 100%;
        height: 144px;
        justify-content: left;
        align-items: center;
        display: flex;
    }
    .product-img{
        width: 37%;
        height: 144px;
        float: left;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .product-img ._img{
        width: 114px;
        height: 114px;
        margin-left: 5px;
    }
    .product-info{
        height: 114px;
        width: 59%;
        float: right;
    }
    .pro-name{
        color: #111111;
        font-size: 16px;
        margin-bottom: 5px;
    }
    .pro-merit{
        color: #999999;
        font-size: 12px;
        margin-bottom: 5px;
    }
    .pro-sales{
        color: #999999;
        font-size: 11px;
        margin-bottom: 22px;
    }
    .pro-price{
        width: 100%;
    }
    .pro-price .left{
        float: left;
    }
    .pro-price .right{
        float: right;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .pro-price .right ._img{
        width: 24px;
        height: 24px;
    }
    .order-food-info{
        width: 100%;
        height: 51px;
        justify-content: left;
        align-items: center;
        display: flex;
        padding-left: 15px;
        margin-bottom: 10px;
    }
    .order-info-content{
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-bottom: 30pt;
    }
    .order-info-content .content-title{
        width: 100%;
        height: 34pt;
        overflow: hidden;
        margin-bottom: 8pt;
    }
    .order-info-content .customer-info{
        justify-content: left;
        align-items: center;
        display: flex;
        float: left;
        margin-left: 15pt;
    }
    .order-info-content .head-img{
        width: 25pt;
        height: 25pt;
        margin-left: 8pt;
        margin-right: 8pt;
    }
    .order-info-content .head-img ._img{
        width: 25pt;
        height: 25pt;
        border-radius: 50%;
    }
    .order-info-content .content-order{
        width: auto;
        height: auto;
        color: #111111;
        font-size: 11pt;
        margin-left: 25pt;
        margin-right: 15pt;
        padding: 15pt 0 15pt 15pt;
    }
    .click-search-more{
        width: 100%;
        height: 20pt;
        text-align: center;
        line-height: 20pt;
        color: #757575;
        font-size: 12pt;
        margin-bottom: 40pt;
    }
    .order-settlement{
        width: 100%;
        height: 53pt;
        bottom: 0;
    }
    .order-settlement button{
        margin-right: 15px;
        height: 38pt;
        margin-top: 7.5pt;
        width: 130px;
        background: -webkit-linear-gradient(top,#FDE068,#FFCC00);
        color: #111111;
        font-size: 16pt;
        border-radius: 19pt;
    }
    .order-settlement .order-pay-info{
        width: auto;
        float: left;
        height: inherit;
        justify-content: center;
        align-items: center;
        display: flex;
        margin-left: 5px;
    }
    .order-settlement .order-pay-info ._i-badge{
        width: 53pt;
        height: 53pt;
        margin-right: 10px;
        justify-content: cenetr;
        align-items: center;
        display: flex;
    }
    .demo-badge{
        height: 53pt;
        width: 53pt;
    }
    .demo-badge ._img{
        height: 53pt;
        width: 53pt;
    }
    @keyframes scaleDraw {
        /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
        0% {
            transform:scale(1);
            /*开始为原始大小*/
        }
        25% {
            transform:scale(1.1);
            /*放大1.1倍*/
        }
        50% {
            transform:scale(1);
        }
        75% {
            transform:scale(1.1);
        }
    }.demo-badge ._img{
         -webkit-animation-name:scaleDraw;
         /*关键帧名称*/
         -webkit-animation-timing-function:ease-in-out;
         /*动画的速度曲线*/
         -webkit-animation-iteration-count:infinite;
         /*动画播放的次数*/
         -webkit-animation-duration:5s;
     }
</style>
