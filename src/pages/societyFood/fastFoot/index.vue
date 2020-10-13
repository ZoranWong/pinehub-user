<!--suppress CssInvalidPropertyValue -->
<template>
    <div class="fast-foot-list">
        <div id="status_bar" :style="{'height': statusBarHeight + 'px'}" ></div>
        <div id="nav_bar" :style="{'height': navHeight + 'px'}" >
           <div class="back-icon" @click="backPage"><img src="../img/back.png" alt=""></div>
        </div>
        <div class="fast-foot-title" :style="{'marginTop': '-'+(imgHeight+10) + 'px'}">
            <img src="../../../../static/icons/headImg.jpg" alt="">
        </div>
        <div class="shop-info-show" :style="{'top': topHeight+ 'px'}">
            <div class="shop-one">
                <div class="content-word">{{shop_name}}</div>
                <div class="head-img">
                    <img v-if="itemObj.shop_avatar" :src="itemObj.shop_avatar" alt="">
                    <img v-else src="../../../../static/icons/headImg.jpg" alt="">
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
                <button style="margin-left: 15pt" @click="contactCustomerService(itemObj.shop_phone)">
                    <!-- <img v-if="itemObj.shop_avatar" :src="itemObj.shop_avatar" alt="">
                    <img v-else src="../../../../static/icons/headImg.jpg" alt=""> -->
                    <!-- <label>联系门店</label> -->
                    <img src="../img/contact.png" alt="">
                </button>
                <button style="margin-left: 10pt" open-type="share">
                    <!-- <img v-if="itemObj.shop_avatar" :src="itemObj.shop_avatar" alt="">
                    <img v-else src="../../../../static/icons/headImg.jpg" alt=""> -->
                    <!-- <label>分享好友</label> -->
                    <img src="../img/onshery.png" alt="">
                </button>
            </div>
            <div class="shop-five">
                <div class="content-word" v-if="itemObj.support_home_delivery" style="margin-right: 10pt">送餐上门</div>
                <div class="content-word" v-if="itemObj.support_self_pick">预定自提</div>
            </div>
            <div class="shop-six">
                <div class="content-word" v-if="itemObj.state">立即订餐方便快捷，预定明日更优惠</div>
                <div class="content-word" v-else>门店休息中，换一家看看吧</div>
            </div>
        </div>
        <div class="change-btn">
            <view :class="{'selectTab':status === '1' && itemObj.state}" @click="selectProject('1')">立即订餐</view>
            <view :class="{'selectTab':status === '2' && itemObj.state}" @click="selectProject('2')">明日预定</view>
            <view class="more-product" @click="searchMoreProduct">
                <view class="more-product-btn">
                查看更多<img src="../../../../static/icons/rightArrow.png" class="rightArrow_imp" alt="">
                </view>
            </view>
        </div>
        <scroll-view scroll-y class="scroll-view_H">
            <view class="product-list-detail" v-for="(item,index) in atOnceProList" :key="item.product_stock_id" v-if="status=='1'">
                <view class="product-img"  @click="redirectTo('user.goodDetail', {query: {type:'mall', good_id: item.product_id,pageName:'fastFoot'}})">
                    <img :src="item.product_avatar">
                </view>
                <view class="product-info">
                    <view class="pro-name">{{item.product_name}}</view>
                    <view class="pro-merit">{{item.product_intro}}</view>
                    <view class="pro-sales">销量 {{item.sales}} <span v-if="item.stock_num<=5">剩余分数 {{item.stock_num}}</span></view>
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
            <view class="product-list-detail" v-for="(item,index) in reserveProList" :key="item.product_id" v-if="status=='2'">
                <view class="product-img"  @click="redirectTo('user.goodDetail', {query: {type:'mall', good_id: item.product_id,pageName:'fastFoot'}})">
                    <img :src="item.avatar">
                </view>
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
            <div class="order-food-info">
                <label style="color: #111111;font-size: 32rpx">订餐情况</label>
                <label style="color: #999999;font-size: 24rpx;margin-top:5rpx">（{{orderInfoList.length}}人已订餐）</label>
            </div>
            <div class="order-info-content" v-for="(item,index) in orderInfoList" :key="index">
                <view class="content-title">
                    <view class="customer-info">
                        <view class="head-img"><img :src="item.user_avatar" alt=""></view>
                        <view>
                            <view style="color: #111111;font-size: 14pt">{{item.user_nickname}}</view>
                            <view style="color: #999999;font-size: 10pt">{{item.time}}</view>
                        </view>
                    </view>
                    <view style="float: right;color: #999999;font-size: 14pt;margin-right: 15pt;height: inherit;line-height: 34pt">¥ {{item.total_fee}}</view>
                </view>
                <view class="content-order">
                    <span>{{item.historyOrder}}</span>
                </view>
            </div>
            <div class="click-search-more" @click="searchMoreOrderInfo" v-if="showMoreBtn">点击查看更多…</div>
        </scroll-view>
        <view class="order-settlement-box">
            <div class="order-settlement" v-if="status=='1'">
                <view class="order-pay-info">
                    <i-badge :count="onceOrderCount" overflow-count="99">
                        <view class="demo-badge"><img src="../img/buyCard.png"/></view>
                    </i-badge>
                    <view>
                        <view style="color: #111111;font-size: 40rpx;font-weight: 800">¥{{onceOrderCount<=0?0:oncePrice}}</view>
                        <view style="color: #999999;font-size: 11pt" v-if="money>0">满{{money}}元起订</view>
                    </view>
                </view>
                <button @click="completePayment">去结算</button>
            </div>
            <div class="order-settlement" v-else>
                <view class="order-pay-info">
                    <i-badge :count="reserveOrderCount" overflow-count="99">
                        <view class="demo-badge"><img src="../img/buyCard.png"/></view>
                    </i-badge>
                    <view>
                        <view style="color: #111111;font-size: 17pt;font-weight: 700">¥{{reserveOrderCount<=0?0:reservePrice}}</view>
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
                status:"1",
                shopId:"",
                onceOrderCount:0,
                reserveOrderCount:0,
                oncePrice:0,
                reservePrice:0,
                money:0,
                itemObj:{},
                showMoreBtn:false,
                isCompletePayment:true,//可以结算
                fixedDelivery:{},//配送信息
                orderInfoList:[],//订餐情况
                atOnceProList:[],//立即订餐商品列表
                reserveProList:[],//明日预定商品列表
                atOnceCartList:[],//立即订餐购物车列表
                reserveCartList:[],//明日预定购物车列表
            };
        },
        computed:{
            shop_name(){
                let shopName=this.itemObj.shop_name;
                if(shopName && shopName.length>10){
                    shopName=shopName.substr(0,12)+"...";
                }
                return shopName;
            }
        },
        methods:{
            redirectTo (router, options = {}) {
                this.$command('REDIRECT_TO', router, 'push', options);
            },
            onShareAppMessage: function (res) {
                let that =this;
                return {
                    title: '社会餐小程序', // 转发后 所显示的title
                    path: '/pages/fastFoot/index?shopId='+ this.shopId, // 相对的路径
                    success: function (res) {
                        // 转发成功
                        console.log("转发成功:" + JSON.stringify(res));
                    },
                    fail: function (res) {
                        // 转发失败
                        console.log("转发失败:" + JSON.stringify(res));
                    }
                }
            },
            getSelfPickTime:function(){
                let offWorkDate=this.itemObj.off_work_time;
                offWorkDate=offWorkDate.substr(0,5);//下班时间
                let offWorkTime=parseInt(offWorkDate.substr(0,2))*60+parseInt(offWorkDate.substr(3,2));
                let date=new Date();
                let HH=date.getHours();
                let minute=date.getMinutes();
                let currentTime=HH*60+minute;//当前时间
                if(offWorkTime<=currentTime){
                    this.isCompletePayment=false;
                }
            },
            //去结算
            completePayment:function(){
                if(!this.itemObj.state){
                    wx.showToast({
                        title: '门店休息中,换一家看看吧',
                        icon: 'success',
                        duration: 1000
                    })
                    return false;
                }
                if(this.status=='1' && !this.isCompletePayment){
                    wx.showToast({
                        title: '门店已下班,您可预订明日',
                        icon: 'none',
                        duration: 2000
                    })
                    return false;
                }
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
                let that = this;
                that.itemObj["orderType"]=that.status;
                wx.getSetting({
                    async success (res) {
                        if (res.authSetting && res.authSetting['scope.userLocation']) {
                            that.$command('REDIRECT_TO', 'societyFood.societyOrderSubmit', 'push', {query: {"shopDetail":that.itemObj}});
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
                                                    that.$command('REDIRECT_TO', 'societyFood.societyOrderSubmit', 'push', {query: {"shopDetail":that.itemObj}});
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
                this.$command('REDIRECT_TO', 'index', 'reLaunch')
            },
            selectProject:function (status) {
                if(!this.itemObj.state){
                    wx.showToast({
                        title: '门店休息中,换一家看看吧',
                        icon: 'success',
                        duration: 1000
                    })
                    return false;
                }
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
                wx.getLocation({
                    type: 'wgs84',
                    success: (res)=> {
                        let latitude = res.latitude
                        let longitude = res.longitude
                        this.$command('REDIRECT_TO', 'societyFood.selectShopByMap', 'reLaunch');
                    }
                })
            },
            //查看更多订餐信息
            searchMoreOrderInfo:function () {
                let orderInfoList=this.itemObj.order_tomorrow.orders;
                if(this.status=='1'){
                    let orderInfoList=this.itemObj.order_now.orders;
                }
                this.orderInfoList=orderInfoList;
            },
            //添加点餐
            addOrderFood:function (item,index) {
                if(!this.itemObj.state){
                    wx.showToast({
                        title: '门店休息中,换一家看看吧',
                        icon: 'success',
                        duration: 1000
                    })
                    return false;
                }
                if(this.status=='1' && !this.isCompletePayment){
                    wx.showToast({
                        title: '门店已下班,您可预订明日',
                        icon: 'none',
                        duration: 2000
                    })
                    return false;
                }
                let shopId=this.itemObj.shop_id;
                let productId=item.product_stock_id;
                let stockNum=item.stock_num;//库存数量
                if(this.status=='1'){
                    if(this.reserveOrderCount>0){
                        wx.showToast({
                            title: '不能同时点立即订餐与预订明日,请先删除预订明日购物车商品',
                            icon: 'none',
                            duration: 2000
                        })
                        return false;
                    }
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
                    this.atOnceProList[index].count=count+1;
                }else {
                    if(this.onceOrderCount>0){
                        wx.showToast({
                            title: '不能同时点立即订餐与预订明日,请先删除立即订餐购物车商品',
                            icon: 'none',
                            duration: 2000
                        })
                        return false;
                    }
                    let count=this.reserveProList[index].count;
                    if(count>0){
                        this.updateCart(shopId,productId,7,count+1);
                    }else{
                        this.addCart(shopId,productId,7);
                    }
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
                    let oncePrice=parseInt(this.oncePrice)-item.retail_price;
                    this.atOnceProList[index].count=count-1;
                }else {
                    let count=this.reserveProList[index].count;
                    if(count>1){
                        this.updateCart(shopId,productId,7,count-1);
                    }else{
                        this.deleteCart(shopId,productId,7);
                    }
                    this.reserveProList[index].count=count-1;
                }
            },
            deleteCart:function(shopId,productId,type){
                this.$command('SF_DEL_CART_SHOP',shopId,productId,type,this);
            },
            addCart:function(shopId,productId,type){
                let param={
                    shop_id:shopId,
                    product_stock_id:productId,
                    cart_type:type
                }
                this.$command('SF_ADD_CART',param,this);
            },
            updateCart:function(shopId,productId,type,count){
                let param={
                    shop_id:shopId,
                    product_stock_id:productId,
                    cart_type:type,
                    buy_num:count
                }
                this.$command('SF_UPDATE_CART',param,this);
            },
            setOrderInfo:function(){
                for (let i = 0; i <this.itemObj.order_now.orders.length ; i++) {
                    let historyOrder=null;
                    let orderProducts=this.itemObj.order_now.orders[i].order_products;
                    for (let j = 0; j <orderProducts.length; j++) {
                        let productName=orderProducts[j].product_name;
                        let quantity=orderProducts[j].quantity;
                        if(!historyOrder){
                            historyOrder=productName+" X "+quantity
                        }else {
                            historyOrder=historyOrder+"、"+productName+" X "+quantity
                        }
                    }
                    this.itemObj.order_now.orders[i]["historyOrder"]=historyOrder;
                }
                for (let i = 0; i <this.itemObj.order_tomorrow.orders.length ; i++) {
                    let historyOrder=null;
                    let orderProducts=this.itemObj.order_tomorrow.orders[i].order_products;
                    for (let j = 0; j <orderProducts.length; j++) {
                        let productName=orderProducts[j].product_name;
                        let quantity=orderProducts[j].quantity;
                        if(!historyOrder){
                            historyOrder=productName+" X "+quantity
                        }else {
                            historyOrder=historyOrder+"、"+productName+" X "+quantity
                        }
                    }
                    this.itemObj.order_tomorrow.orders[i]["historyOrder"]=historyOrder;
                }
                if(this.itemObj.order_now.orders.length>3){
                    this.showMoreBtn=true;
                    this.orderInfoList=this.itemObj.order_now.orders.slice(0,3);
                }else {
                    this.showMoreBtn=false;
                    this.orderInfoList=this.itemObj.order_now.orders;
                }
            },
            async initSearch () {
                let shopId=this.$route.query.shopId;
                if(shopId){
                    this.shopId=shopId;
                }
                await this.$command('SF_SHOP_DETAIL',this.shopId,this);
                await this.$command('SF_TOMORROW_SHOP_LIST',this);
                await this.$command('SF_GET_CART_SHOP_LIST',this.shopId,this);
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
                this.oncePrice=this.oncePrice.toFixed(2);
                this.reservePrice=this.reservePrice.toFixed(2);
                this.setOrderInfo();
                this.getSelfPickTime();
            }
        },
        onShow(){
            this.status="1";
            this.onceOrderCount=0;
            this.reserveOrderCount=0;
            this.oncePrice=0;
            this.reservePrice=0;
            this.initSearch();
        }
    }
</script>

<style scoped>
    .fast-foot-list{
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
    .fast-foot-title{
        width: 100%;
        height: 200px;
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
        height:225px;
        left: 2%;
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
        /* background: -webkit-linear-gradient(top,#FDE068,#FFCC00); */
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
        background: -webkit-linear-gradient(top,#fee7b5,#f2d18d);
        width: 168rpx;
        height: 50rpx;
        margin-right: unset;
        margin-left: unset;
        line-height: 50rpx;
        padding-left: 0;
        border-radius: 10rpx;
    }
    .shop-four button label{
        font-size:15px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        color:#563C21;
    }
    .shop-four button ._img{
        height: inherit;
        width: 100%;
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
    .change-btn{
        width: 100%;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 153px;
    }
    .change-btn view{
        width: 33.3%;
        height: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        color: #757575;
        font-size: 32rpx;
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
        /* height: 70rpx !important; */
        /* margin-right: 10rpx;
        border: 1px solid #ccc;
        border-radius: 20rpx;
        justify-content: center;
        align-items: center;
        display: flex; */
    }
    .more-product-btn{
        margin-right: 10rpx;
        border: 2rpx solid #333333;
        border-radius: 16rpx;
        justify-content: center;
        align-items: center;
        display: flex;
        color: #333333 !important;
        width: 187rpx !important;
        height: 56rpx !important;
        font-size: 26rpx !important;
    }
    .more-product ._img{
        width: 4pt;
        height: 7pt;
        margin-left: 5pt;
    }
    .scroll-view_H{
        overflow-x: hidden;
        overflow-y: auto;
        height: calc(100vh - 470px);
        width: 100%;
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
        /* height: 50px; */
        justify-content: left;
        display: flex;
        padding-left: 23px;
        padding-top: 10PX;
    }
    .order-info-content{
        width: 100%;
        height: auto;
        overflow: hidden;
        margin-bottom: 20px;
    }
    .order-info-content .content-title{
        width: 100%;
        height: 34pt;
        overflow: hidden;
        margin-bottom: 8px;
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
        padding: 10px 0 10px 10px;
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
    .order-settlement-box{
        border-top: 1px #ccc solid;
        width: 100%;
        /* height: 70px; */
        bottom: 0;
        position: fixed;
        z-index: 100000;
        /* background: #e5e5e5; */
        background: #ffffff;
        padding: 15rpx;
    }
    /* .order-settlement{
        margin-top: 15rpx;
        margin-bottom: 15rpx;

    } */
    .order-settlement button{
        margin-right: 30rpx;
        /* top: 15rpx; */
        width: 260rpx;
        background: -webkit-linear-gradient(top,#FDE068,#FFCC00);
        color: #111111;
        font-size: 32rpx;
        border-radius: 48rpx;
        float: right;
        font-weight: 800;
        padding-top: 8rpx;
        padding-bottom: 8rpx;
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
            /* width: 53pt;
            height: 53pt; */
        margin-right: 10px;
        justify-content: cenetr;
        align-items: center;
        display: flex;
    }
    .demo-badge{
        height: 106rpx;
        width: 106rpx;
    }
    .demo-badge ._img{
        height: 100%;
        width: 100%;
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
