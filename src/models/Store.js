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
            mallType: ''
        });
    }
    
    calculate (state) {
        let data = state.goodInShoppingCart;
        if (_.isEmpty(data)) return;
        let totalPrice = 0;
        _.map(data, (item) => {
            totalPrice += (parseInt(item['market_price']) * parseInt(item['buy_num']))
        });
       
        state.totalPrice = formatMoney(totalPrice);
    }
    

    listeners () {
        let that = this;
        
        super.listeners();
        
        this.addEventListener('shoppingCartAnimation', function (arg) {
          let bezierPoints = [];
          let pointsD = [];
          let pointsE = [];
          
          let points = arg[0];
          let times = arg[1];
  
          const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'], 2));
          
          // 邻控制BC点间距
          const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'], 2));
          // D每次在AB方向上移动的距离
          const EACH_MOVE_AD = DIST_AB / times;
          // E每次在BC方向上移动的距离
          const EACH_MOVE_BE = DIST_BC / times;
          // 点AB的正切
          const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
          // 点BC的正切
          const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
          // 点AB的弧度值
          const RADIUS_AB = Math.atan(TAN_AB);
          // 点BC的弧度值
          const RADIUS_BC = Math.atan(TAN_BC);
          // 每次执行
          for (let i = 1; i <= times; i++) {
            // AD的距离
            let distAD = EACH_MOVE_AD * i;
            // BE的距离
            let distBE = EACH_MOVE_BE * i;
            // D点的坐标
            let pointD = {};
            pointD['x'] = distAD * Math.cos(RADIUS_AB) + points[0]['x'];
            pointD['y'] = distAD * Math.sin(RADIUS_AB) + points[0]['y'];
            pointsD.push(pointD);
            // E点的坐标
            let pointE = {};
            pointE['x'] = distBE * Math.cos(RADIUS_BC) + points[1]['x'];
            pointE['y'] = distBE * Math.sin(RADIUS_BC) + points[1]['y'];
            pointsE.push(pointE);
            // 此时线段DE的正切值
            let tanDE = (pointE['y'] - pointD['y']) / (pointE['x'] - pointD['x']);
            // tanDE的弧度值
            let radiusDE = Math.atan(tanDE);
            // 地市DE的间距
            let distDE = Math.sqrt(Math.pow((pointE['x'] - pointD['x']), 2) + Math.pow((pointE['y'] - pointD['y']), 2));
            // 此时DF的距离
            let distDF = (distAD / DIST_AB) * distDE;
            // 此时DF点的坐标
            let pointF = {};
            pointF['x'] = distDF * Math.cos(radiusDE) + pointD['x'];
            pointF['y'] = distDF * Math.sin(radiusDE) + pointD['y'];
            bezierPoints.push(pointF);
          }
          return {
            'bezierPoints': bezierPoints
          };
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
                let maxPrice = _.max(productEntities, (value) => {
                    return value['market_price']
                });
    
                let specifications = product['specifications'];
                let spec = [];
                _.map(specifications, function (value) {
                    spec.push(value.name)
                });
                product['spec'] = spec.join(',');
                product['range'] = product['specifications'].length ? `￥${minPrice['market_price']}~￥${maxPrice['market_price']}` : `￥${minPrice['market_price']}`
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
            _.map(products, (i) => {
                if (i.specifications.length) {
                    let specDesp = [];
                    _.map(i.specifications, (item) => {
                        specDesp.push(item.value.value)
                    });
                    i['spec_desp'] = specDesp.join(',')
                }
            });
            this.state.goodInShoppingCart = products;
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
            this.state.commonlyPoints = points;
            this.state.type = type;
        });
    
        this.addEventListener('saveNearbyPoints', function ({points, type}) {
            this.state.nearbyPoints = points;
            this.state.type = type;
        });
        
       
    }
}
