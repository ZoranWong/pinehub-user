<!--suppress ALL -->
<template>
    <div id="location">
        <mp-title :title="title"></mp-title>
        <div id="location_search">
            <input id="location_search_input" v-model.trim="addressName" placeholder="请输入地点名称"/>
            <i class="iconfont search">&#xe65c;</i>
        </div>
        <div id="location_map">
            <map id="map" scale="14" :latitude="latitude" :longitude="longitude" :markers="markers"
                 @markertap="bindmarkertap" show-location>
                <cover-view id="send_time_select" v-if="show">
                    <cover-view class="top-part">
                        <cover-view class="select_li">
                            <cover-view class="select_li_title">自提点</cover-view>
                            <cover-view class="input">{{ storeAddress }}</cover-view>
                        </cover-view>
                        <cover-view class="select_li">
                            <cover-view class="select_li_title">营业时间</cover-view>
                            <cover-view class="input">{{ sendAt }}</cover-view>
                        </cover-view>
                    </cover-view>
                    <cover-view class="bottom-part">
                        <button class="cancel" @click="show = false">取消</button>
                        <button class="confirm" @click="onSubmit">确定</button>
                    </cover-view>
                </cover-view>
                <cover-view id="locatePosition" @click="nowLocation">
                    <!-- <cover-image style = "position: absolute;top: 0;left: 0;width: 100%;height: 100%;" ></cover-image> -->
                </cover-view>
            </map>
        </div>
        <div id="location_points">
            <div id="location_points_header" :style="{'backgroundImage':'url(' + background + ')'}">
                <span @click="changeBackground('left')">常用自提点</span>
                <span @click="changeBackground('right')">附近自提点</span>
            </div>
            <ul id="location_points_list">
                <li v-for="item in 3" :key="item">
                    <div class="left">
                        <h4>丹霞路店</h4>
                        <em>距您当前位置1000米</em>
                        <span>安徽省合肥市蜀山区丹霞路与翡翠路交口</span>
                    </div>
                    <div class="right"></div>
                </li>
                <button class="confirmBtn" @click="payment">确定</button>
            </ul>
        </div>
    </div>
</template>

<script>
    import MpTitle from '@/components/MpTitle';
    import _ from 'underscore';
	let bg1 = require('../../../../static/selfPoints/bg2.jpg');
	let bg2 = require('../../../../static/selfPoints/bg1.jpg');
    export default {
        components: {
            'mp-title': MpTitle
        },
        // 数据
        data () {
            return {
				background: bg1,
                title: '附近店铺/自提点',
                latitude: 0,
                longitude: 0,
                addressName: null,
                city: null,
                self: {},
                show: false,
                selectStoreId: null,
                markers: null
            }
        },
        watch: {
            stores: {
                deep: true,
                handler (stores) {
                    this.markers = stores.map((store) => {
                        return this.marker(store);
                    });
                }
            }
        },
        // 算术方法
        computed: {
            stores () {
                return this.$store.getters['model.stores/stores'];
            },
            storeInfo () {
                return this.selectStoreId ? this.$store.getters['model.stores/store'](this.selectStoreId) : null;
            },
            sendAt () {
                return this.storeInfo ? this.storeInfo.openingHours : '00:00 ～ 23:59';
            },
            storeAddress () {
                return this.storeInfo ? this.storeInfo.address : '未选择店铺';
            }
        },
        // 普通方法
        methods: {
			changeBackground(position){
				this.background = position === 'left'? bg1 : bg2;
			},
			payment(){
				this.$command('REDIRECT_TO', 'user.order.payment', 'push');
            },
            async flashLocation () {
                let result = await this.map.getLocation();
                this.latitude = result[1];
                this.longitude = result[0];
                this.$command('LOAD_STORES_AROUND', this.longitude, this.latitude);
            },
            changeSendDate (e) {
                this.sendDate = e.target.value;
            },
            marker (store, callout = false) {
                let marker = {
                    iconPath: '/static/images/position.png',
                    width: 42,
                    height: 56.4,
                    id: store.id,
                    longitude: store.lng,
                    latitude: store.lat,
                    title: store.name,
                    active: true
                };
                if (callout) {
                    marker['callout'] = {
                        content: store.name,
                        color: '#ff0000',
                        fontSize: '16',
                        borderRadius: '10',
                        bgColor: '#ffffff',
                        padding: '10',
                        display: 'ALWAYS'
                    };
                }
                return marker;
            },
            nowLocation () {
                this.map.moveToLocation();
            },
            async bindmarkertap (event) {
                this.selectStoreId = await event.mp.markerId;
                this.latitude = this.storeInfo['lat'];
                this.longitude = this.storeInfo['lng'];
                this.show = true;
            },
            onSubmit () {
                this.show = false;
                let storeInfo = this.storeInfo;
                let route = this.$route.query['next_route'];
                this.$command('REDIRECT_TO', route, 'push', {
                    query: {
                        store_id: storeInfo.id,
                        activity_id: this.$route.query['activity_id']
                    }
                });
            }
        },
        mounted () {
            this.flashLocation();
        }
    }
</script>

<!--suppress CssInvalidPropertyValue -->
<style>
    page {
        height: 100%;
    }

    button:after{
        border: none;
    }

    #location {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .bottom-part {
        display: flex;
    }

    .bottom-part button {
        width: 40%;
        line-height: 64rpx;
        font-size: 32rpx;
        background-color: #FFD000;
    }

    #location_search {
        width: 100%;
        height: 110rpx;
        z-index: 1;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    #location_search_input {
        width: 710rpx;
        background: rgba(255,255,255,0.7);
        font-size: 28rpx;
        font-weight: 200;
        border-radius: 10rpx;
        height: 70rpx;
        box-sizing: border-box;
        padding: 0 40rpx;
    }

    #location_search .search {
        position: absolute;
        right: 50rpx;
        z-index: 999;
        color: #535550;
        font-size: 36rpx;
    }

    #location_map {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    #map {
        height: 100%;
        width: 100%;
    }

    #send_time_select {
        position: absolute;
        width: 550rpx;
        top: 50%;
        left: 50%;
        margin-top: -150rpx;
        margin-left: -275rpx;
        border-radius: 20rpx;
        padding: 40rpx;
        background: #FFFFFF;
        box-sizing: border-box;
        overflow: hidden;
        z-index: 999;
    }

    .select_li {
        display: block;
        clear: both;
        height: 80rpx;
        line-height: 40rpx;
        font-size: 28rpx;
    }

    .select_li_title {
        background: #FECE00;
        color: #FFFFFF;
        float: left;
        font-size: 24rpx;
        font-weight: 200;
        height: 40rpx;
        line-height: 40rpx;
        padding: 0 10rpx;
        border-radius: 10rpx;
    }

    .select_li_smalltitle {
        background: #FAFAFA;
        color: #000000;
        float: left;
        font-size: 24rpx;
        font-weight: 200;
        height: 40rpx;
        line-height: 40rpx;
        padding: 0 10rpx;
        border-radius: 10rpx;
    }

    .input {
        float: left;
        padding: 0 15rpx;
        margin: 0 20rpx;
        border-radius: 10rpx;
    }

    #locatePosition {
        background: url(../../../../static/images/icon/nowposition.png) no-repeat center center;
        background-color: #FFFFFF;
        border-radius: 50%;
        width: 50rpx;
        height: 50rpx;
        background-size: 100%;
        position: absolute;
        left: 682rpx;
        top: 160rpx;
        z-index: 99999999;
    }

    #location_points{
        position: absolute;
        bottom: 0;
    }

    #location_points #location_points_header {
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: 100%;
    }

    #location_points #location_points_header span{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111111;
    }

    #location_points #location_points_list{
        background: #fff;
        padding: 0 40rpx;
        padding-bottom: 30rpx;
    }

    #location_points #location_points_list li{
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 30rpx 0;
        border-bottom: 2rpx solid #f2f2f2;
    }

    #location_points #location_points_list li:last-child {
        border-bottom: 0;
    }

    #location_points #location_points_list li .left{
        display: flex;
        flex-wrap: wrap;
        flex: 1;
    }

    #location_points #location_points_list li .left h4{
        margin: 0;
        font-size: 28rpx;
        color: #111111;
        font-weight: bold;
        margin-right: 15rpx;
    }

    #location_points #location_points_list li .left em{
        font-size: 24rpx;
        color: #757575;
    }

    #location_points #location_points_list li .left span{
        font-size: 28rpx;
        color: #111111;
    }

    #location_points #location_points_list li .right{
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
        background: #ffcc00;
    }

    #location_points #location_points_list .confirmBtn{
        width: 100%;
        height: 80rpx;
        border-radius: 10rpx;
        background: #ffcc00;
        font-size: 36rpx;
        color: #111111;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30rpx;

    }

</style>
