<!--suppress ALL -->
<template>
    <div>
        <div id="mask" v-if="showGoodsList" @click="closeMask"></div>
        <div id="shopping_groupon_cart" :style="{bottom: showMask?'0':'-1000rpx'}">
            <div id="shopping_cart_icon">
                <i class="iconfont" @click="showGoodsList = !showGoodsList" :style="{color: '#fe4a2c'}">&#xe613;</i>
                <span  :class="amountClass">{{amount}}</span>
            </div>
            <h4>
                <span>{{totalPrice}}</span>
                <span class="sendPrice" v-if="floor > 0">(满{{floor}}元起订)</span>
            </h4>
            <button id="shopping_cart_button" :class="!isEnough  ? 'disabledButton': ''" @click="settle" >去结算</button>
            <div id="shopping_cart_goods" v-if="showGoodsList">
                <div id="shopping_cart_goods_header">
                    <h3>
                        <img src="../../../../../static/icons/minus.png" alt="">
                        已选商品
                    </h3>
                    <h3 @click="clearCart">
                        <img src="../../../../../static/icons/rubbish.png" alt="">
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
                            <img v-if="item['total_fee']" src="../../../../../static/icons/minus.png" alt=""  @click="changeBuyNum(item,-1)">
                            <input v-if="item['total_fee']" v-model="item['buy_num']" class="cartInput" type="number" @change="(e)=>changeInputBuyNum(e,item)" />
                            <span v-else class="gift">{{item['buy_num']}}</span>
                            <img v-if="item['total_fee']" src="../../../../../static/icons/add.png" alt="" @click="changeBuyNum(item,1)">
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="pickupTips" v-if="showTips">
            <div class="pickupTipsContainer">
                <div class="header">提示</div>
                <div class="tips">
                    购物车中的以下商品已下架，将为您删除下列商品:
                    <span v-for="item in invalidProducts" :key="item.id">{{item.name}}</span>
                </div>
                <div class="operation">
                    <button @click="showTips = false">取消</button>
                    <button @click="deleteProducts">好的</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'
    import {formatMoney} from '../../../../utils';
	export default {
		name: 'ShoppingCart',
        props: ['shoppingGroupId', 'floor','isRemarkRequired','remarkName'],
		data () {
			return {
                showMask: false,
				showGoodsList: false,
                showTips: false,
                invalidProducts: []
            }
		},
        watch: {
            goodInShoppingCart (val) {
                console.log(val, '++++_+_+_+__++_+_+_+_)_JKJJKHJHHJ');
                if (!val.length) {
		            this.showGoodsList = false
                }
            }
        },
        computed : {
            amountClass () {
                if (String(this.amount).length > 2) {
                    return 'overWidthAmount'
                } else {
                    return 'amount'
                }
            },
			goodInShoppingCart(){
				let products = this.model.groupon.goodInShoppingCart
                if(products){
					this.showMask = products.length ? true : false;
                }
				return products
			},
            amount () {
			    let amount = 0;
			    _.map(this.goodInShoppingCart, (items)=>{
			        amount += Number(items['buy_num'])
                })
                return amount
            },
            totalPrice () {
                return this.model.groupon.totalPrice;
            },
			registered () {
				return this.model.account.registered;
			},
            cartTotalFeeFormat () {
                return this.model.groupon.cartTotalFeeFormat
            },
            isEnough () {
                return this.cartTotalFeeFormat > this.floor
            }
        },
		created () {

		},
		methods: {
            redirectTo (router) {
                this.$command('REDIRECT_TO', router, 'push');
            },
            changeInputBuyNum (e, item) {
                let value = e.target.value;
                let stock = item['stock_num'] || item.stock;
                if (value <= 0) value = 0;
                if (value > stock) value = stock;
                this.$command('CHANGE_GROUPON_BUY_NUM_COMMAND',item,this.shoppingGroupId, Number(value))
            },
            settle(){
                if (!this.isEnough) return ;
			    let self = this;
			    wx.getSetting({
                    async success (res) {
                        if (res.authSetting && res.authSetting['scope.userLocation']) {
                            //self.checkProductStatus();
                            self.goPayment()
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
                                                    //self.checkProductStatus();
                                                    self.goPayment()
                                                } else {
                                                    wx.showToast({
                                                        title: '授权失败',
                                                        icon: 'none',
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
            checkProductStatus () {
                this.invalidProducts = [];
                this.showGoodsList = false;
                let products = this.goodInShoppingCart;
                _.map(products, product => {
                    if (product['product_status'] !== 1) {
                        this.invalidProducts.push(product)
                    }
                })
                if (!this.invalidProducts.length) {
                    this.goPayment()
                }
                // this.goPayment()
            },
            deleteProducts () {
                _.map(this.invalidProducts, async (product) => {
                    // if (this.type === 'mall') {
                    //     await this.$command('CHANGE_BUY_NUM_COMMAND',product, 0)
                    // } else if (this.type === 'breakfast') {
                    //     await this.$command('CHANGE_BREAKFAST_BUY_NUM_COMMAND', product, 0)
                    // } else if (this.type === 'activity') {
                    //     await this.$command('CHANGE_ACTIVITY_BUY_NUM_COMMAND',product, 0, this.actId)
                    // }
                });
                if (this.goodInShoppingCart.length) {
                    setTimeout(()=>{
                        this.goPayment()
                    }, 500)
                } else {
                    this.showTips = false
                }
            },
            goPayment () {
                this.$command('REDIRECT_TO', 'user.groupon.order.payment', 'push', {
                    query: {
                        shoppingGroupId: this.shoppingGroupId
                    }
                });
            },
			closeMask(){
				this.showGoodsList = false;
				let carts = this.goodInShoppingCart;
                _.map(carts, (cart) => {
                    let stock = cart['stock_num'] || cart.stock;
                    let num = cart['buy_num'];
                    if (num > stock) num = stock;
                    this.$command('CHANGE_GROUPON_BUY_NUM_COMMAND',item,this.shoppingGroupId, num)
                })
            },
			clearCart () {
				this.showMask = false;
				this.showGoodsList = false;
                this.$command('CLEAR_GROUPON_CART_COMMAND',this.shoppingGroupId);
            },
			changeBuyNum (item,num) {
				let newNum = item['buy_num'] + num;
                this.$command('CHANGE_GROUPON_BUY_NUM_COMMAND',item,this.shoppingGroupId, newNum)
            }
        },
        mounted () {
            // this.$command('LOAD_GROUPON_CART_COMMAND', this.shoppingGroupId)
		}
	}
</script>

<style scoped>
    #mask{
        width: 100%;
        height: 100%;
        background: rgba(17,17,17,0.3);
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
    }

    #shopping_groupon_cart {
        position: fixed;
        display: flex;
        height: 98rpx;
        z-index: 2000;
    }

    #shopping_groupon_cart #shopping_cart_goods {
        position: absolute;
        bottom: 99rpx;
        width: 100%;
        background: transparent;
        z-index: 2000;
    }

    #shopping_groupon_cart #shopping_cart_goods_header{
        width: 100%;
        height: 68rpx;
        box-sizing: border-box;
        padding: 0 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f2f2f2;
    }

    #shopping_cart_goods_list{
        max-height: calc(100vh - 300rpx);
        overflow: auto;
    }

    #shopping_cart_goods_header img{
        width: 25rpx;
        height: 30rpx;
        margin-right: 14rpx;
    }

    #shopping_groupon_cart #shopping_cart_goods_list li{
        box-sizing: border-box;
        width: 100%;
        height: 108rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 0 40rpx;
    }

    #shopping_groupon_cart #shopping_cart_goods_list h4 {
        font-size: 28rpx;
        color: #111111;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        font-weight: normal;
        flex-direction: column;
    }

    #shopping_groupon_cart #shopping_cart_goods_list h4 span {
        font-size: 22rpx;
        color: #757575;
    }

    #shopping_groupon_cart #shopping_cart_goods_list .entities{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #shopping_groupon_cart #shopping_cart_goods_list .entities img{
        width: 24px;
        height: 24px;
    }

    #shopping_groupon_cart #shopping_cart_goods_list .entities span{
        font-size: 32rpx;
        color: #111111;
        margin-right: 50rpx;
    }

    #shopping_groupon_cart #shopping_cart_goods_list .entities .gift{
        width: 210rpx;
        margin-right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cartInput{
        width: 70rpx;
        text-align: center;
        border: 1px solid #f2f2f2;
        font-size: 32rpx;
        color: #111;
        margin: 0 20rpx;
    }

    #shopping_groupon_cart #shopping_cart_goods_list .entities .minus{
        font-size: 48rpx;
        color: #757575;
        margin: 0 26rpx 0 50rpx;
    }

    #shopping_groupon_cart #shopping_cart_goods_list .entities .add{
        font-size: 48rpx;
        background: linear-gradient(to right,#FDE068,#FFCC00);
        -webkit-background-clip: text;
        color: transparent;
        margin-left: 26rpx;
    }

    #shopping_groupon_cart #shopping_cart_goods_header h3{
        font-size: 24rpx;
        color: #111111;
        display: flex;
    }

    #shopping_groupon_cart #shopping_cart_goods_header h3 i{
        font-size: 30rpx;
        color: #7b7b7b;
        margin-right: 14rpx;
    }

    #shopping_groupon_cart #shopping_cart_icon {
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
        z-index: 10002;
    }

    #shopping_groupon_cart #shopping_cart_icon i {
        font-size: 52rpx;
        color: #333333;
    }

    #shopping_groupon_cart .amount{
        width: 40rpx;
        height: 40rpx;
        background: #fe4a2c;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 32rpx;
        position: absolute;
        right: -14rpx;
        top: -6rpx;
        z-index: 10001;
    }

    #shopping_groupon_cart .overWidthAmount{
        width: 80rpx;
        height: 40rpx;
        border-radius: 9999rpx;
        background: #fe4a2c;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 32rpx;
        position: absolute;
        right: -26rpx;
        top: -13rpx;
        z-index: 10001;
    }

    /*#shopping_groupon_cart .overWidthAmount:before{*/
    /*    content: '';*/
    /*    width: 10px;*/
    /*    height: 20px;*/
    /*    background: #fe4a2c;*/
    /*    border-radius: 50%;*/
    /*    position: absolute;*/
    /*    left: -20rpx;*/
    /*    border-radius:  10px 0 0 10px ;*/
    /*}*/

    /*#shopping_groupon_cart .overWidthAmount:after{*/
    /*    content: '';*/
    /*    width: 10px;*/
    /*    height: 20px;*/
    /*    background: #fe4a2c;*/
    /*    position: absolute;*/
    /*    right: -20rpx;*/
    /*    border-radius: 0 10px 10px 0;*/
    /*}*/


    #shopping_groupon_cart h4 {
        flex: 1;
        background: #333333;
        color: #fff;
        font-size: 36rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }

    #shopping_groupon_cart h4 span {
        display: inline-block;

    }

    .sendPrice{
        font-size: 22rpx;
        color: #999;
        font-style: normal;
        margin-left: 20rpx;
        transform: translateY(5rpx);
    }

    #shopping_groupon_cart #shopping_cart_button {
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

    .pickupTips {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .pickupTips .pickupTipsContainer{
        width: 630rpx;
        background: #fff;
        border-radius: 10rpx;
        padding: 0 50rpx;
        box-sizing: border-box;
    }

    .pickupTips .header{
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111;
    }

    .pickupTips .tips{
        font-size: 28rpx;
        color: #111111;
        margin-top: 20rpx;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 20rpx;
    }

    .pickupTips .tips span {
        color: red;
        font-weight: bold;
    }

    .pickupTips .operation{
        width: 100%;
        margin-bottom: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pickupTips .operation button {
        flex: 1;
        margin-right: 10rpx;
        color: #FFCC00;
        border-radius: 10rpx;
        background: #fff;
        border:1px solid #ffcc00;
        font-size: 32rpx;
    }
    .pickupTips .operation button:last-child{
        margin-right: 0;
        background: #FFCC00;
        color: #fff;
    }


    .disabledButton{
        background: #999!important;
        color: #fff!important;
    }



</style>
