import Model from './Model';
import _ from 'underscore';
import moment from 'moment';
import {formatMoney, returnFloat} from '../utils';

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
            },
            products () {
                return this.state.products
            },
            orderInfo () {
                return this.state.orderInfo
            },
            couponIds () {
                return this.state.ids
            },
            availableCoupons () {
                return this.state.availableCoupons
            },
            grouponCouponIds () {
                return this.state.ids
            },
            shopGrouponList () {
                return this.state.shopGrouponList
            },
            shopInfo () {
                return this.state.shopInfo
            },
            remarkInfo () {
                return this.state.remarkInfo
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
            orders: [],
            products: [],
            orderInfo: {},
            availableCoupons: [],
            ids: [],
            shopGrouponList: [],
            shopInfo: {},
            remarkInfo: {}
        };
    }

    handleTimer (time) {
        console.log(time, '+++++');
        let now = moment().format('YYYY-MM-DD HH:mm:ss');
        let deadline = moment(time);
        return deadline.diff(now, 'second')
    }

    handleGiftProducts (products, floor) {
        let text = '';
        _.map(products, (product) => {
            text += `${product['product_entity_info'].name}、`
        });
        text = text.substring(0, text.length - 1);
        return `满${floor}元送` + text
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
        super.listeners();
        this.addEventListener('saveGrouponList', function ({list}) {
            if (_.isEmpty(list) && this.state.grouponList.length) {
                while (this.state.grouponList.length) {
                    this.state.grouponList.pop()
                }
                while (this.state.products.length) {
                    this.state.products.pop();
                }
            } else {
                _.map(list, (item) => {
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
                    _.map(item['group_products'], (product) => {
                        if (_.find(this.state.products, function (p) {
                            return p.name === product.name
                        })) return;
                        this.state.products.push(product)
                    });
                    console.log('------------------------- save group list -----------------');
                    this.state.grouponList.push(item)
                })
            }
        });

        this.addEventListener('saveGrouponDetails', function ({details}) {
            if (details['regiments'].length) {
                _.map(details['regiments'], (user) => {
                    if (user['order_product']) {
                        let text = '';
                        _.map(user['order_product'], (product) => {
                            text += `${product.name} X ${product.quantity}、`
                        });
                        text = text.substring(0, text.length - 1);
                        user['purchased_products'] = text || '暂无'
                    }
                })
            }
            ;
            // details.deadlineTime = this.handleTimer(details['orderable_deadline']);
            if (details['has_gift']) {
                details.giftProducts = this.handleGiftProducts(details['gift_products'], details['gift_floor']);
            }
            details.discount = details.discount >= 100 ? '' : details.discount / 10 + '折起';
            this.state.remarkInfo.isRemarkRequired = details['is_remark_required'];
            this.state.remarkInfo.remarkName = details['remark_name'];
            this.state.grouponDetails = details;
        });

        this.addEventListener('clearGrouponDetails', function () {
            console.log('清除页面数据');
            this.state.grouponDetails = {};
        });

        this.addEventListener('saveCateProducts', function ({products}) {
            this.state.cateProducts = products
        });

        this.addEventListener('addToShoppingCart', function ({goods}) {
            let carts = this.state.goodInShoppingCart;
            console.log(carts, '----------');
            let cartIndex = _.findIndex(carts, {product_stock_id: goods['product_stock_id']});
            if (cartIndex < 0) {
                this.state.goodInShoppingCart.push(goods)
            } else {
                this.$application.$vm.set(carts, cartIndex, goods)
            }
            this.calculate(this.state);
        });

        this.addEventListener('removeGoodsFromCart', function ({goods}) {
            let carts = this.state.goodInShoppingCart;
            this.state.goodInShoppingCart = carts.filter((i) => i.id !== goods.id);
            this.calculate(this.state);
        });

        this.addEventListener('saveCartGoodsList', function ({products}) {
            let items = products.data;
            let meta = products.meta;
            _.map(items, (i) => {
                i.price = returnFloat(i.price)
            });
            this.state.goodInShoppingCart = items;
            this.state.cartTotalFeeFormat = meta['total_fee'].toFixed(2);
            this.calculate(this.state);
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
            }
            ;
            this.calculate(this.state);
        });

        this.addEventListener('saveCreatedOrderInfo', function ({orderInfo}) {
            this.state.createdOrderInfo = orderInfo
        });

        this.addEventListener('saveGrouponOrders', function ({orders}) {
            _.map(orders, (order) => {
                let totalQuantity = 0;
                _.map(order.products, (product) => {
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

        this.addEventListener('saveOrderInfo', function ({orderInfo}) {
            this.state.orderInfo = orderInfo
        });

        this.addEventListener('saveAvailableCoupons', function ({coupons}) {
            _.map(coupons, (coupon) => {
                coupon['title'] = coupon['coupon_name'];
                if (coupon['coupon_type'] === 'CASH') {
                    coupon.typeDesc = '现金券'
                } else {
                    coupon.typeDesc = '折扣券'
                }
                coupon.floor = coupon['floor'] > 0 ? `满${coupon['floor']}元可用` : '无门槛';
                coupon.coupon_image = coupon['banner'];
                coupon.validTime = coupon['valid_term_desc']
            });
            console.log(coupons, '??????????????????');
            this.state.availableCoupons = coupons
        });

        this.addEventListener('handleIds', function ({id}) {
            let ids = this.state.ids;
            let index = _.indexOf(ids, id);
            if (index < 0) {
                ids.push(id)
            } else {
                ids.splice(index, 1)
            }
            this.state.ids = ids;
        });

        this.addEventListener('deleteId', function () {
            let ids = this.state.ids;
            ids.pop();
            this.state.ids = ids;
        });

        this.addEventListener('clearIds', function () {
            this.state.ids = [];
        });

        this.addEventListener('saveShopGrouponDetails', function ({info}) {
            let list = info['shop_shopping_groups'];
            _.map(list, (item) => {
                if (item['group_products'].length > 3) {
                    item.display_products = item['group_products'].slice(0, 3)
                } else {
                    item.display_products = item['group_products']
                }
            });
            this.state.shopGrouponList = list;
            this.state.shopInfo = info['shop_info']
        })
    }
}
