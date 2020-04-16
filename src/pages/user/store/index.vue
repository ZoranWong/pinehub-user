<!--suppress ALL -->
<template>
    <div id="user_store" class="body">
        <CustomHeader :title="title" :needReturn="true" :backUrl="true" @back="backIndex" />
        <Auth v-if="getAuth" @close="closeAuth" />
        <GetUserMobile v-if="showBindMobile" @close="closeGetUserMobile" />
        <div id="store_header" >
            <input type="text" placeholder="请输入商品名称" id="store_search" v-model="search">
            <i class="iconfont" @click="handleSearch">&#xe65c;</i>
<!--            <ProductSearch :products="searchResult" />-->
        </div>
        <div id="store_goods" :style="{'height' : listHeight + 'px'}">
            <ul id="store_goods_type" :style="{'height' : listHeight + 'px'}">
                <li
                  v-for="item in categories"
                  :key="item.id"
                  :class="item.id == activeTab ? 'active': ''"
                  @click="tabSelect(item.id)"
                >
                    {{item.name}}
                </li>
            </ul>
            <div class="store_goods_items_box" :style="{'height' : listHeight + 'px'}">
                <ul id="store_goods_items" >
                    <li v-for="item in goods" :key="index"  @click="redirectTo('user.goodDetail', {query: {type:'mall', good_id: item.id}})">
                        <div class="thumb_img">
                            <img :src="item.main_image" alt="">
                        </div>
                        <div class="selledout" v-if="!item.stock">
                            <span class="selloutConent">已抢光</span>
                        </div>
                        <div id="store_good_info">
                            <div class="store_good_info_title">
                                <h3>{{item.name}}</h3>
                            </div>
                            <div class="intro">
                                {{item.intro || ''}}
                            </div>
                            <div id="store_good_info_entities">
                                <span>销量:{{item.sell_num}}</span>
                                <span v-if="item.stock < 6  && item.stock > 0" class="stock">仅剩{{item.stock}}件</span>
                            </div>
                            <span id="store_good_info_spec" v-if="item.specifications.length">规格：{{item.spec}}</span>
                            <div v-if="showOperation(item)"></div>
                            <div id="store_good_info_price">
                                <span>{{item.sell_price_format}}</span>
                                <em v-if="item['show_market_price'] && !item.specifications.length" >{{item.origin_price_format}}</em>
                                <div class="operation">
<!--                                    <img src="../../../../static/icons/minus.png" alt="" v-if="item.isInCart" @click.stop="addToShoppingCart(item, -1)">-->
<!--                                    <input type="number" v-if="item.isInCart" :value="item.inputNum" class="input" @click.stop.native="changeBuyNum" @blur="(e)=>changeItemBuyNum(e, item)"  >-->
                                    <img src="../../../../static/icons/add.png" alt="" v-if="item.stock" @click.stop="addToShoppingCart(item, 1)">
                                    <img src="../../../../static/icons/disabledAdd.jpg" v-else alt="">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
        <FooterNav :navName="navName" />
<!--        <ShoppingCart v-if="registered && isMember" :type="'mall'"/>-->
        <SelectSpecification
            :selectSpec="selectSpec"
            :item="selectItem"
            :type="'mall'"
            @close="closeSelectSpec" />
    </div>
</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';
    import Auth from '../../../components/Auth';
	import ShoppingCart from '@/components/ShoppingCart';
	import ChooseSelfRaisingPoint from '@/components/ChooseSelfRaisingPoint';
	import SelectSpecification from '@/components/SelectSpecification';
	import _ from 'underscore'
    import ProductSearch from './components/ProductSearch';
	import GetUserMobile from '../../../components/GetUserMobile';
	import FooterNav from '../../../components/FooterNav';
  export default {
      components: {
		  CustomHeader,
          ShoppingCart,
          SelectSpecification,
		  ChooseSelfRaisingPoint,
		  Auth,
          ProductSearch,
          GetUserMobile,
          FooterNav
      },
      data() {
          return {
              title: '商城',
              navName: 'store',
              activeTab:'',
			  selectSpec:false,
			  selectItem:{},
			  getAuth: false,
              screenHeight: 0,
              queryCateId: '',
              search: '',
              searchResult: [],
              showBindMobile: false
          };
      },
      onShareAppMessage: function (res) {
          //可以先看看页面数据都有什么，得到你想要的数据
          console.log(this.shopCode, '==========>');
          return {
              title: "青松易购预定商城",
              desc: "青松易购小程序",
              imageUrl: "",
              path: `/pages/user/store/main?backHome=${true}&shop_code=${this.storeId || this.shopCode}`,

              success: function (res) {
                  // 转发成功
                  console.log("转发成功:" + JSON.stringify(res));
              },
              fail: function (res) {
                  // 转发失败
                  console.log("转发失败:" + JSON.stringify(res));
              }
          }
      },
      watch: {
		  activeTab(val) {
              if(val){
                  this.$command('LOAD_STORE_COMMAND',val,1)
              }
          },
		  isMember (value) {
			  if (value) {
			  }
		  },
          registered (val) {
              if (val) {
                  this.getAuth = false;
              }
          },
          queryCateId (val) {
              if (val) {
                  this.tabSelect(val)
              }
          },
          categories (val) {
              if(val && val.length && !this.queryCateId){
                  console.log('进来了吗');
                  this.activeTab = val[0].id

              }
          }
      },
      computed: {
          showOperation(item){
              if (this.model.user.store.goodInShoppingCart && !this.model.user.store.goodInShoppingCart.length) {
                 return function (item) {
                     item.inputNum = 0
                     item.isInCart = false
                     item.isInCartProduct = {}
                 }
              }
              return function (item) {
                  let products = this.model.user.store.goodInShoppingCart;
                  let isInCart = false
                  if (item['product_entities']) {
                      for (let i = 0; i < item['product_entities'].length; i++) {
                          for (let k = 0; k < products.length; k++) {
                              let product = products[k];
                              let entity = item['product_entities'][i];
                              if (product['product_entity_id'] === entity.id) {
                                  item.inputNum = product['buy_num']
                                  item.isInCart = true
                                  item.isInCartProduct = product
                                  break;
                              } else {
                                  item.isInCart = false
                              }
                          }
                      }
                  }

              }
          },
          shopCode () {
              return this.model.account.shopCode
          },
          categories(){
            return this.model.user.store.categories;
          },
          goods(){
			  return this.model.user.store.goods
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
		  registered () {
			  return this.model.account.registered;
		  },
		  isMember () {
			  return this.model.account.isMember;
		  },
          mainHeight() {
              let systemInfo = wx.getSystemInfoSync();
              let height = systemInfo.windowHeight;
              return height - this.headerHeight;
          },
          btnHeight() {
              let systemInfo = wx.getSystemInfoSync();
              return 216 * systemInfo.windowWidth / 750;
          },
          listHeight() {
              return this.mainHeight  - this.btnHeight
          }
      },
      onShow () {
          this.queryCateId = ''
      },
      methods: {
          closeGetUserMobile () {
              this.showBindMobile = false
          },
          backIndex () {
              this.$command('REDIRECT_TO', 'index', 'replace', {});
          },
          async handleSearch () {
              let result = await this.http.store.productsSearch(this.search)
              if (result) {
                  this.searchResult = result;
              }
          },
          changeBuyNum (e) {
              console.log(e, '==========>');
          },
          changeItemBuyNum (e, item) {
              let value = e.target.value;
              if (value <= 0 || !value) {
                  value = 0;
              };
              if (value > item.isInCartProduct['stock_num']) {
                  value = item.isInCartProduct['stock_num']
              }
              this.$command('CHANGE_BUY_NUM_COMMAND',item['isInCartProduct'],  Number(value),'mall');
          },
          async uploadFormId (e) {
              let formId = e.mp.detail.formId;
              if (formId !== "the formId is a mock one"){
                  await this.http.account.saveFormId(formId);
              } else {
                  console.log('form id 不合法')
              }
          },
		  getPhoneNumber (e) {
              console.log(e, '----------------store---------------');
              this.$command('SET_USER_MOBILE', e);
		  },
		  getUserAuth () {
			  this.getAuth = true
		  },
		  closeAuth () {
			  this.getAuth = false
		  },
          tabSelect(id){
              console.log('我变我变我变我变我变我变我变我变我变我变');
              this.activeTab = id;
			  // this.$command('LOAD_STORE_COMMAND',id, 1)
          },
          setData(data){
              this.data = data
          },
        addToShoppingCart(item, num){
            if (!this.registered) {
		  		this.getUserAuth()
            } else {
                if (!this.isMember) {
                    this.showBindMobile = true
				} else {
					if (item.specifications.length) {
						this.selectItem = item;
						this.selectSpec = true
					} else {
						let goods = this.model.user.store.goodInShoppingCart;
						if (goods.length) {
						    let isInCart = false;
						    let inCartProduct = {}
                            for (let i = 0; i < goods.length; i++) {
                                let product = goods[i];
                                if (product['product_stock_id'] === item['product_entities'][0]['product_stock_id']) {
                                    isInCart = true
                                    inCartProduct = product;
                                    break
                                } else {
                                    isInCart = false
                                }
                            }
                            if (isInCart) {
                                this.$command('CHANGE_BUY_NUM_COMMAND',inCartProduct,inCartProduct['buy_num'] + num,'mall');
                            } else {
                                this.$command('ADD_GOODS_TO_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1,'mall')
                            }
						} else {
							this.$command('ADD_GOODS_TO_CART_COMMAND',item['product_entities'][0]['product_stock_id'],1,'mall')
						}

					}
                }

            }
        },
		  closeSelectSpec(){
              this.selectSpec = false
          },
		  redirectTo (router, options = {}) {
			  this.$command('REDIRECT_TO', router, 'push', options);
		  },
          async initAccount () {
              await this.$store.dispatch('model.account/resetFromCache', {
                  initAccount: async () => {
                      if (((this.accessTokenTTL - Date.now()) <= 0) || !this.accessToken) {
                          await this.$command('APP_ACCESS');
                      } else {
                          this.$command('SIGN_IN', this.accessToken);
                      }
                  }
              });
          }
      },
      created() {
      },
      onShow () {
          let pages =  getCurrentPages();
          let options = pages[pages.length - 1]['options'];
          this.storeId = options['shop_code'] ? options['shop_code'] : '';
          if (this.storeId) {
              this.model.account.dispatch('saveShopCode', {
                  code: this.storeId
              })
          }
          if (this.storeId && this.registered && this.isMember ) {
              this.$command('BIND_CONSUMER', this.storeId)
          }
      },
      mounted() {
          let rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
          let screenWitdh = wx.getSystemInfoSync().windowHeight;
          this.screenHeight = (rpxRate * screenWitdh)/ 2;
          this.initAccount()
          this.$command('LOAD_STORE_CATEGORIES_COMMAND')
          if (this.$route.query && this.$route.query.cateId) {
              this.queryCateId = this.$route.query.cateId
          }
          this.model.user.store.dispatch('selectPoints', {
              boolean: false,
              type: 'mall'
          })
	  }
	}
</script>

<style>
	page {
        height: 100%;
        background: #fff;
    }

	#footNavHeight {
        height: 109rpx;
	}

    #user_store{
        height: 100%;
        overflow-y: hidden;
        background: #fff;
    }

  #select_spec{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99999999;
  }

  #shopping_cart{
      position: fixed;
      width: 100%;
      transition: 1s;
      z-index: 9999;
  }

  #store_header{
      box-sizing: border-box;
      width: 100%;
      height: 108rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      border-bottom: 2rpx solid #f2f2f2;
      position: relative;
  }

  #store_header #products{
      position: absolute;
      top: 108rpx;
  }

  #store_header #store_search {
      width: 630rpx;
      height: 70rpx;
      background: #f2f2f2;
      border-radius: 10rpx;
      padding: 0 40rpx;
      font-size: 28rpx;
  }

  #store_header i{
      position: absolute;
      right: 70rpx;
      top: 34rpx;
      font-size: 40rpx;
      color: #757575;
      z-index: 1000;
  }

  #store_goods {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      overflow-y: auto;
  }

  #store_goods #store_goods_type {
      flex: 1;
      height: 1250rpx;
      width: 150rpx;
      overflow-x: hidden;
      overflow-y: scroll;
      background: #f2f2f2;
  }

  #store_goods #store_goods_type li {
    width: 150rpx;
    height: 120rpx;
    font-size: 28rpx;
    color: #111111;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  #store_good_info_spec{
      font-size: 22rpx;
      color: #757575;
  }

  #store_goods #store_goods_type .active{
      background: #fff;
      border-left: 12rpx solid #ffcc00;
      font-weight: 800;
  }

  .store_goods_items_box{
      width: 600rpx;
      overflow-y: auto;
      overflow-x: hidden;
  }

  #store_goods #store_goods_items{
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;

  }

  #store_goods #store_goods_items li{
    width: 560rpx;
      height: 232rpx;
    padding: 20rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2rpx solid #f2f2f2;
      position: relative;
  }

    #store_goods #store_goods_items .thumb_img{
        margin-right: 30rpx;
        width: 190rpx;
        height: 190rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #store_goods #store_goods_items .thumb_img img{
        width: 100%;
        height: 100%;
    }

    .selledout{
        position: absolute;
        width: 190rpx;
        height: 85%;
        top: 20rpx;
        left: 20rpx;
        background: rgba(255,255,255,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .selloutConent{
        width: 50%;
        height: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        background: rgba(0,0,0,0.4);
        color: #fff;
        font-size: 24rpx;
        margin-top: 70rpx;
    }

  #store_goods #store_goods_items #store_good_info{
      flex: 1;
  }

    #store_goods #store_goods_items .store_good_info_title{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #store_goods #store_goods_items .store_good_info_title span{
        font-size: 24rpx;
        color: #757575;
        margin-right: 40rpx;
    }

    #store_goods #store_goods_items .intro{
        height: 36rpx;
        font-size: 24rpx;
        color: #757575;
        width: 310rpx;
        overflow:hidden; /*超出宽度部分的隐藏*/
        white-space:nowrap; /*文字不换行*/
        text-overflow:ellipsis; /*超出则...代替*/

    }

  #store_goods #store_goods_items #store_good_info h3{
      font-size: 28rpx;
      color: #111111;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_entities span{
      font-size: 22rpx;
      color: #757575;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_entities .stock{
      margin-left: 30rpx;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_price{
      width: 100%;
      margin-top: 6rpx;
      display: flex;
      justify-content: space-between;
      padding-right: 20rpx;
      align-items: center;
  }

  .operation{
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .operation img{
      width: 24px;
      height: 24px;
  }

  .operation .input {
      width: 44rpx;
      margin: 0 3rpx;
      border: none;
      text-align: center;
      z-index: 1;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_price span{
      font-size: 32rpx;
      display: inline-block;
      height: 100%;
      color: #fe4a2c;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_price em {
      font-size: 22rpx;
      color: #757575;
      display: inline-block;
      height: 100%;
      text-decoration: line-through;
  }

  #store_goods #store_goods_items #store_good_info #store_good_info_price .add{
      background: linear-gradient(to right,#FDE068,#FFCC00);
      -webkit-background-clip: text;
      color: transparent;
      font-size: 48rpx;
  }

    #store_goods #store_goods_items #store_good_info #store_good_info_price .minus{
        font-size: 48rpx;
    }

  .disabledAdd{
      color: #e5e5e5;
        font-size: 48rpx;
      margin-right: 20rpx;
      margin-left: 70rpx;
  }

    .user-mobile-box{
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .user-mobile-box .user_mobile_box_container{
        position: absolute;
        background: #FFFFFF;
        width: 620rpx;
        border-radius: 10rpx;
        top: 338rpx;
        left: 65rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .user-mobile-get-btn {
        height: 80rpx;
        width: 320rpx;
        text-align: center;
        line-height: 80rpx;
        background: #FECE00;
        margin-top: 80rpx;
        margin-bottom: 40rpx;
        display: block;
        font-size: 32rpx;
        font-weight: 200;
        border: 0;
        border-radius: 80rpx;
        box-shadow: 0 10rpx 10rpx #fff6bd;
    }

    .mobile_box_tips {
        text-align: center;
        line-height: 96rpx;
        border-radius: 10rpx 10rpx 0 0;
        font-size: 29rpx;
        font-weight: 400;
    }


</style>
