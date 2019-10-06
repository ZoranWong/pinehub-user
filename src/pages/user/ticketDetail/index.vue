<!--suppress ALL -->
<template>
	<div class="coupon-wrapper">
		<mp-title :title="title"></mp-title>
        <div class="coupons_item" >
            <div class="left">

            </div>
            <div class="right">
                <div class="name">
                    <h4>【{{detail.typeDesc}}】</h4>
                    <span>{{detail.title}}</span>
                </div>
                <div class="price">
                    <h4>￥{{detail.benefit}}</h4>
                </div>
                <div class="coupon_info">使用门槛：暂无数据暂无数据暂无数据暂无数据</div>
                <div class="coupon_info">暂无数据暂无数据暂无数据暂无数据暂无数据</div>
                <div class="coupon_info">有效期：{{detail.validTime}}</div>
                <div class="coupon_info">暂无数据暂无数据暂无数据暂无数据</div>
            </div>
        </div>
        <div class="integral_item_info">
            <h4>优惠说明</h4>
            <span>价值8元的商品抵扣券，适用商品直接抵扣</span>
        </div>
        <div class="integral_item_info">
            <h4>使用说明</h4>
            <span>可与其他优惠券共享</span>
        </div>
        <div class="integral_item_info">
            <h4>适用商品</h4>
            <span>枣泥蛋糕、抹茶蛋糕、芝士蛋糕、青松功夫蛋糕、博士馒头、培根三明治</span>
        </div>
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
                detail : {}
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
			this.detail = this.$route.query['detail'];
			let beginTime = ticket['valid_at'].replace(/-/g, '.');
			let endTime =  ticket['invalid_at'].replace(/-/g, '.');
			this.detail.validTime = `${beginTime}-${endTime}`;
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #f2f2f2;
	}

    .coupon-wrapper{
        box-sizing: border-box;
        background: #f2f2f2;
        padding: 20rpx;

    }

    .coupon-wrapper .coupons_item{
        width: 100%;
        border-radius: 10rpx;
        box-sizing: border-box;
    }

    .coupon-wrapper .coupons_item{
        width: 100%;
        background: #fff;
        margin-bottom: 20rpx;
        box-sizing: border-box;
        padding: 30rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .coupon-wrapper .coupons_item .left{
        width: 266rpx;
        height: 180rpx;
        background: #83DF50;
        margin-right: 35rpx;
    }

    .coupon-wrapper .coupons_item .right{
        flex: 1;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .coupon-wrapper .coupons_item .right .name {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .coupon-wrapper .coupons_item .right .name h4{
        font-size: 32rpx;
        font-weight: bold;
        color: #111111;
    }

    .coupon-wrapper .coupons_item .right .name span{
        font-size: 32rpx;
        color: #111111;
    }

    .coupon-wrapper .coupons_item .right .price {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .coupon-wrapper .coupons_item .right .price h4{
        font-weight: bold;
        font-size: 36rpx;
        color: #ffcc00;
    }

    .coupon-wrapper .coupons_item .right .price span {
        font-size: 28rpx;
        color: #ffcc00;
        text-decoration: underline;
    }

    .coupon-wrapper .coupons_item .coupon_info{
        font-size: 24rpx;
        color: #757575;
        margin-top: 20rpx;
        width: 350rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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


</style>
