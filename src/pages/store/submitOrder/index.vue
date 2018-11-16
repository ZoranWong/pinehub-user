<template>
  <div class="confirmation-order body">
    <mp-title :title="title"></mp-title>
    <!-- 收货人组件 -->
    <consignee select-method="true"></consignee>
    <!-- 配送和自提的tab切换组件-->
    <tab-delivery :position="position"></tab-delivery>
    <!-- 支付内容的显示组件 -->
    <payment :next="next"  :addMerchandiseToCart = "addCart"  :reduceMerchandiseToCart = "reduceCart" ></payment>


  </div>
</template>
<script>
  import MpTitle from '@/components/MpTitle';
  import Consignee from '@/components/Consignee';
  import TabDelivery from '@/components/TabDelivery';
  import Payment from '@/components/Payment';
  export default{
    name: 'confirmationOrder',
    data () {
      return {
        title: '确认订单「当日」'

      }
    },
    components: {
      'mp-title': MpTitle,
      'consignee': Consignee,
      'tab-delivery': TabDelivery,
      'payment': Payment
    },
    methods: {
      radioChange (e) {
        console.log('radio发生change事件，携带value值为：', e.target.value)
      },
      bindPickerChange (e) {
        // console.log(e)
        this.index = e.target.value
      },
      next () {
        this.$command('LOAD_MERCHANDISE_LIST');
      },
      addCart (shopId, count, merchandiseId) {
        this.$command('ADD_MERCHANDISE_TO_CART', merchandiseId, count, shopId);
      },
      reduceCart (shopId, count, merchandiseId) {
        this.$command('REDUCE_MERCHANDISE_TO_CART', merchandiseId, count, shopId);
      },
      async getData () {
        await this.$command('GET_NEAREST_STORE');
        await this.$command('MYINFO');
        console.log('mounted order component');
        await this.$command('FILL_CART_FROM_CACHE');
      }
    },
    created () {
    },
    mounted () {
      this.getData();
    }
  }
</script>
<style scoped>
  .confirmation-order{
    font-size:28rpx;
    padding:20rpx 0rpx 20rpx 20rpx;
  }
</style>
