<!--suppress ALL -->
<template>
    <div id="order_payment">
        <div id="status_bar" :style="{'height': statusBarHeight + 'px'}" ></div>
        <div id="nav_bar" :style="{'height': navHeight + 'px'}" >
            <div class="back-icon" @click="backPage"><img src="../img/back.png" alt=""></div>
        </div>
        <div class="background"><div class="top"></div><div class="bottom"></div></div>
        <div class="totalContainer" :style="{height: mainHeight + 'px', overflow: 'auto'}">
            <div id="tabs" :style="{'backgroundImage':'url(' + background + ')', backgroundPosition: backgroundPosition}">
                <div class="tabItem" :class="{'active':activeTab === 'pick'}" @click="changeTab('pick')">到店自提</div>
                <div class="tabItem" :class="{'active':activeTab === 'send'}" @click="changeTab('send')">送餐上门</div>
            </div>
            <div class="sendContainer" v-if="activeTab === 'send'">
                <div class="top" v-if="shopDetail.home_delivery_type!='FIXED_ADD'">
                    <div class="topLeft " @click="selectAddressPoint" v-if="!addresses.id">
                        <img src="../../../../static/icons/location.png" alt="">
                        <span @click="insertFoodAddress">请选择收货地址</span>
                    </div>
                    <div class="topLeft1" @click="selectAddressPoint" v-else>
                        <div class="pay_shop_info_address">
                            <img class="icons" src="../../../../static/icons/company.png" alt="" v-if="addresses.tag === 'company'">
                            <img class="icons" src="../../../../static/icons/school.png" alt="" v-if="addresses.tag === 'school'">
                            <img class="icons" src="../../../../static/icons/home.png" alt="" v-if="addresses.tag === 'home'">
                            <span class="tag" v-if="addresses.tag != 'company' && addresses.tag != 'school' && addresses.tag != 'home'">{{addresses.consignee_name.substr(0,1)}}</span>
                            {{addresses.detail_address}}
                        </div>
                        <div class="pay_shop_info_name" style="margin-left: 10px">
                            <h4>
                                {{addresses.consignee_name}}
                                <span>{{addresses.consignee_mobile_phone}}</span>
                            </h4>
                        </div>
                    </div>
                    <img src="../img/right-arrow.png" alt="">
                </div>
                <div v-else>
                    <div class="top">
                        <div class="topLeft " @click="showFixed">
                            <img src="../../../../static/icons/location.png" alt="">
                            <span v-if="!currentAddress">请选择固定地址</span>
                            <span v-if="currentAddress">{{currentAddress}}</span>
                        </div>
                        <view class="select-fixed-address" v-if="showFixedAddress">
                            <view v-for="(item,index) in fixedDelivery" :key="index"  @click="selectFixedAddress(item)">{{item.address}}</view>
                        </view>
                    </div>
                    <input class="input-address" v-if="currentAddress && !showFixedAddress" placeholder="请填写详细地址" v-model="currentDetailAddress"/>
                </div>
                <div class="sendBottom">
                    <div class="left">
                        <div class="leftTop" v-if="this.orderType=='1'">立即送出</div>
                        <div class="leftTop" v-else>{{shopDetail.home_delivery_time+"送出"}}</div>
                        <div class="leftBottom">{{sendTime}}</div>
                    </div>
                    <div class="middle"></div>
                    <div class="right">
                        <div class="rightTop">联系电话</div>
                        <div class="inputs">
                            <input class="rightBottom" type="number" v-model="userInfo.mobile"/>
                            <img src="../img/editor.png" alt="">
                        </div>
                    </div>
                </div>

            </div>
            <div class="pickContainer" v-if="activeTab === 'pick'">
                <img src="../img/map.png" alt="" class="hideImg">
                <div class="top">
                    <div class="topLeft">
                        <div class="topLeftTop">{{shopAddress}}</div>
                        <div class="topLeftBottom">
                            <div class="left">
                                <div class="leftTop">自提时间</div>
                                <div class="leftBottom">{{selfPickTime}}</div>
                            </div>
                            <div class="middle"></div>
                            <div class="right">
                                <div class="rightTop">联系电话</div>
                                <div class="inputs">
                                    <input class="rightBottom" type="number" v-model="userInfo.mobile"/>
                                    <img src="../img/editor.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="topRight" v-if="shopAddress">
                        <span>距您{{distance}}</span>
                    </div>
                </div>
                <div class="bottom">
                    <img @click="agreement = false" src="../img/selected.png" alt="" v-if="agreement">
                    <img @click="agreement = true" src="../img/uncheck.png" alt="" v-else>
                    <h4>同意并接受<span @click="lookAgreement('user.pickup.protocol')">《预定自提服务协议》</span></h4>
                </div>
            </div>

            <div class="productsContainer">
                <div class="productHeader">
                    <h4 v-if="activeTab === 'send'">青松食品（宁西路28号青松集团）</h4>
                    <h4 v-if="activeTab === 'pick' && !shopAddress">青松食品（宁西路28号青松集团）</h4>
                    <h4 v-if="activeTab === 'pick' && shopAddress">{{shopAddress}}</h4>
                    <img src="../img/tag.png" alt="">
                </div>
                <ul id="good_list">
                    <li v-for="(item,index) in buyShopList" :key="index">
                        <div class="left">
                            <img :src="item.thumbnail" alt="">
                            <div id="good_info">
                                <h3>{{item.product_name}}</h3>
                                <h4>{{"规格 "+item.spec_value}}</h4>
                                <em>X {{item.quantity}}</em>
                            </div>
                        </div>
                        <div id="good_info_price">
                            <i>￥</i>
                            <h3>{{item.price}}</h3>
                        </div>
                    </li>
                    <div class="extra" v-if="buyShopList && buyShopList.length > 3" @click="extraProducts">
                        <span v-if="!isLoadAll">展开更多</span>
                        <span v-else>点击收起</span>
                        <img v-if="isLoadAll" src="../img/top-arrow.png" alt="">
                        <img v-else src="../img/bottom-arrow.png" alt="">
                    </div>
                </ul>
                <ul id="total">
                    <li>
                        <h3>商品总价</h3>
                        <span class="small"><i>￥</i>{{itemObj.total_fee}}</span>
                    </li>
                    <li>
                        <h3>配送费</h3>
                        <span class="small"><i>￥</i>{{deliveryFee}}</span>
                    </li>
                    <li>
                        <h3><img src="../img/minus.png" alt="">优惠金额</h3>
                        <span class="red"> <i :style="{color: '#FC3C2F'}">￥</i>{{itemObj.total_preferential_fee}}</span>
                    </li>
                    <li @click="searchCoupon">
                        <h3><img src="../img/coupon.png" alt="">优惠券</h3>
                        <div class="couponUse">
                            <em class="red2" v-if="couponTatal>0">{{couponTatal-couponList.length}}张可用</em>
                            <em class="gray" v-else>暂无可用</em>
                            <span class="use_coupon"><img src="../img/right-arrow.png" alt=""></span>
                        </div>
                    </li>
                    <li>
                        <h4 class="bigH4">实付款</h4>
                        <h5 class="big"><span class="big2">小计</span><i>￥</i>{{mountSettlementPrice}}</h5>
                    </li>
                </ul>
            </div>
            <ul id="remarkBox">
                <li>
                    <h3>备注 <span class="xuantian">(选填)</span></h3>
                    <input type="text" v-model="remark" placeholder="请输入备注">
                </li>
                <li><h3>支付方式</h3><span>在线支付</span></li>
            </ul>
        </div>

        <div id="do_payment">
            <div class="do_payment_contain">
                <span class="price">
                    <i>￥</i>{{mountSettlementPrice}}
                    <span v-if="shopDetail && shopDetail.amount_fee>0">（起订金额{{shopDetail.amount_fee}}元）</span>
                </span>
                <h4 @click="checkOrder">提交订单</h4>
            </div>
        </div>

        <div class="pickupTips" v-if="showTips">
            <div class="pickupTipsContainer">
                <div class="header">提示</div>
                <div class="tip2s">支付时间在21:00后的订单</div>
                <div class="tip1s">您的宝贝将在<span class="pickupTipsImportant">后天</span>送达到您的手上！</div>
                <div class="operation">
                    <button @click="showTips = false">取消</button>
                    <button @click="createOrder">我知道了</button>
                </div>
            </div>
        </div>
        <view v-if='showAddressTab'>
            <view class='wrap wrapAnimate' style='background:#ffffff;'></view>
            <view class='frame-wrapper frameAnimate'>
                <view class='frame'>
                    <view class='title-wrapper'>选择收货地址</view>
                    <view class="modal-close" @click="closeAddressTab"><img src='../../../../static/icons/cateClose.jpg'></img></view>
                    <view style="width: 96%;margin-left: 2%;height: 297px;overflow-x: hidden;overflow-y: auto">
                        <view class="address-list-show" v-for="(item,index) in addressList" :key="index">
                            <i-radio :color="color" :checked="checkedRadio==index" @change="handleRadioChange(index,item)"></i-radio>
                            <view class="address-middle">
                                <view>
                                    <img class="icons" src="../../../../static/icons/company.png" alt="" v-if="item.tag === 'company'">
                                    <img class="icons" src="../../../../static/icons/school.png" alt="" v-if="item.tag === 'school'">
                                    <img class="icons" src="../../../../static/icons/home.png" alt="" v-if="item.tag === 'home'">
                                    <span style="color: #FC3C2F" v-if="item.tag != 'company' && item.tag != 'school' && item.tag != 'home'">{{item.consignee_name.substr(0,1)}}</span>
                                    <view style="font-size: 15px;color: #111111">{{item.detail_address}}</view>
                                </view>
                                <view style="color: #757575;font-size: 13px;">
                                    <span style="margin-left: 10px">{{item.consignee_name}}</span>
                                    <span style="margin-left: 10px">{{item.consignee_mobile_phone}}</span>
                                </view>
                            </view>
                            <view class="address-btn" @click="editAddress(item)">编辑</view>
                        </view>
                    </view>
                    <view class="operation" style="margin-top: 10px"><button @click="insertFoodAddress">新增送餐地址</button></view>
                </view>
            </view>
        </view>

    </div>
</template>
<script>
    import {formatMoney} from '../../../utils';
    import _ from 'underscore'
    let left = require('../img/left.png')
    let right = require('../img/right.png')
    let mapBack = require('../img/map.png')

    export default {
        data () {
            return {
                showAddressTab:false,
                checkedRadio:-1,
                title: '提交订单',
                addresses:{},
                sendTime:"",
                addressList:[],
                longitude:'',
                latitude:'',
                selectedPoint:{},
                deliveryFee:0,
                shopInfo:{},
                pointInfo: {},
                tomorrowStr: '',
                buyShopList:[],
                userInfo:{},
                itemObj:{},
                shopDetail:{},
                couponList:[],
                fixedDelivery:[],
                showFixedAddress:false,
                currentAddress:"",
                currentDetailAddress:"",
                userInfo:{},
                currentAddressId:"",
                rangeDelivery:{},
                orderType:"1",
                type: '',
                showTips: false,
                showPoints:false,
                activeTab: 'pick',
                background:require('../img/left.png'),
                backgroundPosition: 'left center',
                products: [],
                isLoadAll: false,
                remark: '',
                mapBackground:require('../img/map.png'),
                agreement: true,
                mobile: '',
                couponTatal:0,
                selectedProduct: []
            };
        },
        computed: {
            distance:function() {
                var La1 = parseInt(this.latitude) * Math.PI / 180.0;
                var La2 = (this.shopDetail.shop_lat) * Math.PI / 180.0;
                var La3 = La1 - La2;
                var Lb3 = parseInt(this.longitude) * Math.PI / 180.0 - (this.shopDetail.shop_lng )* Math.PI / 180.0;
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
                s = s * 6378.137;//地球半径
                s = Math.round(s * 10000) / 10000;
                return Math.ceil(s)+"m";
            },
            selfPickTime:function(){
                return this.shopInfo.business_hours_start+"-"+this.shopInfo.business_hours_end
            },
            shopAddress:function(){
              return this.shopInfo.address+"("+this.shopInfo.name+")";
            },
            mountSettlementPrice:function(){
                return this.itemObj.settlement_total_fee+this.deliveryFee
            },
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
            headerHeight () {
                return this.statusBarHeight + this.navHeight;
            },
            mainHeight () {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight - this.btnHeight;
            },
            btnHeight () {
                let systemInfo = wx.getSystemInfoSync();
                return 0 * systemInfo.windowWidth / 750;
            }
        },
        methods: {

            showFixed:function(){
                this.showFixedAddress=true;
            },
            selectFixedAddress:function(item){
                this.showFixedAddress=false;
                this.deliveryFee=item.delivery_fee;
                this.currentAddress=item.address;
                this.currentAddressId=item.shop_fixed_address_id;
            },
            insertFoodAddress:function(){
                this.$command('REDIRECT_TO', 'societyFood.societyInsertAddress', 'push',{query:{"shopDetail":this.shopDetail}});
            },
            editAddress:function(item){
                this.$command('REDIRECT_TO', 'societyFood.societyInsertAddress', 'push', {query: {"address":item,"shopDetail":this.shopDetail}});
            },
            //选择送餐上门时查看地址列表
            selectAddressPoint:function () {
                this.showAddressTab=true;
            },
            handleRadioChange:function(index,item){
                this.checkedRadio=index;
                this.addresses=item;
            },
            closeAddressTab:function(){
                this.showAddressTab=false;
            },
            backPage:function () {
                this.$command('REDIRECT_TO', '', 'back')
            },
            //关闭地图展示
            closePoints () {
                this.showPoints = false
            },
            //点击地图展示
            selectPoint () {
                this.showPoints=true;
            },
            //查看更多商品,默认只显示三个商品
            extraProducts () {
                this.isLoadAll = !this.isLoadAll;
            },
            //切换自提与上门
            changeTab (tab) {
                this.activeTab = tab;
                if (tab === 'send') {
                    this.background = right;
                    this.backgroundPosition = 'right center';
                } else {
                    this.background = left;
                    this.backgroundPosition = 'left center';
                }
            },
            //提交订单步骤:先校验==>创建订单
            checkOrder:function () {
                let reg = /^1(3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/;
                let phone=this.userInfo.mobile;
                if(this.activeTab === 'send'){//送餐上门
                    if(this.shopDetail.home_delivery_type=='FIXED_ADD'){//固定地址
                        if(!this.currentAddressId){
                            wx.showToast({
                                title: '请选择地址',
                                icon: 'none'
                            });
                            return false;
                        }
                        if(!this.currentDetailAddress){
                            wx.showToast({
                                title: '请填写详细地址',
                                icon: 'none'
                            });
                            return false;
                        }
                    }
                    if(this.shopDetail.home_delivery_type!='FIXED_ADD'){//范围地址
                        if(!this.addresses || !this.addresses.id){
                            wx.showToast({
                                title: '请选择地址',
                                icon: 'none'
                            });
                            return false;
                        }
                        phone=this.addresses.consignee_mobile_phone;
                    }
                }
                if(this.activeTab === 'pick'){//到店自提
                    phone=this.shopInfo.keeper_mobile;
                    if (!this.agreement) {
                        wx.showToast({
                            title: '请先同意预定自提服务协议',
                            icon: 'none'
                        });
                        return false;
                    };
                }
                if (!reg.test(this.userInfo.mobile)) {
                    wx.showToast({
                        title: '请填写正确格式的收货人手机号',
                        icon: 'none'
                    });
                    return false;
                }
                let now = new Date();
                let hour = now.getHours();
                if (hour > 20) {
                    this.showTips = true;
                } else {
                    this.createOrder()
                }
            },
            //超过某个时间后创建订单
            createOrder () {
                this.showTips = false;
                let consignee_name=this.addresses.consignee_name;
                if(this.activeTab === 'pick' || (this.shopDetail.home_delivery_type=='FIXED_ADD' && this.activeTab === 'send')){
                    consignee_name=this.userInfo.nickname;
                }
                let expect_receive_time_start=this.shopInfo.business_hours_start;
                if(this.activeTab === 'send'){
                    expect_receive_time_start=this.shopDetail.home_delivery_time;
                    if(this.orderType!=1){
                        let date=new Date();
                        let curHH=date.getHours()<10?"0"+date.getHours():date.getHours();
                        let curMin=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
                        expect_receive_time_start=curHH+":"+curMin;
                    }
                }
                let param={
                    shop_id:this.shopDetail.shop_id,
                    cart_type:this.orderType=="1"?6:7,
                    delivery_type:this.activeTab === 'send' ? 'HOME_DELIVERY' : 'SELF_PICK',
                    consignee_mobile_phone:this.userInfo.mobile,
                    consignee_name:consignee_name,
                    expect_receive_time_start:expect_receive_time_start
                }
                if(this.activeTab === 'send' && this.shopDetail.home_delivery_type=='FIXED_ADD'){
                    param["shop_fixed_address_id"]=this.currentAddressId;
                    param["user_fixed_detail_address"]=this.currentDetailAddress;
                }
                if(this.activeTab === 'send' && this.shopDetail.home_delivery_type!='FIXED_ADD'){
                    param["user_address_id"]=this.addresses.id;
                    param["shop_range_address_id"]=this.rangeDelivery.shop_range_address_id;
                }
                this.$command('SF_SUBMIT_ORDER',param,this)
            },
            getDate () {
                var tomorrow = new Date();
                tomorrow.setTime(tomorrow.getTime() + 24 * 60 * 60 * 1000);
                var tomorrowStr = tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate();
                this.tomorrowStr = tomorrowStr
            },
            //查询优惠券
            searchCoupon (router) {
                if (this.couponTatal === 0) return;
                let shopId=this.shopDetail.shop_id;
                let cartType=this.orderType=="1"?6:7;
                this.$command('REDIRECT_TO', "societyFood.couponList", 'push', {
                    query: {shopId: shopId, cartType: cartType}
                });
            },
            //查看协议
            lookAgreement:function (router) {
                this.$command('REDIRECT_TO', router, 'push');
            },
            getCalculate:function () {
                let param={
                    shop_id:this.shopDetail.shop_id,
                    order_type:this.orderType=="1"?"SOCIETY_FOOD_ORDER_NOW":"SOCIETY_FOOD_ORDER_TOMORROW",
                    cart_type:this.orderType=="1"?6:7
                }
                if(this.couponList && this.couponList.length>0){
                    param["coupon_records"]=this.couponList;
                }
                this.$command('SF_CART_AMOUNT',param,this);
            },
            getSendTime:function (home_delivery_time,off_work_time) {
                let deliveryHH=home_delivery_time.substr(11,2);
                if(deliveryHH.indexOf("0")==0){
                    deliveryHH=deliveryHH.substr(1,1);
                }
                let deliveryMin=home_delivery_time.substr(14,2);
                if(deliveryMin.indexOf("0")==0){
                    deliveryMin=deliveryMin.substr(1,1);
                }

                if(this.orderType=="2"){
                    deliveryMin=parseInt(deliveryMin)+30;
                    if(deliveryMin>=60){
                        deliveryHH=parseInt(deliveryHH)+1;
                        deliveryMin=deliveryMin-60;
                    }
                    let curHH=deliveryHH<10?"0"+deliveryHH:deliveryHH;
                    let curMin=deliveryMin<10?"0"+deliveryMin:deliveryMin;
                    this.sendTime="大约"+curHH+":"+curMin+"送达";
                    return false;
                }
                let offWorkHH=off_work_time.substr(0,2);
                if(offWorkHH.indexOf("0")==0){
                    offWorkHH=offWorkHH.substr(1,1);
                }
                let offWorkMin=off_work_time.substr(3,2);
                if(offWorkMin.indexOf("0")==0){
                    offWorkMin=offWorkMin.substr(1,1);
                }
                let offWorkTime=parseInt(offWorkHH)*60+parseInt(offWorkMin);//下班时间
                let deliveryTime=parseInt(deliveryHH)*60+parseInt(deliveryMin);//配送时间
                let date=new Date();
                let HH=date.getHours();
                let minute=date.getMinutes();
                let currentTime=HH*60+minute;//当前时间
                if((offWorkTime-currentTime)<0){
                    this.sendTime="已经下班啦,只能预订明日啦";
                    return false;
                }
                if((offWorkTime-currentTime)<30){
                    this.sendTime="大约"+home_delivery_time+"送达";
                    return false;
                }
                if(deliveryTime<currentTime){
                    date.setTime(date.getTime() + 30 * 60 * 1000);
                    let curHH=date.getHours()<10?"0"+date.getHours():date.getHours();
                    let curMin=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
                    this.sendTime="大约"+curHH+":"+curMin+"送达";
                }else {
                    let curMin=parseInt(deliveryMin)+60;
                    let curHH=parseInt(deliveryHH);
                    if(curMin>=60){
                        curHH=curHH+1;
                        curMin=curMin-60;
                    }
                    curHH=curHH<10?"0"+curHH:curHH;
                    curMin=curMin<10?"0"+curMin:curMin;
                    this.sendTime="大约"+curHH+":"+curMin+"送达";
                }
            }
        },
        onShow () {
            this.allProducts = []
            let selectedProduct = [];
            wx.getLocation({
                type: 'wgs84',
                success: (res)=> {
                    let latitude = res.latitude;
                    let longitude = res.longitude;
                    this.latitude=latitude;
                    this.longitude=longitude;
                    console.log("当前位置经纬度1="+latitude+"==="+longitude);
                }
            })
            this.showAddressTab=false;
            this.userInfo=this.model.account.userInfo;
            this.createOrderId="";
        },
        mounted () {
            this.getDate();
            let deliveryType=this.$route.query.deliveryType;//配送方式
            this.orderType=this.$route.query.orderType;
            let shopDetail=this.$route.query.shopDetail;
            let home_delivery_time=shopDetail.home_delivery_time;
            let off_work_time=shopDetail.off_work_time;
            let coupon=this.$route.query.coupon;
            if(coupon && coupon.length>0){
                this.couponList=coupon;
            }
            this.shopDetail=shopDetail;
            if(shopDetail){
                this.fixedDelivery=shopDetail.fixed_delivery;
                this.rangeDelivery=shopDetail.range_delivery;
            }
            if(shopDetail.home_delivery_type!="FIXED_ADD"){
                this.deliveryFee=parseInt(this.rangeDelivery.delivery_fee);
            }
            if(deliveryType=="1"){
                this.activeTab="send";
            }
            if(deliveryType=="2"){
                this.activeTab="pick";
            }
            this.getCalculate();
            let param={
                shop_id:this.shopDetail.shop_id,
                cart_type:this.orderType=="1"?6:7
            }
            this.$command('SF_CAN_USE_COUPONS',param,this);
            this.$command('SF_USER_GOODS_ADDRESS',this.shopDetail.shop_id,this);
            this.getSendTime(home_delivery_time,off_work_time);
        }
    }
</script>

<style scoped>
    .input-address{
        width: auto;
        height: 32px;
        border: 1px solid #d7dde4;
        border-radius: 4px;
        color: #657180;
        background-color: #fff;
        padding-left: 10px;
        margin-left: 20px;
        margin-right: 10px;
        margin-top: 5px;
    }
    .select-fixed-address{
        width: 200px;
        background-color: #e3e8ee;
        position: absolute;
        margin-top: 40px;
        border-radius: 5px;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
    }
    .select-fixed-address>view{
        height: 40px;
        line-height: 40px;
        color: #111111;
        font-size: 14px;
        padding-left: 10px;
    }
    .send-bottom{
        width: 100%;
        margin-top: 10px;
    }
    .send-bottom>view{
        height: inherit;
        width: max-content;
        justify-content: center;
        align-items: center;
        display: flex;
        font-size: 14px;
    }
    .address-list-show{
        width: 100%;
        height: auto;
        justify-content: left;
        align-items: center;
        display: flex;
    }
    .address-list-show .address-btn{
        height: inherit;
        width: 90px;
        font-size: 13px;
        color: #FC3C2F;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .address-list-show ._i-radio{
        height: inherit;
        width: 50px;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .address-list-show .address-middle{
        width: calc(100vh - 140px);
    }
    .address-list-show .address-middle span{
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        margin-right: 7px;
        width: 32px;
        margin-left: 5px;
    }
    .address-list-show .address-middle>view{
        width: 100%;
        justify-content: left;
        align-items: center;
        display: flex;
        color: #111111;
    }
    .address-list-show .address-middle .icons{
        width: 20px !important;
        height: 20px !important;
        margin-left: 7px;
        margin-right: 10px;
    }
    .pay_shop_info_address .icons{
        width: 20px !important;
        height: 20px !important;
        margin-left: 7px;
        margin-right: 10px;
    }
    .wrapAnimate{animation: wrapAnimate 0.5s ease-in-out forwards}
    @keyframes wrapAnimate{
        0%{}
        100%{background:rgba(0,0,0,0.35);}
    }
    .wrapAnimateOut{animation: wrapAnimateOut 0.4s ease-in-out forwards}
    @keyframes wrapAnimateOut{
        0%{background:rgba(0,0,0,0.35);}
        100%{background:rgba(0,0,0,0);}
    }
    .frameAnimate{animation: frameAnimate 0.5s ease forwards;}
    @keyframes frameAnimate{
        0%{}
        100%{opacity: 1;top:0vh;}
    }
    .frameAnimateOut{animation: frameAnimateOut 0.4s ease forwards;}
    @keyframes frameAnimateOut{
        0%{opacity: 1;top:0vh;}
        100%{opacity: 0;top:100vh;}
    }
    .frame-wrapper{position: fixed;height:100vh;width:100%;z-index: 2;top: 50vh;}
    .frame{
        background: #fff;
        position: absolute;
        bottom: 0;width:100%;
        border-top-left-radius: 10rpx;
        border-top-right-radius: 10rpx;
        z-index: 3;
        height: 400px;
    }
    .wrap{position: fixed;z-index: 1;top: 0;left: 0;right: 0;bottom: 0;}

    .title-wrapper{
        justify-content: center;
        align-items: center;
        display: flex;
        height: 40px;
        font-size: 18px;
        width: 100%;
        color: #111111;
    }
    .modal-close{
        width: 20px;
        height: 20px;
        position: absolute;
        float: right;
        top: 8px;
        right: 10px;
    }
    .modal-close img{
        width: 15px;
        height: 15px;
    }
    #nav_bar{
        justify-content: left !important;
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
    page {
        height: 100%;
        background: #f2f2f2;
    }

    .background {
        width: 100%;
        height: 400rpx;
        position: fixed;
        top: 0;
        z-index: -10;
    }

    .background .top {
        width: 100%;
        height: 234rpx;
        background: #FFCC00;
    }

    .background .bottom {
        width: 100%;
        height: 163rpx;
        background: linear-gradient(180deg, rgba(255, 204, 0, 1), rgba(242, 242, 242, 1));
    }

    .totalContainer {
        padding: 20rpx;
        box-sizing: border-box;
        z-index: 10000;
    }


    .totalContainer #tabs {
        width: 100%;
        height: 80rpx;
        background-size: 690rpx 100%;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .totalContainer #tabs .tabItem {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28rpx;
        color: #111;
    }

    .totalContainer #tabs .active {
        font-weight: bold;
    }

    .sendContainer {
        width: 100%;
        background: #fff;
        border-radius: 25rpx;
        border-top-right-radius: 0;
        box-sizing: border-box;
        padding: 40rpx 0;
    }

    .sendContainer .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30rpx;
    }

    .sendContainer .top .topLeft {
        flex: 1;
        font-size: 40rpx;
        color: #111;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .topLeft1 {
        flex: 1;
        font-size: 40rpx;
        color: #111;
        font-weight: bold;
        display: flex;
        justify-content: center !important;
        align-items: flex-start;
        flex-direction: column;
    }

    .sendContainer .top .topLeft1 .pay_shop_info_address {
        font-size: 40rpx;
        color: #111;
        width: 604rpx;
        word-break: break-all;
    }

    .topLeft1 .tag {
        padding: 4rpx 19rpx;
        background: #FFF6CC;
        border-radius: 3rpx;
        color: #ffcc00;
        font-size: 22rpx;
    }

    .sendContainer .top .topLeft1 .pay_shop_info_name h4 {
        font-size: 28rpx;
        color: #111;
        font-weight: normal;
    }

    .sendContainer .top .topLeft1 .pay_shop_info_name h4 span {
        margin-left: 20rpx;
    }

    .sendContainer .top .topLeft img {
        width: 52rpx;
        height: 52rpx;
        margin-right: 12rpx;
    }

    .sendContainer .top img {
        width: 12rpx;
        height: 22rpx;
    }

    .sendContainer .middle {
        width: 630rpx;
        height: 2rpx;
        background: #f2f2f2;
        margin: 40rpx;
    }

    .sendContainer .bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0 30rpx;
    }

    .sendContainer .bottom h4 {
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
    }

    .sendContainer .bottom span {
        font-size: 24rpx;
        color: #ef9e21;
    }

    .pickContainer {
        width: 100%;
        background: #fff;
        border-radius: 25rpx;
        border-top-left-radius: 0;
        box-sizing: border-box;
        padding: 40rpx 0;
        background-size: 350rpx 280rpx;
        background-repeat: no-repeat;
        background-position: right top;
        position: relative;
        overflow: hidden;
    }

    .hideImg {
        width: 335rpx;
        height: 270rpx;
        position: absolute;
        right: 0;
        top: 0;
    }

    .pickContainer .top {
        box-sizing: border-box;
        padding: 0 30rpx;
        position: relative;
    }

    .pickContainer .top .topLeft .topLeftTop {
        font-size: 40rpx;
        font-weight: bold;
        color: #111;
        width: 434rpx;
        word-break: break-all;
        margin-top: 10rpx;
        margin-bottom: 50rpx;
    }

    .pickContainer .top .topLeft .topLeftBottom {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .pickContainer .top .topLeft .topLeftBottom .left .leftTop {
        font-size: 28rpx;
        color: #757575;
    }

    .pickContainer .top .topLeft .topLeftBottom .left .leftBottom {
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
        margin-top: 10rpx;
    }

    .pickContainer .top .topLeft .topLeftBottom .middle {
        width: 2rpx;
        height: 76rpx;
        background: #e6e6e6;
        margin: 0 27rpx;
    }

    .pickContainer .top .topLeft .topLeftBottom .right .rightTop {
        font-size: 28rpx;
        color: #757575;
    }

    .pickContainer .top .topLeft .topLeftBottom .right .rightBottom {
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
        margin-top: 10rpx;
    }


    .pickContainer .top .topLeft .topLeftBottom .right .inputs {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pickContainer .top .topLeft .topLeftBottom .right .inputs input {
        width: 200rpx;
    }
    .sendBottom {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 20px;
        padding-top: 15px;
    }
    .sendBottom .left .leftTop {
        font-size: 28rpx;
        color: #757575;
    }

    .sendBottom .left .leftBottom {
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
        margin-top: 10rpx;
    }

    .sendBottom .middle {
        width: 2rpx;
        height: 76rpx;
        background: #e6e6e6;
        margin: 0 27rpx;
    }
    .sendBottom .right .rightTop {
        font-size: 28rpx;
        color: #757575;
    }

    .sendBottom .right .rightBottom {
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
        margin-top: 10rpx;
    }
    .sendBottom .right .inputs {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sendBottom .right .inputs input {
        width: 200rpx;
    }







    .right .inputs img {
        width: 26rpx;
        height: 26rpx;
        margin-top: 3rpx;
    }


    .pickContainer .top .topRight {
        width: 250rpx;
        height: 220rpx;
        background: transparent;
        position: absolute;
        right: 0;
        top: -10rpx;
    }

    .pickContainer .top .topRight span {
        font-size: 24rpx;
        color: #111111;
        font-weight: bold;
        position: absolute;
        right: 45rpx;
        top: 6rpx;
    }

    .pickContainer .bottom {
        width: 100%;
        z-index: 99999;
        box-sizing: border-box;
        margin-top: 20rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 30rpx;
    }

    .pickContainer .bottom img {
        width: 32rpx;
        height: 32rpx;
    }

    .pickContainer .bottom h4 {
        font-size: 28rpx;
        color: #4d4d4d;
        margin-left: 14rpx;
    }

    .pickContainer .bottom span {
        font-size: 28rpx;
        color: #3C517F;
        margin-left: 10rpx;
    }

    .productsContainer {
        width: 100%;
        box-sizing: border-box;
        background: #fff;
        border-radius: 25rpx;
        margin: 20rpx 0;
        padding: 0 30rpx;
    }

    .productHeader {
        width: 100%;
        height: 118rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid #f2f2f2;
    }

    .productHeader h4 {
        font-size: 28rpx;
        color: #333;
    }

    .productHeader img {
        width: 100rpx;
        height: 30rpx;
    }

    .productsContainer #total {
        width: 100%;
        margin-top: 40rpx;
    }

    .productsContainer #total li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 82rpx;
    }

    .productsContainer #total li h3 {
        font-size: 28rpx;
        color: #333;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .productsContainer #total li h3 img {
        width: 32rpx;
        height: 32rpx;
        margin-right: 10rpx;
    }

    .productsContainer #total li span {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .productsContainer #total i {
        font-size: 24rpx;
        color: #111;
        margin-right: 5rpx;
    }

    .small {
        font-size: 32rpx;
        color: #111;
        font-weight: bold;
    }

    .red {
        font-size: 32rpx;
        color: #FC3C2F;
        font-weight: bold;
    }

    .red2 {
        font-size: 30rpx;
        color: #FC3C2F;
    }

    .gray {
        font-size: 30rpx;
        color: #999;
    }

    .couponUse {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bigH4 {
        font-size: 30rpx;
        color: #111;
        font-weight: bold;
    }

    .use_coupon img {
        width: 12rpx;
        height: 22rpx;
        margin-left: 20rpx;
    }

    .big {
        font-size: 50rpx;
        color: #111;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .big2 {
        font-size: 30rpx;
        color: #111111;
        margin-right: 15rpx;
    }

    .productsContainer #total li:first-child {
        height: 110rpx;
        border-bottom: 1rpx solid #f2f2f2;
        border-top: 1rpx solid #f2f2f2;
    }

    .productsContainer #total li:last-child {
        height: 120rpx;
        border-top: 1rpx solid #f2f2f2;
    }


    #pay_shop_info, #pay_pick_up_info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0 40rpx;
        height: 180rpx;
    }

    .locationImg {
        width: 66rpx;
        height: 66rpx;
    }

    #pay_shop_info {
        margin-top: 20rpx;
    }

    #pay_shop_info .location {
        background: linear-gradient(to right, #FDE068, #FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_shop_info .pay_shop_info {
        width: 507rpx;
        font-size: 28rpx;
        color: #111111;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name h4 {
        font-weight: normal;
        margin: 0;
    }

    #pay_shop_info .pay_shop_info .pay_shop_info_name span {
        color: #757575;
        margin-left: 23rpx;
    }

    #pay_shop_info .arrow {
        color: #757575;
        font-size: 22rpx;
    }

    #pay_shop_info_act {
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0 40rpx;
        height: 180rpx;
        margin-bottom: 20rpx;
    }

    #pay_shop_info_act .locationImg {
        background: linear-gradient(to right, #FDE068, #FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_shop_info_act .pay_shop_info {
        width: 507rpx;
        font-size: 28rpx;
        color: #111111;
    }

    #pay_shop_info_act .pay_shop_info .pay_shop_info_name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #pay_shop_info_act .pay_shop_info .pay_shop_info_name h4 {
        font-weight: normal;
        margin: 0;
    }

    #pay_shop_info_act .pay_shop_info .pay_shop_info_name span {
        color: #757575;
        margin-left: 23rpx;
    }

    #pay_shop_info_act .arrow {
        color: #757575;
        font-size: 22rpx;
    }

    #pay_pick_up_info {
        justify-content: flex-start;
        border-top: 2rpx solid #f2f2f2;
        margin-bottom: 20rpx;
    }

    #pay_pick_up_info .location {
        background: linear-gradient(to right, #FDE068, #FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pay_pick_up_info .order_info {
        font-size: 28rpx;
        color: #111;
        margin-left: 40rpx;
    }

    #pay_pick_up_info .order_info h4 {
        margin: 0;
    }

    #pay_pick_up_info .order_info span {
        color: #757575;
    }

    .order_info_time {
        margin-left: 23rpx;
    }

    #good_list {
        background: #fff;
    }

    #good_list .extra {
        width: 100%;
        margin-top: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24rpx;
        color: #4d4d4d;
    }

    #good_list .extra img {
        width: 19rpx;
        height: 10rpx;
        margin-left: 11rpx;
    }


    #good_list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 50rpx;
    }

    #good_list li img {
        width: 106rpx;
        height: 106rpx;
        margin-right: 20rpx;
        border: 1rpx solid #f2f2f2;
        border-radius: 10rpx;
    }

    #good_list li .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #good_list li #good_info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
    }

    #good_list li #good_info h3 {
        font-size: 28rpx;
        color: #111111;
    }

    #good_list li #good_info h4 {
        font-size: 24rpx;
        color: #757575;
    }

    #good_list li #good_info em {
        font-size: 24rpx;
        color: #757575;
    }

    #good_list li #good_info_price {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #good_list li #good_info_price i {
        font-size: 24rpx;
        color: #111;
        font-weight: bold;
    }

    #good_list li #good_info_price h3 {
        font-size: 32rpx;
        color: #111;
        font-weight: bold;
    }

    #remarkBox {
        box-sizing: border-box;
        background: #fff;
        border-radius: 25rpx;
        display: flex;
        flex-direction: column;
        margin-bottom: 150rpx;
    }

    #remarkBox .xuantian {
        color: #999 !important;
    }

    #remarkBox li {
        width: 100%;
        height: 106rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30rpx;
        position: relative;
    }

    #remarkBox li h3 {
        font-size: 28rpx;
        color: #111;
        font-weight: bold;
    }

    #remarkBox li span {
        font-size: 28rpx;
        color: #111;
    }

    #remarkBox li input {
        font-size: 28rpx;
        color: #999;
        width: 500rpx;
    }

    #remarkBox li em {
        font-size: 28rpx;
        color: #757575;
        position: absolute;
        right: 30rpx;
    }


    #order_payment #do_payment {
        box-sizing: border-box;
        height: 98rpx;
        width: 100%;
        padding: 0 20rpx;
        position: fixed;
        bottom: 0;
        margin: 30rpx 0;
        opacity: 0.9;
    }

    #order_payment #do_payment .do_payment_contain {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 53rpx;
        overflow: hidden;
    }

    #order_payment #do_payment .price {
        font-size: 32rpx;
        padding-left: 30rpx;
        box-sizing: border-box;
        background: #111;
        color: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 50rpx;
        font-weight: bold;
        flex: 1;
        height: 100%;

    }

    #order_payment #do_payment .price i {
        font-size: 30rpx;
        font-weight: normal;
        margin-right: 5rpx;
    }

    #order_payment #do_payment .price span {
        font-size: 22rpx;
        color: #999;
        margin-left: 33rpx;
        font-weight: normal;
    }

    #order_payment #do_payment h4 {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180rpx;
        height: 100%;
        font-size: 32rpx;
        color: #111111;
        font-weight: bold;
        background: linear-gradient(270deg, rgba(255, 204, 0, 1), rgba(253, 224, 104, 1));
    }

    .disabledButton {
        background: #999 !important;
        color: #fff !important;
    }

    .pickupTips {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pickupTips .pickupTipsContainer {
        width: 630rpx;
        background: #fff;
        border-radius: 10rpx;
        padding: 0 50rpx;
        box-sizing: border-box;
    }

    .pickupTips .header {
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111;
    }

    .pickupTips .tip1s {
        font-size: 28rpx;
        color: #111111;
        margin-top: 20rpx;
        text-align: center;
        height: 80rpx;
    }

    .tip2s {
        font-size: 28rpx;
        color: #111111;
        margin-top: 20rpx;
        text-align: center;
    }

    .pickupTips .tip1s span {
        color: red;
        font-weight: bold;
    }

    .pickupTips .operation {
        width: 100%;
        margin-bottom: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .operation button {
        flex: 1;
        margin-right: 10rpx;
        color: #FFCC00;
        border-radius: 10rpx;
        background: #fff;
        border: 1px solid #ffcc00;
        font-size: 32rpx;
    }

    .pickupTips .operation button:last-child {
        margin-right: 0;
        background: #FFCC00;
        color: #fff;
    }


</style>
