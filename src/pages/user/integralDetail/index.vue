<!--suppress ALL -->
<template>
	<div id="integral_detail" v-if="detailData">
		<mp-title :title="title"></mp-title>
        <div class="integral_item" >
            <div class="left">
                <div class="empty"></div>
            </div>
            <div class="right">
                <h3>
                    【{{detailData.type}}】
                    <span>{{detailData.name}}</span>
                </h3>
                <h4>￥{{detailData.benefit}}</h4>
                <img src="../../../../static/images/position.png" alt="">
                <div class="needScore">
                    <div class="left_text">{{pv}}</div>
                    <div class="right_text">
                        积分
                    </div>
                </div>
            </div>
        </div>
        <div class="integral_item_info">
            <h4>价值</h4>
            <span>{{detailData.benefit}}元</span>
        </div>
        <div class="integral_item_info">
            <h4>有效日期</h4>
            <span>{{detailData['valid_time']}}</span>
        </div>
        <div class="integral_item_info">
            <h4>使用说明</h4>
            <span>{{detailData.description}}</span>
        </div>
        <button class="exchange" @click="exchange">立即兑换</button>
	</div>

</template>
<script>
    import MpTitle from '../../../components/MpTitle';
	export default {
		components: {
			'mp-title': MpTitle
		},
		data() {
			return {
				title: '卡券详情',
                pv:'',
			};
		},
		watch: {
		},
		computed: {
			detailData () {
				console.log(this.model.integral.detail.detailData, 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDetail');
				return this.model.integral.detail.detailData
            }
		},
		methods: {
			exchange () {
				this.$command('EXCHANGE_PRODUCTS', 71)
            }
		},
		created() {

		},
		mounted() {
			let id = this.$route.query['id'];
			this.pv = this.$route.query['pv'];
			this.$command('LOAD_INTEGRAL_DETAIL', id)
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #f2f2f2;
	}

    .integral_item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 326rpx;
        padding: 20rpx;
        padding-bottom: 0;
        box-sizing: border-box;
    }

    .integral_item .left {
        width: 30 rpx;
        height: 100%;
        background: #ffcc00;
        display: flex;
        align-items: center;
        border-radius: 10rpx 0 0 10rpx;
    }

    .integral_item .left .empty {
        width: 30rpx;
        height: 30rpx;
        border-radius: 50%;
        background: #f2f2f2;
        transform: translateX(-15rpx);
    }

    .integral_item .right{
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

    .integral_item .right h3{
        font-size: 32rpx;
        color: #111111;
        font-weight: bold;
    }

    .integral_item .right span {
        font-size: 32rpx;
        color: #111111;
        font-weight: normal;
    }

    .integral_item .right h4{
        font-size: 36rpx;
        color: #111111;
        font-weight: bold;
        margin-bottom: 45rpx;
    }

    .integral_item .right img {
        width: 289rpx;
        height: 181rpx;
        position: absolute;
        right: 15rpx;
        bottom: 22rpx;
    }

    .integral_item .right .needScore{
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

    .integral_item .right .needScore .left_text{
        font-size: 52rpx;
        font-weight: bold;
        color: #111111;
        margin-right: 5rpx;
    }

    .integral_item .right .needScore .right_text {
        font-size: 16rpx;
        color: #111111;
        width: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .integral_item_info{
        width: 100%;
        box-sizing: border-box;
        text-align: left;
        margin:  50rpx 0;
        padding: 0 40rpx;
    }

    .integral_item_info h4{
        font-size: 28rpx;
        color: #111;
        font-weight: normal;
        margin-bottom: 15rpx;
    }

    .integral_item_info span {
        font-size: 26rpx;
        color: #757575;
    }

    #integral_detail .exchange{
        box-sizing: border-box;
        width: 710rpx;
        position: fixed;
        bottom: 10rpx;
        left: 20rpx;
        height: 80rpx;
        border-radius: 10rpx;
        background: #ffcc00;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36rpx;
        color: #111111;
    }

    button:after{
        border: none;
    }

</style>
