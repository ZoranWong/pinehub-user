import Model from './Model';
import StoreTransformer from './transformers/StoreTransformer';
import _ from 'underscore';
import {formatMoney} from '../utils';

export default class Orders extends Model {
    constructor (app) {
        super(app);
        this.transformer = StoreTransformer;
    }

    computed () {
        return _.extend(super.computed(), {
            categories () {
                return this.state.categories;
            },
            goods () {
                return this.state.goods
            },
            goodInShoppingCart () {
                return this.state.goodInShoppingCart
            },
            showPoints () {
                return this.state.showPoints
            },
            commonlyPoints () {
                return this.state.commonlyPoints
            },
            nearbyPoints () {
                return this.state.nearbyPoints
            },
            selectedPoint () {
                return this.state.selectedPoint
            },
            totalPrice () {
                return this.state.totalPrice
            },
            mallType () {
                return this.state.mallType
            },
            cartTotalFeeFormat () {
                return this.state.cartTotalFeeFormat
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            categories: [],
            goods: [],
            goodInShoppingCart: [],
            showPoints: false,
            commonlyPoints: [],
            nearbyPoints: [],
            selectedPoint: {},
            totalPrice: '',
            mallType: '',
            cartTotalFeeFormat: ''
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


    listeners () {
        let that = this;

        super.listeners();

        this.addEventListener('shoppingCartAnimation', function (arg) {
        });

        this.addEventListener('saveCategories', function ({categories}) {
            this.state.categories = categories;
        });

        this.addEventListener('saveGoods', function ({goods}) {
            _.map(goods, function (product) {
                let productEntities = product['product_entities'];

                _.map(productEntities, function (itemEntities) {
                    let specObj = {};
                    _.map(itemEntities.specifications, function (spec) {
                        specObj[spec.id] = spec['value'].value
                    });
                    itemEntities.specs = specObj
                });

                // let minPrice = _.min(productEntities, (value) => {
                //     return value['market_price']
                // });
                // let maxPrice = _.max(productEntities, (value) => {
                //     return value['market_price']
                // });
                // if (product['specifications'].length) {
                //     if (minPrice['market_price'] === maxPrice['market_price']) {
                //         product['range'] = `￥${minPrice['market_price']}`
                //     } else {
                //         product['range'] = `￥${minPrice['market_price']}~￥${maxPrice['market_price']}`
                //     }
                // } else {
                //     product['range'] = `￥${minPrice['market_price']}`
                // }

                let specifications = product['specifications'];
                let spec = [];
                _.map(specifications, function (value) {
                    spec.push(value.name)
                });
                product['spec'] = spec.join(',');
            });

            this.state.goods = goods;
        });

        this.addEventListener('addToShoppingCart', function ({goods}) {
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

        this.addEventListener('removeGoodsFromCart', function ({goods}) {
            let carts = this.state.goodInShoppingCart;
            this.state.goodInShoppingCart = carts.filter(i => i.id !== goods.id);
            that.calculate(this.state);
        });

        this.addEventListener('saveCartGoodsList', function ({products}) {
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

        this.addEventListener('clearShoppingCart', function () {
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

        this.addEventListener('selectPoints', function ({boolean, type}) {
            this.state.showPoints = boolean;
            this.state.mallType = type;
        });

        this.addEventListener('saveCommonlyUsedPoint', function ({points, type}) {
            _.map(points, (point) => {
                let dis = Math.round(point.distance);
                if (dis > 1000) {
                    point.formatDistance = (dis / 1000).toFixed(1) + '千米'
                } else {
                    point.formatDistance = dis + '米'
                }
            });
            this.state.commonlyPoints = points;
            this.state.type = type;
        });

        this.addEventListener('saveNearbyPoints', function ({points, type}) {
            _.map(points, (point) => {
                let dis = Math.round(point.distance);
                if (dis > 1000) {
                    point.formatDistance = (dis / 1000).toFixed(1) + '千米'
                } else {
                    point.formatDistance = dis + '米'
                }
            });
            this.state.nearbyPoints = points;
            this.state.type = type;
        });


    }
}
