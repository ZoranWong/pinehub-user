import Model from './Model'
import _ from 'underscore';
import ShoppingCartTransformer from './transformers/ShoppingCart';
import {formatMoney} from '../utils';

export default class ShoppingCarts extends Model {
    constructor (application) {
        super(application);
        this.id = Math.random() * 1000000000;
        this.transformer = ShoppingCartTransformer;
    }

    // 购物车内的相关数据计算
    computed () {
        return _.extend(super.computed(), {
            usedTicketTitle () {
                return this.state.ticketTitle;
            },
            cardId () {
                return this.state.cardId;
            },
            ticketCode () {
                return this.state.ticketCode;
            },
            totalAmount () {
                //  计算总价
                let total = 0;
                this.list().forEach((item) => {
                    total += item.sellPrice * item.count;
                });
                return total.toFixed(2);
            },
            paymentAmount () {
                let total = 0;
                this.list().forEach((item) => {
                    total += item.sellPrice * item.count;
                });
                let amount = (total * this.state.discount) - this.state.reduceCost;
                return amount.toFixed(2);
            },
            list (state) {
                return _.flatten(state.list);
            },
            groupList (state) {
                let list = this.list();
                let newList = _.groupBy(list, function (n) {
                    return n.batch
                });
                return newList;
            },
            quality () {
                return (id, batch = null) => {
                    let where = {};
                    where['merchandiseId'] = id;
                    if (batch) where['batch'] = batch;
                    let cart = _.findWhere(this.list(), where);
                    return cart ? cart.count : 0;
                }
            },
            shoppingCartId () {
                return (id, batch = null) => {
                    let where = {};
                    where['merchandiseId'] = id;
                    if (batch) where['batch'] = batch;
                    let cart = _.findWhere(this.list(), where);
                    return cart ? cart.id : null;
                }
            },
            totalCount () {
                let total = 0;
                this.list().forEach((item) => {
                    total += item.count;
                })
                return total;
            },
            goodInShoppingCart () {
                return this.state.goodInShoppingCart
            },
            totalPrice () {
                return this.state.totalPrice
            },
            showPoints () {
                return this.state.showPoints
            },
            breakfastType () {
                return this.state.breakfastType
            },
            cartTotalFeeFormat () {
                return this.state.cartTotalFeeFormat
            }
        });
    }
    
    calculate (state) {
        let data = state.goodInShoppingCart;
        if (_.isEmpty(data)) return;
        let totalPrice = 0;
        _.map(data, (item) => {
            totalPrice += (Number(item['price']) * Number(item['buy_num']))
        });
        
        state.totalPrice = formatMoney(totalPrice);
    }
    
    data () {
        let data = _.extend(super.data(), {
            activityId: null,
            shopId: null,
            ticketCode: null,
            cardId: null,
            discount: 1,
            reduceCost: 0,
            ticketTitle: null,
            goodInShoppingCart: [],
            totalPrice: 0,
            selectedPoint: {},
            showPoints: false,
            breakfastType: '',
            cartTotalFeeFormat: ''
        });
        this.rebuildData();
        return data;
    }

    async rebuildData () {
        let data = await this.getCache();
        _.extend(this.state, data);
    }

    async cache () {
        return await this.service('mp.storage').set('shoppingCarts', this.state);
    }

    async getCache () {
        return await this.service('mp.storage').get('shoppingCarts');
    }

    listeners () {
        super.listeners();
        let that = this;
        // 设置列表
        this.addEventListener('setList', (payload, state /* paylaod */) => {
            this.setList(payload, state);
            this.cache();
        });

        // 使用优惠券
        this.addEventListener('setTicketCard', function ({
            ticketCode,
            cardId,
            discount = 1,
            reduceCost = 0,
            title = null
        }) {
            this.state.reduceCost = reduceCost;
            this.state.discount = discount;
            this.state.ticketCode = ticketCode;
            this.state.cardId = cardId;
            this.state.ticketTitle = title;
        });

        this.addEventListener('saveBreakfastCartGoodsList', function ({products}) {
            let items = products.data;
            let meta = products.meta;
            _.map(items, (i) => {
                if (i.specifications.length) {
                    let specDesp = [];
                    _.map(i.specifications, (item) => {
                        specDesp.push(item.value.value)
                    });
                    i['spec_desp'] = specDesp.join(',')
                }
            });
            this.state.goodInShoppingCart = items;
            this.state.cartTotalFeeFormat = meta['total_fee_format'];
            that.calculate(this.state);
        });
        
        this.addEventListener('addMerchandiseToShoppingCart', function ({goods}) {
            let carts = this.state.goodInShoppingCart;
            let cartIndex = _.findIndex(carts, {product_stock_id: goods['product_stock_id']});
            if (goods.specifications.length) {
                let specDesp = [];
                _.map(goods.specifications, (item) => {
                    specDesp.push(item.value.value)
                });
                goods['spec_desp'] = specDesp.join(',')
            }
            if (cartIndex < 0) {
                this.state.goodInShoppingCart.push(goods)
            } else {
                this.$application.$vm.set(carts, cartIndex, goods)
            }
            that.calculate(this.state);
        });

        this.addEventListener('changeShoppingCartMerchandise', function ({cart}) {
            let idx = this.state.currentPage > 0 ? (this.state.currentPage - 1) : 0;
            if (this.state.currentPage === 0) {
                this.state.currentPage = 1;
            }
            _.map(this.state.list[idx], function (item) {
                if (item.id === cart.id) {
                    item.count = cart.count;
                }
            });
            this.cache();
            that.calculate(this.state);
        });
    
        this.addEventListener('removeGoodsFromCart', function ({goods}) {
            let carts = this.state.goodInShoppingCart;
            this.state.goodInShoppingCart = carts.filter(i => i.id !== goods.id);
            that.calculate(this.state);
        });
    
        this.addEventListener('changeBuyNum', function ({id, num}) {
            let carts = this.state.goodInShoppingCart;
            let cartIndex = _.findIndex(carts, {id: id});
            if (cartIndex > -1) {
                carts[cartIndex]['buy_num'] = num;
                this.$application.$vm.set(carts, cartIndex, carts[cartIndex])
            };
            that.calculate(this.state);
        });

        this.addEventListener('deleteMerchandiseFromShoppingCart', function () {
            this.state.goodInShoppingCart = []
        });
    
        this.addEventListener('selectPoints', function ({boolean, type}) {
            this.state.showPoints = boolean;
            this.state.breakfastType = type
        });
        
        this.addEventListener('saveSelectedPoint', function ({point}) {
            this.state.selectedPoint = point;
        });
        
        // 清空购物车
        this.addEventListener('reset', function ({
             activity = false,
             shop = false
        }) {
            this.state.list = [];
            if (activity) {
                this.state.activityId = null;
            }

            if (shop) {
                this.state.shopId = null;
            }

            this.state.pageCount = 0;
            this.state.currentPage = 0;
            this.state.totalNum = 0;
            this.state.totalPage = 0;
            this.state.reduceCost = 0;
            this.state.discount = 1;
            this.state.ticketCode = null;
            this.state.cardId = null;
            this.cache()
        });
    }
}
