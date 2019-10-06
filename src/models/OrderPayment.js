import Model from './Model';
import _ from 'underscore';
import OrderDetailTransformer from './transformers/OrderDetailTransformer';

export default class Orders extends Model {
    constructor (app) {
        super(app);
        this.transformer = OrderDetailTransformer;
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
