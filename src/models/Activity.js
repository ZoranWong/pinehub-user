import Model from './Model';
import _ from 'underscore';
import {formatMoney} from '../utils';

export default class Activity extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            id (state) {
                return state.id;
            },
            activities () {
                return this.state.activities
            },
            banners () {
                return this.state.banners
            },
            products () {
                return this.state.products
            },
            goodInShoppingCart () {
                return this.state.goodInShoppingCart
            },
            totalPrice () {
                return this.state.totalPrice
            },
            orderInfo () {
                return this.state.orderInfo
            },
            createdOrderInfo () {
                return this.state.createdOrderInfo
            },
            couponIds () {
                return this.state.ids
            },
            availableCoupons () {
                return this.state.availableCoupons
            },
            address () {
                return this.state.address
            }
        });
    }

    data () {
        // let userInfo = this.service();
        return {
            id: null,
            activities: [],
            banners: [],
            products: [],
            goodInShoppingCart: [],
            totalPrice: '',
            orderInfo: {},
            createdOrderInfo: {},
            ids: [],
            address: {},
            availableCoupons: []
        };
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
        this.addEventListener('info', function (userInfo) {
            _.extend(this.state, userInfo);
            // this.service('mp.storage').set('token', userInfo.token);
            // this.service('mp.storage').set('userInfo', userInfo);
        });

        this.addEventListener('saveActivities', function ({activities}) {
            this.state.activities = activities;
        });

        this.addEventListener('saveActBanners', function ({banners}) {
            this.state.banners = banners;
        });

        this.addEventListener('saveProducts', function ({products}) {
            _.map(products, (product) => {
                let specifications = product['specifications'];

                let productEntities = product['product_entities'];

                _.map(productEntities, function (itemEntities) {
                    let specObj = {};
                    _.map(itemEntities.specifications, function (spec) {
                        specObj[spec.id] = spec['value'].value
                    });
                    itemEntities.specs = specObj
                });
                let ary = product['sell_price_format'].split('～');
                if (ary.length > 1) {
                    product['sell_price_reformat'] = `${ary[0]}`;
                }
                let spec = [];
                _.map(specifications, function (value) {
                    spec.push(value.name)
                });
                product['spec'] = spec.join(',');
                this.state.products.push(product)
            });
        });

        this.addEventListener('saveActivityCartGoodsList', function ({products}) {
            this.state.goodInShoppingCart = products;
            that.calculate(this.state);
        });

        this.addEventListener('addToShoppingCart', function ({goods}) {
            console.log(goods);
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

        this.addEventListener('clearShoppingCart', function () {
            this.state.goodInShoppingCart = []
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

        this.addEventListener('saveOrderInfo', function ({orderInfo}) {
            _.map(orderInfo['order_items'], (item) => {
                let spec = [];
                for (let key in item['spec_value']) {
                    spec.push(item['spec_value'][key])
                }
                item['spec_desp'] = spec.join(',')
            });
            this.state.orderInfo = orderInfo;
        });

        this.addEventListener('saveCreatedOrderInfo', function ({orderInfo}) {
            this.state.createdOrderInfo = orderInfo
        });

        this.addEventListener('handleIds', function ({id}) {
            console.log(id, '准备处理couponid');
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

        this.addEventListener('saveShopInfo', function ({info}) {
            this.state.shopInfo = info;
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

        this.addEventListener('saveAddress', function ({address}) {
            console.log(address, '?????????????????????????????????????????????????');
            this.state.address = address;
        });

        this.addEventListener('clearProducts', function () {
            this.state.products = []
        })
    }
}
