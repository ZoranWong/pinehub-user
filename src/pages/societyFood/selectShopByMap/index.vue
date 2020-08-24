<template>
    <div class="select-shop-Map">
        <div id="status_bar" :style="{'height': statusBarHeight + 'px'}" ></div>
        <div id="nav_bar" :style="{'height': navHeight + 'px'}" >
            <div class="back-icon" @click="backPage">
                <img class="leftArrow" src="../../../../static/icons/leftArrow.png" alt="">
            </div>
        </div>
        <map id="map" :longitude="longitude" :latitude="latitude" scale="18" :markers="markers" @markertap="markertap" @regionchange="regionchange" show-location></map>
        <input type="text" placeholder-class="placeholder-class" :style="{'top': (imgHeight+15) + 'px'}" v-model="searchName" class="search-input" placeholder="请输入地点名称">
        <view class="search-content" :style="{'top': (imgHeight+55) + 'px'}" v-if="searchName">
            <view v-for="(item,index) in addressList" :key="index" style="margin-top: 20px">
                <view style="color: #333333;font-size: 12pt;font-weight: 500;">{{item.name}}</view>
                <view>
                    <label style="color: #333333;font-size: 11pt;font-weight: 400">{{"距您"+item.distance+"m"}}</label>
                    <label style="color: #999999;margin-left: 5px;margin-right: 5px">|</label>
                    <label style="color: #999999;font-size: 11pt;font-weight: 400;">{{item.address}}</label>
                </view>
            </view>
        </view>
        <view class="shop-tab">
            <view @click="changeAddressList('0')" style="border-radius: 13pt 0 0 0" :class="{'bacColor':showNearby}">附近门店</view>
            <view @click="changeAddressList('1')" style="border-radius: 0 13pt 0 0" :class="{'bacColor':!showNearby}">常用门店</view>
        </view>
        <view class="shop-address-list" v-if="showNearby">
            <view class="shop-address-tab" v-for="(item,index) in addressList" :key="index">
                <view class="left">
                    <view style="color: #333333;font-size: 16pt;font-weight: 700">{{item.name}}</view>
                    <view>
                        <label style="color: #333333;font-size: 12pt;font-weight: 400">{{"距您"+item.distance+"m"}}</label>
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
                        <label style="color: #333333;font-size: 12pt;font-weight: 400">{{"距您"+item.distance+"m"}}</label>
                        <label style="color: #999999;margin-left: 5px;margin-right: 5px">|</label>
                        <label style="color: #999999;font-size: 12pt;font-weight: 400;">{{item.address}}</label>
                    </view>
                </view>
                <i-radio class="right" :color="color" :checked="checkedRadio==index" @change="handleRadioChange(index)"></i-radio>
            </view>
        </view>
        <view class="footer-btn">
            <button :class="{'disabled':checkedRadio==-1}" @click="saveAddress">确定</button>
        </view>
    </div>
</template>

<script>
    import Public from "../js/Public";
    export default {
        mixins:[Public],
        data() {
            return {
                searchName:"",
                checkedRadio:-1,
                longitude:'113.324520',
                latitude:'23.099994',
                color:"#FFCC00",
                showNearby:true,
                customCalloutContent:{'name':"置地广场（吉事多便利店)",'time':"12:00-21:00",'distance':"295",'address':"政务区置地广场吉事多便利店"},
                addressList:[
                    {name:"置地广场（吉事多便利店）",distance:"295",address:"政务区置地广场吉事多便利店"},
                    {name:"置地广场（吉事多便利店）",distance:"295",address:"政务区置地广场吉事多便利店"},
                    {name:"置地广场（吉事多便利店）",distance:"295",address:"政务区置地广场吉事多便利店"},
                    {name:"置地广场（吉事多便利店）",distance:"295",address:"政务区置地广场吉事多便利店"},
                    {name:"置地广场（吉事多便利店）",distance:"295",address:"政务区置地广场吉事多便利店"}
                ],
                usedAddressList:[
                    {name:"家乐福",distance:"2095",address:"政务区家乐福吉事多便利店"},
                    {name:"家乐福",distance:"2095",address:"政务区家乐福吉事多便利店"},
                    {name:"家乐福",distance:"2095",address:"政务区家乐福吉事多便利店"},
                    {name:"家乐福",distance:"2095",address:"政务区家乐福吉事多便利店"},
                    {name:"家乐福",distance:"2095",address:"政务区家乐福吉事多便利店"}
                ],
                markers: [{
                    currentTab:'0',
                    iconPath:require('../img/mapPos.png'),
                    id: 0,
                    longitude: 113.324520,
                    latitude: 23.099994,
                    width: 40,
                    height: 40,
                    callout:{
                        content:"置地广场（吉事多便利店）\n营业时间12:00-21:00\n距您295m | 政务区置地广场吉事多便利店",
                        color:"#333333",
                        fontSize:12,
                        borderRadius:5,
                        bgColor:"#ffffff",
                        display:"BYCLICK",
                        boxShadow:"2px 2px 10px #aaa",
                        padding:8
                    }
                },{
                    currentTab:'1',
                    iconPath:require('../img/position.png'),
                    id: 1,
                    longitude: 113.324520,
                    latitude: 23.099294,
                    width: 50,
                    height: 50,
                    callout:{
                        content:"置地广场（吉事多便利店）\n营业时间12:00-21:00\n距您295m | 政务区置地广场吉事多便利店",
                        color:"#333333",
                        fontSize:12,
                        borderRadius:5,
                        bgColor:"#ffffff",
                        display:"BYCLICK",
                        boxShadow:"2px 2px 10px #aaa",
                        padding:8
                    }
                }]
            };
        },
        methods:{
            saveAddress:function(){
                if(this.checkedRadio==-1){
                    return false;
                }
                console.log("保存用户地址")
            },
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
                console.log(e.mp.markerId);
            },
            async init () {
                let result = await this.map.getLocation();
                this.latitude=result.latitude;
                this.longitude=result.longitude;
            }
        },
        created(){
           this.init()
        },
        watch:{
            searchName:function(){
                console.log("当前搜索值为:"+this.searchName)
            }
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
        height: 40pt;
        width: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        margin-top: -10px;
        position: absolute;
    }
    .shop-tab view{
        color: #111111;
        font-size: 16pt;
        font-weight: 400;
        font-family:PingFang-SC-Bold,PingFang-SC;
        width: 50%;
        text-align: center;
        background-color: #d9d9d9;
        height: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .shop-tab .bacColor{
        font-weight: 700 !important;
        background-color: #ffffff !important;
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
    .select-shop-Map .footer-btn{
        width: 100%;
        height: 70pt;
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
        height: 49px;
        line-height: 49px;
    }
    .select-shop-Map .search-input{
        position: absolute;
        width: 96%;
        left: 2%;
        background-color: rgba(255, 255, 255, 0.6);
        height: 35pt;
        border-radius: 5pt;
        background-image: url("../img/search.png");
        background-repeat: no-repeat;
        background-size: 20pt;
        background-position-x: 95%;
        background-position-y: 7.5pt;
    }
    .select-shop-Map .placeholder-class{
        color: #CCCCCC;
        font-size: 16pt;
        margin-left: 15px;
    }
    .select-shop-Map .search-content>view{
        height: auto;
        width: 96%;
        margin-left: 2%;
    }
    .select-shop-Map .search-content{
        position: absolute;
        height: 260pt;
        width: 96%;
        overflow-y: auto;
        overflow-x: hidden;
        left: 2%;
        border-radius: 12pt 12pt 0 0;
        box-shadow: 0 5px 10px #888888;
        background-color: #F0F0F0;
        z-index: 10;
    }
    .select-shop-Map .disabled{
        background:rgba(221,221,221,1) !important;
        color: #BBBBBB !important;
    }
</style>
