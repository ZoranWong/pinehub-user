<!--suppress ALL -->
<template>
    <div id="location" @click.stop="closeView">
        <CustomHeader :title="title" :needReturn="true"/>
        <div class="mainContainer" :style="{'height':  mainHeight + 'px' }">
            <div id="location_search">
                <input @click.stop="showView" id="location_search_input" v-model.trim="backfillValue"
                       placeholder="请输入地点名称"/>
                <i class="iconfont search">&#xe65c;</i>
            </div>
            <div id="location_map">
                <map
                    :id="checkId? 'map':'checkedMap'"
                    scale="14"
                    @regionchange="regionchange"
                    @begin="regionchangebegin"
                    @end="regionchangeend"
                    :enable-scroll="true"
                    :latitude="latitude"
                    :longitude="longitude"
                    :markers="markers"
                    @markertap="bindmarkertap"
                    show-location>
                    <cover-view id="locatePosition" @click="nowLocation">
                        <img hidden="true" src="../../../../static/images/icon/nowposition.png"></img>
                        <cover-image src="/static/images/icon/nowposition.png" style="   position: absolute;top: 0;left: 0;height: 50rpx;width: 50rpx"></cover-image>
                    </cover-view>
                </map>
                <div id="location_points">
                    <div id="location_points_header" :style="{'backgroundImage':'url(' + background + ')'}">
                        <span @click="changeBackground('left')">{{text}}</span>
                        <span @click="changeBackground('right')">常用自提点</span>
                    </div>
                    <div :style="{'height': listHeight + 'px'}">
                        <ul id="location_points_list" v-if="position === 'right'">
                            <li v-for="item in commonPoints" :key="item.id" @click="checkPoint(item)">
                                <div class="left">
                                    <div class="top">
                                        <h4>{{item.name}}</h4>
                                        <span>距您当前位置{{item.distance}}米</span>
                                    </div>
                                    <div class="bottom">
                                        {{item.address}}
                                    </div>
                                </div>
                                <i class="customIcon" v-if="checkId === item.id && isOpen">
                                    <i class="son">
                                        <div class="sonson"></div>
                                    </i>
                                </i>
                                <i class="customIcon disSelected" v-else> </i>
                            </li>
                            <div class="empty_img" v-if="!commonPoints.length">
                                <img src="/../../../../static/images/empty/empty_point.jpg" alt="" id="empty">
                                <span>暂无自提点哦～</span>
                            </div>
                        </ul>

                        <ul id="location_points_list" v-if="position === 'left'">
                            <li v-for="item in nearPoints" :key="item.id" @click="checkPoint(item)">
                                <div class="left">
                                    <div class="top">
                                        <h4>{{item.name}}</h4>
                                        <span>距您当前位置{{item.formatDistance}}</span>
                                    </div>
                                    <div class="bottom">
                                        {{item.address}}
                                    </div>
                                </div>
                                <i class="customIcon" v-if="checkId === item.id && isOpen">
                                    <i class="son">
                                        <div class="sonson"></div>
                                    </i>
                                </i>
                                <i class="customIcon disSelected" v-else> </i>
                            </li>
                            <div class="empty_img" v-if="!nearPoints.length">
                                <img src="../../../../static/images/empty/empty_point.jpg" alt="" id="empty">
                                <span>暂无自提点哦～</span>
                            </div>
                        </ul>
                    </div>

                    <div class="btnContainer" v-if="btnShow">
                        <form report-submit="true" @submit="uploadFormId">
                            <button form-type="submit" class="confirmBtn" @click="payment">确定</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>

        <!--        :class="showView? 'hidden':'viewcenter'"-->
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
        data() {
            return {
                background: bg1,
                title: '附近店铺/自提点',
                latitude: 0,
                longitude: 0,
                backfillValue: null,
                city: null,
                self: {},
                selectStoreId: null,
                markers: null,
                position: 'left',
                points: [],
                textData: {},
                nearPoints: [],
                commonPoints: [],
                checkId: '',
                barHeight: 0,
                isOpen: true,
                showview: false,
                suggestions: [],
                timer: null,
                text: '附近自提点'
            }
        },
        watch: {
            nearPoints: {
                deep: true,
                handler(points) {
                    this.markers = points.map((point) => {
                        return this.marker(point);
                    });
                }
            },
            backfillValue(val) {
                clearTimeout(this.timer)
                if (val) {
                    this.timer = setTimeout(() => {
                        this.handleSearch(val)
                        this.text = '搜索结果'
                    }, 1000)
                } else {
                    this.timer = setTimeout(() => {
                        this.handleSearch('')
                        this.text = '附近自提点'
                    }, 1000)
                }

            }
        },
        // 算术方法
        computed: {
            btnShow() {
                return this.checkId && this.isOpen
            },
            commonlyMapPoints() {
                let points = this.model.user.store.commonlyPoints
                this.points = points;
                this.commonPoints = points;
                return points
            },
            nearbyMapPoints() {
                let points = this.model.user.store.nearbyPoints;
                this.points = points;
                this.nearPoints = points;
                return points
            },
            statusBarHeight() {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight() {
                return this.model.global.barHeight.navHeight
            },
            headerHeight() {
                return this.statusBarHeight + this.navHeight;
            },
            superiorShopId() {
                return this.model.account.superiorShopId
            },
            mainHeight() {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight;
            },
            btnHeight() {
                let systemInfo = wx.getSystemInfoSync();
                return 90 * systemInfo.windowWidth / 750;
            },
            listHeight() {
                console.log(this.mainHeight, '-------- list height -------', this.mainHeight * 0.5, this.mainHeight * 0.5 * (1 - 0.13));
                return this.mainHeight * 0.5 * (1 - 0.13) - (this.btnShow ? this.btnHeight : 0);
            }
        },
        // 普通方法
        methods: {
            showView() {
                this.showview = true
            },
            closeView() {
                this.showview = false
            },
            async handleSearch(value) {
                let result = await this.map.getCenterLocation();
                this.$command('SEARCH_POINTS', this.myLatitude, this.myLongitude, this.$route.query.type, 1, value);
                this.changeBackground('left', true)
            },
            back() {
                this.$command('REDIRECT_TO', '', 'back')
            },
            regionchange(e) {
            },
            regionchangebegin(e) {

            },
            async regionchangeend(e) {
                let result = await this.map.getCenterLocation();
                this.$command('LOAD_NEARBY', result[0], result[1], this.$route.query.type, this.myLongitude, this.myLatitude);
                // this.$command('LOAD_COMMONLY_USED',result[0],result[1], this.$route.query.type)
            },
            async uploadFormId(e) {
                let formId = e.mp.detail.formId;
                if (formId !== "the formId is a mock one") {
                    await this.http.account.saveFormId(formId);
                } else {
                    console.log('form id 不合法')
                }
            },
            checkPoint(item) {
                let id = item.id;
                this.isOpen = item['open_preorder'];
                this.checkId = id;
                let data;
                if (this.position === 'left') {
                    data = this.nearPoints.filter(items => items.id === id)[0];
                    this.model.user.store.dispatch('saveFirstNearShop', {shop: data})

                } else {
                    data = this.commonPoints.filter(item => item.id === id)[0];
                    this.model.user.store.dispatch('saveFirstCommonShop', {shop: data})
                    // this.commonPoints = this.commonPoints.filter(item => item.id === id);
                    // this.commonPoints.unshift(data)
                }
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
            async changeBackground(position, isSearch = false) {
                if (position === 'left') {
                    let result = await this.map.getLocation();
                    this.background = bg1;
                    this.position = 'left';
                    if (!isSearch) {
                        this.$command('LOAD_NEARBY', result[0], result[1], this.$route.query.type, this.myLongitude, this.myLatitude)
                    }

                } else {
                    let result = await this.map.getLocation();
                    this.background = bg2;
                    this.position = 'right';
                    this.$command('LOAD_COMMONLY_USED', result[0], result[1], 'map')
                }
            },
            payment() {
                let data = this.points.filter(item => item.id === this.checkId)[0];
                console.log(data);
                this.$command('SELECTED_POINT_COMMAND', data)
                this.$command('REDIRECT_TO', 'user.order.payment', 'push', {
                    query: {
                        type: this.$route.query.type
                    }
                });
            },
            async flashLocation() {
                let result = await this.map.getLocation();
                this.latitude = result[1];
                this.longitude = result[0];
                this.myLatitude = result[1];
                this.myLongitude = result[0];
                console.log('1111');
                this.$command('LOAD_NEARBY', result[0], result[1], this.$route.query.type);
                this.$command('LOAD_COMMONLY_USED', result[0], result[1], this.$route.query.type)
            },
            changeSendDate(e) {
                this.sendDate = e.target.value;
            },
            marker(store, callout = false) {
                let iconPath = store['open_preorder'] ? '/static/images/icon.jpg' : '/static/images/disabledIcon.jpg'
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
                        content: `${store.name}  距您当前${store.formatDistance} \n 营业时间 : ${store.time || '暂无'} \n 地址 :${store.addrFormat}`,
                        color: '#111',
                        fontSize: '11',
                        borderRadius: '5',
                        bgColor: '#ffffff',
                        padding: '10',
                        display: 'ALWAYS',
                        textAlign: 'left'
                    };
                }
                return marker;
            },
            nowLocation() {
                this.map.moveToLocation();
            },
            async bindmarkertap(e) {
                let id = e.mp.markerId;
                this.checkId = id;
                this.nearPoints.forEach(item => {
                    if (item.id === id) {
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
            onSubmit() {
                let storeInfo = this.storeInfo;
                let route = this.$route.query['next_route'];
                this.$command('REDIRECT_TO', route, 'push', {
                    query: {
                        store_id: storeInfo.id,
                        activity_id: this.$route.query['activity_id']
                    }
                });
            },
            changeMarkerColor: function (data, i) {
                var that = this;
                var markers = [];
                for (var j = 0; j < data.length; j++) {
                    if (j == i) {
                        data[j].iconPath = "/static/image/position.png"; //如：..­/..­/img/marker_checked.png
                    } else {
                        data[j].iconPath = "/static/image/nowposition.png"; //如：..­/..­/img/marker.png
                    }
                    markers.push(data[j]);
                }
                that.markers = markers
            }
        },
        mounted() {
            this.flashLocation();
            this.$command('GET_BAR_HEIGHT');
        }
    }
</script>

<!--suppress CssInvalidPropertyValue -->
<style>
    page {
        height: 100%;
    }

    button:after {
        border: none;
    }

    #location {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
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
        z-index: 1;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20rpx;
        margin-top: 40rpx;
    }

    .research_suggests {
        width: 710rpx;
        box-sizing: border-box;
        position: absolute;
        left: 20rpx;
        top: 70rpx;
        background: #fff;
    }

    .suggestion {
        border-bottom: 1rpx solid #f2f2f2;
        padding: 5rpx 40rpx;
    }

    /*.suggestion:hover{*/
    /*    background: #FFCC00;*/
    /*}*/

    .suggestion:first-child {
        border-top: 1rpx solid #f2f2f2;
    }

    .research_suggests .item-title {
        font-size: 22rpx;
        color: #111111;
    }

    .research_suggests .item-addr {
        font-size: 18rpx;
        color: #757575;
    }

    #location_search_input {
        width: 710rpx;
        background: rgba(255, 255, 255, 0.7);
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

    .hidden {
        display: none;
    }

    .view-center {
        display: block
    }

    #location_map {
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
        /*height: 100%;*/
        width: 100%;
        height: 100%;
        /*margin-top: -110rpx;*/
    }

    #map {
        height: 50%;
        width: 100%;
    }

    #checkedMap {
        height: 50%;
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
        /*background: url(../../../../static/images/icon/nowposition.png) no-repeat center center;*/
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

    #location_points {
        width: 100%;
        height: 50%;
        /*position: fixed;*/
        /*bottom: 0;*/
    }

    #location_points #location_points_header {
        width: 100%;
        height: 13%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: 100%;
    }

    #location_points #location_points_header span {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111111;
    }

    #location_points #location_points_list {
        background: #fff;
        padding: 0 40rpx;
        /*height: 65%;*/
        padding-bottom: 30rpx;
        /*max-height: 484rpx;*/
        overflow-y: auto;
        height: 100%;
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

    #location_points #location_points_list li {
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

    /*#location_points #location_points_list li i{*/
    /*    font-size: 48rpx;*/
    /*    margin: 0 10rpx;*/
    /*    z-index: 111111;*/
    /*}*/


    #location_points #location_points_list li .customIcon {
        width: 40rpx;
        height: 40rpx;
        margin: 0 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: #fff;
        background: linear-gradient(to right, #FDE068, #FFCC00);
    }

    .son {
        width: 36rpx;
        height: 36rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: #fff;
    }

    .sonson {
        width: 20rpx;
        height: 20rpx;
        background: linear-gradient(to right, #FDE068, #FFCC00);
        border-radius: 50%;
    }

    #location_points #location_points_list li .customIcon.disSelected {
        width: 36rpx;
        height: 36rpx;
        border: 2rpx solid #ccc;
        background: #fff;
    }


    #location_points #location_points_list li span {
        display: inline-block;
        font-size: 24rpx;
        color: #757575;
        margin: 0 10rpx;
    }

    #location_points #location_points_list li .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        max-width: 540rpx;
    }

    #location_points #location_points_list li .left .top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #location_points #location_points_list li .left .top h4 {
        font-size: 28rpx;
        color: #111111;
    }

    #location_points #location_points_list li .left .bottom {
        font-size: 28rpx;
        color: #111111;
    }

    #location_points #location_points_list li .right {
        position: absolute;
        width: 108rpx;
        height: 108rpx;
        right: 0rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right, #FDE068, #FFCC00);
        -webkit-background-clip: text;
        color: transparent;
    }

    /*#location_points #location_points_list li i.disSelected {*/
    /*    z-index: 11111;*/
    /*    -webkit-background-clip: text;*/
    /*    color: #ccc;*/
    /*    position: absolute;*/
    /*    width: 108rpx;*/
    /*    height: 108rpx;*/
    /*    right: 0rpx;*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*    align-items: center;*/
    /*}*/

    .btnContainer {
        height: 20%;
    }

    #location_points .confirmBtn {
        width: 100%;
        border-radius: 10rpx;
        background: #ffcc00;
        font-size: 36rpx;
        color: #111111;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .threePartHeight {
        height: 75% !important;
    }

    .twoPartHeight {
        height: 85% !important;
    }


    .empty_img {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        flex-direction: column;
    }

    .empty_img img {
        width: 350rpx;
        height: 240rpx;
    }

    .empty_img span {
        color: #999;
        font-size: 32rpx;
        margin-bottom: 50rpx;
    }
</style>
