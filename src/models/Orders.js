import Model from './Model';
import _ from 'underscore';
import OrdersTransformers from './transformers/Orders';

export default class Orders extends Model {
    constructor (app) {
        super(app);
        this.transformer = OrdersTransformers;
    }

    computed () {
        return _.extend(super.computed(), {
            totalAmount () {
                return this.state.totalAmount;
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            totalAmount: 0
        });
    }

    listeners () {
        super.listeners();
        this.addEventListener('setTotalAmount', function ({totalAmount}) {
            this.state.totalAmount = totalAmount;
        });
    }
}
