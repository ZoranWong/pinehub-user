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
                <div class="content-word">{{itemObj.shop_name}}</div>
                <div class="head-img">
                    <img v-if="itemObj.shop_avatar" :src="itemObj.shop_avatar" alt="">
                    <img v-else src="../img/headImg.jpg" alt="">
                </div>
            </div>
            <div class="shop-two">
                <div class="position-img"><img src="../../../../static/icons/addresses.png" alt=""></div>
                <div class="content-word">{{itemObj.shop_address}}</div>
            </div>
            <div class="shop-three">
                <div class="content-word">公告：{{itemObj.announcement}}</div>
            </div>
            <div class="shop-four">
                <button style="margin-left: 15pt">
                    <img v-if="itemObj.shop_avatar" :src="itemObj.shop_avatar" alt="">
                    <img v-else src="../img/headImg.jpg" alt="">
                    <label>联系门店</label>
                </button>
                <button style="margin-left: 10pt">
                    <img v-if="itemObj.shop_avatar" :src="itemObj.shop_avatar" alt="">
                    <img v-else src="../img/headImg.jpg" alt="">
                    <label>分享好友</label>
                </button>
            </div>
            <div class="shop-five">
                <div class="content-word" v-if="itemObj.support_home_delivery" :class="{'selectedStyle':selectedStyle=='1'}" @click="selectedFun('1')" style="margin-right: 10pt">送餐上门</div>
                <div class="content-word" v-if="itemObj.support_self_pick" :class="{'selectedStyle':selectedStyle=='2'}" @click="selectedFun('2')">预定自提</div>
            </div>
            <div class="shop-six">
                <div class="content-word" v-if="itemObj.state">立即订餐方便快捷，预定明日更优惠</div>
                <div class="content-word" v-else>门店休息中，换一家看看吧</div>
            </div>
        </div>
        <div class="product-list" :style="{'marginTop': (topHeight+59) + 'px'}">
            <div class="change-btn">
                <view :class="{'selectTab':status === '1'}" @click="selectProject('1')">立即订餐</view>
                <view :class="{'selectTab':status === '2'}" @click="selectProject('2')">明日预定</view>
                <view class="more-product" @click="searchMoreProduct">查看更多<img src="../../../../static/icons/rightArrow.png" class="rightArrow_imp" alt=""></view>
            </div>
            <div class="product-info-show">
                <view class="product-list-detail" v-for="(item,index) in atOnceProList" :key="index" v-if="status=='1'">
                    <view class="product-img"><img :src="item.product_avatar"></view>
                    <view class="product-info">
                        <view class="pro-name">{{item.product_name}}</view>
                        <view class="pro-merit">{{item.product_intro}}</view>
                        <view class="pro-sales">销量 {{item.sales}}</view>
                        <view class="pro-price">
                            <view class="left">
                                <span style="color: #FC3C2F;margin-right: 5px;font-size: 16px">¥{{item.retail_price}}</span>
                                <span v-if="item.show_market_price" style="color: #999999;text-decoration:line-through;font-size: 12px">¥{{item.market_price}}</span>
                            </view>
                            <view class="right">
                                <img src="../../../../static/icons/minus.png" v-if="item.count>0" style="border-color: #ffcc00" alt="" @click="minusOrderFood(item,index)">
                                <view v-if="item.count>0" style="height: auto;width: 30px;text-align: center;font-size: 16px;color: #333333">{{item.count}}</view>
                                <img src="../../../../static/icons/add.png" alt="" @click="addOrderFood(item,index)">
                            </view>
                        </view>
                    </view>
                </view>
                <view class="product-list-detail" v-for="(item,index) in reserveProList" :key="index" v-if="status=='2'">
                    <view class="product-img"><img :src="item.avatar"></view>
                    <view class="product-info">
                        <view class="pro-name">{{item.name}}</view>
                        <view class="pro-merit">{{item.intro}}</view>
                        <view class="pro-sales">销量 {{item.virtual_sales}}</view>
                        <view class="pro-price">
                            <view class="left">
                                <span style="color: #FC3C2F;margin-right: 5px;font-size: 16px">¥{{item.retail_price}}</span>
                                <span v-if="item.show_market_price" style="color: #999999;text-decoration:line-through;font-size: 12px">¥{{item.market_price}}</span>
                            </view>
                            <view class="right">
                                <img v-if="item.count>0" src="../../../../static/icons/minus.png" style="border-color: #ffcc00" alt="" @click="minusOrderFood(item,index)">
                                <view v-if="item.count>0" style="height: auto;width: 30px;text-align: center;font-size: 16px;color: #333333">{{item.count}}</view>
                                <img src="../../../../static/icons/add.png" alt="" @click="addOrderFood(item,index)">
                            </view>
                        </view>
                    </view>
                </view>
            </div>
            <div class="order-food-info">
                <label style="color: #111111;font-size: 15pt">订餐情况</label>
                <label style="color: #999999;font-size: 12pt">（{{orderInfoList.length}}人已订餐）</label>
            </div>
            <div class="order-info-content" v-for="(item,index) in orderInfoList" :key="index">
                <view class="content-title">
                    <view class="customer-info">
                        <view>5.</view>
                        <view class="head-img"><img :src="item.user_avatar" alt=""></view>
                        <view>
                            <view style="color: #111111;font-size: 14pt">{{item.user_nickname}}</view>
                            <view style="color: #999999;font-size: 10pt">{{item.time}}</view>
                        </view>
                    </view>
                    <view style="float: right;color: #999999;font-size: 14pt;margin-right: 15pt;height: inherit;line-height: 34pt">¥ {{item.total_fee}}</view>
                </view>
                <view class="content-order">
                    <span v-for="(obj,sign) in item.order_products" :key="index+sign">{{obj.product_name+'X'+obj.quantity}}</span>
                </view>
            </div>
            <div class="click-search-more" @click="searchMoreOrderInfo" v-if="showMoreBtn">点击查看更多…</div>
        </div>
        <view style="height: 20pt;">
            <div class="order-settlement" v-if="status=='1'">
                <view class="order-pay-info">
                    <i-badge :count="onceOrderCount" overflow-count="99">
                        <view class="demo-badge"><img src="../img/book.png"/></view>
                    </i-badge>
                    <view>
                        <view style="color: #111111;font-size: 17pt;font-weight: 700">¥{{oncePrice}}</view>
                        <view style="color: #999999;font-size: 11pt" v-if="money>0">满{{money}}元起订</view>
                    </view>
                </view>
                <button @click="completePayment">去结算</button>
            </div>
            <div class="order-settlement" v-else>
                <view class="order-pay-info">
                    <i-badge :count="reserveOrderCount" overflow-count="99">
                        <view class="demo-badge"><img src="../img/book.png"/></view>
                    </i-badge>
                    <view>
                        <view style="color: #111111;font-size: 17pt;font-weight: 700">¥{{reservePrice}}</view>
                        <view style="color: #999999;font-size: 11pt" v-if="money>0">满{{money}}元起订</view>
                    </view>
                </view>
                <button @click="completePayment">去结算</button>
            </div>
        </view>
    </div>
</template>

<script>
    import Public from "../js/Public";
    export default {
        mixins:[Public],
        data() {
            return {
                selectedStyle:"2",
                status:"1",
                shopId:"",
                onceOrderCount:0,
                reserveOrderCount:0,
                oncePrice:0,
                reservePrice:0,
                money:0,
                itemObj:{},
                showMoreBtn:false,
                fixedDelivery:{},//配送信息
                orderInfoList:[],//订餐情况
                atOnceProList:[],//立即订餐商品列表
                reserveProList:[],//明日预定商品列表
                atOnceCartList:[],//立即订餐购物车列表
                reserveCartList:[],//明日预定购物车列表
            };
        },
        methods:{
            //去结算
            completePayment:function(){
                if(this.status=='1'){
                    if(this.oncePrice<=0){
                        wx.showToast({
                            title: '起送金额必须大于0元',
                            icon: 'none',
                            duration: 2000
                        })
                        return false;
                    }
                    if(this.oncePrice<this.money){
                        wx.showToast({
                            title: '满'+this.money+'元起送',
                            icon: 'none',
                            duration: 2000
                        })
                        return false;
                    }
                }else {
                    if(this.reservePrice<=0){
                        wx.showToast({
                            title: '起送金额必须大于0元',
                            icon: 'none',
                            duration: 2000
                        })
                        return false;
                    }
                    if(this.reservePrice<this.money){
                        wx.showToast({
                            title: '满'+this.money+'元起送',
                            icon: 'none',
                            duration: 2000
                        })
                        return false;
                    }
                }
                if((this.itemObj.support_self_pick || this.itemObj.support_home_delivery) && this.selectedStyle=="0"){
                    wx.showToast({
                        title: '请选择送餐上门或者预定自提',
                        icon: 'none',
                        duration: 2000
                    })
                    return false;
                }
                let that = this;
                wx.getSetting({
                    async success (res) {
                        if (res.authSetting && res.authSetting['scope.userLocation']) {
                            that.$command('REDIRECT_TO', 'societyFood.societyOrderSubmit', 'push', {
                                query: {"deliveryType":that.selectedStyle,"shopDetail":that.itemObj,"orderType":that.status}
                            });
                        } else {
                            wx.showModal({
                                title: '是否授权当前位置',
                                content: '需要获取您的地理位置，请确认授权，否则将无法下单',
                                success: function (tip) {
                                    if (tip.confirm) {
                                        wx.openSetting({
                                            success: function (data) {
                                                if (data.authSetting['scope.userLocation'] === true) {
                                                    wx.showToast({
                                                        title: '授权成功',
                                                        icon: 'success',
                                                        duration: 1000
                                                    })
                                                    that.$command('REDIRECT_TO', 'societyFood.societyOrderSubmit', 'push', {
                                                        query: {"deliveryType":that.selectedStyle,"shopDetail":that.itemObj,"orderType":that.status}
                                                    });
                                                } else {
                                                    wx.showToast({
                                                        title: '授权失败',
                                                        icon: 'none',
                                                        duration: 1000
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            },
            backPage:function () {
                this.$command('REDIRECT_TO','index','replace')
            },
            selectedFun:function(sign){
                this.selectedStyle=sign;
            },
            selectProject:function (status) {
                this.status=status;
                if(status=='1'){
                    let orderInfoList=this.itemObj.order_now.orders;
                    if(orderInfoList.length>3){
                        this.showMoreBtn=true;
                        this.orderInfoList=orderInfoList.slice(0,3);
                    }else {
                        this.showMoreBtn=false;
                        this.orderInfoList=orderInfoList;
                    }
                }else {
                    let orderInfoList=this.itemObj.order_tomorrow.orders;
                    if(orderInfoList.length>3){
                        this.showMoreBtn=true;
                        this.orderInfoList=orderInfoList.slice(0,3);
                    }else {
                        this.showMoreBtn=false;
                        this.orderInfoList=orderInfoList;
                    }
                }
            },
            //查看更多商品
            searchMoreProduct:function () {
                this.$command('REDIRECT_TO', "user.store", 'push');
            },
            //查看更多订餐信息
            searchMoreOrderInfo:function () {
                if(this.status=='1'){
                    this.orderInfoList=this.itemObj.order_now.orders;
                }else {
                    this.orderInfoList=this.itemObj.order_tomorrow.orders;
                }
            },
            //添加点餐
            addOrderFood:function (item,index) {
                let shopId=this.itemObj.shop_id;
                let productId=item.product_stock_id;
                let stockNum=item.stock_num;//库存数量
                if(this.status=='1'){
                    let count=this.atOnceProList[index].count;
                    if((count+1)>stockNum){
                        wx.showToast({
                            title: '立即点餐已超出库存不能添加',
                            icon: 'none',
                            duration: 2000
                        })
                        return false;
                    }
                    if(count>0){
                        this.updateCart(shopId,productId,6,count+1);
                    }else{
                        this.addCart(shopId,productId,6);
                    }
                    this.onceOrderCount++;
                    this.oncePrice=this.oncePrice+item.retail_price;
                    this.atOnceProList[index].count=count+1;
                }else {
                    let count=this.reserveProList[index].count;
                    if(count>0){
                        this.updateCart(shopId,productId,7,count+1);
                    }else{
                        this.addCart(shopId,productId,7);
                    }
                    this.reserveOrderCount++;
                    this.reservePrice=this.reservePrice+item.retail_price;
                    this.reserveProList[index].count=count+1;
                }
            },
            //减少订餐
            minusOrderFood:function (item,index) {
                let shopId=this.itemObj.shop_id;
                let productId=item.product_stock_id;
                if(this.status=='1'){
                    let count=this.atOnceProList[index].count;
                    if(count>1){
                        this.updateCart(shopId,productId,6,count-1);
                    }else{
                        this.deleteCart(shopId,productId,6);
                    }
                    this.onceOrderCount--;
                    this.oncePrice=this.oncePrice-item.retail_price;
                    this.atOnceProList[index].count=count-1;
                }else {
                    let count=this.reserveProList[index].count;
                    if(count>1){
                        this.updateCart(shopId,productId,7,count-1);
                    }else{
                        this.deleteCart(shopId,productId,7);
                    }
                    this.reserveOrderCount--;
                    this.reservePrice=this.reservePrice-item.retail_price;
                    this.reserveProList[index].count=count-1;
                }
            },
            deleteCart:function(shopId,productId,type){
                this.$command('SF_DEL_CART_SHOP',shopId,productId,type);
            },
            addCart:function(shopId,productId,type){
                let param={
                    shop_id:shopId,
                    product_stock_id:productId,
                    cart_type:type
                }
                this.$command('SF_ADD_CART',param);
            },
            updateCart:function(shopId,productId,type,count){
                let param={
                    shop_id:shopId,
                    product_stock_id:productId,
                    cart_type:type,
                    buy_num:count
                }
                this.$command('SF_UPDATE_CART',param);
            },
            async initSearch () {
                let shopId=this.$route.query.shopId;
                this.shopId=shopId;
                await this.$command('SF_SHOP_DETAIL',shopId,this);
                await this.$command('SF_TOMORROW_SHOP_LIST',this);
                await this.$command('SF_GET_CART_SHOP_LIST',shopId,this);
                this.onceOrderCount=0;
                this.reserveOrderCount=0;
                if(this.atOnceCartList){
                    for (let i = 0; i <this.atOnceCartList.length ; i++) {
                        let productStockId=this.atOnceCartList[i].product_stock_id;
                        for (let j = 0; j <this.atOnceProList.length ; j++) {
                            let shopStockId=this.atOnceProList[j].product_stock_id;
                            let count=this.atOnceProList[j].count;
                            if(productStockId==shopStockId){
                                this.atOnceProList[j].count=this.atOnceCartList[i].buy_num;
                                this.oncePrice=this.oncePrice+this.atOnceCartList[i].total_fee;
                                this.onceOrderCount=this.onceOrderCount+this.atOnceCartList[i].buy_num;
                            }
                        }
                    }
                }
                if(this.reserveCartList){
                    for (let i = 0; i <this.reserveCartList.length ; i++) {
                        let productStockId=this.reserveCartList[i].product_stock_id;
                        for (let j = 0; j <this.reserveProList.length ; j++) {
                            let shopStockId=this.reserveProList[j].product_stock_id;
                            let count=this.reserveProList[j].count;
                            if(productStockId==shopStockId){
                                this.reserveProList[j].count=this.reserveCartList[i].buy_num;
                                this.reservePrice=this.reservePrice+this.reserveCartList[i].total_fee;
                                this.reserveOrderCount=this.reserveOrderCount+this.reserveCartList[i].buy_num;
                            }
                        }
                    }
                }
            }
        },
        mounted() {
            this.initSearch();
        }
    }
</script>

<style scoped>
    .fast-foot-list{
        width: 100%;
        height: 100%;
    }
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
        white-space: normal;
        width: 70%;
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
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 90%;
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
        height: 88vh
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
        left: calc(50% - 12.5pt);;
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
        height: 50px;
        justify-content: left;
        display: flex;
        padding-left: 15px;
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
        display: flex;
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
        position: fixed;
        z-index: 100000;
        background: #e5e5e5;
    }
    .order-settlement button{
        margin-right: 15px;
        height: 38pt;
        top: 7.5pt;
        width: 130px;
        background: -webkit-linear-gradient(top,#FDE068,#FFCC00);
        color: #111111;
        font-size: 16pt;
        border-radius: 19pt;
        float: right;
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
    .selectedStyle{
        background-color: #5cadff;
        color: #ffffff !important;
        border: 0 !important;
    }
</style>
