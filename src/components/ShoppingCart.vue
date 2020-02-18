<!--suppress ALL -->
<template>
    <div>
        <div id="mask" v-if="showGoodsList" @click="closeMask"></div>
        <div id="shopping_cart" :style="{bottom: showMask?'0':'-1000rpx'}">
            <div id="shopping_cart_icon">
                <i class="iconfont" @click="showGoodsList = !showGoodsList">&#xeba9;</i>
            </div>
            <h4><span>{{totalPrice}}</span></h4>
            <button id="shopping_cart_button" @click="settle">去结算</button>
            <div id="shopping_cart_goods" v-if="showGoodsList">
                <div id="shopping_cart_goods_header">
                    <h3>
                        <i class="iconfont">&#xe7c5;</i>
                        已选商品
                    </h3>
                    <h3 @click="clearCart">
                        <i class="iconfont">&#xe6b4;</i>
                        清空
                    </h3>
                </div>
                <ul id="shopping_cart_goods_list" >
                    <li v-for="item in goodInShoppingCart" :key="item.id">
                        <h4>
                            {{item.name}}
                            <span>{{item['spec_desp']}}</span>
                        </h4>
                        <div class="entities">
                            <span>￥{{item['price']}}</span>
                            <i class="iconfont minus" @click="changeBuyNum(item,-1)">&#xe61a;</i>
                            <span>{{item['buy_num']}}</span>
                            <i class="iconfont add" @click="changeBuyNum(item,1)">&#xe6d8;</i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'
    import {formatMoney} from '../utils';
	export default {
		name: 'ShoppingCart',
        props: ['type', 'actId', 'isDetail'],
		data () {
			return {
                showMask: false,
				showGoodsList: false,
				cartGoodsList:[]
            }
		},
        watch: {
		    actId (val) {
                if (this.registered) {
                    this.$command('LOAD_ACTIVITY_CART_COMMAND', this.type, val)
                }
            }
        },
        computed : {
			goodInShoppingCart(){
				let products = [];
				if(this.type === 'mall') {
					products = this.model.user.store.goodInShoppingCart
                } else if (this.type === 'breakfast') {
					products = this.model.newEvents.shoppingCarts.goodInShoppingCart
                } else if (this.type === 'activity') {
                    products = this.model.activity.goodInShoppingCart
                }
                console.log(products, '----------- products ----------');
                if(products){
					this.showMask = products.length ? true : false;
                }
				return products
			},
            totalPrice () {
				if (this.type === 'mall') {
					return this.model.user.store.totalPrice;
                } else if (this.type === 'breakfast') {
					return this.model.newEvents.shoppingCarts.totalPrice
                } else if (this.type === 'activity') {
                    return this.model.activity.totalPrice;
                }
            },
			registered () {
				return this.model.account.registered;
			},
        },
		created () {

		},
		methods: {
            settle(){
			    let self = this;
			    wx.getSetting({
                    async success (res) {
                        if (res.authSetting && res.authSetting['scope.userLocation']) {
                            self.goPayment();
                        } else {
                            wx.showModal({
                                title: '是否授权当前位置',
                                content: '需要获取您的地理位置，请确认授权，否则将无法下单',
                                success: function (tip) {
                                    if (tip.confirm) {
                                        wx.openSetting({
                                            success: function (data) {
                                                if (data.authSetting["scope.userLocation"] === true) {
                                                    wx.showToast({
                                                        title: '授权成功',
                                                        icon: 'success',
                                                        duration: 1000
                                                    })
                                                    self.goPayment();
                                                } else {
                                                    wx.showToast({
                                                        title: '授权失败',
                                                        icon: 'success',
                                                        duration: 1000
                                                    })
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            },
            goPayment () {
                if (this.type === 'mall') {
                	this.model.user.store.dispatch('selectPoints', {
                		boolean: true,
                        type: this.type
                	})
                } else if (this.type === 'breakfast') {
                	console.log('这是早餐车的购物车');
                	this.model.newEvents.shoppingCarts.dispatch('selectPoints', {
                		boolean: true,
                		type: this.type
                	})
                } else if (this.type === 'activity') {
                    this.$command('REDIRECT_TO', 'user.activity.payment', 'push',{
                        query: {type: this.type, actId: this.actId}
                    });
                }
            },
			closeMask(){
				this.showGoodsList = false;
            },
			clearCart () {
				this.showMask = false;
				this.showGoodsList = false;
				if (this.type === 'mall') {
					this.$command('CLEAR_CART_COMMAND');
                } else if (this.type === 'breakfast') {
					this.$command('CLEAR_BREAKFAST_CART_COMMAND')
                } else if (this.type === 'activity') {
                    this.$command('CLEAR_ACTIVITY_CART_COMMAND', this.actId)
                }

            },
			changeBuyNum (item,num) {
				let newNum = item['buy_num'] + num;
				if (this.type === 'mall') {
					this.$command('CHANGE_BUY_NUM_COMMAND',item, newNum)
				} else if (this.type === 'breakfast') {
					this.$command('CHANGE_BREAKFAST_BUY_NUM_COMMAND', item, newNum)
				} else if (this.type === 'activity') {
                    this.$command('CHANGE_ACTIVITY_BUY_NUM_COMMAND',item, newNum, this.actId)
                }
            }
        },
        mounted () {
            if (this.registered) {
                if (this.type !== 'activity') {
                    this.$command('LOAD_CART_COMMAND', this.type)
                }
                if (this.isDetail) {
                    this.$command('LOAD_ACTIVITY_CART_COMMAND','', this.actId);
                }
            }
		}
	}
</script>

<style>
    #mask{
        width: 100%;
        height: 100%;
        background: rgba(17,17,17,0.3);
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }

    #shopping_cart {
        position: fixed;
        display: flex;
        height: 98rpx;
    }

    #shopping_cart #shopping_cart_goods {
        position: absolute;
        bottom: 99rpx;
        width: 100%;
        background: transparent;
        z-index: 10;
    }

    #shopping_cart #shopping_cart_goods_header{
        width: 100%;
        height: 68rpx;
        box-sizing: border-box;
        padding: 0 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f2f2f2;
    }

    #shopping_cart #shopping_cart_goods_list li{
        box-sizing: border-box;
        width: 100%;
        height: 108rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0 40rpx;
    }

    #shopping_cart #shopping_cart_goods_list h4 {
        font-size: 28rpx;
        color: #111111;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        font-weight: normal;
        flex-direction: column;
    }

    #shopping_cart #shopping_cart_goods_list h4 span {
        font-size: 22rpx;
        color: #757575;
    }

    #shopping_cart #shopping_cart_goods_list .entities{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #shopping_cart #shopping_cart_goods_list .entities span{
        font-size: 32rpx;
        color: #111111;
    }

    #shopping_cart #shopping_cart_goods_list .entities .minus{
        font-size: 48rpx;
        color: #757575;
        margin: 0 26rpx 0 50rpx;
    }

    #shopping_cart #shopping_cart_goods_list .entities .add{
        font-size: 48rpx;
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        margin-left: 26rpx;
    }

    #shopping_cart #shopping_cart_goods_header h3{
        font-size: 24rpx;
        color: #111111;
        display: flex;
    }

    #shopping_cart #shopping_cart_goods_header h3 i{
        font-size: 30rpx;
        color: #7b7b7b;
        margin-right: 14rpx;
    }

    #shopping_cart #shopping_cart_icon {
        position: absolute;
        left: 40rpx;
        bottom: 10rpx;
        width: 98rpx;
        height: 98rpx;
        border-radius: 50%;
        border: 6rpx solid #333;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    #shopping_cart #shopping_cart_icon i {
        font-size: 48rpx;
        color: #333333;
    }


    #shopping_cart h4 {
        flex: 1;
        background: #333333;
        color: #fff;
        font-size: 36rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }

    #shopping_cart h4 span {
        display: inline-block;
        margin-right: 100rpx;
    }

    #shopping_cart #shopping_cart_button {
        width: 170rpx;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0;
        font-size: 32rpx;
        color: #fff;
        font-weight: bold;
        border: 0;
        background: linear-gradient(to right, #FDE068, #FFCC00);
    }
</style>
