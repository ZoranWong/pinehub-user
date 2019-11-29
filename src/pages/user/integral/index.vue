<!--suppress ALL -->
<template>
    <div>
        <CustomHeader :title="title" :needReturn="true" />
        <div id="integral">
            <scroll-view
                id="integral_list"
                :style="{height: (screenHeight  - (statusBarHeight + navHeight) - 180) + 'rpx'}"
                :scroll-y="1"
                @scrolltolower="scrolltolower"
            >
                <div class="integral_list_item" v-for="item in integralProducts" :key="item.data.id">
                    <div class="left">
                        <div class="empty"></div>
                    </div>
                    <div class="right">
                        <h3>
                            【{{item.data.type}}】
                            <span>{{item.data.name}}</span>
                        </h3>
                        <h4 v-if="item.data.type === '现金券'">￥{{item.data.benefit}}</h4>
                        <h4 v-else>{{item.data.benefit}}折</h4>
                        <div class="operation">
                            <span @click="jump('user.integral.detail',item.data.id,item.id,item.pv)">卡券详情</span>
                            <span @click="exchange(item)">立即兑换</span>
                        </div>
                        <img :src="item.data.banner" alt="">
                        <div class="needScore">
                            <div class="left_text">{{item.pv}}</div>
                            <div class="right_text">
                                积分
                            </div>
                        </div>
                    </div>
                </div>

            </scroll-view>
            <div id="my_integral">
                <span>{{userInfo.availableScore}} 积分</span>
                <h3 @click="jump('user.integral.records')">
                    积分记录
                    <i class="iconfont">&#xe6a3;</i>
                </h3>
            </div>
        </div>
    </div>

</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';
	export default {
		components: {
			CustomHeader
		},
		data() {
			return {
				title: '积分商城',
				screenHeight: 0,
				rpxRate: 1,
				screenWitdh: 0
			};
		},
		watch: {

		},
		computed: {
			integralProducts(){
				return this.model.integral.integralProducts
            },
			totalNum() {
				return this.model.integral.totalNum
			},
			nextPage() {
				return this.model.integral.currentPage + 1;
			},
			isLoadedAll() {
				return this.model.integral.isLoadedAll
			},
			userInfo () {
				return this.model.account.userInfo;
			},
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			}
		},
		methods: {
			loadProducts (page) {
				this.$command('LOAD_INTEGRAL_MALL',page)
            },
			scrolltolower() {
				if(!this.isLoadedAll) {
					this.loadProducts(this.nextPage);
				}
			},
			jump (router,id,couponId,pv) {
				this.$command('REDIRECT_TO', router, 'push', {query: {id,couponId,pv}});
			},
			exchange(item){
				if (this.userInfo.availableScore < item.pv) {
					wx.showToast({
						title: '积分不足',
						icon: 'none'
					});
                } else {
					this.$command('EXCHANGE_PRODUCTS',item.id, item.pv)
                }
            }
		},
		created() {
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);
		},
		mounted() {
			this.loadProducts(1)
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #f2f2f2;
	}

    #integral{
        box-sizing: border-box;
        width: 100%;
    }

    #integral #integral_list {
        width: 100%;
    }

    #integral #integral_list .integral_list_item{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 326rpx;
        box-sizing: border-box;
        padding: 20rpx;
        margin-bottom: 20rpx;
    }

    #integral #integral_list .integral_list_item .left{
        width: 30rpx;
        height: 100%;
        background: #ffcc00;
        display: flex;
        align-items: center;
        border-radius: 10rpx 0 0 10rpx;
    }

    #integral #integral_list .integral_list_item .left .empty{
        width: 30rpx;
        height: 30rpx;
        border-radius: 50%;
        background: #f2f2f2;
        transform: translateX(-15rpx);
    }

    #integral #integral_list .integral_list_item .right{
        box-sizing: border-box;
        padding: 50rpx 0;
        padding-left: 30rpx;
        height: 100%;
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        background: #fff;
        border-radius: 0 10rpx 10rpx 0;
    }

    #integral #integral_list .integral_list_item .right h3{
        font-size: 32rpx;
        color: #111111;
        font-weight: bold;
    }

    #integral #integral_list .integral_list_item .right h3 span {
        font-size: 32rpx;
        color: #111111;
        font-weight: normal;
    }

    #integral #integral_list .integral_list_item .right h4{
        font-size: 36rpx;
        color: #111111;
        font-weight: bold;
        margin-bottom: 45rpx;
    }

    #integral #integral_list .integral_list_item .right .operation{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #integral #integral_list .integral_list_item .right .operation span{
        font-size: 28rpx;
        color: #757575;
        text-decoration: underline;
        margin-right: 50rpx;
    }

    #integral #integral_list .integral_list_item .right img{
        width: 244rpx;
        height: 151rpx;
        position: absolute;
        right: 15rpx;
        bottom: 22rpx;
    }

    #integral #integral_list .integral_list_item .right .needScore{
        width: 100rpx;
        height: 100rpx;
        position: absolute;
        right: 0;
        top: 0;
        background-image: url("../../../../static/images/background/score.jpg");
        background-size: 100rpx 100rpx;
        background-position: center center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #integral #integral_list .integral_list_item .right .needScore .left_text{
        font-size: 52rpx;
        font-weight: bold;
        color: #111111;
        margin-right: 5rpx;
    }

    #integral #integral_list .integral_list_item .right .needScore .right_text{
        font-size: 16rpx;
        color: #111111;
        width: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

   #my_integral{
        width: 100%;
        height: 98rpx;
        box-sizing: border-box;
        padding: 0 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #1a1a1a;
        position: fixed;
        bottom: 0;
    }

     #my_integral span {
        font-size: 36rpx;
        color: #fff;
    }

     #my_integral h3 {
        font-size: 32rpx;
        color: #ffcc00;
        font-weight: normal;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #my_integral h3 i{
        font-size: 32rpx;
        color: #ffcc00;
        margin-left: 13rpx;
    }

</style>
