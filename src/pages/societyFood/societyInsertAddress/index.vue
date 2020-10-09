<!--suppress ALL -->
<template>
    <div>
        <CustomHeader title="社会餐新增地址" :needReturn="true" />
        <div class="insert-society-address" :style="{'height': mapHeight + 'px'}">
            <map class="address-map" :longitude="longitude" :latitude="latitude" scale="13" show-location></map>
            <input type="text" v-if="showMapInput" placeholder-class="placeholder-class" placeholder-style="padding-left:10px" :style="{'top': (imgHeight+15) + 'px'}" v-model="searchName" class="search-input" placeholder="请输入地点名称">
            <view class="search-map-content" v-if="showMapInput && searchMapAddressList.length>0">
                <view v-for="(item,index) in searchMapAddressList" :key="index" style="margin-top: 20px" @click="selectedPos(item)">
                    <view style="color: #333333;font-size: 12pt;font-weight: 500;">{{item.title}}</view>
                    <view>
                        <label style="color: #333333;font-size: 11pt;font-weight: 400;letter-spacing: 1px">{{"距您"+item.distance+"m"}}</label>
                        <label style="color: #999999;margin-left: 5px;margin-right: 5px">|</label>
                        <label style="color: #999999;font-size: 11pt;font-weight: 400;">{{item.address}}</label>
                    </view>
                </view>
            </view>
            <view v-if="!showMapInput" class="society-address" :style="{'height': (mapHeight-150) + 'px'}">
                <view class="selected-map-show" v-if="!mapTitle">
                    <view class="map-btn">
                        <span @click="selectMapPoint">选择收货地址</span>
                        <img class="img" alt="" src="../../../../static/icons/yellowArrow.png">
                    </view>
                </view>
                <view class="selected-map-show" v-else style="justify-content: left">
                    <view style="margin-left: 2%">
                        <view style="color: #333333;font-size: 12pt;font-weight: 500;">{{mapTitle}}</view>
                        <view style="color: #999999;font-size: 11pt;">{{mapAddress}}</view>
                    </view>
                </view>
                <view class="detail-map-write">
                    <view>
                        <view class="address-title">门牌号</view>
                        <input v-model="houseNumber" placeholder-style="padding-left:2px;color: #999999;" placeholder="详细地址,例1层101"/>
                    </view>
                    <view>
                        <view class="address-title">标签</view>
                        <view class="btn" :class="{'tag':selectedTag=='1'}" @click="selectedBtn('1')">家</view>
                        <view class="btn" :class="{'tag':selectedTag=='1'}" @click="selectedBtn('2')">公司</view>
                        <view class="btn" :class="{'tag':selectedTag=='1'}" @click="selectedBtn('3')">学校</view>
                    </view>
                    <view>
                        <view class="address-title">联系人</view>
                        <input v-model="contactsPeople" placeholder-style="padding-left:2px;color: #999999;" placeholder="请填写收货人姓名"/>
                    </view>
                    <view>
                        <view class="address-title">性别</view>
                        <radio :value="sex" :checked="sex=='0'" color="#ffcc00" @click="sexSet('0')">先生</radio>
                        <radio style="margin-left: 15px" :value="sex" :checked="sex=='1'" color="#ffcc00" @click="sexSet('1')">女士</radio>
                    </view>
                    <view>
                        <view class="address-title">手机号</view>
                        <input v-model="telephone" placeholder-style="padding-left:2px;color: #999999;" placeholder="请填写收货人手机号"/>
                    </view>
                    <view style="justify-content: center;margin-top: 5px">
                       <button style="width: 96%;line-height: 40px;height: 40px">保存地址</button>
                    </view>
                </view>
            </view>
        </div>
    </div>

</template>
<script>
    import CustomHeader from '../../../components/CustomHeader';
    import Public from "../js/Public";
    export default {
        name:"societyOrderDetail",
        mixins:[Public],
        components: {
            CustomHeader
        },
        data () {
            return {
                houseNumber:"",
                addressLabel:"",
                contactsPeople:"",
                sex:"0",
                telephone:"",
                screenWitdh: 0,
              rpxRate: 1,
                screenHeight: 0,
                longitude:'',
                latitude:'',
                searchName:"",
                searchMapAddressList:[],
                mapTitle:"",
                mapAddress:"",
                selectedTag:"",
                showMapInput:false
            };
        },
        computed: {
            mapHeight(){
                let BarHeight=this.model.global.barHeight.statusBarHeight+this.model.global.barHeight.navHeight;
                let height=wx.getSystemInfoSync().windowHeight;
                return height-BarHeight;
            }
        },
        methods: {
            sexSet:function(sign){
                this.sex=sign;
            },
            selectedBtn:function(sign){
                if(this.selectedTag==sign){
                    this.selectedTag="";
                    return false;
                }
                this.selectedTag=sign;
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
            async searchMapAddress(){
                this.searchMapAddressList=[];
                let result=await this.map.getSuggestion(this.searchName);
                if(result){//姚公庙
                    for (let i = 0; i <result.length ; i++) {
                        let lat=result[i].location.lat;
                        let lng=result[i].location.lng;
                        result[i]["distance"]=this.distance(lat,lng);
                    }
                    this.searchMapAddressList=result;
                }
            },
            selectedPos:function (item) {
                this.latitude=item.location.lat;
                this.longitude=item.location.lng;
                this.mapTitle=item.title;
                this.mapAddress=item.address;
                this.showMapInput=false;
            },
            selectMapPoint:function () {
                this.showMapInput=true;
            }
        },
        mounted () {
            this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
            this.screenWitdh = wx.getSystemInfoSync().windowHeight;
            this.screenHeight = (this.rpxRate * this.screenWitdh);
            let height=wx.getSystemInfoSync().windowHeight;
            wx.getLocation({
                type: 'wgs84',
                success: (res)=> {
                    this.latitude=res.latitude;
                    this.longitude=res.longitude;
                }
            })
        },
        watch:{
            searchName:function(){
                if(!this.searchName){
                    this.searchMapAddressList=[];
                    return false;
                }
                this.searchMapAddress();
            }
        }
    }
</script>

<style scoped>
    .address-map{
        width: 100%;
        height: inherit;
    }
    .placeholder-class{
        color: #CCCCCC;
        font-size: 15px;
    }
    .search-input{
        position: absolute;
        width: 96%;
        left: 2%;
        background-color: rgba(223, 223, 223, 0.6);
        height: 35px;
        border-radius: 10pt;
        background-image: url("../img/search.png");
        background-repeat: no-repeat;
        background-size: 20px;
        background-position-x: 95%;
        background-position-y: 7.5px;
    }
    .insert-society-address .search-map-content>view{
        height: auto;
        width: 96%;
        margin-left: 2%;
    }
    .insert-society-address .search-map-content{
        position: absolute;
        height: 300pt;
        width: 94%;
        overflow-y: auto;
        overflow-x: hidden;
        left: 3%;
        box-shadow: 0px 0rpx 10rpx #b2b2b2;
        background-color: #ffffff;
        z-index: 10;
        bottom: 5px;
    }
    .society-address{
        position: absolute;
        width: 94%;
        overflow-y: auto;
        overflow-x: hidden;
        left: 3%;
        box-shadow: 0px 0rpx 10rpx #b2b2b2;
        background-color: #ffffff;
        z-index: 10;
        bottom: 5px;
    }
    .selected-map-show{
        width: 100%;
        height: 65px;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .selected-map-show .map-btn{
        width: 96%;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #ffcc00;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .selected-map-show .map-btn{
        color: #ffcc00;
        font-size: 14px;
    }
    .selected-map-show .map-btn .img{
        height: 10px;
        width: 8px;
        margin-left: 15px;
    }
    .detail-map-write{
        width: 100%;
        height: auto;
        width: 96%;
        margin-left: 2%;
        font-size: 14px;
    }
    .detail-map-write>view{
        justify-content: left;
        align-items: center;
        display: flex;
        width: 100%;
        height: 44px;
        font-size: 14px;
    }
    .detail-map-write>view button{
        background: -webkit-linear-gradient(left,#FDE068,#FFCC00);
        color: #333333;
    }
    .address-title{
        color: #333333;
        font-weight: 700;
        width: 60px;
        text-align: left;
        font-size: 14px;
    }
    .detail-map-write .btn{
        color: #333333;
        font-size: 14px;
        width: 50px;
        text-align: center;
        height: 25px;
        line-height: 25px;
        border: 1px solid #999999;
        border-radius: 5px;
        margin-right: 15px;
    }
    .detail-map-write .tag{
        color: #ffcc00 !important;
        border-color: #ffcc00 !important;
    }
</style>
