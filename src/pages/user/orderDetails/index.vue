<!--suppress ALL -->
<template>
    <div id="userOrders" class="body">
        <mp-title :title="title"></mp-title>
        <div id="shop_detail_header">
            <h3>
              已退款
              <span>期待您的再次光临哦~</span>
            </h3>
            <img src="../../../../static/images/background/1.png"></img>
        </div>
        <div id="shop_info">
            <i class="iconfont location">&#xe80b;</i>
            <div class="shop_info">
                <div class="shop_info_name">
                    <h4>
                      青松集团店
                      <span>18513891718</span>
                    </h4>
                </div>
                <div class="shop_info_address">
                  安徽省 合肥市 高新区 宁西路28号青松集
                  团行政楼2楼
                </div>
            </div>
            <i class="iconfont arrow">&#xe6a3;</i>
        </div>
        <div id="pick_up_info">
            <i class="iconfont location">&#xe80b;</i>
            <div class="order_info">
                <div class="order_info_name">
                    <h4>
                        预约取货日期
                        <span>2019-7-5</span>
                    </h4>
                    <h4>
                        预约取货时间
                        <span>09:00-21:00</span>
                    </h4>
                </div>
            </div>
        </div>
        <div id="order_details">
            <ul id="good_list">
                <li v-for="(good,index) in goods" :key="index">
                    <img :src="good.image" alt="">
                    <div id="good_info">
                        <h3>{{good.name}}</h3>
                        <em>{{good.spec}}</em>
                        <div id="good_info_price">
                            <h3>{{good.price}}</h3>
                            <em>{{good.entities}}</em>
                        </div>
                    </div>
                </li>
            </ul>
            <ul id="order_amount">
                <li>
                    <span>商品总价</span>
                    <span>￥40.00</span>
                </li>
                <li>
                    <span>优惠金额</span>
                    <span>-￥5.00</span>
                </li>
                <li>
                  <span>优惠券</span>
                  <span>已用2张</span>
                </li>
            </ul>
            <div id="order_price">
                <h4>实付款</h4>
                <span>￥35.00</span>
            </div>
        </div>
        <div id="order_info">
            <h3>订单信息</h3>
            <div>
                <span> 订单编号：20190888765866128</span>
                <em>复制</em>
            </div>
            <div>
                <span>下单时间：2019-01-17 8:30:06 </span>
                <span>待自提</span>
            </div>

            <div>支付方式：微信支付  </div>

            <div>实际取货时间：2019-01-17 8:30:50  </div>
        </div>
        <div id="order_total_price">
            <span>预付款 ￥40.00</span>
            <h3>去取货</h3>
        </div>
    </div>
</template>
<script>
    import MpTitle from '@/components/MpTitle';

    export default {
        components: {
            'mp-title': MpTitle,
        },
        data () {
            return {
                title: '订单详情',
                navName: 'orderDetails',
                goods:[
                    {
                        image:'../../../../static/images/background/1.png',
                        name:'青松功夫可追溯的芝士蛋糕',
                        spec:'芝士标准糖',
                        price:'￥20.00',
                        entities:'X1'
                    },
                    {
                        image:'../../../../static/images/background/1.png',
                        name:'青松功夫可追溯的芝士蛋糕',
                        spec:'芝士标准糖',
                        price:'￥20.00',
                        entities:'X1'
                    }
                ]
            };
        },
        watch: {},
        computed: {},
        methods: {},
        created () {

        },
        mounted () {

        }
    }
</script>

<style>
    page {
        height: 100%;
        background: #fafafa;
    }

    #userOrders {
        position: relative;
    }

    #shop_detail_header {
      height: 80rpx;
      padding: 50rpx 80rpx;
      color: #111111;
      background: linear-gradient(to right,#FDE068,#FFCC00);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    #shop_detail_header img{
      width: 178rpx;
      height: 124rpx;
    }

    #shop_detail_header h3{
      font-size: 32rpx;
      margin-bottom: 10rpx;
    }

    #shop_detail_header span{
      display: block;
      font-size: 28rpx;
      margin-top: 10rpx;
    }

    #shop_info,#pick_up_info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      padding: 0 40rpx;
      height: 180rpx;
    }

    #shop_info .location{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #shop_info .shop_info{
        width: 507rpx;
        font-size: 28rpx;
        color: #111111;
    }

    #shop_info .shop_info .shop_info_name{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #shop_info .shop_info .shop_info_name h4 {
        font-weight: normal;
        margin: 0;
    }

    #shop_info .shop_info .shop_info_name span{
        color: #757575;
        margin-left: 23rpx;
    }

    #shop_info .arrow{
        color: #757575;
        font-size: 22rpx;
    }

    #pick_up_info{
        justify-content: flex-start;
        border-top: 2rpx solid #f2f2f2;
    }

    #pick_up_info .location{
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 60rpx;
    }

    #pick_up_info .order_info{
        font-size: 28rpx;
        color:#111;
        margin-left: 40rpx;
    }

    #pick_up_info .order_info h4{
        margin: 0;
    }

    #pick_up_info .order_info span{
        color: #757575;
        margin-left: 23rpx;
    }

    #order_details{
        margin-top: 20rpx;
        background: #fff;
    }

    #order_details #good_list{
        padding: 0 20rpx;
        border-bottom: 2px solid #f2f2f2;
    }

    #order_details #good_list li{
        padding: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2rpx solid #f2f2f2;
        padding-bottom: 20rpx;
    }

    #order_details #good_list li:last-child{
        border-bottom: 0;
    }

    #order_details #good_list li img{
        width: 180rpx;
        height: 180rpx;
    }

    #order_details #good_list li #good_info{
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

    #order_details #good_list li #good_info h3{
        font-size: 28rpx;
        color: #111111;
        margin: 10rpx 0 20rpx 0;
    }

    #order_details #good_list li #good_info em{
        font-size: 24rpx;
        color: #757575;
    }

    #order_details #good_list li #good_info #good_info_price{
        width: 100%;
        margin-top: 60rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #order_details #good_list li #good_info #good_info_price h3{
        margin: 0;
    }

    #order_details #order_amount{
        padding: 15rpx 40rpx;
        background: #fff;
    }

    #order_details #order_amount li{
        padding: 15rpx 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #order_details #order_amount li span{
        font-size: 28rpx;
        color: #757575;
    }

    #order_details #order_price{
        background: #fff;
        padding: 0 40rpx;
        height: 80rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 2px solid #f2f2f2;
        font-size: 32rpx;
    }

    #order_details #order_price h4{
        color: #111;
    }

    #order_details #order_price span{
        color: #FFCC00;
    }

    #order_info{
      margin: 20rpx 0;
      height: 355rpx;
      background: #fff;
      padding: 30rpx 40rpx;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 105rpx;
    }

    #order_info h3{
        font-size: 32rpx;
        color: #111111;
        font-weight: normal;
    }

    #order_info div{
        width: 100%;
        font-size: 28rpx;
        color: #757575;
        margin-top: 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #order_info em{
        font-size: 28rpx;
        color: #ffcc00;
    }

    #order_total_price{
      width: 670rpx;
      height: 98rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40rpx;
      background: #ffcc00;
      position: fixed;
      bottom: 0;
    }
</style>
