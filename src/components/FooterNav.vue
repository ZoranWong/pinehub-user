<template>
    <div id="footNav">
        <ul>
            <li @click="jump('index')">
<!--                <i class="iconfont now" >&#xe6bb;</i>-->
                <img src="../../static/icons/aHome.jpg" class="newIndexIcon" alt="" v-if="index === 'index_now'">
                <div v-else>
                    <img src="../../static/icons/menuHome.png" alt="" >
                    <em :class="index === 'index_now'?'active':''">主页</em>
                </div>

            </li>
<!--            <li @click="jump('user.store')">-->

<!--                <i class="iconfont now" v-if="scanning === 'scanning_now'">&#xe6b9;</i>-->
<!--                <i class="iconfont" v-else>&#xe7d6;</i>-->
<!--                <em :class="scanning === 'scanning_now'?'active':''">商城</em>-->
<!--            </li>-->


            <li @click="jump('user.store') ">
                <!--                <i class="iconfont now" v-if="pickup === 'pickup_now'">&#xe778;</i>-->
                <img src="../../static/icons/cate_active.jpg" alt="" v-if="store === 'store_now'">
                <img src="../../static/icons/cate.jpg" alt="" v-else>
                <!--                <i class="iconfont" v-else>&#xe7e4;</i>-->
                <em :class="store === 'store_now'?'active':''">分类</em>
            </li>
            <li @click="jump('user.shoppingCart') ">
                <span  :class="amountClass" v-if="amount">{{amount}}</span>
                <!--                <i class="iconfont now" v-if="pickup === 'pickup_now'">&#xe778;</i>-->
                <img src="../../static/icons/selected_cart.png" alt="" v-if="shoppingCart === 'shoppingCart_now'">
                <img src="../../static/icons/uncheck_cart.png" alt="" v-else>
                <!--                <i class="iconfont" v-else>&#xe7e4;</i>-->
                <em :class="shoppingCart === 'shoppingCart_now'?'active':''">购物车</em>
            </li>
            <li @click="jump('user.pickup') ">
                <!--                <i class="iconfont now" v-if="pickup === 'pickup_now'">&#xe778;</i>-->
                <img src="../../static/icons/menuPickAct.png" alt="" v-if="pickup === 'pickup_now'">
                <img src="../../static/icons/menuPick.png" alt="" v-else>
                <!--                <i class="iconfont" v-else>&#xe7e4;</i>-->
                <em :class="pickup === 'pickup_now'?'active':''">取货</em>
            </li>
            <li @click=" jump('userCenter') ">
<!--                <i class="iconfont now" >&#xe735;</i>-->
                <img src="../../static/icons/menuMineAct.png" alt="" v-if="my === 'my_now'">
                <img src="../../static/icons/menuMine.png" alt="" v-else>
<!--                <i class="iconfont" v-else>&#xe7d5;</i>-->
                <em :class="my === 'my_now'?'active':''">我的</em>
            </li>
        </ul>
    </div>
</template>

<script>
    import _ from 'underscore'
    export default {
        name: 'FooterNav',
        props: ['navName'],
        data () {
            return {
                navName: '',
                index: 'index',
                scanning: 'scanning',
                pickup: 'pickup',
                my: 'my',
                store: 'store',
                shoppingCart: 'shoppingCart',
            };
        },
        components: {
        },
        computed: {
			registered () {
				return this.model.account.registered;
			},
            isMember () {
                return this.model.account.isMember;
            },
            goodInShoppingCart () {
                return this.model.user.store.goodInShoppingCart
            },
            amount () {
                let amount = 0;
                _.map(this.goodInShoppingCart, (items) => {
                    if (items.selected > 0) {
                        amount += Number(items['buy_num'])
                    }
                });
                amount = amount > 99 ? '99+' : amount;
                return amount
            },
            amountClass () {
                if (String(this.amount).length > 2) {
                    return 'overWidthAmount'
                } else {
                    return 'numbers'
                }
            },
        },
        mounted () {
            if (this.registered && this.isMember) {
                this.$command('LOAD_CART_COMMAND', 'mall')
            }
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
                    case 'shoppingCart':
                        this.shoppingCart = 'shoppingCart_now';
                        break;
                    case 'store':
                        this.store = 'store_now';
                        break;
                    default:
                        this.index = 'index_now';
                        break;
                }
            },
            jump (router) {
				console.log(router, '+++++');
				if ((router === 'user.pickup' || router === 'user.shoppingCart') && !this.registered) {
            		this.$emit('getUserAuth')
                } else {
                    if ((router === 'user.pickup' || router === 'user.shoppingCart') && !this.isMember) {
                        wx.showToast({
                            title: '请先进行手机号授权',
                            icon: 'none'
                        })
                    } else {
                        this.$command('REDIRECT_TO', router, 'reLaunch');
                    }
                }
            },
            notMember () {
                wx.showToast({
                    title: '请绑定手机号码',
                    icon: 'none'
                });
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
        width: 20%;
        float: left;
        height: 88rpx;
        padding: 10rpx 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        position: relative;
    }

    .numbers{
        width: 40rpx;
        height: 40rpx;
        background: #fe4a2c;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 32rpx;
        z-index: 10001;
        position: absolute;
        top: 10rpx;
        right: 20rpx;
    }

    #footNav .overWidthAmount{
        width: 55rpx;
        height: 40rpx;
        background: #fe4a2c;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 32rpx;
        position: absolute;
        right: -15rpx;
        top: 10rpx;
        z-index: 10001;
    }

    #footNav .overWidthAmount:before{
        content: '';
        width: 10px;
        height: 20px;
        background: #fe4a2c;
        border-radius: 50%;
        position: absolute;
        left: -20rpx;
        border-radius:  10px 0 0 10px ;
    }

    #footNav .overWidthAmount:after{
        content: '';
        width: 10px;
        height: 20px;
        background: #fe4a2c;
        position: absolute;
        right: -20rpx;
        border-radius: 0 10px 10px 0;
    }

    #footNav ul li em {
        text-align: center;
        color: #757575;
        font-size: 20rpx;
        font-weight: 200;
        line-height: 24rpx;
    }
    #footNav ul li img {
        width: 48rpx;
        height: 48rpx;
    }



    #footNav ul li .active {
        text-align: center;
        color: #ffcc00;
        font-size: 20rpx;
        font-weight: 200;
        line-height: 24rpx;
    }

    #footNav ul li i {
        font-size: 48rpx;
        color: #757575;
    }

    #footNav ul li .now {
        font-size: 48rpx;
        background: linear-gradient(to right, #FDE068, #FFCC00);
        -webkit-background-clip: text;
        color: transparent;
    }

    .newIndexIcon{
        width: 80rpx!important;
        height: 80rpx!important;
    }


</style>
