<template>
    <div id="merchant-store">
        <mp-title :title="title"></mp-title>
        <div id="merchant-store_header">
            <div id="merchant-store_userinfo">
                <img id="bear" :src="headerAnimate" />
                <div id="merchant-store_userinfo_baseinfo">
                    <img :src="userInfo.avatar" />
                    <div id="name_id">
                        <em>{{userInfo.nickname}}</em>
                        <i>ID: {{userInfo.id}}</i>
                    </div>
                    <i id="lv">
                        {{userInfo.vipLevel}}
                    </i>
                </div>
                <div id="merchant-store_userinfo_otherinfo">
                    <ul>
                        <li @click="alertNotice">
                            <em>{{userInfo.balance}}</em>
                            <i>余额</i>
                        </li>
                        <li @click="jump('coupon')" class="my_card">
                            <s class="my_card_new"></s>
                            <em>{{userInfo.ticketNum}}</em>
                            <i>卡券</i>
                        </li>
                        <li @click="alertNotice">
                            <em>{{userInfo.canUseScore}}</em>
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
        <div id="merchant-store_menu">
            <ul>
                <li @click="jump('user.orders')">
                    <img src="../../../../static/images/icon/my_ico_menu1.png" />
                    <span>个人订单</span>
                    <i></i>
                    <em>查看所有订单</em>
                </li>
                <li @click="jump('user.share')">
                    <img src="../../../../static/images/icon/my_ico_menu2.png" />
                    <span>邀请享奖励</span>
                    <i></i>
                    <em>邀请好友</em>
                </li>
                <li @click="jump('user.feedBack')">
                    <img src="../../../../static/images/icon/my_ico_menu3.png" />
                    <span>意见反馈</span>
                    <i></i>
                </li>
                <li @click="connectKf">
                    <img src="../../../../static/images/icon/my_ico_menu4.png" />
                    <span>联系客服</span>
                    <i></i>
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
                return this.$store.getters['model.account/userInfo'];
            },
            hasStore () {
                console.log(this.$store.getters)
                return this.$store.getters['model.account/isShopManager'];
            },
            userToken () {
                return this.$store.getters['account/token'];
            }
        },
        methods: {
            jump (router) {
                this.$command('REDIRECT_TO', router, 'push');
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
            },
            alertNotice () {
                wx.showToast({
                    title: '敬请期待',
                    icon: 'none'
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
        height: 402rpx;
        width: 800rpx;
        /*margin: -1200rpx auto 0;*/
        margin-left: -25rpx;
        background: #FFD000;
        border-radius: 0 0 100% 100%;
        /*overflow: hidden;*/
    }

    #merchant-store_userinfo {
        width: 680rpx;
        height: 320rpx;
        background: #FFFFFF;
        position: absolute;
        top: 180rpx;
        left: 60rpx;
        border-radius: 20rpx;
    }

    #bear {
        position: absolute;
        width: 452rpx;
        height: 186rpx;
        top: -139rpx;
        left: 109rpx;
    }

    #merchant-store_userinfo_baseinfo {
        margin: 50rpx 40rpx 40rpx;
        overflow: hidden;
        position: relative;
    }

    #merchant-store_userinfo_baseinfo img {
        width: 90rpx;
        height: 90rpx;
        float: left;
        margin-right: 20rpx;
    }

    #name_id {
        height: 90rpx;
        float: left;
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

    #lv {
        position: absolute;
        right: 0;
        top: 0;
        background: #FECE00;
        color: #FFFFFF;
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
        line-height: 50rpx;
        text-align: center;
        font-size: 30rpx;
        font-weight: 500;
    }

    #merchant-store_userinfo_otherinfo {
        position: absolute;
        bottom: 40rpx;
        width: 630rpx;
        left: 26rpx;
    }

    #merchant-store_userinfo_otherinfo ul {
        display: block;
        display: flex;
        flex-wrap: wrap;
    }

    #merchant-store_userinfo_otherinfo ul li {
        flex-grow: 3;
        width: 90rpx;
        float: left;
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
        margin: 20rpx 40rpx;
    }

    #merchant-store_menu ul li {
        padding: 0 25rpx;
        border-bottom: 1rpx solid #EEEEEE;
        border-radius: 20rpx;
        height: 88rpx;
        line-height: 87rpx;
        background: #FFFFFF;
        margin-bottom: 10rpx;
    }

    #merchant-store_menu ul li img {
        display: block;
        height: 48rpx;
        width: 48rpx;
        float: left;
        padding: 20rpx 0;
    }

    #merchant-store_menu ul li span {
        float: left;
        margin-left: 20rpx;
        font-size: 32rpx;
        font-weight: 400;
        color: #111111;
    }

    #merchant-store_menu ul li em {
        float: right;
        font-size: 32rpx;
        font-weight: 300;
        color: #999999;
    }

    #merchant-store_menu ul li i {
        width: 40rpx;
        height: 40rpx;
        display: block;
        background: url(../../../../static/images/icon/my_ico_menu_more.png) no-repeat center center;
        background-size: 40%;
        padding: 22rpx 0;
        float: right;
    }
</style>
