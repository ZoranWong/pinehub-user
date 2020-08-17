<template>
    <div class="select-shop-Map">
        <div id="status_bar" :style="{'height': statusBarHeight + 'px'}" ></div>
        <div id="nav_bar" :style="{'height': navHeight + 'px'}" >
            <div class="back-icon" @click="backPage">
                <img class="leftArrow" src="../../../../static/icons/leftArrow.png" alt="">
            </div>
        </div>
        <map id="map" :longitude="longitude" :latitude="latitude" scale="14" bindcontroltap="controltap" :markers="markers" bindmarkertap="markertap" :polyline="polyline" bindregionchange="regionchange" show-location></map>
        <view class="shop-tab">
            <view @click="changeAddressList('0')" :class="{'bacColor':showNearby}">附近门店</view>
            <view @click="changeAddressList('1')" :class="{'bacColor':!showNearby}">常用门店</view>
        </view>
        <view class="shop-address-list" v-if="showNearby">
            <view class="shop-address-tab" v-for="(item,index) in addressList" :key="index">
                <view class="left">
                    <view style="color: #333333;font-size: 16pt;font-weight: 700">{{item.name}}</view>
                    <view>
                        <label style="color: #333333;font-size: 12pt;font-weight: 400">{{item.distance}}</label>
                        <label style="color: #999999;margin-left: 5px;margin-right: 5px">|</label>
                        <label style="color: #999999;font-size: 12pt;font-weight: 400;">{{item.address}}</label>
                    </view>
                </view>
                <i-radio class="right" :color="color" :checked="checkedRadio==index" @change="handleRadioChange(index)"></i-radio>
            </view>
        </view>
        <view class="shop-address-list" v-else>
            <view class="shop-address-tab" v-for="(item,index) in usedAddressList" :key="index">
                <view class="left">
                    <view style="color: #333333;font-size: 16pt;font-weight: 700">{{item.name}}</view>
                    <view>
                        <label style="color: #333333;font-size: 12pt;font-weight: 400">{{item.distance}}</label>
                        <label style="color: #999999;margin-left: 5px;margin-right: 5px">|</label>
                        <label style="color: #999999;font-size: 12pt;font-weight: 400;">{{item.address}}</label>
                    </view>
                </view>
                <i-radio class="right" :color="color" :checked="checkedRadio==index" @change="handleRadioChange(index)"></i-radio>
            </view>
        </view>
        <view class="footer-btn">
            <button>确定</button>
        </view>
    </div>
</template>

<script>
    import Public from "../js/Public";
    export default {
        mixins:[Public],
        data() {
            return {
                checkedRadio:-1,
                longitude:'113.324520',
                latitude:'23.099994',
                color:"#FFCC00",
                showNearby:true,
                addressList:[
                    {name:"置地广场（吉事多便利店）",distance:"距您295m",address:"政务区置地广场吉事多便利店"},
                    {name:"置地广场（吉事多便利店）",distance:"距您295m",address:"政务区置地广场吉事多便利店"},
                    {name:"置地广场（吉事多便利店）",distance:"距您295m",address:"政务区置地广场吉事多便利店"},
                    {name:"置地广场（吉事多便利店）",distance:"距您295m",address:"政务区置地广场吉事多便利店"},
                    {name:"置地广场（吉事多便利店）",distance:"距您295m",address:"政务区置地广场吉事多便利店"}
                ],
                usedAddressList:[
                    {name:"家乐福",distance:"距您2095m",address:"政务区家乐福吉事多便利店"},
                    {name:"家乐福",distance:"距您2095m",address:"政务区家乐福吉事多便利店"},
                    {name:"家乐福",distance:"距您2095m",address:"政务区家乐福吉事多便利店"},
                    {name:"家乐福",distance:"距您2095m",address:"政务区家乐福吉事多便利店"},
                    {name:"家乐福",distance:"距您2095m",address:"政务区家乐福吉事多便利店"}
                ],
                markers: [{
                    currentTab:'1',
                    iconPath:require('../img/mapPos.png'),
                    id: 0,
                    latitude: 23.099994,
                    longitude: 113.324520,
                    width: 50,
                    height: 50
                }],
                polyline: [{
                    points: [{
                        longitude: 113.3245211,
                        latitude: 23.10229
                    }, {
                        longitude: 113.324520,
                        latitude: 23.21229
                    }],
                    color:"#FF0000DD",
                    width: 2,
                    dottedLine: true
                }]
            };
        },
        methods:{
            changeAddressList:function(val){
                this.showNearby=val=='0'?true:false;
                this.checkedRadio=-1;
            },
            handleRadioChange:function(index){
                this.checkedRadio=index;
            },
            handleChange:function(val){
                console.log("当前Tab:"+val.target.key)
            },
            backPage:function () {
                this.$command('REDIRECT_TO', '', 'back')
            },
            regionchange(e) {
                console.log(e.type)
            },
            markertap(e) {
                console.log(e.detail.markerId)
            },
            controltap(e) {
                console.log(e.detail.controlId)
            },
            async init () {
                let result = await this.map.getLocation();
                this.latitude=result.latitude;
                this.longitude=result.longitude;
            }
        },
        created(){
           this.init()
        }
    }
</script>

<style>
    .shop-address-list{
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        max-height: 400pt;
    }
    .shop-address-tab{
        margin-left: 15px;
        width: auto;
        height: auto;
        margin-top: 40pt;
        padding-top: 15pt;
        padding-bottom: 30pt;
    }
    .shop-address-tab .left{
        float: left;
        width: 85%;
    }
    .shop-address-tab .right{
        float: right;
        justify-content: center;
        align-items: center;
        display: flex;
        width: 15%;
        height: 44pt;
    }
    .shop-address-tab .right .radio-index--i-radio-cell{
        padding: 0;
    }
    .shop-tab{
        border-radius: 12.5pt 12.5pt 0 0;
        background-color: #F5F5F5;
        height: 40pt;
        width: 100%;
        margin-top: -10px;
        justify-content: center;
        align-items: center;
        display: flex;
        position: absolute;
    }
    .shop-tab view{
        color: #111111;
        font-size: 16pt;
        font-weight: 400;
        font-family:PingFang-SC-Bold,PingFang-SC;
        width: 50%;
        text-align: center;
    }
    .select-shop-Map #map{
        width: 100%;
        height: 300px;
    }
    .select-shop-Map #nav_bar{
        justify-content: left;
    }
    .select-shop-Map .leftArrow{
        width: 11px;
        height: 20px;
    }
    .bacColor{
        font-weight: 700 !important;
    }
    .select-shop-Map .footer-btn{
        width: 100%;
        height: 77pt;
        justify-content: center;
        align-items: center;
        display: flex;
        background-color: #ffffff;
        position: fixed;
        bottom: 0;
    }
    .select-shop-Map .footer-btn button{
        background: -webkit-linear-gradient(top,#FDE068,#FFCC00);
        color: #111111;
        font-size: 18pt;
        font-family:PingFang-SC-Medium,PingFang-SC;
        width: 92%;
    }
</style>
