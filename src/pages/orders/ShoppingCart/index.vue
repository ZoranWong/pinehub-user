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
                            <img v-if="selectedAll" src="./img/selected.png" alt="">
                            <img v-else src="./img/uncheck.png" alt="">
                        </div>
                        <h3>青松食品</h3>
                    </li>
                    <li >
                        <ProductComponents
                            v-for="product in products" :key="product.id"
                            :product="product"
                            @changeBuyNum="changeBuyNum"
                            @changeInputBuyNum="changeInputBuyNum"
                            @check="check"
                        />
                    </li>
                </ul>
                <ul class="unenough" v-if="unenoughProducts.length">
                    <li class="title">
                        <span>已失效</span>
                        <h3>商品因库存原因无法购买</h3>
                        <div class="line"></div>
                    </li>
                    <li v-for="product in unenoughProducts" :key="product.id">
                        <div class="top">
                            <div class="icon" @click="checkUnenough(product)">
                                <img v-if="product.checked > 0" src="img/selected.png" alt="">
                                <img v-else src="img/uncheck.png" alt="">
                            </div>
                            <div class="product">
                                <img :src="product.image" class="image" alt="">
                                <div class="info">
                                    <h4>{{product.name}}</h4>
                                    <span>{{product.intro}}</span>
                                    <div class="tags" v-if="product.tags && product.tags.length">
                                        {{product.tags[0]}}
                                    </div>
                                    <div class="price">
                                        <div class="left">
                                            ￥
                                            <h5>{{product.price}}</h5>

                                        </div>
                                        <div class="right">
                                            <img src="img/minus.png" alt=""  >
                                            <input v-model="product['unenoughNum']"  type="number" :disabled="true" />
                                            <img src="img/add.png" alt="" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="desc" v-if="product.desc && product['discount_amount'] > 0">
                            <div class="descContainer">
                                <img src="../../../../static/icons/newArrow.jpg" alt="">
                                <span class="icon"> 促销</span>
                                <span class="info">{{product.desc}}</span>
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
                    <img v-if="selectedAll" src="img/selected.png" alt="">
                    <img v-else src="img/uncheck.png" alt="">
                </div>
                <span>全选</span>
            </div>
            <div class="right">
                <span class="total">合计:</span>
                <em>￥</em>
                <h4>{{cartTotalFeeFormat}}</h4>
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


        <div class="pickupTips" v-if="showDiff">
            <div class="pickupTipsContainer">
                <div class="header">提示</div>
                <div class="tips">
                    下列活动商品被人捷足先登，您将以原价购买:
                    <span v-for="item in differentProduct" :key="item.id">
                        名称：{{item.name}}
                        数量：{{item.diff}}
                    </span>
                </div>
                <div class="operation">
                    <button @click="refreshCart">取消</button>
                    <button @click="diffOnPayment">好的</button>
                </div>
            </div>
        </div>


        <FooterNav :navName="navName" />
    </div>
</template>

<script>
    import CustomHeader from '../../enties/index/components/CustomHeader';
    import FooterNav from '../../../components/FooterNav';
    import _ from 'underscore'
    import RecommendProducts from '../../../components/RecommendProducts';
    import ProductComponents from './components/ProductComponent';
    export default {
		name: 'ShoppingCart',
        data () {
		    return {
		        title: '青松易购',
                navName: 'shoppingCart',
                selectedAll: true,
                products: [],
                showTips: false,
                showDiff: false,
                invalidProducts: [],
                differentProduct: [],
                unenoughProducts: []
            }
        },
        watch: {
            products (val, old) {
                if (val.length) {
                    let index = _.findIndex(val, (product) => {
                        return !product.selected
                    });
                    this.selectedAll = !(index > -1);
                }
            },
            invalidProducts (val) {
                if (val.length) {
                    this.showTips = true
                } else {
                    this.showTips = false
                }
            },
            differentProduct (val) {
                if (val.length) {
                    this.showDiff = true
                } else {
                    this.showDiff = false
                }
            }
            // categories (val) {
            //     if (val.length) {
            //         console.log('购物车加载加载加载加载加载');
            //         this.$command('LOAD_STORE_COMMAND', val[0].id, 1)
            //     }
            // },
        },
        components: {CustomHeader, FooterNav, RecommendProducts, ProductComponents},
        computed: {
		    total () {
                let products = this.products;
                let price = 0;
                let quantity = 0;
                _.map(products, (product) => {
                    if (product.selected > 0) {
                        price += Number(product['price']) * Number(product['buy_num'])
                        quantity += Number(product['buy_num'])
                    }
                });
                price = price.toFixed(2)
                return {price, quantity}
            },
            statusBarHeight () {
                return this.model.global.barHeight.statusBarHeight
            },
            cartTotalFeeFormat () {
		        return this.model.user.store.cartTotalFeeFormat
            },
            navHeight () {
                return this.model.global.barHeight.navHeight
            },
            headerHeight () {
                return this.statusBarHeight + this.navHeight;
            },
            btnHeight () {
                let systemInfo = wx.getSystemInfoSync();
                return 306 * systemInfo.windowWidth / 750;
            },
            mainHeight () {
                let systemInfo = wx.getSystemInfoSync();
                let height = systemInfo.windowHeight;
                return height - this.headerHeight - this.btnHeight;
            },
            goodInShoppingCart () {
                this.products = this.model.user.store.goodInShoppingCart;
                return this.model.user.store.goodInShoppingCart
            },
            categories () {
                return this.model.user.store.categories;
            }
        },
        methods: {
            // handlePrice (total, price) {
            //     let formatPrice = total - price;
            //     let result = formatPrice.toFixed(2)
            //     return formatPrice.toFixed(2);
            // },
             clearCart  () {
                let clear = [];
                _.map(this.products, (product) => {
                    if (product.selected) {
                        clear.push(product)
                    }
                });
                let checked = [];
                _.map(this.unenoughProducts, (product) => {
                    if (product.checked) {
                        checked.push(product)
                    }
                });

                 if (clear.length && checked.length) {
                    this.$command('CLEAR_CART_COMMAND', clear);
                     this.unenoughProducts = this.unenoughProducts.filter((product) => !product.checked);
                } else if (clear.length && !checked.length) {
                     this.$command('CLEAR_CART_COMMAND', clear);
                } else if (!clear.length && checked.length) {
                     this.unenoughProducts = this.unenoughProducts.filter((product) => !product.checked);
                 } else {
                     wx.showToast({
                         title: '您尚未选中商品',
                         icon: 'none'
                     });
                 }
            },
            checkProductStatus () {
                this.invalidProducts = [];
                let products = this.products;
                _.map(products, (product) => {
                    if (product['product_status'] !== 1) {
                        this.invalidProducts.push(product)
                    }
                })
                if (!this.invalidProducts.length) {
                    this.checkActProductsIsEnough()
                }
                // this.goPayment()
            },
            refreshCart () {
                this.showDiff = false;
                this.init()
            },
            diffOnPayment () {
                this.goPayment()
            },
            async checkActProductsIsEnough () {
                let checked = [];
                let products = this.goodInShoppingCart;
                _.map(products, (product, index) => {
                    if (product.selected) {
                        checked.push(product.id)
                    }
                });
                let carts = await this.http.store.cartGoodsList(checked, true);
                let prevProducts = this.goodInShoppingCart;
                let newProducts = carts.data;
                let differentProduct = [];
                _.map(prevProducts, (pProduct) => {
                    _.map(newProducts, (nProduct) => {
                        if (pProduct.selected && nProduct.selected && pProduct.id === nProduct.id && pProduct['act_num'] !== nProduct['act_num']) {
                            differentProduct.push({
                                name: nProduct.name,
                                diff: pProduct['act_num'] - nProduct['act_num']
                            })
                        }
                    })
                })
                if (differentProduct.length) {
                    this.differentProduct = differentProduct;
                } else {
                    this.goPayment()
                }
            },
            goPayment () {
                let selectedProduct = [];
                _.map(this.products, (product) => {
                    if (product.selected > 0) {
                        let obj = {};
                        obj['cart_id'] = product.id;
                        obj['remark'] = '123'
                        selectedProduct.push(obj)
                    }
                })
                this.$command('REDIRECT_TO', 'user.order.payment', 'push', {
                    query: {type: 'mall', selectedProduct}
                });
            },
            deleteProducts () {
                _.map(this.invalidProducts, async (product) => {
                    await this.$command('CHANGE_BUY_NUM_COMMAND', product, 0)
                });
                if (this.products.length) {
                    setTimeout(() => {
                        this.checkActProductsIsEnough()
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
                                                if (data.authSetting['scope.userLocation'] === true) {
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
		    async init () {
                console.log('想休息休息');
                await this.$command('LOAD_CART_COMMAND', 'mall')
                // if (this.categories.length) {
                //     this.$command('LOAD_STORE_COMMAND', this.categories[0].id, 1)
                // } else {
                //     await this.$command('LOAD_STORE_CATEGORIES_COMMAND');
                //     this.$command('LOAD_STORE_COMMAND', this.categories[0].id, 1)
                // }
                let checked = [];
                let products = this.goodInShoppingCart;
                _.map(products, (product, index) => {
                    checked.push(product.id)
                });
                this.$command('LOAD_CART_COMMAND', 'mall', checked, true)
            },
            changeBuyNum (item, num) {
                let newNum = item['buy_num'] + num;
                this.$command('CHANGE_BUY_NUM_COMMAND', item, newNum)
            },
            changeInputBuyNum (e, item) {
                let value = e.target.value;
                let stock = item['stock_num'] || item.stock;
                if (value <= 0) value = 0;
                if (value > stock) value = stock;
                this.$command('CHANGE_BUY_NUM_COMMAND', item, Number(value))
            },
            check (product) {
                let checked = _.map(this.products, (item, index) => {
                    if (product.id === item.id) {
                        item.selected = !item.selected;
                    }
                    return [item.id, item.selected]
                }).filter(function (item) {
                    return item[1];
                }).map(function (item) {
                    return item[0];
                })
                this.$command('LOAD_CART_COMMAND', 'mall', checked, true)
            },
            checkAll () {
                let checked = [];
                let products = this.products;
                _.map(products, (product, index) => {
                    // product.checked = !this.selectedAll
                    // this.$set(products, index, product)
                    checked.push(product.id)
                });
                this.selectedAll = !this.selectedAll;
                let ary = this.selectedAll ? checked : [];
                this.$command('LOAD_CART_COMMAND', 'mall', ary, true)
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
                        this.$command('CHANGE_BUY_NUM_COMMAND', inCartProduct, inCartProduct['buy_num'] + 1, 'mall');
                    } else {
                        this.$command('ADD_GOODS_TO_CART_COMMAND', id, 1, 'mall')
                    }
                } else {
                    this.$command('ADD_GOODS_TO_CART_COMMAND', id, 1, 'mall');
                }
            },
            checkUnenough (product) {
                product.checked = !product.checked;
            }
        },
        mounted () {
            this.init();
            let unenoughProducts = [];
            _.map(this.products, (product) => {
                if (product['buy_num'] > product['stock_num']) {
                    product.unenoughNum = product['buy_num'] - product['stock_num'];
                    product.checked = false
                    unenoughProducts.push(product);
                    this.$command('CHANGE_BUY_NUM_COMMAND', product, product['stock_num'])
                }
            })
            this.unenoughProducts = unenoughProducts;
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
        overflow: hidden;
    }

    .fullCart ul {
        width: 100%;
    }

    .fullCart ul .icon{
        width: 108rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
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
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        margin-bottom: 40rpx;
    }

    .fullCart>ul li:first-child{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 30rpx;
        flex-direction: row;
    }

    .fullCart ul li:last-child{
        margin-bottom: 20rpx;
    }

    .fullCart ul li:nth-child(2){
        margin-top: 30rpx;
    }

    .fullCart ul li .top{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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

    .fullCart ul li .product .info .price .left .tags{
        padding: 0 8rpx;
        color: #FB4E26;
        border-radius: 5rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1rpx solid #FFB7A9;
        margin-left: 4rpx;
        font-weight: normal;
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

    .fullCart ul li .desc{
        color: red;
    }

    .fullCart .desc{
        width: 100%;
        padding-left: 96rpx;
        box-sizing: border-box;
        margin-top: 30rpx;
        padding-right: 30rpx;
    }

    .fullCart .desc .descContainer{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        background: #F7F8FA;
        box-sizing: border-box;
        padding: 14rpx;
        position: relative;
        font-size: 22rpx;
        color: #333;
        flex-wrap: wrap;
    }

    .fullCart .desc .descContainer img{
        position: absolute;
        top: -10rpx;
        left: 30rpx;
        width: 20rpx;
        height: 10rpx;
    }

    .fullCart .desc .descContainer .icon{
        width:48rpx;
        height: 100%;
        background:rgba(254,219,213,1);
        border-radius:3rpx;
        font-size:20rpx;
        font-weight:500;
        color:rgba(254,54,12,1);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 14rpx;
    }

    .fullCart .desc .descContainer .info{
        flex: 1;
    }

    .fullCart .unenough{
        width: 100%;
        background: #FCFCFC;
        box-sizing: border-box;
        padding: 0 30rpx;
        padding-bottom: 30rpx;
    }

    .fullCart .unenough .title{
        width: 100%;
        height: 90rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 0!important;
        position: relative;
    }

    .fullCart .unenough .line{
        position: absolute;
        top: 0;
        right: -30rpx;
        width:614rpx;
        height:2rpx;
        background: #f2f2f2;
    }

    .fullCart .unenough .title span{
        font-size: 18rpx;
        padding: 5rpx 9rpx;
        color: #fff;
        background: #FB4E26;
        border-radius: 5rpx;
    }

    .fullCart .unenough .title h3{
        margin: 0;
        margin-left: 11rpx;
        color: #111;
        font-size: 22rpx;
    }

    .fullCart .unenough li:nth-child(2){
        margin-top: 0;
    }

</style>
