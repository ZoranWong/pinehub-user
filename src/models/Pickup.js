import Model from './Model';
import _ from 'underscore';

export default class Pickup extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            pickupOrders () {
                return this.state.pickupOrders
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            pickupOrders: []
        });
    }
    

    listeners () {
        super.listeners();
        this.addEventListener('savePickupOrders', function ({orders}) {
            console.log(orders, 'pickuporders');
            _.map(orders, function (order) {
                order['subOrderNo'] = order['order_no'].slice(-4)
            });
            this.state.pickupOrders = orders;
        })
    }
}
