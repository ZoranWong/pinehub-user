<template>
    <div class="moduleProducts">
        <img :src="product.image" alt="" class="img">
        <div class="bottom">
            <div class="left">
                <h3>
                    <em>￥</em>
                    {{product['act_price']}}
                </h3>
            </div>
            <div class="right" @click.stop="goBuy(product)" v-if="hasStock">
                <img src="../../../../../static/icons/qiang.jpg" class="buyIcon" alt="">
            </div>
            <div class="right" @click.stop="noStock(product)" v-else >
                <img src="../../../../../static/icons/noStock.png"  class="buyIcon" alt="">
            </div>
        </div>
        <span class="underline" v-if="product['product_entity']">¥ {{product['product_entity']['retail_price']}}</span>
    </div>
</template>

<script>
    export default {
        name: "Module_Products",
        props: ['product'],
        methods: {
            goBuy (product) {
                this.$emit('goBuy', product)
            },
            noStock () {
                console.log('no stock');
            }
        },
        computed: {
            hasStock () {
                let product = this.product;
                let hasStock = true;
                if (product['has_sell_limit']) {
                    hasStock = product['last_num'] > 0 && product['in_stock'] > 0
                } else {
                    hasStock = product['in_stock'] > 0
                }
                return hasStock
            }
        }
    }
</script>

<style scoped>
    .moduleProducts .img{
        width: 196rpx;
        height: 180rpx;
        border-radius: 10rpx;
    }

    .moduleProducts .bottom{
        box-sizing: border-box;
        padding: 0 10rpx;
        margin-top: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .moduleProducts .bottom .left{
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }

    .moduleProducts .bottom .buyIcon{
        width: 48rpx;
        height: 48rpx;

    }

    .moduleProducts .bottom .right{
        width: 65rpx;
        height: 65rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 20rpx;
        right: 10rpx;
    }

    .moduleProducts .bottom .left h3{
        font-weight: bold;
        font-size: 32rpx;
        color: #FC3C2F;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .moduleProducts .bottom .left em{
        font-size: 24rpx;
        transform: translateY(-2rpx);
    }


    .productsContainer ul li .underline{
        display: block;
        color: #999;
        text-decoration: line-through;
        transform: translateY(-10rpx);
        font-size: 24rpx;
        margin-top: 5rpx;
        padding: 0 12rpx;
        box-sizing: border-box;
    }
</style>
