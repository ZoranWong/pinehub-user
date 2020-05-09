import Model from './Model';
import StoreTransformer from './transformers/StoreTransformer';
import _ from 'underscore';

export default class GrouponPayment extends Model {
    constructor (app) {
        super(app);
        this.transformer = StoreTransformer;
    }

    computed () {
        return _.extend(super.computed(), {
            createdOrderInfo () {
                return this.state.createdOrderInfo
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            createdOrderInfo: {}
        });
    }

    listeners () {
        super.listeners();
        this.addEventListener('setGrouponOrderInfo', function ({orderInfo}) {
            console.log('------- order info -------', orderInfo);
            this.state.createdOrderInfo = orderInfo
        })
    }
}
