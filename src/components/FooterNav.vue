<template>
    <div id="footNav">
        <ul>
            <li @click="jump('index')">
                <em class="fnav" :class="index"></em>
                <i>首页</i>
            </li>
            <li @click="scanCode">
                <em class="fnav" :class="scanning"></em>
                <i>扫码</i>
            </li>

            <li @click="jump('user.orders')">
                <em class="fnav" :class="order"></em>
                <i>订单</i>
            </li>
            <li @click="jump('userCenter')">
                <em class="fnav" :class="my"></em>
                <i>我的</i>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'FooterNav',
        props: ['navName'],
        data () {
            return {
                navName: '',
                index: 'index',
                scanning: 'scanning',
                order: 'order',
                my: 'my'
            };
        },
        methods: {
            nowNav (name) {
                switch (name) {
                    case 'index':
                        this.index = 'index_now';
                        break;
                    case 'scanning':
                        this.scanning = 'scanning_now';
                        break;
                    case 'order':
                        this.order = 'order_now';
                        break;
                    case 'my':
                        this.my = 'my_now';
                        break;
                    default:
                        this.index = 'index_now';
                        break;
                }
            },
            jump (router) {
                console.log(router)
                this.$command('REDIRECT_TO', router, 'replace');
            },
            scanCode () {
                this.$command('scanCommand', 'myfeedbacksuccess');
            }
        },
        created () {
            this.nowNav(this.navName);
            console.log(this.navName);
        }
    }
</script>

<style scoped>
    #footNav {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 108rpx;
        width: 750rpx;
        z-index: 999;
        background: #FFFFFF;
        border-top: 1rpx solid #eeeeee;
    }

    #footNav ul li {
        width: 25%;
        float: left;
    }

    #footNav ul li img {
        display: block;
        width: 50rpx;
        height: 50rpx;
        margin: 13rpx auto 10rpx;
    }

    #footNav ul li i {
        text-align: center;
        color: #111111;
        font-size: 24rpx;
        font-weight: 200;
        line-height: 24rpx;
    }

    .fnav {
        width: 50rpx;
        height: 50rpx;
        margin: 13rpx auto 10rpx;
    }

    .fnav.index {
        background: url(../../static/images/icon/index.png) no-repeat center center;
        background-size: 41rpx 49rpx;
    }

    .fnav.index_now {
        background: url(../../static/images/icon/index_now.png) no-repeat center center;
        background-size: 41rpx 49rpx;
    }

    .fnav.scanning {
        background: url(../../static/images/icon/scanning.png) no-repeat center center;
        background-size: 41rpx 49rpx;
    }

    .fnav.scanning_now {
        background: url(../../static/images/icon/scanning_now.png) no-repeat center center;
        background-size: 41rpx 49rpx;
    }

    .fnav.order {
        background: url(../../static/images/icon/order.png) no-repeat center center;
        background-size: 41rpx 49rpx;
    }

    .fnav.order_now {
        background: url(../../static/images/icon/order_now.png) no-repeat center center;
        background-size: 41rpx 49rpx;
    }

    .fnav.my {
        background: url(../../static/images/icon/my.png) no-repeat center center;
        background-size: 41rpx 49rpx;
    }

    .fnav.my_now {
        background: url(../../static/images/icon/my_now.png) no-repeat center center;
        background-size: 41rpx 49rpx;
    }
</style>
