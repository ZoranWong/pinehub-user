<!--suppress ALL -->
<template>
    <div class="shoppingCart">
        <CustomHeader :title="title" :needReturn="false" :backColor="'#fff'" />
        <div class="cartHeader">
            <img src="./img/shopping_cart.png" alt="">
            <span>购物车</span>
            <h3 @click="clearCart">删除</h3>
        </div>
        <div class="shoppingContainer" :style="{'height':  mainHeight + 'px' }">
            <div class="emptyCart" v-if="!products.length">
                <img src="./img/Empty_shopping_cart.png" alt="">
                <h4>购物车空空如也</h4>
            </div>
            <div class="fullCart" v-else>
                <ul>
                    <li class="header">
                        <div class="icon" @click="checkAll">
                            <img v-if="selectedAll" src="./img/selected.png"  alt="">
                            <img v-else src="./img/uncheck.png"  alt="">
                        </div>
                        <h3>青松食品</h3>
                    </li>
                    <li v-for="product in products" :key="product.id">
                        <div class="icon" @click="check(product)">
                            <img v-if="product.checked" src="./img/selected.png"  alt="">
                            <img v-else src="./img/uncheck.png"  alt="">
                        </div>
                        <div class="product">
                            <img :src="product.image" class="image" alt="">
                            <div class="info">
                                <h4>{{product.name}}</h4>
                                <span>{{product.intro}}</span>
                                <div class="price">
                                    <div class="left">
                                        ￥
                                        <h5>{{product.price}}</h5>
                                    </div>
                                    <div class="right">
                                        <img src="./img/subtract.png" alt=""  @click="changeBuyNum(product,-1)">
                                        <input v-model="product['buy_num']"  type="number" @change="(e)=>changeInputBuyNum(e,product)" />
                                        <img src="./img/add.png" alt="" @click="changeBuyNum(product,1)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="recommend">
                <h3 class="recommendHeader">猜你喜欢</h3>
                <RecommendProducts @addToCart="addToCart" />
            </div>
        </div>



        <div class="settle">
            <div class="left">
                <div class="icon" @click="checkAll">
                    <img v-if="selectedAll" src="./img/selected.png"  alt="">
                    <img v-else src="./img/uncheck.png"  alt="">
                </div>
                <span>全选</span>
            </div>
            <div class="right">
                <span class="total">合计:</span>
                <em>￥</em>
                <h4>{{total.price}}</h4>
                <button
                    :class="total.quantity === 0? 'disabled': ''"
                    @click="settle"
                >去结算 <span v-if="total.quantity">({{total.quantity}})</span></button>
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



        <FooterNav :navName="navName" />
    </div>
</template>

<script>
    import CustomHeader from '../index/components/CustomHeader';
    import FooterNav from '../../../components/FooterNav';
    import _ from 'underscore'
    import RecommendProducts from '../../../components/RecommendProducts';
    export default {
		name: 'ShoppingCart',
        data() {
		    return {
		        title: '青松易购',
                navName: 'shoppingCart',
                selectedAll: true,
                products: [],
                showTips: false,
                invalidProducts: []
            }
        },
        watch: {
            products (val,old) {
                if (val.length) {
                    let index = _.findIndex(val, product => {
                        return !product.checked
                    });
                    this.selectedAll = index > -1 ? false : true
                }
            },
            invalidProducts (val) {
                if (val.length) {
                    this.showTips = true
                } else {
                    this.showTips = false
                }
            },
            categories (val) {
                if (val.length) {
                    this.$command('LOAD_STORE_COMMAND', val[0].id, 1)
                }
            },
        },
        components: {CustomHeader,FooterNav,RecommendProducts},
        computed: {
		    total () {
                let products = this.products;
                let price = 0;
                let quantity = 0;
                _.map(products, (product)=>{
                    if (product.checked) {
                        price += Number(product['price']) * Number(product['buy_num'])
                        quantity += Number(product['buy_num'])
                    }
                });
                price = price.toFixed(2)
                return {price,quantity}
            },
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
            headerHeight() {
                return this.statusBarHeight + this.navHeight;
            },
            btnHeight() {
                let systemInfo = wx.getSystemInfoSync();
                return 306 * systemInfo.windowWidth / 750;
            },
            mainHeight() {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight - this.btnHeight;
            },
            goodInShoppingCart () {
                this.products = this.model.user.store.goodInShoppingCart;
                return this.model.user.store.goodInShoppingCart
            },
            categories(){
                return this.model.user.store.categories;
            },
        },
        methods : {
            clearCart () {
                let clear = [];
                _.map(this.products, product => {
                    if (product.checked) {
                        clear.push(product)
                    }
                })
                if ( clear.length ) {
                    this.$command('CLEAR_CART_COMMAND', clear);
                }
            },
            checkProductStatus () {
                this.invalidProducts = [];
                let products = this.products;
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
            goPayment () {
                let selectedProduct = [];
                _.map(this.products, product => {
                    if (product.checked) {
                        let obj = {};
                        obj['cart_id'] = product.id;
                        obj['remark'] = '123'
                        selectedProduct.push(obj)
                    }
                })
                this.$command('REDIRECT_TO', 'user.order.payment', 'push',{
                    query: {type: 'mall', selectedProduct}
                });
            },
            deleteProducts () {
                _.map(this.invalidProducts, async (product) => {
                    await this.$command('CHANGE_BUY_NUM_COMMAND',product, 0)
                });
                if (this.products.length) {
                    setTimeout(()=>{
                        this.goPayment()
                    }, 500)
                } else {
                    this.showTips = false
                }
            },
            settle () {
                if (!this.total.quantity) return
                let self = this;
                wx.getSetting({
                    async success (res) {
                        if (res.authSetting && res.authSetting['scope.userLocation']) {
                            self.checkProductStatus();
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
                                                    self.checkProductStatus();
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
		    init () {
                this.$command('LOAD_CART_COMMAND', 'mall')
                this.$command('LOAD_STORE_CATEGORIES_COMMAND');
            },
            changeBuyNum (item,num) {
                let newNum = item['buy_num'] + num;
                this.$command('CHANGE_BUY_NUM_COMMAND',item, newNum)
            },
            changeInputBuyNum (e, item) {
                let value = e.target.value;
                let stock = item['stock_num'] || item.stock;
                if (value <= 0) value = 0;
                if (value > stock) value = stock;
                this.$command('CHANGE_BUY_NUM_COMMAND',item, Number(value))
            },
            check (product) {
                let products = this.products;
                let index = _.findIndex(products, good => {
                    return good.id === product.id
                });
                if (index > -1) {
                    products[index].checked = !product.checked;
                    this.$set(products, index, products[index])
                };
            },
            checkAll () {
                let products = this.products;
                _.map(products, (product,index) => {
                    product.checked = !this.selectedAll
                    this.$set(products, index, product)
                })
            },
            addToCart (id) {
                let goods = this.model.user.store.goodInShoppingCart;
                if (goods.length) {
                    let isInCart = false;
                    let inCartProduct = {}
                    for (let i = 0; i < goods.length; i++) {
                        let product = goods[i];
                        if (product['product_stock_id'] === id) {
                            isInCart = true
                            inCartProduct = product;
                            break
                        } else {
                            isInCart = false
                        }
                    }
                    if (isInCart) {
                        this.$command('CHANGE_BUY_NUM_COMMAND',inCartProduct,inCartProduct['buy_num'] + 1,'mall');
                    } else {
                        this.$command('ADD_GOODS_TO_CART_COMMAND',id,1,'mall')
                    }
                } else {
                    this.$command('ADD_GOODS_TO_CART_COMMAND',id,1,'mall');
                }
            },
        },
        mounted () {
            this.init()
        }
	}
</script>

<style scoped>
    .cartHeader{
        width: 100%;
        height: 88rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border-bottom: 1rpx solid #ebebeb;
    }

    .cartHeader img {
        margin-right: 16rpx;
        width: 32rpx;
        height: 32rpx;
    }

    .cartHeader span{
        font-size: 32rpx;
        color: #111;
    }

    .cartHeader h3{
        position: absolute;
        right: 40rpx;
        font-size: 32rpx;
        color: #757575;
    }

    .shoppingContainer{
        background: #F4F1F4;
        box-sizing: border-box;
        padding: 20rpx;
        overflow: auto;
    }

    .shoppingContainer .recommendHeader{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30rpx;
        margin-top: 50rpx;
        font-size: 32rpx;
        color: #111;
        font-weight: normal;
    }

    .settle{
        width: 100%;
        box-sizing: border-box;
        padding: 0 40rpx;
        height: 120rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        position: fixed;
        bottom: 108rpx;
        z-index: 9999;
        box-shadow: 0px -2px 4px 0px rgba(242,242,242,1);;
    }

    .settle .left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .settle .icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .settle .left img{
        width: 36rpx;
        height: 36rpx;
        margin-right: 16rpx;
    }

    .settle .left span{
        font-size: 28rpx;
        color: #111;
    }

    .settle .right{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .settle .right .total{
        font-size: 22rpx;
        color: #999;
    }

    .settle .right em{
        font-style: normal;
        font-weight: bold;
        font-size: 30rpx;
        color: #FC3C2F;
    }

    .settle .right h4{
        font-size: 36rpx;
        color: #FC3C2F;
        margin: 0;
    }

    .settle .right button{
        height: 96rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111;
        background: #ffcc00;
        margin-left: 20rpx;
    }

    .disabled{
        background: #f2f2f2!important;
        color: #999!important;
    }

    .emptyCart{
        width: 100%;
        height: 328rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #fff;
        border-radius: 25rpx;
    }

    .emptyCart img {
        width: 250rpx;
        height: 192rpx;
    }

    .emptyCart h4{
        font-size: 28rpx;
        color: #111;
        font-weight: normal;
        margin: 0;
    }

    .fullCart{
        width: 100%;
        background: #fff;
        border-radius: 25rpx;
        padding-bottom: 10rpx;
    }

    .fullCart ul {
        width: 100%;
    }

    .fullCart ul .icon{
        width: 96rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fullCart ul .icon img {
        width: 36rpx;
        height: 36rpx;
    }

    .fullCart ul .header {
        width: 100%;
        height: 100rpx;
    }

    .fullCart ul .header h3{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 30rpx;
        color: #111;
        margin: 0;
        font-weight: bold;
        border-bottom: 2rpx solid #f2f2f2;
    }

    .fullCart ul li{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 40rpx;
    }

    .fullCart ul li:first-child{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 30rpx;
    }

    .fullCart ul li:last-child{
        margin-bottom: 20rpx;
    }

    .fullCart ul li:nth-child(2){
        margin-top: 30rpx;
    }

    .fullCart ul li .product{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        padding-right: 30rpx;
    }

    .fullCart ul li .product .image{
        width: 140rpx;
        height: 140rpx;
        border-radius: 10rpx;
        border: 1rpx solid #f2f2f2;
    }

    .fullCart ul li .product .info {
        flex: 1;
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

    .fullCart ul li .product .info h4{
        font-size: 28rpx;
        color: #111;
        font-weight: normal;
        margin: 0;
    }

    .fullCart ul li .product .info span{
        margin: 10rpx 0;
        font-size: 24rpx;
        color: #757575;
    }

    .fullCart ul li .product .info .price{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .fullCart ul li .product .info .price .left{
        font-size: 24rpx;
        color: #FC3C2F;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .fullCart ul li .product .info .price .left h5{
        font-size: 32rpx;
        color: #FC3C2F;
        font-weight: bold;
    }

    .fullCart ul li .product .info .price .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .fullCart ul li .product .info .price .right img{
        width: 48rpx;
        height: 48rpx;
    }

    .fullCart ul li .product .info .price .right input{
        width: 70rpx;
        text-align: center;
        font-size: 32rpx;
        color: #111;
    }

</style>
