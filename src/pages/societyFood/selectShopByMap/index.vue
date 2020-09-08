<template>
    <div class="select-shop-Map">
        <div id="status_bar" :style="{'height': statusBarHeight + 'px'}" ></div>
        <div id="nav_bar" :style="{'height': navHeight + 'px'}" >
            <div class="back-icon" @click="backPage">
                <img class="leftArrow" src="../../../../static/icons/leftArrow.png" alt="">
            </div>
        </div>
        <map id="shopMap" :longitude="longitude" :latitude="latitude" scale="13" :markers="markers" @markertap="markertap" @regionchange="regionchange"  @end="regionchange" show-location></map>
        <input type="text" placeholder-class="placeholder-class"  placeholder-style="padding-left:10px" :style="{'top': (imgHeight+15) + 'px'}" v-model="searchName" class="search-input" placeholder="请输入地点名称">
        <view class="search-content" :style="{'top': (imgHeight+55) + 'px'}" v-if="showSearchContent">
            <view v-for="(item,index) in searchAddressList" :key="index" style="margin-top: 20px" @click="selectedPos(item.location)">
                <view style="color: #333333;font-size: 12pt;font-weight: 500;">{{item.title}}</view>
                <view>
                    <label style="color: #333333;font-size: 11pt;font-weight: 400;letter-spacing: 1px">{{"距您"+item.distance+"m"}}</label>
                    <label style="color: #999999;margin-left: 5px;margin-right: 5px">|</label>
                    <label style="color: #999999;font-size: 11pt;font-weight: 400;">{{item.address}}</label>
                </view>
            </view>
        </view>
        <view class="shop-tab">
            <view @click="changeAddressList('0')" style="border-radius: 13pt 0 0 0" :class="{'bacColor':showNearby}">附近门店</view>
            <view @click="changeAddressList('1')" style="border-radius: 0 13pt 0 0" :class="{'bacColor':!showNearby}">常用门店</view>
        </view>
        <view class="shop-address-list">
            <view class="shop-address-tab" v-for="(item,index) in addressList" :key="index">
                <view class="left">
                    <view style="color: #333333;font-size: 16px;font-weight: 700">{{item.shops.shop_name}}</view>
                    <view>
                        <label style="color: #333333;font-size: 12px;font-weight: 400;letter-spacing: 1px">{{"距您"+item.shops.distance+"m"}}</label>
                        <label style="color: #999999;margin-left: 5px;margin-right: 5px">|</label>
                        <label style="color: #999999;font-size: 12px;font-weight: 400;">{{item.shops.shop_address}}</label>
                    </view>
                </view>
                <i-radio class="right" :color="color" :checked="checkedRadio==index" @change="handleRadioChange(index,item.shops.shop_id)"></i-radio>
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
                showSearchContent:false,
                checkedRadio:-1,
                currentShopId:"",
                longitude:'',
                latitude:'',
                color:"#FFCC00",
                showNearby:true,
                addressList:[],
                usedAddressList:[],
                markerIcon:require('../img/location.png'),
                initMarks:{currentTab:'0', iconPath:require('../img/mapPos.png'), id: 0, longitude:0, latitude: 0, width: 40, height: 40},
                markers: [],
                searchAddressList:[]
            };
        },
        methods:{
            saveAddress:function(){
                if(this.checkedRadio==-1){
                    return false;
                }
                // this.$command('REDIRECT_TO', 'index', 'reLaunch',{query:{shop_id:this.currentShopId}});
                this.$command('REDIRECT_TO', 'societyFood.fastFoot', 'push',{
                    query: {
                        shopId:this.currentShopId,
                    }
                });
            },
            changeAddressList:function(val){
                this.showNearby=val=='0'?true:false;
                this.checkedRadio=-1;
                this.initSearch();
            },
            handleRadioChange:function(index,shop_id){
                this.checkedRadio=index;
                this.currentShopId=shop_id;
            },
            handleChange:function(val){
                console.log("当前Tab:"+val.target.key)
            },
            backPage:function () {
                this.$command('REDIRECT_TO', '', 'back')
            },

            regionchange(e) {
                let causedBy=e.mp.causedBy;
                if(causedBy!="scale"){
                    this.getMapLocation();
                }
            },
            selectedPos:function(location){
                this.markers[0].latitude=location.lat;
                this.markers[0].longitude=location.lng;
                this.latitude=location.lat;
                this.longitude=location.lng;
                this.showSearchContent=false;
            },
            async getMapLocation(){
                let result = await this.map.getCenterLocation("shopMap");
                console.log("地图视野发生变化后的经纬度"+JSON.stringify(result));
                this.markers[0].latitude=result[1];
                this.markers[0].longitude=result[0];
                this.latitude=result[1];
                this.longitude=result[0];
            },
            async searchMapAddress(){
                this.searchAddressList=[];
                let result=await this.map.getSuggestion(this.searchName);
                if(result){//姚公庙
                    for (let i = 0; i <result.length ; i++) {
                        let lat=result[i].location.lat;
                        let lng=result[i].location.lng;
                        result[i]["distance"]=this.distance(lat,lng);
                    }
                    this.searchAddressList=result;
                }
            },
            distance:function(lat, lng) {
                var La1 = parseInt(this.latitude) * Math.PI / 180.0;
                var La2 = lat * Math.PI / 180.0;
                var La3 = La1 - La2;
                var Lb3 = parseInt(this.longitude) * Math.PI / 180.0 - lng * Math.PI / 180.0;
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
                s = s * 6378.137;//地球半径
                s = Math.round(s * 10000) / 10000;
                return Math.ceil(s);
            },
            markertap(e) {
                console.log("点击地图标记点"+JSON.stringify(e.mp));
            },
            initSearch:function(){
                let param={
                    status:this.showNearby?1:2,
                    lat:this.latitude,
                    lng:this.longitude
                }
                this.$command('SF_SHOP_LIST', param,this);
            },
            init () {
                this.latitude=this.$route.query.latitude;
                this.longitude=this.$route.query.longitude;
                this.initMarks.latitude=this.$route.query.latitude;
                this.initMarks.longitude=this.$route.query.longitude;
                this.initSearch()
            }
        },
        mounted(){
           this.init()
        },
        watch:{
            searchName:function(){
                if(!this.searchName){
                    this.showSearchContent=false;
                    this.searchAddressList=[];
                    return false;
                }
                this.searchMapAddress();
                this.showSearchContent=true;
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
    .select-shop-Map #shopMap{
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
        height: 35px;
        border-radius: 5pt;
        background-image: url("../img/search.png");
        background-repeat: no-repeat;
        background-size: 20px;
        background-position-x: 95%;
        background-position-y: 7.5px;
    }
    .select-shop-Map .placeholder-class{
        color: #CCCCCC;
        font-size: 15px;
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
