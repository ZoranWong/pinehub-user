<template>
  <div class="confirmation-order body">
    <mp-title :title="title"></mp-title>
    <!-- 收货人组件 -->
    <consignee></consignee>
    <ul class="Distribution-details">
      <li class="li-item bgff">
        自提点地址
        <p class="details-item">
          {{storeInfo ? storeInfo.address : ''}}
        </p>
      </li>
      <li class="li-item bgff">
        自提点营业
        <p class="details-item">
          {{ sendDate }}
        </p>
      </li>
      <li class="li-item bgff">
        站点联系电话
        <p class="details-item tel-num">
          {{storeInfo ? storeInfo.mobile : ''}}
        </p>
      </li>
    </ul>

    <!-- 支付内容的显示组件 -->
    <payment :model="model" :totalNum = "totalNum" :createOrder="createOrder" :addMerchandiseToCart="addCart" :reduceMerchandiseToCart="reduceCart" :ticket-route = "'activityCoupon'"></payment>

  </div>
</template>
<script>
  import MpTitle from '@/components/MpTitle';
  import Consignee from '@/components/Consignee';
  import TabDelivery from '@/components/TabDelivery';
  import Payment from '@/components/Payment';
  import _ from 'underscore';
  export default {
    name: 'confirmationOrder',
    data () {
      return {
        title: '确认订单「新品活动」',
        model: 'model.activity.shoppingCarts',
        activityId: null,
        queryStore: null,
        storeId: null
      }
    },
    components: {
      'mp-title': MpTitle,
      'consignee': Consignee,
      'tab-delivery': TabDelivery,
      'payment': Payment
    },
    computed: {
      storeInfo () {
        return this.queryStore ? this.queryStore : this.$store.getters['model.nearbyStores/store'](this.storeId);
      },
      userInfo () {
        return this.$store.getters['model.account/userInfo']
      },
      hasShoppingCarts () {
        return this.$store.getters['model.activity.shoppingCarts/list'].length > 0;
      },
      sendDate () {
        return this.storeInfo ? this.storeInfo['openingHours'] : null;
      },
      totalNum () {
        return this.$store.getters['model.activity.tickets/totalNum'];
      },
      totalAmount () {
        return this.model ? this.$store.getters[`${this.model}/totalAmount`] : 0;
      }
    },
    methods: {
      radioChange (e) {
        console.log('radio发生change事件，携带value值为：', e.target.value)
      },
      bindPickerChange (e) {
        this.index = e.target.value
      },
      async loadCartMerchandises (page = 1) {
        await this.$command('ACTIVITY_SHOPPINGCART_LOAD_MERCHANDISES', this.activityId, page);
      },
      addCart (merchandiseId, id) {
        let count = this.$store.getters['model.activity.shoppingCarts/quality'](merchandiseId) + 1;
        this.$command('ACTIVITY_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
      },
      reduceCart (merchandiseId, id) {
        let count = this.$store.getters['model.activity.shoppingCarts/quality'](merchandiseId) - 1;
        this.$command('ACTIVITY_SHOPPINGCART_CHANGE_MERCHANDISE', merchandiseId, id, count);
      },
      createOrder () {
        this.$command('CREATE_ACTIVITY_ORDER', this.activityId, this.storeInfo.id, this.userInfo.nickname, this.userInfo.mobile, this.storeInfo.address);
      },
      async initData () {
        this.activityId = parseInt(this.$route.query['activity_id']);
        this.storeId = parseInt(this.$route.query['store_id']);
        if (!this.hasShoppingCarts) {
          await this.loadCartMerchandises();
        }
        console.log(await this.$command('LOAD_ACTIVITY_TICKETS', this.activityId, this.totalAmount));

        let stores = await this.mp.storage.get('activityReceiveStores');
        console.log('====== receive stores =======', stores);
        let store = null;
        if (!stores) {
          stores = [];
        } else {
          console.log(store, this.storeInfo);
          store = _.findWhere(stores, { id: this.storeId });
          this.$set(this, 'queryStore', store);
          console.log('=========<<<<>>>>======', stores, this.storeId, this.queryStore);
        }
        if (!store && this.storeInfo && stores.length < 4) {
          stores.push(this.storeInfo)
          this.mp.storage.set('activityReceiveStores', stores);
        } else {
          if (stores.length === 3 && this.storeInfo) {
            stores.pop();
            stores.push(this.storeInfo);
          }
        }
      }
    },
    mounted () {
      this.initData();
    }
  }
</script>
<!--suppress CssInvalidPropertyValue -->
<style scoped>
  .confirmation-order {
    font-size: 28rpx;
    padding: 20rpx 0rpx 20rpx 20rpx;
  }

  .li-item {
    width: 710rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 10rpx;
    margin-bottom: 4rpx;
    box-shadow: 0rpx 8rpx 36rpx rgba(204, 202, 202, 0.3);
    box-sizing: border-box;
  }

  .li-item .details-item {
    display: inline-block;
    height: 80rpx;
    margin-left: 100rpx;
    vertical-align: middle;
  }

  .Distribution-details {
    margin-bottom: 20rpx;
    box-shadow: 0rpx 8rpx 36rpx rgba(204, 202, 202, 0.3);
    /*border:1rpx solid black;*/
  }

  .li-item p input {
    display: inline-block;
    vertical-align: middle;
  }

  .big-input {
    width: 460rpx;
    height: 40rpx;
    border-radius: 10rpx;
    border: 2rpx solid #cccccc;
  }

  .li-item .tel-num {
    margin-left: 44rpx;
  }
</style>
