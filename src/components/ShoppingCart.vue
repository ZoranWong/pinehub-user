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
        props: ['type'],
		data () {
			return {
                showMask: false,
				showGoodsList: false,
				cartGoodsList:[]
            }
		},
        computed : {
			goodInShoppingCart(){
				let products = [];
				if(this.type === 'mall') {
					products = this.model.user.store.goodInShoppingCart
                } else {
					products = this.model.newEvents.shoppingCarts.goodInShoppingCart
                }
				if(products){
					this.showMask = products.length ? true : false;
                }
				return products
			},
            totalPrice () {
				if (this.type === 'mall') {
					return this.model.user.store.totalPrice;
                } else {
					return this.model.newEvents.shoppingCarts.totalPrice
                }
            }
        },
		created () {

		},
		methods: {
			settle(){
				console.log(this.type, '111111111111111111');
				if (this.type === 'mall') {
					this.model.user.store.dispatch('selectPoints', {
						boolean: true,
                        type: this.type
					})
                } else {
					this.model.newEvents.shoppingCarts.dispatch('selectPoints', {
						boolean: true,
						type: this.type
					})
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
                } else {
					this.$command('CLEAR_BREAKFAST_CART_COMMAND')
                }

            },
			changeBuyNum (item,num) {
				let newNum = item['buy_num'] + num;
				if (this.type === 'mall') {
					this.$command('CHANGE_BUY_NUM_COMMAND',item,newNum)
				} else {
					this.$command('CHANGE_BREAKFAST_BUY_NUM_COMMAND', item, newNum)
				}
            }
        },
        mounted () {
			this.$command('LOAD_CART_COMMAND', this.type)
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
