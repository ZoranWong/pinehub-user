<template>
    <div class="productComponents">
        <div class="top">
            <div class="icon" @click="check(product)">
                <img v-if="product.selected > 0" src="../img/selected.png" alt="">
                <img v-else src="../img/uncheck.png" alt="">
            </div>
            <div class="product">
                <img :src="product.image" class="image" alt="">
                <div class="info">
                    <h4>{{product.name}}</h4>
                    <span>{{product.intro}}</span>
                    <div class="tags" v-if="product.tags && product.tags.length">
                        {{product.tags[0]}}
                    </div>
                    <div class="price">
                        <div class="left">
                            ￥
                            <h5>{{formatPrice}}</h5>

                        </div>
                        <div class="right">
                            <img src="../img/minus.png" alt="" @click="changeBuyNum(product,-1)">
                            <input v-model="product['buy_num']"  type="number" @change="(e)=>changeInputBuyNum(e,product)" />
                            <img src="../img/add.png" alt="" @click="changeBuyNum(product,1)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="desc" v-if="product.desc && product['discount_amount'] > 0">
            <div class="descContainer">
                <img src="../../../../../static/icons/newArrow.jpg" alt="">
                <span class="icon"> 促销</span>
                <span class="info">{{product.desc}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductComponents',
        props: ['product'],
        computed: {
            formatPrice () {
                let price = this.product['total_fee'] - this.product['discount_amount'];
                return price.toFixed(2)
            }
        },
        methods: {
            changeBuyNum (product, num) {
                this.$emit('changeBuyNum', product, num)
            },
            changeInputBuyNum (e, product) {
                this.$emit('changeInputBuyNum', e, product)
            },
            check (product) {
                this.$emit('check', product)
            }
        },
        mounted () {

        }
    }
</script>

<style>
    .productComponents{
        width: 100%;
        margin-bottom: 40rpx;
    }
      .top{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .icon{
        width: 108rpx;
        height: 140rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .icon img {
        width: 36rpx;
        height: 36rpx;
    }

      .product{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        box-sizing: border-box;
        padding-right: 30rpx;
    }

      .product .image{
        width: 140rpx;
        height: 140rpx;
        border-radius: 10rpx;
        border: 1rpx solid #f2f2f2;
    }

     .product .info {
        flex: 1;
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

     .product .info h4{
        font-size: 28rpx;
        color: #111;
        font-weight: normal;
        margin: 0;
    }

      .product .info span{
        margin: 10rpx 0;
        font-size: 24rpx;
        color: #757575;
    }

      .product .info .price{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

      .product .info .price .left{
        font-size: 24rpx;
        color: #FC3C2F;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

      .product .info .price .left h5{
        font-size: 32rpx;
        color: #FC3C2F;
        font-weight: bold;
    }

      .product .info .tags{
        padding: 0 8rpx;
        color: #FB4E26;
        border-radius: 5rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1rpx solid #FFB7A9;
        margin-left: 5rpx;
        font-weight: normal;
          font-size: 18rpx;
    }

      .product .info .price .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

      .product .info .price .right img{
        width: 48rpx;
        height: 48rpx;
    }

      .product .info .price .right input{
        width: 70rpx;
        text-align: center;
        font-size: 32rpx;
        color: #111;
    }



     .desc{
        width: 100%;
        padding-left: 96rpx;
        box-sizing: border-box;
        margin-top: 20rpx;
        padding-right: 30rpx;
    }

     .desc .descContainer{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        background: #fafafa;
        box-sizing: border-box;
        padding: 14rpx;
        position: relative;
        font-size: 22rpx;
        color: #333;
        flex-wrap: wrap;
    }

     .desc .descContainer img{
        position: absolute;
        top: -10rpx;
        left: 30rpx;
        width: 20rpx;
        height: 10rpx;
    }

     .desc .descContainer .icon{
        width:48rpx;
        height: 100%;
        background:rgba(254,219,213,1);
        border-radius:3rpx;
        font-size:20rpx;
        font-weight:500;
        color:rgba(254,54,12,1);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 14rpx;
    }

     .desc .descContainer .info{
        flex: 1;
    }
</style>
