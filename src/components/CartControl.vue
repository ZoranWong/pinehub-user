<!--suppress ALL -->
<template>
    <div class="cartcontrol" :class="cartcontrolWidth">
        <div class="cart-decrease" v-show="count>0" @click.stop="reduceCart" :reduce="reduceMerchandises"></div>
        <div class="cart-count" v-show="count>0"> {{count}}</div>
        <div class="cart-add" @click.stop="addCart" :add="addMerchandises"></div>
    </div>
</template>
<script>
    export default {
        props: {
            product: {
                default: null,
                type: Object
            },
            batch: {
                default: null,
                type: Number
            },
            dateStatus: {
                default: null,
                type: String
            },
            cartModel: {
                default: null,
                type: String
            }
        },
        computed: {
            cartcontrolWidth () {
                return this.count > 0 ? 'cartcontrol-width' : '';
            },
            count () {
                if (this.cartModel) {
                    try {
                        return this.cartModel ? this.$store.getters[`${this.cartModel}/quality`](this.merchandiseId, this.batch) : 0;
                    } catch (e) {
                        console.log('抛出异常', e)
                        return 0;
                    }
                }
            },
            shoppingCartId () {
                return this.cartModel ? this.$store.getters[`${this.cartModel}/shoppingCartId`](this.merchandiseId, this.batch) : null;
            }
        },
        methods: {
            addCart () {
                // 加入购物车
                this.$emit('addCart', this.product);
            },
            reduceCart () {
                // 移出购物车
                if (this.count > 0) {
                    this.$emit('reduceCart', this.merchandiseId, this.shoppingCartId);
                }
            }
        }
    }
</script>
<style scoped>
    .cartcontrol {
        height: 48rpx;
        width: 48rpx;
        line-height: 48rpx;
        border-radius: 30rpx;
        display: inline-block;
        position: relative;
        overflow: hidden;
        border: 1rpx solid #ffcc00;
    }

    .cartcontrol-width {
        width: 144rpx;
    }

    .cart-decrease {
        width: 48rpx;
        height: 48rpx;
        background: url(../../static/images/icon/reduce-icon.png) no-repeat center;
        background-size: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .cart-count {
        font-size: 28rpx;
        text-align: center;
        height: 48rpx;
    }

    .cart-add {
        width: 48rpx;
        height: 48rpx;
        background: url(../../static/images/icon/plus-icon.png) no-repeat;
        background-size: contain;
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .add-border {
        border: 1rpx solid #ffcc00;
    }
</style>
