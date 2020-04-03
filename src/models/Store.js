import Model from './Model';
import StoreTransformer from './transformers/StoreTransformer';
import _ from 'underscore';
import {formatMoney, returnFloat} from '../utils';

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
            cartTotalFeeFormat: '',
            firstShop: {}
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

                let minPrice = _.min(productEntities, (value) => {
                    return value['market_price']
                });
                // let maxPrice = _.max(productEntities, (value) => {
                //     return value['market_price']
                // });
                product['min_price'] = `￥${minPrice['retail_price']}起`;

                let specifications = product['specifications'];
                let spec = [];
                _.map(specifications, function (value) {
                    spec.push(value.name)
                });
                product['spec'] = spec.join(',');
                product.price = product['sell_price_format'].split('¥')[1]
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
                    i['spec_desp'] = specDesp.join(',');
                }
                i.checked = true;
                i.price = returnFloat(i.price)
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
            if (this.state.firstCommon && this.state.firstCommon.id) {
                if (!_.find(this.state.commonlyPoints, (commonPoint) => {
                    return commonPoint.id === this.state.firstCommon.id
                })) {
                    this.state.commonlyPoints = [];
                    this.state.commonlyPoints.push(this.state.firstCommon)
                }
            }
            _.map(points, (point) => {
                if (_.find(this.state.commonlyPoints, function (commonlyPoint) {
                    return commonlyPoint.id === point.id
                })) {
                    return
                }
                let dis = Math.round(point.distance);
                if (dis > 1000) {
                    point.formatDistance = (dis / 1000).toFixed(1) + '千米'
                } else {
                    point.formatDistance = dis + '米'
                }
                let addr = point.address;
                if (addr.length > 15) {
                    point.addrFormat = addr.slice(0, 15) + '...'
                } else {
                    point.addrFormat = point.address
                }
                point.time = `${point['start_at'] || '暂无'}-${point['end_at'] || '暂无'} `;
                if (this.state.firstCommon && point.id === this.state.firstCommon.id) return;
                this.state.commonlyPoints.push(point)
            });
            this.state.type = type;
        });

        this.addEventListener('saveNearbyPoints', function ({points, type}) {
            if ((this.state.firstShop && this.state.firstShop.id)) {
                if (!_.find(this.state.nearbyPoints, (nearbyPoint) => {
                    return nearbyPoint.id === this.state.firstShop.id
                })) {
                    this.state.nearbyPoints = [];
                    this.state.nearbyPoints.push(this.state.firstShop)
                }
            }
            _.map(points, (point) => {
                if (_.find(this.state.nearbyPoints, function (nearbyPoint) {
                    return nearbyPoint.id === point.id
                })) {
                   return
                }
                let dis = Math.round(point.distance);
                if (dis > 1000) {
                    point.formatDistance = (dis / 1000).toFixed(1) + '千米'
                } else {
                    point.formatDistance = dis + '米'
                }
                let addr = point.address;
                if (addr.length > 15) {
                    point.addrFormat = addr.slice(0, 15) + '...'
                } else {
                    point.addrFormat = point.address
                }
                point.time = `${point['start_at'] || '暂无'}-${point['end_at'] || '暂无'} `;
                if (this.state.firstShop && point.id === this.state.firstShop.id) return;
                this.state.nearbyPoints.push(point)
            });
            console.log(this.state.nearbyPoints, '.......................');
            this.state.type = type;
        });

        this.addEventListener('clearNearbyPoints', function () {
            this.state.nearbyPoints = [];
        });

        this.addEventListener('saveFirstNearShop', function ({shop}) {
            this.state.firstShop = shop;
        });

        this.addEventListener('saveFirstCommonShop', function ({shop}) {
            this.state.firstCommon = shop;
        })

        this.addEventListener('clearSelectedPoint', function () {
            this.state.firstShop = {};
            this.state.firstCommon = {};
        })
    }
}
