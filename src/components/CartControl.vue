<template>
  <div class="cartcontrol" :style="{border: border}">
    <div class="cart-decrease" v-show="count>0" @click="reduceCart" :reduce="reduceMerchandises"></div>
    <div class="cart-count" v-show="count>0"> {{count}} </div>
    <div class="cart-add" @click="addCart" :add="addMerchandises"></div>
  </div>
</template>
<script>
  export default {
    props: {
      merchandiseId: {
        default: null,
        type: Number
      },
      shopId: {
        default: null,
        type: Number
      },
      model: {
        default: null,
        type: String
      }
    },
    computed: {
      border () {
        return this.count > 0 ? '2rpx solid #ffcc00' : '0';
      },
      count () {
        if (this.model) {
          try {
            console.log('------count -------', this.merchandiseId, this.$store.getters[`${this.model}/quality`](this.merchandiseId));
            return this.model ? this.$store.getters[`${this.model}/quality`](this.merchandiseId) : 0;
          } catch (e) {
            console.log('抛出异常', e)
          }
        }
      },
      shoppingCartId () {
        return this.model ? this.$store.getters[`${this.model}/shoppingCartId`](this.merchandiseId) : null;
      }
    },
    methods: {
      addCart () {
        // 加入购物车
        console.log(this.model, this.shoppingCartId);
        this.$emit('addCart', this.merchandiseId, this.shoppingCartId);
      },
      reduceCart () {
        // 移出购物车
        if (this.count > 0) {
          this.$emit('reduceCart', this.merchandiseId, this.shoppingCartId);
        }
      }
    },
    mounted: function () {
      // console.log(this.pageCount)
    }
  }
</script>
<style>
  .cartcontrol {
    width: 144rpx;
    height: 48rpx;
    border-radius: 30rpx;
    display: inline-block;
    position: relative;
  }

  .cart-decrease {
    width: 48rpx;
    height: 48rpx;
    background: url(../../static/images/icon/reduce-icon.png) no-repeat center;
    background-size: 100%;
    position: absolute;
    top: 0rpx;
    left: 0rpx;
  }

  .cart-count {
    font-size: 28rpx;
    line-height: 50rpx;
    text-align: center;
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
</style>
