<template>
  <div id="mystore">
    <mp-title :title="title"></mp-title>
    <div id="mystore_buyinfo">
      <ul>
        <li>
          <i class="my_store_ico ico_week_buy" />
          <div class="info_list">
            <em>{{storeInfo['week_buy_num'] ? storeInfo['week_buy_num'] : 0}}</em>
            <i>本周用户购买数</i>
          </div>
        </li>
        <li>
          <i class="my_store_ico ico_week_sell" />
          <div class="info_list">
            <em>{{storeInfo['week_sell_amount'] ?storeInfo['week_sell_amount'] : 0}}</em>
            <i>本周销售额</i>
          </div>
        </li>
        <li>
          <i class="my_store_ico ico_today_buy" />
          <div class="info_list">
            <em>{{ storeInfo['today_buy_num'] ?storeInfo['today_buy_num'] : 0 }}</em>
            <i>今日购买数</i>
          </div>
        </li>
        <li>
          <i class="my_store_ico  ico_today_sell" />
          <div class="info_list">
            <em>{{ storeInfo['today_sell_amount'] ?storeInfo['today_sell_amount'] : 0 }}</em>
            <i>今日营业额</i>
          </div>
        </li>
      </ul>
    </div>
    <div id="mystore_charts1">
      <wx-charts :unit="unitSell" :options='wxOptionsForSell'></wx-charts>
    </div>
    <div id="mystore_charts2">
      <wx-charts :unit="unitBuy" :options='wxOptionsForBuy'></wx-charts>
    </div>
    <div id="mystore_menu">
      <ul>
        <li>
          <i class="my_store_menu_ico ico_1"></i>
          <em>进货</em>
        </li>
        <li @click="jump('myStoreDistributeOrder')">
          <i class="my_store_menu_ico ico_2"></i>
          <em>需配送订单</em>
        </li>
        <li @click="jump('myStoreStatus')">
          <i class="my_store_menu_ico ico_3"></i>
          <em>店铺状态</em>
        </li>
        <li @click="scanCode">
          <i class="my_store_menu_ico ico_4"></i>
          <em>物流进货扫码</em>
        </li>
        <li @click="jump('myStorePickedUpOrder')">
          <i class="my_store_menu_ico ico_5"></i>
          <em>自提订单</em>
        </li>
        <li @click="jump('myStoreOrder')">
          <i class="my_store_menu_ico ico_6"></i>
          <em>订单汇总</em>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import MpTitle from '@/components/MpTitle';
  import WxCharts from '@/components/WxCharts';
  export default {
    components: {
      'mp-title': MpTitle,
      'wx-charts': WxCharts
    },
    data () {
      return {
        title: '我的店铺',
        unitSell: '数额',
        unitBuy: '用户'
      };
    },
    computed: {
      storeInfo () {
        return this.$store.getters['model.my.store/storeInfo'];
      },
      wxOptionsForSell () {
        return this.$store.getters['model.my.store/sellAmountECharts'];
      },
      wxOptionsForBuy () {
        return this.$store.getters['model.my.store/buyNumECharts'];
      },
      shopId () {
        return this.$store.getters['model.account/shopInfo']['id'];
      }
    },
    methods: {
      jump (router) {
        this.$command('router', router, 'push');
      },
      scanCode () {
        this.$command('scanCommand', 'myfeedbacksuccess');
      }
    },
    mounted () {
      this.$command('MY_STORE_INFO', this.shopId);
    }
  }
</script>

<style scoped>
  #mystore {
    background: #fafafa;
  }

  #mystore_buyinfo {
    padding: 15rpx;
    clear: both;
    overflow: hidden;
  }

  #mystore_buyinfo ul li {
    width: 333rpx;
    height: 140rpx;
    margin: 15rpx;
    float: left;
    background: #fff;
    border-radius: 10rpx;
    font-weight: 300;
    position: relative;
    box-shadow: 0rpx 4rpx 10rpx rgba(204, 202, 202, .6);
  }

  .my_store_ico {
    display: inline-block;
    width: 60rpx;
    height: 60rpx;
    background-size: 90%;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    top: 40rpx;
    left: 40rpx;
  }

  .my_store_ico.ico_week_buy {
    background-image: url(../../../static/images/icon/my_store_week_buy.png);
  }

  .my_store_ico.ico_week_sell {
    background-image: url(../../../static/images/icon/my_store_week_sell.png);
  }

  .my_store_ico.ico_today_buy {
    background-image: url(../../../static/images/icon/my_store_today_buy.png);
  }

  .my_store_ico.ico_today_sell {
    background-image: url(../../../static/images/icon/my_store_today_total.png);
  }

  .info_list {
    position: absolute;
    top: 35rpx;
    left: 120rpx;
    clear: both;
  }

  .info_list em {
    font-size: 30rpx;
    font-weight: 400;
    line-height: 34rpx;
  }

  .info_list i {
    font-size: 24rpx;
    line-height: 22rpx;
    color: #bbbbbb;
    margin-top: 10rpx;
  }

  #mystore_charts1 {
    margin: 0 30rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    padding: 15rpx;
  }

  #mystore_charts2 {
    margin: 30rpx 30rpx 0;
    background: #FFFFFF;
    border-radius: 10rpx;
    padding: 15rpx;
  }

  #mystore_menu {
    margin: 15rpx;
    /*background: #FFF6BD;*/
    overflow: hidden;
  }

  #mystore_menu ul li {
    margin: 15rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    width: 211.3rpx;
    height: 170rpx;
    float: left;
    box-shadow: 0rpx 4rpx 10rpx rgba(204, 202, 202, .6);
  }

  #mystore_menu ul li em {
    font-size: 28rpx;
    font-weight: 300;
    text-align: center;
    color: #828282;
  }

  .my_store_menu_ico {
    display: block;
    width: 60rpx;
    height: 60rpx;
    background-size: 90%;
    background-repeat: no-repeat;
    background-position: center center;
    margin: 30rpx auto 15rpx;
  }

  .ico_1 {
    background-image: url(../../../static/images/icon/my_store_m1.png);
  }

  .ico_2 {
    background-image: url(../../../static/images/icon/my_store_m2.png);
  }

  .ico_3 {
    background-image: url(../../../static/images/icon/my_store_m3.png);
  }

  .ico_4 {
    background-image: url(../../../static/images/icon/my_store_m4.png);
  }

  .ico_5 {
    background-image: url(../../../static/images/icon/my_store_m5.png);
  }

  .ico_6 {
    background-image: url(../../../static/images/icon/my_store_m6.png);
  }
</style>
