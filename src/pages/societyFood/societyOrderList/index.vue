<!--suppress ALL -->
<template>
	<div id="my_groupon">
        <CustomHeader :title="title" :needReturn="true" :backColor="'#fff'" :backUrl="true" @back="back"> </CustomHeader>
        <div id="tab_select" >
            <view class="page-section-spacing">
                <scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" enable-back-to-top="true" :style="{width: '900rpx' }">
                    <view :id="tab.key" class="scroll-view-item_H" v-for="tab in tabs" :class="{tab_select_now:statusType === tab.key}" :key="tab.key" @click="selectTab(tab.key,tab.name)">{{tab.name}}</view>
                </scroll-view>
            </view>
        </div>
        <div id="tab_content" :style="{'height': mainHeight + 'px'}">
            <div class="empty_img_groupon" v-if="ordersList.length==0">
                <img src="../../../../static/images/empty/empty_order.jpg" alt="" id="empty">
                <span>暂无订单哦～</span>
            </div>
            <div v-else>
                <SocietyOrders></SocietyOrders>
            </div>
        </div>
	</div>
</template>
<script>
    import CustomHeader from "../../../components/CustomHeader";
    import SocietyOrders from './SocietyOrders';
	export default {
		components: {
            CustomHeader,
            SocietyOrders
		},
		data() {
			return {
                title: '社会餐订单',
                statusType: 4,
                currentName:'全部订单',
                ordersList:[],
                tabs: [
                    {name: '全部', key: 4},
                    {name: '待支付', key: 0},
                    {name: '待配送', key: 1},
                    {name: '待自提', key: 2},
                    {name: '已完成', key: 3},
                ],
                screenHeight: 0,
                screenWitdh: 0,
                statusDesc: '待配送',
            };
		},
		computed: {
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
            headerHeight() {
                return this.statusBarHeight + this.navHeight;
            },
            mainHeight() {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight - this.btnHeight;
            },
            btnHeight() {
                let systemInfo = wx.getSystemInfoSync();
                return 88 * systemInfo.windowWidth / 750;
            }
		},
		methods: {
            selectTab (statusType) {
                this.statusType = statusType;
                let param={
                    status:statusType
                }
                this.$command('SF_MY_LIST',param,this);
            },
            back () {
                this.$command('REDIRECT_TO', '', 'back')
            }
		},
        mounted() {
		   this.selectTab(4);
        }
    }
</script>

<style scoped>
	page {
		height: 100%;
        overflow: hidden;
	}

    #tab_select {
        overflow: auto;
        width: 750rpx;
        height: 88rpx;
        z-index: 999;
        background: #fff;
    }

    .scroll-view_H .scroll-view-item_H{
        width: 150rpx;
        display: inline-block;
        height: 88rpx;
        background: #FFFFFF;
        text-align: center;
        line-height: 82rpx;
        font-size: 30rpx;
        font-weight: 800;
        color: #757575;
    }

    #tab_select .tab_select_now{
        position: relative;
        color: #FFCC00;
    }

    #tab_select .tab_select_now:after {
        content:  '';
        position: absolute;
        width:30rpx;
        height:6rpx;
        background:rgba(255,204,0,1);
        border-radius:3px;
        bottom: 14rpx;
        left: 66rpx;
    }

    #tab_content {
        width: 100%;
        position: relative;
        background: #f2f2f2;
        overflow: auto;
    }

    .empty_img_groupon{
        width: 100%;
        height: 700rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #f2f2f2;
        overflow: hidden;
        border-top: 20rpx solid #f2f2f2;
    }
    .empty_img_groupon img{
        width: 350rpx;
        height: 240rpx;
    }

    .empty_img_groupon span{
        color: #999;
        font-size: 32rpx;
        margin-bottom: 100rpx;
    }

    .order_container{
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx;
    }

</style>
