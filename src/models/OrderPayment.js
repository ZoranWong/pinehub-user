import Model from './Model';
import _ from 'underscore';

export default class Orders extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            orderInfo () {
                return this.state.orderInfo
            },
            createdOrderInfo () {
                return this.state.createdOrderInfo
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            orderInfo: {},
            createdOrderInfo: {}
        });
    }

    listeners () {
        super.listeners();
        this.addEventListener('saveOrderInfo', function ({orderInfo}) {
            _.map(orderInfo['order_items'], (item) => {
                let spec = [];
                for (let key in item['spec_value']) {
                    spec.push(item['spec_value'][key])
                }
                item['spec_desp'] = spec.join(',')
            });
            this.state.orderInfo = orderInfo;
            console.log(orderInfo, '_+_+_+__+_++__+__+_+_+_+__++_+__++_+_+_+__++_+__++_+_+');
        });
        
        this.addEventListener('saveCreatedOrderInfo', function ({orderInfo}) {
            this.state.createdOrderInfo = orderInfo
        })
    }
}
