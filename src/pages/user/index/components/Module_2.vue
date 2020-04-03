<!--suppress ALL -->
<template>
    <div class="productsContainer">
        <img :src='image' alt="" class="preferential" @click="doDetail">
        <ul>
            <li v-for="(product,index) in data" :key="index" @click="redirectTo('user.goodDetail', {query: {type:'mall', good_id: product.product.id}})">
                <img :src="product.image" alt="" class="img">
                <div class="bottom">
                    <div class="left">
                        <h3>
                            <em>￥</em>
                            {{product['act_price']}}
                        </h3>
                        <span>{{product['product_entity']['retail_price']}}</span>
                    </div>
                    <img src="../../../../../static/icons/qiang.jpg" @click.stop="goBuy(product)" class="buyIcon" alt="">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
	export default {
		name: 'Module_2',
        props: ['data', 'image','id'],
        methods: {
            doDetail () {
                this.$emit('do', this.id)
            },
            redirectTo (router, options = {}) {
                this.$command('REDIRECT_TO', router, 'push', options);
            },
            goBuy (item) {
                console.log(item);
                this.$emit('addToCart', item['product_stock_id'])
            }
        },
        mounted () {
            console.log(this.data, ';==============================;;;;;;;;;;;;;;;');
        }
    }
</script>

<style scoped>
    .productsContainer{
        margin-top: 20rpx;
        border-radius: 25rpx;
        padding-bottom: 40rpx;
        background: #fff;
        overflow: hidden;
    }

    .preferential{
        width: 100%;
        height: 90rpx;

    }

    .productsContainer ul {
        width: 100%;
        box-sizing: border-box;
        padding: 0 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .productsContainer ul li {
        width: 216rpx;
        border: 2rpx solid #f2f2f2;
        border-radius: 10rpx;
        box-sizing: border-box;
        padding: 10rpx;
        padding-bottom: 16rpx;
    }

    .productsContainer ul li .img{
        width: 196rpx;
        height: 180rpx;
        border-radius: 10rpx;
    }

    .productsContainer ul li .bottom{
        box-sizing: border-box;
        padding: 0 10rpx;
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .productsContainer ul li .bottom .left{
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }

    .productsContainer ul li .bottom .buyIcon{
        width: 48rpx;
        height: 48rpx;
    }

    .productsContainer ul li .bottom .left h3{
        font-weight: bold;
        font-size: 32rpx;
        color: #FC3C2F;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .productsContainer ul li .bottom .left em{
        font-size: 24rpx;
        transform: translateY(-2rpx);
    }

    .productsContainer ul li .bottom .left span{
        font-size: 22rpx;
        color: #999;
        text-decoration: line-through;
        margin-left: 8rpx;
        transform: translateY(-4rpx);
    }
</style>
