<template>
    <div id="merchant-store">
        <mp-title :title="title"></mp-title>
        <div id="merchant-store_header">
            <div id="merchant-store_userinfo_baseinfo">
                <img :src="userInfo.avatar"/>
                <div id="name_id">
                    <em>{{userInfo.nickname}}</em>
                </div>
            </div>
            <div id="merchant-store_userinfo">
                <div id="merchant-store_userinfo_otherinfo">
                    <ul>
                        <li @click="toBalance">
                            <em>{{userInfo.balance || 0}}</em>
                            <i>余额</i>
                        </li>
                        <li @click="jump('couponCenter')" class="my_card">
                            <s class="my_card_new"></s>
                            <em>{{userInfo.ticketNum || 0}}</em>
                            <i>卡券</i>
                        </li>
                        <li @click="jump('user.integral')">
                            <em>{{userInfo.availableScore || 0}}</em>
                            <i>积分</i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="hasStore" id="merchant-store_shop" @click="jump('merchant.store')">
            <i class="my_store_line left_line"></i>
            <i class="my_store_line right_line"></i>
            <i id="merchant-store_shop_more"></i>
            <span>我的店铺</span>
        </div>
        <div id="merchant-store_orders_container">
            <div id="merchant-store_orders" @click="jump('user.orders', '')">
                <div id="merchant-store_orders_header" >
                    <h3>我的订单</h3>
                    <span>
                        全部订单
                        <i class="iconfont">&#xe6a3;</i>
                    </span>
                </div>
                <ul id="merchant-store_orders_list">
                    <li @click="jump('user.orders', 'WAIT_TO_PAY')">
                        <i class="iconfont">&#xe67a;</i>
                        <div class="count" v-if="userInfo['waitPayOrderCount']">{{userInfo['waitPayOrderCount']}}</div>
                        <span>待付款</span>
                    </li>
                    <li @click="jump('user.orders', 'WAIT_TO_PICK')">
                        <i class="iconfont">&#xe884;</i>
                        <div class="count" v-if="userInfo['waitPickOrderCount']">{{userInfo['waitPickOrderCount']}}</div>
                        <span>待自提</span>
                    </li>
                    <li @click="jump('user.orders', 'ORDER_COMPLETED')">
                        <i class="iconfont" >&#xe60d;</i>
                        <span>已完成</span>
                    </li>
                    <li @click="jump('user.orders', 'ORDER_HANDLING')">
                        <i class="iconfont">&#xe7ea;</i>
                        <div class="count" v-if="userInfo['handlingOrderCount']">{{userInfo['handlingOrderCount']}}</div>
                        <span>处理中</span>
                    </li>
                    <li @click="jump('user.orders', 'ORDER_REFUNDED')">
                        <i class="iconfont">&#xe610;</i>
                        <span>已退款</span>
                    </li>
                </ul>
            </div>
        </div>



        <div id="merchant-store_menu">
            <ul>
                <!--           <li @click="jump('user.share')">
                               <img src="../../../../static/images/icon/my_ico_menu2.png" />
                               <span>邀请享奖励</span>
                               <i></i>
                               <em>邀请好友</em>
                           </li> -->
                <li @click="jump('user.feedBack')">
                    <div class="left">
                        <i class="iconfont blue">&#xe609;</i>
                        <span>意见反馈</span>
                    </div>
                    <i class="iconfont arrow">&#xe6a3;</i>
                </li>
                <li @click="connectKf">
                    <div class="left">
                        <i class="iconfont green">&#xe602;</i>
                        <span>联系客服</span>
                    </div>
                    <i class="iconfont arrow">&#xe6a3;</i>
                </li>
            </ul>
        </div>
        <div id="footNavHeight"></div>
        <footer-nav :navName="navName"></footer-nav>
    </div>
</template>

<script>
    import MpTitle from '@/components/MpTitle';
    import FooterNav from '@/components/FooterNav';

    export default {
        components: {
            'mp-title': MpTitle,
            'footer-nav': FooterNav
        },
        data () {
            return {
                title: '个人中心',
                navName: 'my',
                phone: '15357903187'
            };
        },
        computed: {
            headerAnimate () {
                return this.$imageUrl('bear.gif');
            },
            userInfo () {
                return this.model.account.userInfo;
            },
            hasStore () {
                return this.$store.getters['model.account/isShopManager'];
            },
            userTokenTTL () {
                return this.$store.getters['account/overDate'];
            },
            userToken () {
                return this.$store.getters['account/token'];
            }
        },
        methods: {
            jump (router, params) {
                this.$command('REDIRECT_TO', router, 'push', {
                	query: {
                		status: params
                    }
                });
            },
            toBalance () {
                this.$command('REDIRECT_TO', 'user.balance', 'push');
                this.$command('LOAD_CHARGE_CARDS', 0);
            },
            connectKf () {
                wx.makePhoneCall({
                    phoneNumber: this.phone,
                    success: function () {
                        wx.showToast({
                            title: '拨打成功',
                            icon: 'none'
                        })
                    }
                })
            }
        }
    }
</script>

<!--suppress CssInvalidPropertyValue -->
<style scoped>
    #footNavHeight {
        height: 109rpx;
    }

    #merchant-store {
        background: #fafafa;
        position: absolute;
        height: 100%;
        width: 100%;
    }

    #merchant-store_header {
        position: relative;
        height: 375rpx;
        width: 800rpx;
        /*margin: -1200rpx auto 0;*/
        padding: 0 20rpx;
        background: linear-gradient(to right,#FDE068,#FFCC00);
        /*border-radius: 0 0 100% 100%;*/
        /*overflow: hidden;*/
    }

    #merchant-store_userinfo {
        width: 710rpx;
        height: 214rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #merchant-store_userinfo_baseinfo {
        width: 100%;
        height: 180rpx;
        display: flex;
        padding-left: 20rpx;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        position: relative;
    }

    #merchant-store_userinfo_baseinfo img {
        width: 130rpx;
        height: 130rpx;
        border-radius: 50%;
        margin-right: 50rpx;
        border: 1px solid #fff;
    }

    #name_id {
        font-weight: bold;
        height: 90rpx;
    }

    #name_id em {
        font-weight: 400;
        line-height: 50rpx;
        font-size: 32rpx;
    }

    #name_id i {
        color: #111111;
        font-weight: 300;
        line-height: 40rpx;
        font-size: 28rpx;
    }

    #merchant-store_userinfo_otherinfo {
        width: 100%
    }

    #merchant-store_userinfo_otherinfo ul {
        width: 100%;
        display: block;
        display: flex;
        flex-wrap: wrap;
    }

    #merchant-store_userinfo_otherinfo ul li {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #merchant-store_userinfo_otherinfo ul li:nth-child(2) {
        border-left: 1rpx solid #EEEEEE;
        border-right: 1rpx solid #EEEEEE;
    }

    .my_card {
        position: relative;
    }

    .my_card_new {
        position: absolute;
        width: 14rpx;
        height: 14rpx;
        background: #FECE00;
        border-radius: 50%;
        top: 3rpx;
        right: 64rpx;
    }

    #merchant-store_userinfo_otherinfo ul li em {
        display: block;
        width: 136rpx;
        line-height: 48rpx;
        margin: 0 auto;
        text-align: center;
        font-size: 42rpx;
        font-weight: 400;
        color: #111111;
    }

    #merchant-store_userinfo_otherinfo ul li i {
        text-align: center;
        line-height: 40rpx;
        font-size: 30rpx;
        font-weight: 300;
        margin-top: 10rpx;
    }

    /*我的订单*/
    #merchant-store_orders_container{
        width: 100%;
        height: 260rpx;
        background: #fafafa;
        margin-top: 40rpx;
        padding: 0 20rpx;
        border-radius: 10rpx;
    }

    #merchant-store_orders{
        width: 670rpx;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 20rpx;
        background: #fff;
    }

    #merchant-store_orders_header{
        width: 710rpx;
        height: 110rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #merchant-store_orders_header h3{
        font-size: 32rpx;
        color: #111111;
        font-weight: normal;
    }

    #merchant-store_orders_header span{
        height: 100%;
        font-size: 24rpx;
        color: #757575;
        margin-right: 30rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #merchant-store_orders_header span i{
      margin-left: 5rpx;
      font-size: 24rpx;
    }

    #merchant-store_orders_list{
      width: 100%;
      height: 150rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    #merchant-store_orders_list li{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    #merchant-store_orders_list li .count{
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24rpx;
      height: 24rpx;
      right: 33rpx;
      top: -6rpx;
      color: #ffcc00;
      border: 2rpx solid #ffcc00;
      border-radius: 50%;
      font-size: 20rpx;
      background: #fff;
    }

    #merchant-store_orders_list li i{
      margin-bottom: 10rpx;
      font-size: 48rpx;
      background: linear-gradient(to right,#FDE068,#FFCC00);
      -webkit-background-clip: text;
      color: transparent;
    }

    #merchant-store_orders_list li span{
      font-size: 24rpx;
      color: #757575;
      margin-top: 10rpx;
    }

    #merchant-store_shop {
        width: 680rpx;
        height: 130rpx;
        line-height: 130rpx;
        background: #FFFFFF;
        margin: 115rpx auto 0;
        border-radius: 20rpx;
        text-align: center;
        position: relative;
        z-index: 999;
    }

    #merchant-store_shop_more {
        position: absolute;
        top: 0;
        right: 0;
        display: inline-block;
        height: 70rpx;
        width: 70rpx;
        margin: 30rpx;
        float: left;
        background: url(../../../../static/images/icon/my_ico_more.png) no-repeat center center;
        background-size: 70%;
    }

    #merchant-store_shop span {
        line-height: 130rpx;
        font-size: 34rpx;
        font-weight: 400;
        color: #111111;
    }

    .my_store_line {
        height: 86rpx;
        width: 28rpx;
        background: url(../../../../static/images/icon/my_ico_line.png) no-repeat center center;
        background-size: 100%;
        position: absolute;
        top: -50rpx;
    }

    .my_store_line.left_line {
        left: 180rpx;
    }

    .my_store_line.right_line {
        left: none;
        right: 180rpx;
    }

    #merchant-store_menu {
        border-radius: 20rpx;
        margin: 20rpx;
    }

    #merchant-store_menu ul li {
        padding: 0 20rpx;
        height: 108rpx;
        background: #FFFFFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #merchant-store_menu ul li i{
        font-size: 36rpx;
    }

    #merchant-store_menu ul li .arrow{
        font-size: 22rpx;
        color: #757575;
    }

    #merchant-store_menu ul li .blue{
        background: linear-gradient(to right,#5EC4F9,#34B5F8);
        -webkit-background-clip: text;
        color: transparent;
    }

    #merchant-store_menu ul li .green{
        background: linear-gradient(to right,#97EF66,#83DF50);
        -webkit-background-clip: text;
        color: transparent;
    }

    #merchant-store_menu ul li .left{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }


    #merchant-store_menu ul li span {
        float: left;
        margin-left: 20rpx;
        font-size: 28rpx;
        font-weight: normal;
        color: #111111;
    }

    #merchant-store_menu ul li em {
        float: right;
        font-size: 32rpx;
        font-weight: 300;
        color: #999999;
    }

</style>
