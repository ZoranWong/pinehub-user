import Model from './Model';
import _ from 'underscore';
import moment from "moment";
import de from "element-ui/src/locale/lang/de";
import {formatMoney, returnFloat} from "../utils";
import ca from "element-ui/src/locale/lang/ca";
import {BAR_MAP} from "element-ui/packages/scrollbar/src/util";
export default class Activity extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            grouponList () {
                return this.state.grouponList
            },
            grouponDetails () {
                return this.state.grouponDetails
            },
            cateProducts () {
                return this.state.cateProducts
            },
            goodInShoppingCart () {
                return this.state.goodInShoppingCart
            },
            cartTotalFeeFormat () {
                return this.state.cartTotalFeeFormat
            },
            totalPrice () {
                return this.state.totalPrice
            },
            createdOrderInfo () {
                return this.state.createdOrderInfo
            },
            details () {
                return this.state.details
            },
            orders () {
                return this.state.orders
            }
        });
    }

    data () {
        // let userInfo = this.service();
        return {
            grouponList: [],
            grouponDetails: {},
            cateProducts: [],
            goodInShoppingCart: [],
            cartTotalFeeFormat: '',
            totalPrice: 0,
            createdOrderInfo: {},
            details: {},
            orders: []
        };
    }

    handleTimer (time) {
        console.log(time, '+++++');
        let now = moment().format('YYYY-MM-DD HH:mm:ss');
        let deadline = moment(time);
        return deadline.diff(now, 'second')
    }

    handleGiftProducts (products) {
        let text = '';
        _.map(products, product => {
            text += `${product['product_entity_info'].name}、`
        });
        text = text.substring(0, text.length - 1);
        return '满100元送' + text
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


    // 监听数据
    listeners () {
        let that = this;
        this.addEventListener('saveGrouponList', function ({list}) {
            _.map(list, item => {
                if (_.find(this.state.grouponList, function (listItem) {
                    return listItem.id === item.id
                })) {
                    return
                }
                let dis = Math.round(item.distance);
                if (dis > 1000) {
                    item.formatDistance = (dis / 1000).toFixed(1) + '千米'
                } else {
                    item.formatDistance = dis + '米'
                }
                if (item['group_products'].length > 3) {
                    item.display_products = item['group_products'].slice(0, 3)
                } else {
                    item.display_products = item['group_products']
                }

                that.state.grouponList.push(item)
            })
        });

        this.addEventListener('saveGrouponDetails', function ({details}) {
            if (details['regiments'].length) {
                _.map(details['regiments'], user => {
                    if (user['order_product']) {
                        let text = '';
                        _.map(user['order_product'], product => {
                            text += `${product.name} X ${product.quantity}、`
                        });
                        text = text.substring(0, text.length - 1);
                        user['purchased_products'] = text || '暂无'
                    }
                })
            };
            details.deadlineTime = this.handleTimer(details['orderable_deadline']);
            details.giftProducts = this.handleGiftProducts(details['gift_products']);
            details.discount = details.discount >= 100 ? '' : details.discount / 10 + '折起';
            this.state.grouponDetails = details;
        });

        this.addEventListener('saveCateProducts', function ({products}) {
            this.state.cateProducts = products
        });

        this.addEventListener('addToShoppingCart', function ({goods}) {
            console.log(goods, '()())((())()((()()');
            let carts = this.state.goodInShoppingCart;
            console.log(carts, '----------');
            let cartIndex = _.findIndex(carts, {product_stock_id: goods['product_stock_id']});
            if (cartIndex < 0) {
                this.state.goodInShoppingCart.push(goods)
            } else {
                this.$application.$vm.set(carts, cartIndex, goods)
            }
            that.calculate(this.state);
        });

        this.addEventListener('removeGoodsFromCart', function ({goods}) {
            let carts = this.state.goodInShoppingCart;
            this.state.goodInShoppingCart = carts.filter(i => i.id !== goods.id);
            that.calculate(this.state);
        });

        this.addEventListener('saveCartGoodsList', function ({products}) {
            let items = products.data;
            let meta = products.meta;
            _.map(items, (i) => {
                i.price = returnFloat(i.price)
            });
            this.state.goodInShoppingCart = items;
            this.state.cartTotalFeeFormat = meta['total_fee'].toFixed(2);
            that.calculate(this.state);
        });

        this.addEventListener('clearShoppingCart', function (checked) {
            this.state.goodInShoppingCart = []
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

        this.addEventListener('saveCreatedOrderInfo', function ({orderInfo}) {
            console.log(orderInfo, ';;;;; order ;;;;;;;');
            this.state.createdOrderInfo = orderInfo
        });

        this.addEventListener('saveGrouponOrders', function ({orders}) {
            _.map(orders, order => {
                let totalQuantity = 0;
                _.map(order.products, product => {
                    totalQuantity += Number(product.quantity)
                });
                order.trade_no = order['trade_no'].slice(-12);
                order.totalQuantity = totalQuantity;
            });
            this.state.orders = orders
        });

        this.addEventListener('saveGrouponOrderDetails', function ({details}) {
            details.trade_no = details['trade_no'].slice(-12);
            this.state.details = details
        });
    }
}
