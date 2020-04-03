<!--suppress ALL -->
<template>
    <ul class="recommendProducts">
        <li v-for="product in goods" :key="product.id">
            <img class="thumb" :src="product['main_image']" alt="">
            <h3>{{product.name}}</h3>
            <div class="info">
                <span>销量 {{product['sell_num']}}</span>
                <span>库存 {{product['stock']}}</span>
            </div>
            <div class="price">
                <em>￥</em>
                <h4>{{product.price}}</h4>
                <span>￥{{product['origin_price']}}</span>
                <img src="../../static/icons/add.png" @click="addToCart(product['product_entities'][0]['product_stock_id'])" alt="">
            </div>
        </li>
    </ul>
</template>

<script>
	export default {
		name: 'recommendProducts',
        computed: {
            goods(){
                console.log(this.model.user.store.goods, 'MMMMMMMMMMMMMMM');
                return this.model.user.store.goods
            },
        },
        watch: {

        },
        methods: {
		    addToCart (id) {
		        this.$emit('addToCart', id)
            }
        }
	}
</script>

<style scoped>
    .recommendProducts{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .recommendProducts li{
        width: 348rpx;
        height: 500rpx;
        box-sizing: border-box;
        margin-right: 14rpx;
        border-radius: 25rpx;
        background: #fff;
        padding: 20rpx;
        margin-bottom: 14rpx;
    }
    .recommendProducts li:nth-child(2n){
        margin-right: 0;
    }

    .recommendProducts li .thumb{
        width: 308rpx;
        height: 308rpx;
        display: block;
    }

    .recommendProducts li h3{
        margin: 16rpx 0;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 32rpx;
        color: #111;
    }

    .recommendProducts li .info{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .recommendProducts li .info span{
        width: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 22rpx;
        color: #757575;
    }

    .recommendProducts li .price{
        margin-top: 10rpx;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        position: relative;
    }

    .recommendProducts li .price em{
        font-weight: bold;
        font-size: 24rpx;
        color: #FC3C2F;
        transform: translateY(-5rpx);
    }

    .recommendProducts li .price h4{
        font-weight: bold;
        font-size: 32rpx;
        color: #FC3C2F;
        margin: 0;
    }

    .recommendProducts li .price span{
        font-size: 22rpx;
        color: #999;
        text-decoration: line-through;
        margin-left: 12rpx;
    }

    .recommendProducts li .price img{
        width: 48rpx;
        height: 48rpx;
        position: absolute;
        right: 0;
    }
</style>
