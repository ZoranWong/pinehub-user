import Model from './Model';
import StoreTransformer from './transformers/StoreTransformer';
import _ from 'underscore';

export default class Orders extends Model {
    constructor (app) {
        super(app);
        this.transformer = StoreTransformer;
    }

    computed () {
        return _.extend(super.computed(), {
            goodDetail () {
                return this.state.goodDetail
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            goodDetail: {}
        });
    }

    listeners () {
        super.listeners();
        this.addEventListener('setGoodDetail', function ({good}) {
            let productEntities = good['product_entities'];
            let minPrice = _.min(productEntities, (value) => {
                return value['market_price']
            });
            let maxPrice = _.max(productEntities, (value) => {
                return value['market_price']
            });
            let specifications = good['specifications'];
            let spec = [];
            _.map(specifications, function (value) {
                spec.push(value.name)
            });
            good['spec'] = spec.join(',');
            good['range'] = specifications.length ? `￥${minPrice['market_price']}~￥${maxPrice['market_price']}` : `￥${minPrice['market_price']}`
            this.state.goodDetail = good;
        })
    }
}
