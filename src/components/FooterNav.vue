<template>
    <div id="footNav">
        <ul>
            <li @click="jump('index')">
                <i class="iconfont now" v-if="index === 'index_now'">&#xe6bb;</i>
                <i class="iconfont" v-else>&#xe7d4;</i>
                <em :class="index === 'index_now'?'active':''">首页</em>
            </li>
            <li @click="jump('user.store')">
                <i class="iconfont now" v-if="scanning === 'scanning_now'">&#xe6b9;</i>
                <i class="iconfont" v-else>&#xe7d6;</i>
                <em :class="scanning === 'scanning_now'?'active':''">商城</em>
            </li>

            <li @click="jump('user.pickup')">
                <i class="iconfont now" v-if="pickup === 'pickup_now'">&#xe778;</i>
                <i class="iconfont" v-else>&#xe7e4;</i>
                <em :class="pickup === 'pickup_now'?'active':''">取货</em>
            </li>
            <li @click="jump('userCenter')">
                <i class="iconfont now" v-if="my === 'my_now'">&#xe735;</i>
                <i class="iconfont" v-else>&#xe7d5;</i>
                <em :class="my === 'my_now'?'active':''">我的</em>
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
				pickup: 'pickup',
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
                    case 'pickup':
                        this.pickup = 'pickup_now';
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
                this.$command('REDIRECT_TO', router, 'push');
            }
        },
        created () {
            this.nowNav(this.navName);
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
        height: 88rpx;
        padding: 10rpx 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
    }

    #footNav ul li em {
        text-align: center;
        color: #757575;
        font-size: 20rpx;
        font-weight: 200;
        line-height: 24rpx;
    }

    #footNav ul li .active {
      text-align: center;
      color: #ffcc00;
      font-size: 20rpx;
      font-weight: 200;
      line-height: 24rpx;
    }

    #footNav ul li i{
        font-size: 48rpx;
        color :#757575;
    }

    #footNav ul li .now{
        font-size: 48rpx;
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
    }


</style>
