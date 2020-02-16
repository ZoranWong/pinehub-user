import Model from './Model';
import _ from 'underscore';
import {Base64} from '../utils/beSecret';

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
                let time = new Date().getTime();
                let content = {
                    "order_id": order.id, 'time': time
                };
                let params = {
                    content: Base64.encode(JSON.stringify(content)), margin: 0, size: 200
                };
                order.params = params;
                order['subOrderNo'] = order['order_no'].slice(-4)
            });
            this.state.pickupOrders = orders;
        })
    }
}
