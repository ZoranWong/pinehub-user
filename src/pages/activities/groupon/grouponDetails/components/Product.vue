<!--suppress ALL -->
<template>
    <div class="product">
        <img :src="product['image']" alt="" class="product_image">
        <div class="product_info">
            <h4>{{product.name}}</h4>
            <h5>{{product.intro}}</h5>
            <p   style="border: 1px solid red;border-radius: 5rpx;color: red;width:130rpx;font-size:25rpx;text-align:center" v-if="product['everybody_limit_num']>0">特惠抢购</p>
            <span>销量:{{sales}}</span>
            <div class="bottom">
                <div class="left">
                    <i>¥</i>
                    <!-- <h3>{{product['retail_price']}}</h3>group_price -->
                    <h3>{{product['group_price']}}</h3>
                    <!-- <span v-if="product['show_market_price']">￥{{product['market_price']}}</span> -->
                    <span v-if="product['retail_price']>product['group_price']">￥{{product['retail_price']}}</span>

                    <span style="text-decoration: none;" v-if="product['everybody_limit_num']>0">限购{{product['everybody_limit_num']}}份</span>
                </div>
                <img v-if="deadlineTime > 0 && product.stock > 0" src="../../../../../../static/icons/add.png" @click="addToCart" alt="">
                <img v-else src="../../../../../../static/icons/disabledAdd.jpg"  alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Product",
        props: ['product','deadlineTime'],
        methods:{
            addToCart () {
                this.$emit('addToCart', this.product)
            }
        },
        computed: {
            sales(){
                let count=0;
                if(this.product['total_sales']){
                    count=count+this.product['total_sales'];
                }
                if(this.product['virtual_sales']){
                    count=count+this.product['virtual_sales'];
                }
                return count;
            }
        }
    }
</script>

<style scoped>
.a{
    
    
    
}
    .product {
        width: 100%;
        box-sizing: border-box;
        padding: 30rpx 20rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 2rpx solid #f2f2f2;
    }
    .product_image{
        width: 228rpx;
        height: 228rpx;
        border-radius: 10rpx;
    }

    .product_info{
        margin-left: 30rpx;
        flex: 1;
        padding: 10rpx 0;
    }

    .product_info>h4{
        font-size: 30rpx;
        color: #111;
        font-weight: bold;
        margin-bottom: 20rpx;
    }

    .product_info>h5{
        font-weight: normal;
        font-size: 24rpx;
        color: #999;
        margin-bottom: 10rpx;
    }

    .product_info>span{
        font-size: 22rpx;
        color: #999;
    }

    .product_info .bottom{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .product_info .bottom .left{
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
    }

    .product_info .bottom .left i{
        font-size: 24rpx;
        color: #FC3C2F;
        font-weight: bold;
        margin-right: 5rpx;
    }

    .product_info .bottom .left h3{
        font-size: 32rpx;
        color: #FC3C2F;
        font-weight: bold;
        transform: translateY(3rpx);
    }

    .product_info .bottom .left span{
        margin-left: 8rpx;
        font-size: 22rpx;
        color: #999;
        text-decoration: line-through;
    }

    .product_info .bottom img{
        width: 48rpx;
        height: 48rpx;
    }
</style>
