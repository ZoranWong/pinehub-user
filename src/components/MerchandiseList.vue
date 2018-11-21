<template>
  <scroll-view class="merchandise-wrapper" :scroll-y="true" @scrolltolower="scrolltolower" :scroll-into-view="categoryId">
    <div class="merchandise-item clearfix bgff" v-for="(item, index) in list" :key="index">
      <img class="merchandises-pic" :src="item.thumbImage">
      <div class="merchandise-item-right fr">
        <h4 class="merchandises-name">{{item.name}}</h4>
        <p class="sell-count">已售
          <span class="color00">{{item.sellNum}}</span>份
        </p>
        <p class="sell-price">{{item.sellPrice}}元/份</p>
        <p class="origin-price color75">{{item.originPrice}}元/份</p>
        <div class="cartcontrol-warpper">
          <cart-control :model="model" @addCart="addCart" @reduceCart="reduceCart" :merchandiseId="item.merchandiseId" :shopId="item.shopId"></cart-control>
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<script>
  import CartControl from '@/components/CartControl'
  import Cart from '@/components/Cart'
  export default {
    props: {
      addMerchandiseToCart: {
        default: null,
        type: Function
      },
      reduceMerchandiseToCart: {
        default: null,
        type: Function
      },
      next: {
        default: null,
        type: Function
      },
      list: {
        default: function () {
          return []
        },
        type: Array
      },
      categoryId: {
        default: null,
        type: String | Number
      },
      model: {
        default: null,
        type: String
      }
    },
    data () {
      return {
        pageCount: 15,
        timeout: null
      };
    },
    components: {
      'cart-control': CartControl,
      'cart': Cart
    },
    methods: {
      scrolltolower (e) {
        let $this = this;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        ((e) => {
          $this.timeout = setTimeout(function () {
            $this.next();
          }, 250);
        })(e);
      },
      addCart (merchandiseId, id) {
        this.addMerchandiseToCart(merchandiseId, id);
      },
      reduceCart (merchandiseId, id) {
        this.reduceMerchandiseToCart(merchandiseId, id);
      }
    }
  }
</script>

<style scoped>
  .cart-scroll {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
  }

  .merchandise-wrapper {
    overflow-y: auto;
    width: 630rpx;
  }
  /*.merchandise-wrapper::-webkit-scrollbar {
        width: 1px;
        background-color: rgba(217, 217, 217, 0.3);
    }*/

  .merchandise-item {
    height: 326rpx;
    border-radius: 10rpx;
    box-shadow: 0rpx 8rpx 36rpx rgba(204, 202, 202, 0.3);
    margin: 20rpx 20rpx 0 20rpx;
    position: relative;
    width: 590rpx;
  }

  .merchandises-pic {
    width: 250rpx;
    height: 250rpx;
    position: absolute;
    top: 38rpx;
    left: 38rpx;
  }

  .merchandise-item-right {
    position: absolute;
    top: 40rpx;
    right: 0;
    line-height: 40rpx;
    width: 270rpx;
    height: 250rpx;
  }

  .merchandise-item-right h4 {
    font-size: 32rpx;
    font-weight: 400;
  }

  .sell-count {
    font-size: 22rpx;
  }

  .sell-price {
    font-size: 28rpx;
    font-weight: 400;
    margin-top: 30rpx;
  }

  .origin-price {
    text-decoration: line-through;
    font-size: 20rpx;
  }

  .plus-icon {
    width: 48rpx;
    height: 48rpx;
    background: url(../../static/images/icon/plus-icon.png) no-repeat;
    background-size: contain;
    position: absolute;
    bottom: 58rpx;
    right: 40rpx;
  }

  .cartcontrol-warpper {
    position: absolute;
    bottom: 0;
    right: 60rpx;
    /*border:1rpx solid red;*/
  }
</style>
