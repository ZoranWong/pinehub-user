<!--suppress ALL -->
<template>
    <div class="body">
        <CustomHeader :title="title" :needReturn="true" :back-color="'#fff'" />
        <div class="container" :style="{height: mainHeight + 'px'}">
            <ul v-if="cardDetails.length">
                <li v-for="(item,index) in cardDetails" :key="index">
                    <div class="left">
                        <h3>{{item.remark}}</h3>
                        <span>{{item['log_time']}}</span>
                    </div>
                    <h4>{{item['amount_desc']}}</h4>
                </li>
            </ul>
            <div class="empty" v-else>
                <span>暂无消费明细~</span>
                <img src="../../../../../static/images/empty/empty_coupon.jpg" alt="">
            </div>
        </div>

    </div>
</template>
<script>
	import CustomHeader from '../../../../components/CustomHeader';
    export default {
        name: 'Balance',
        data: function () {
          return {
              title: '消费明细',
          };
        },
        components: {
			CustomHeader
        },
        computed: {
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
                return height - this.headerHeight;
            },
            cardDetails () {
			    return this.model.account.cardDetails
            }
        },
        methods: {

        },
        mounted () {
            this.$command('LOAD_CARD_DETAILS', this.$route.query.id)
		}
	}
</script>
<style>

    .body{
        background-color: #fff;
    }

    .container{
        width: 100%;
    }

    .container ul{
        border-top: 20rpx solid #f2f2f2;
    }

    .container ul li{
        width: 100%;
        height: 150rpx;
        box-sizing: border-box;
        padding: 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2rpx solid #f2f2f2;
    }

    .container ul li .left{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }

    .container ul li .left h3{
        font-weight: bold;
        font-size: 28rpx;
        color: #111;
    }

    .container ul li .left span{
        font-size: 24rpx;
        color: #757575;
    }

    .container ul li h4{
        font-weight: bold;
        color: #FC3C2F;
        font-size: 32rpx;
    }

    .empty{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 150rpx;
    }

    .empty span{
        color: #999;
        font-size: 32rpx;
        margin-bottom: 50rpx;
    }

    .empty img{
        width: 374rpx;
        height: 288rpx;
    }




</style>
