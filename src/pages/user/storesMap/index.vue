<!--suppress ALL -->
<template>
    <div id="location">
        <CustomHeader :title="title" :needReturn="true" />
        <div id="location_search" >
            <input id="location_search_input" v-model.trim="addressName" placeholder="请输入地点名称"/>
            <i class="iconfont search">&#xe65c;</i>
        </div>
        <div id="location_map">
            <map :id="checkId? 'map':'checkedMap'" scale="14" :latitude="latitude" :longitude="longitude" :markers="markers"
                 @markertap="bindmarkertap" show-location>
<!--                <cover-view id="custom_header" :style="{'background': 'linear-gradient(270deg,rgba(255,204,0,1),rgba(253,224,104,1))'}" >-->
<!--                    <cover-view  id="status_bar" :style="{'height': statusBarHeight + 'px'}" ></cover-view >-->
<!--                    <cover-view  id="nav_bar" :style="{'height': navHeight + 'px'}" >-->
<!--                        <cover-view  id="back_icon" @click="back">-->
<!--                            <i class="iconfont">&#xe679;</i>-->
<!--                        </cover-view >-->
<!--                        <cover-view  id="nav_title">-->
<!--                            {{title}}-->
<!--                        </cover-view >-->
<!--                    </cover-view >-->
<!--                </cover-view>-->
                <cover-view id="locatePosition" @click="nowLocation">
                    <!-- <cover-image style = "position: absolute;top: 0;left: 0;width: 100%;height: 100%;" ></cover-image> -->
                </cover-view>
            </map>
            <div id="location_points">
                <div id="location_points_header" :style="{'backgroundImage':'url(' + background + ')'}">
                    <span @click="changeBackground('left')">附近自提点</span>
                    <span @click="changeBackground('right')">常用自提点</span>
                </div>
                <ul id="location_points_list" v-if="position === 'right'">
                    <li v-for="item in commonlyMapPoints" :key="item.id" @click="checkPoint(item.id)" >
                        <div class="left">
                            <div class="top">
                                <h4>{{item.name}}</h4>
                                <span>距您当前位置{{item.distance}}米</span>
                            </div>
                            <div class="bottom">
                                {{item.address}}
                            </div>
                        </div>
                        <i class="iconfont right" v-if="checkId === item.id">&#xe656;</i>
                        <i class="iconfont right disSelected" v-else>&#xe6d7;</i>
                    </li>
                    <div class="empty_img" v-if="!commonPoints.length">
                        <img  src="../../../../static/images/empty/empty_point.jpg" alt="" id="empty">
                        <span>暂无自提点哦～</span>
                    </div>
                </ul>

                <ul id="location_points_list" v-if="position === 'left'">
                    <li v-for="item in nearbyMapPoints" :key="item.id" @click="checkPoint(item.id)">
                        <div class="left">
                            <div class="top">
                                <h4>{{item.name}}</h4>
                                <span>距您当前位置{{item.distance}}米</span>
                            </div>
                            <div class="bottom">
                                {{item.address}}
                            </div>
                        </div>
                        <i class="iconfont right" v-if="checkId === item.id">&#xe656;</i>
                        <i class="iconfont right disSelected" v-else>&#xe6d7;</i>
                    </li>
                    <div class="empty_img" v-if="!nearPoints.length">
                        <img  src="../../../../static/images/empty/empty_point.jpg" alt="" id="empty">
                        <span>暂无自提点哦～</span>
                    </div>
                </ul>
                <form report-submit="true" @submit="uploadFormId">
                    <button form-type="submit" class="confirmBtn" @click="payment" v-if="checkId">确定</button>
                </form>

            </div>
        </div>

    </div>
</template>

<script>
	import CustomHeader from '../../../components/CustomHeader';

	import _ from 'underscore';
	var amapFile = require('amap-wx');
	var markersData = [];
	let bg1 = require('./imgs/longBanner.jpg');
	let bg2 = require('./imgs/longBanner1.jpg');
    export default {
        components: {
			CustomHeader
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
                selectStoreId: null,
                markers: null,
				position: 'left',
				points: [],
				textData: {},
				nearPoints: [],
				commonPoints:[],
                checkId: '',
				barHeight: 0
            }
        },
        watch: {
			nearPoints: {
                deep: true,
                handler (points) {
                    this.markers = points.map((point) => {
						return this.marker(point);
                    });
                }
            }
        },
        // 算术方法
        computed: {
			commonlyMapPoints () {
				let points = this.model.user.map.commonlyMapPoints
				this.points = points;
				this.commonPoints = points;
				return points
			},
			nearbyMapPoints () {
				let points = this.model.user.map.nearbyMapPoints
				this.points = points;
				this.nearPoints = points;
				return points
			},
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			}
        },
        // 普通方法
        methods: {
			back(){
				this.$command('REDIRECT_TO','','back')
			},
			async uploadFormId (e) {
				let formId = e.mp.detail.formId;
				if (formId !== "the formId is a mock one"){
					await this.http.account.saveFormId(formId);
				} else {
					console.log('form id 不合法')
				}
			},
			checkPoint (id) {
				this.checkId = id;
				let data = this.points.filter(item => item.id === id)[0];
				this.latitude = data.position.coordinates[1];
				this.longitude = data.position.coordinates[0];
				this.markers = this.points.map((point) => {
					let showCallout = false
					if (point.id === id) {
						showCallout = true
					}
					return this.marker(point, showCallout);
				});
            },
			async changeBackground(position){
				if (position === 'left') {
					this.background = bg1;
					this.position = 'left';
					this.$command('LOAD_NEARBY',result[0],result[1])
				} else {
					let result = await this.map.getLocation();
					this.background = bg2;
					this.position = 'right';
					this.$command('LOAD_COMMONLY_USED', 'map')
				}
			},
			payment(){
				let data = this.points.filter(item => item.id === this.checkId)[0];
				console.log(data);
				this.$command('SELECTED_POINT_COMMAND', data)
				this.$command('REDIRECT_TO', 'user.order.payment', 'push', {
					query : {
						type : this.$route.query.type
                    }
                });
            },
            async flashLocation () {
                let result = await this.map.getLocation();
                this.latitude = result[1];
                this.longitude = result[0];
                this.$command('LOAD_NEARBY',result[0],result[1], this.$route.query.type);
				this.$command('LOAD_COMMONLY_USED', this.$route.query.type)
            },
            changeSendDate (e) {
                this.sendDate = e.target.value;
            },
            marker (store, callout = false) {
				let iconPath = store['is_open'] ? '/static/images/icon.jpg' : '/static/images/disabledIcon.jpg'
				let marker = {
                    iconPath: iconPath,
                    width: 42,
                    height: 50,
                    id: store.id,
                    longitude: store.position.coordinates[0],
                    latitude: store.position.coordinates[1],
                    title: store.name,
                    active: true
                };
                if (callout) {
                    marker['callout'] = {
                        content: `${store.name}  距您当前${store.distance}米 \n 营业时间 : ${store.time || '暂无'} \n 地址 :${store.address}`,
                        color: '#111',
                        fontSize: '11',
                        borderRadius: '5',
                        bgColor: '#ffffff',
                        padding: '10',
                        display: 'ALWAYS',
                        textAlign : 'left'
                    };
                }
                return marker;
            },
            nowLocation () {
                this.map.moveToLocation();
            },
            async bindmarkertap (e) {
				let id = e.mp.markerId;
				this.checkId = id;
				this.nearPoints.forEach(item=>{
					if(item.id === id){
					    this.changeBackground('left')
					}
				})
				this.markers = this.points.map((point) => {
					let showCallout = false
					if (point.id === id) {
						showCallout = true
                    }
					return this.marker(point, showCallout);
				});
				let data = this.points.filter(item => item.id === id)[0];
                this.latitude = data.position.coordinates[1];
                this.longitude = data.position.coordinates[0];
            },
            onSubmit () {
                let storeInfo = this.storeInfo;
                let route = this.$route.query['next_route'];
                this.$command('REDIRECT_TO', route, 'push', {
                    query: {
                        store_id: storeInfo.id,
                        activity_id: this.$route.query['activity_id']
                    }
                });
            },
			changeMarkerColor: function(data,i){
				var that = this;
				var markers = [];
				for(var j = 0; j < data.length; j++){
					if(j==i){
						data[j].iconPath = "/static/image/position.png"; //如：..­/..­/img/marker_checked.png
					}else{
						data[j].iconPath = "/static/image/nowposition.png"; //如：..­/..­/img/marker.png
					}
					markers.push(data[j]);
				}
				that.markers =  markers
			}
        },
        mounted () {
            this.flashLocation();
			this.$command('GET_BAR_HEIGHT')
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
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
        /*height: 100%;*/
        width: 100%;
        height: 500px;
        margin-top: -109rpx;
    }

    #map {
        height: 1014rpx;
        width: 100%;
    }

    #checkedMap {
        height: 1124rpx;
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
        background: #f2f2f2;
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
        top: 260rpx;
        z-index: 99999999;
    }

    #location_points{
        width: 100%;
        position: fixed;
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
        height: 400rpx;
        padding-bottom: 30rpx;
        max-height: 484rpx;
        overflow-y: auto;
    }

    #empty_list {
        width: 100%;
        height: 484rpx;
        font-size: 30rpx;
        color: #757575;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #location_points #location_points_list li{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx 40rpx;
        border-bottom: 2rpx solid #f2f2f2;
        position: relative;
    }

    #location_points #location_points_list li:last-child {
        border-bottom: 0;
    }

    #location_points #location_points_list li i{
        font-size: 48rpx;
        margin: 0 10rpx;
    }

    #location_points #location_points_list li i.disSelected {
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: #ccc;
        position: absolute;
        width: 108rpx;
        height: 108rpx;
        right: 0rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #location_points #location_points_list li span{
        display: inline-block;
        font-size: 24rpx;
        color: #757575;
        margin: 0 10rpx;
    }

    #location_points #location_points_list li .left{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    #location_points #location_points_list li .left .top{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #location_points #location_points_list li .left .top h4{
        font-size: 28rpx;
        color: #111111;
    }

    #location_points #location_points_list li .left .bottom {
        font-size: 28rpx;
        color: #111111;
    }

    #location_points #location_points_list li .right{
        position: absolute;
        width: 108rpx;
        height: 108rpx;
        right: 0rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
    }

    #location_points .confirmBtn{
        width: 100%;
        height: 110rpx;
        border-radius: 10rpx;
        background: #ffcc00;
        font-size: 36rpx;
        color: #111111;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    .empty_img{
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        flex-direction: column;
    }
    .empty_img img{
        width: 350rpx;
        height: 240rpx;
    }

    .empty_img span{
        color: #999;
        font-size: 32rpx;
        margin-bottom: 50rpx;
    }
</style>
