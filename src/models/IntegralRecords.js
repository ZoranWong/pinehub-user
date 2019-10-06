import Model from './Model';
import _ from 'underscore';
import IntegralTransformer from '../models/transformers/Integral'
export default class IntegralRecords extends Model {
    constructor (app) {
        super(app);
        this.transformer = IntegralTransformer;
    }
    
    computed () {
        return _.extend(super.computed(), {
            integralRecords () {
                return this.state.integralRecords
            }
        });
    }
    
    data () {
        return _.extend(super.data(), {
            integralRecords: []
        });
    }
    
    listeners () {
        super.listeners();
        this.addEventListener('saveIntegralRecords', function ({records}) {
            this.state.integralRecords = records
        })
    }
}
